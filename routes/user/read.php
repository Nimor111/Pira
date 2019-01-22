<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');

  include_once '../../config/Database.php';
  include_once '../../controllers/UserController.php';
  include_once '../../config/credentials.php';

  // Init db
  $database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
  $conn = $database->connect();

  // Get users
  $userController = new UserController($conn);

  $userController->get();
?>
