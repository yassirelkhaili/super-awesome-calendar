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
        $sql = "SELECT id, name, color FROM awesomecalendar.categories"; 
        $stmt = $conn->prepare($sql); 
        $stmt->execute(); 
        $stmt = $conn->prepare($sql); 
        $stmt->execute(); 
        $categories = $stmt->fetchAll(pdo::FETCH_OBJ);
        echo json_encode($categories); 
        break;
    case "POST":
        $data = json_decode($data_json);
        try {
            $sql = "INSERT INTO awesomecalendar.categories(name, color) VALUES(:name, :color)"; 
            $stmt = $conn->prepare($sql);
            if($stmt->execute([":name" => $data->name, ":color" => $data->color])) {
                echo json_encode(["success" => true, "message" => "The category was successfully added."]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to add the category."]);
            }
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
        }
        
    break; 
    case "DELETE": 
        $id = explode("/", $_SERVER["REQUEST_URI"])[4];
        if (isset($id) && is_numeric($id)) {
            $sql = "DELETE from awesomecalendar.categories WHERE id=:id"; 
            $stmt = $conn->prepare($sql);
            $stmt->execute([":id"=>$id]);
        }
            break; 
}