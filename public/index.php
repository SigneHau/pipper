<?php
require '../.env';

header("Access-Control-Allow-Origin:*");
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
    $conn = new PDO("mysql:host=$servername;dbname=pipper", $username, $password);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    if ($request == "GET" && $uri == "/pips") {
    
  // bruger asc (ascending) for at vise ældste pip først - da vi bruger prepend i vores frontend, som gør at den ældste pip er øverst derved får vi skabt en revert funktion så det nyeste postet pip bliver vist øverst i vores frontend - selvom den bliver vist nederest i vores DB (SQL database)
  try {
    $statement = $conn->query("SELECT * FROM pips ORDER BY created_at ASC;");
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }
}
     // else check if this is a POST request and write "You wrote a POST request" back
     else if ($request === 'POST' && $uri === '/pips') {
      $input = (array) json_decode(file_get_contents('php://input'), true);
      
      $username = $input["username"];
      $message = $input["message"];

      $length = strlen($message);
  
      if ($username !== '') { // validering: overholde regler for at gemme korrekt data
      
      // Backend validering PT.1 - max 250 tegn i message
        if ($length <= 250) {

          $data = [
              'username' => $username,
              'message' => $message
          ];
          $sql = "INSERT INTO pips VALUES (default, :username, :message, NOW())";
          $stmt= $conn->prepare($sql);
          $stmt->execute($data);
  
  
          $id = $conn->lastInsertId();
          $pip = (object) $input;
          $pip->id = $id;
  
          echo json_encode($pip);
      } else {
          echo json_encode("username skal udfyldes");
      }
    }

    // Backend validering hvis message er tom eller over 250 tegn
      else {
          echo json_encode("message skal udfyldes og må max være 250 tegn");
      }
  }


// Backend til lazy loading/bæredygtighed - vi vil kun have vist de 5 seneste pips og så tilføje en knap i vores frontend, hvor vi kan hente flere pips ned - skal være sammenkoblet til vores JS og DB

try {
  // Læs query-parametre: limit og offset
  $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
  $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

  // Rimelige grænser/validering
  if ($limit < 1) $limit = 1;
  if ($limit > 100) $limit = 100; // undgå alt for store svar
  if ($offset < 0) $offset = 0;

  // (Valgfrit) total antal rækker til metadata
  $total = (int) $conn->query("SELECT COUNT(*) FROM pips")->fetchColumn();

  // Hent pagineret data – bind som ints!
  $stmt = $conn->prepare("SELECT * FROM pips ORDER BY id_pip ASC LIMIT :limit OFFSET :offset");
  $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
  $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
  $stmt->execute();
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // Returnér data + pagination-info
  echo json_encode([
      'data' => $rows,
      'pagination' => [
          'limit' => $limit,
          'offset' => $offset,
          'total' => $total,
          'next_offset' => ($offset + $limit < $total) ? $offset + $limit : null,
          'prev_offset' => ($offset - $limit >= 0) ? $offset - $limit : null
      ]
  ]);
} catch(PDOException $e) {
  http_response_code(500);
  echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}


?>