<?php
require '../.env';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, XRequested-With");


$servername = "localhost";
$username = "root";
$password = getenv('PASSWORD');

$request = $_SERVER['REQUEST_METHOD'];

// Create an if statement to check if this is a GET request

    // Her håndterer vi GET-request
if ($request == "GET") {
    
  try {
    $conn = new PDO("mysql:host=$servername;dbname=pipper", $username, $password);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $statement = $conn->query("SELECT * FROM pips");
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }
  
     // else check if this is a POST request and write "You wrote a POST request" back
} else if ($request == "POST") {
    // Her håndterer vi POST-request
     echo json_encode(["message" => "Du lavede en POST-request"]);
}
?>