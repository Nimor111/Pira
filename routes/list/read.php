<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');

  include_once '../../config/Database.php';
  include_once '../../controllers/ListController.php';

  // Init db
  $database = new Database('localhost', 'pira', 'root', '');
  $conn = $database->connect();

  // Get boards
  $listController = new ListController($conn);

  $listController->get();
?>
