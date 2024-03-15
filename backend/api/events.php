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
        $sql = "SELECT id, name, color FROM awesomecalendar.events";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $events = $stmt->fetchAll(pdo::FETCH_OBJ);
        echo json_encode($events);
        break;
    case "POST":
        $data = json_decode($data_json);
        try {
            $sql = "INSERT INTO awesomecalendar.events(name, date_from, date_to) VALUES(:name, :date_from, :date_to)";
            $sqlpivot = "INSERT INTO awesomecalendar.event_category(event_id, category_id) VALUES(:event_id, :category_id)";
            $stmt = $conn->prepare($sql);
            $stmtpivot = $conn->prepare($sqlpivot);
            $mainStmt = $stmt->execute([":name" => $data->name, ":date_from" => $data->date_from, ":date_to" => $data->date_to]);
            $eventId = $conn->lastInsertId();
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
    case "DELETE":
        $id = explode("/", $_SERVER["REQUEST_URI"])[4];
        if (isset($id) && is_numeric($id)) {
            $sql = "DELETE from awesomecalendar.events WHERE id=:id";
            $stmt = $conn->prepare($sql);
            $stmt->execute([":id" => $id]);
        }
        break;
}
