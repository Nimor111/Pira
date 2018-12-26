<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,
    Authorization,X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../controllers/ListController.php';

  // Init db
  $database = new Database('localhost', 'pira', 'root', '');
  $conn = $database->connect();

  // Get raw posted data - THIS LANGUAGE THOUGH
  $data = json_decode(file_get_contents("php://input"));

  $listController = new ListController($conn);

  $listController->post($data);
?>
