<?php
// Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');

  include_once '../../config/Database.php';
  include_once '../../controllers/BoardController.php';

  // Init db
  $database = new Database('localhost', 'pira', 'root', '');
  $conn = $database->connect();

  // Get id
  $id = $_GET['id'] ?? die();

  // Get single board
  $boardController = new BoardController($conn);

  $boardController->getLists($id);
?>