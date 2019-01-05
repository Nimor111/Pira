<?php
// Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');

  include_once '../../config/Database.php';
  include_once '../../controllers/TeamController.php';

  // Init db
  $database = new Database('localhost', 'pira', 'root', '');
  $conn = $database->connect();

  // Get id
  $id = $_GET['id'] ?? die();

  // Get single board
  $teamController = new TeamController($conn);

  $teamController->getBoards($id);
?>
