<?php
require "../config/pdo.php";
header("Access-Control-Allow-Origin: http://localhost:3000"); //change to your local enviroments origin
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
$data_json = file_get_contents("php://input");
$method = $_SERVER["REQUEST_METHOD"];
switch ($method) {
    case "GET":
        $sql = "SELECT e.id, e.name, e.date_from, e.date_to, e.event_type, c.name AS category_name, c.id AS category_id
            FROM awesomecalendar.events e
            LEFT JOIN awesomecalendar.event_category ec ON e.id = ec.event_id
            LEFT JOIN awesomecalendar.categories c ON ec.category_id = c.id";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $events = $stmt->fetchAll(pdo::FETCH_OBJ);
        echo json_encode($events);
        break;
    case "POST":
        $data = json_decode($data_json);
        try {
            switch ($data->event_type) {
                case 'multiple':
                    $sql = "INSERT INTO awesomecalendar.events(name, date_from, date_to, event_type) VALUES(:name, :date_from, :date_to, :event_type)";
                    $stmt = $conn->prepare($sql);
                    $mainStmt = $stmt->execute([":name" => $data->name, ":date_from" => $data->date_from, ":date_to" => $data->date_to, ":event_type" => $data->event_type]);
                    break;
                case 'whole':
                    $sql = "INSERT INTO awesomecalendar.events(name, date_from, event_type) VALUES(:name, :date_from, :event_type)";
                    $stmt = $conn->prepare($sql);
                    $mainStmt = $stmt->execute([":name" => $data->name, ":date_from" => $data->date_from, ":event_type" => $data->event_type]);
                    break;
                case 'specific':
                    $sql = "INSERT INTO awesomecalendar.events(name, date_from, event_type) VALUES(:name, :date_from, :event_type)";
                    $stmt = $conn->prepare($sql);
                    $mainStmt = $stmt->execute([":name" => $data->name, ":date_from" => $data->date_from . ' ' . $data->time_from, ":event_type" => $data->event_type]);
                    break;
                default:
                    $sql = "INSERT INTO awesomecalendar.events(name, date_from, date_to, event_type) VALUES(:name, :date_from, :date_to, :event_type)";
                    $stmt = $conn->prepare($sql);
                    $mainStmt = $stmt->execute([":name" => $data->name, ":date_from" => $data->date_from, ":date_to" => $data->date_to, ":event_type" => $data->event_type]);
                    break;
            }
            $eventId = $conn->lastInsertId();
            $sqlpivot = "INSERT INTO awesomecalendar.event_category(event_id, category_id) VALUES(:event_id, :category_id)";
            $stmtpivot = $conn->prepare($sqlpivot);
            $pivotStmt = $stmtpivot->execute([":event_id" => $eventId, ":category_id" => $data->category_id]);
            if ($pivotStmt && $mainStmt) {
                echo json_encode(["success" => true, "message" => "The event was successfully added."]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to add the event."]);
            }
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
        }

        break;
    case "PUT":
        $data_json = file_get_contents("php://input");
        $data = json_decode($data_json);
        $eventId = isset($_GET['id']) ? $_GET['id'] : null;
        if (!$eventId) {
            echo json_encode(["success" => false, "message" => "Event ID not provided."]);
            break;
        }
        try {
            $conn->beginTransaction();
            $sqlDeleteCategories = "DELETE FROM awesomecalendar.event_category WHERE event_id = :event_id";
            $stmtDeleteCategories = $conn->prepare($sqlDeleteCategories);
            $stmtDeleteCategories->execute([':event_id' => $data->id]);
            $sqlInsertCategory = "INSERT INTO awesomecalendar.event_category (event_id, category_id) VALUES (:event_id, :category_id)";
            $stmtInsertCategory = $conn->prepare($sqlInsertCategory);
            $stmtInsertCategory->execute([':event_id' => $data->id, ':category_id' => $data->category_id]);
            if ($data->event_type === "multiple") {
                $sqlUpdateEvent = "UPDATE awesomecalendar.events 
                SET name = :name, date_from = :date_from, date_to = :date_to, event_type = :event_type
                WHERE id = :id";
                $stmtUpdateEvent = $conn->prepare($sqlUpdateEvent);
                $success = $stmtUpdateEvent->execute([
                    ':id' => $data->id,
                    ':name' => $data->name,
                    ':date_from' => $data->date_from,
                    ':date_to' => $data->date_to,
                    ':event_type' => $data->event_type,
                ]);
            } else if ($data->event_type === "specific") {
                $datetime = $data->date_from . " " . $data->time_from . ":00";
                $sqlUpdateEvent = "UPDATE awesomecalendar.events 
                SET name = :name, date_from = :date_from, event_type = :event_type
                WHERE id = :id";
                $stmtUpdateEvent = $conn->prepare($sqlUpdateEvent);
                $success = $stmtUpdateEvent->execute([
                    ':id' => $data->id,
                    ':name' => $data->name,
                    ':date_from' => $datetime,
                    ':event_type' => $data->event_type,
                ]);
            } else {
                $sqlUpdateEvent = "UPDATE awesomecalendar.events 
                SET name = :name, date_from = :date_from, event_type = :event_type
                WHERE id = :id";
                $stmtUpdateEvent = $conn->prepare($sqlUpdateEvent);
                $success = $stmtUpdateEvent->execute([
                    ':id' => $data->id,
                    ':name' => $data->name,
                    ':date_from' => $data->date_from,
                    ':event_type' => $data->event_type,
                ]);
            }
            $conn->commit();
            echo json_encode(["success" => true, "message" => "The event and its categories were successfully updated."]);
        } catch (PDOException $e) {
            $conn->rollback();
            echo json_encode(["success" => false, "message" => "Error updating event and categories: " . $e->getMessage()]);
        }
        break;
    case "DELETE":
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            if (isset($_GET['id'])) {
                $eventId = $_GET['id'];
                $conn->beginTransaction(); //just in case if foreign id error
                try {
                    $sqlEventCategory = "DELETE FROM awesomecalendar.event_category WHERE event_id = :eventId";
                    $stmtEventCategory = $conn->prepare($sqlEventCategory);
                    $stmtEventCategory->execute([":eventId" => $eventId]);
                    $sqlEvent = "DELETE FROM awesomecalendar.events WHERE id = :eventId";
                    $stmtEvent = $conn->prepare($sqlEvent);
                    $stmtEvent->execute([":eventId" => $eventId]);
                    $conn->commit();
                    echo json_encode(["success" => true, "message" => "Event deleted successfully"]);
                } catch (Exception $e) {
                    $conn->rollBack(); //dont delete if something goes wrong
                    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Error: No eventId provided"]);
            }
        }
        break;
}
