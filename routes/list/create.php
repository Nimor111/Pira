<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../controllers/ListController.php';
  include_once '../../config/credentials.php';

  // Init db
  $database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
  $conn = $database->connect();

  // Get raw posted data - THIS LANGUAGE THOUGH
  $data = json_decode(file_get_contents("php://input"));

  $listController = new ListController($conn);

  $listController->post($data);
?>
