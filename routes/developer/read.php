<?php

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Developer.php';

  // Init DB and connect to it
  $database = new Database('localhost', 'pira', 'root', '');
  $conn = $database->connect();

  $user = new Developer($conn);

  // Get user
  $result = $user->getByEmail('ivan@rakitic.com');

  if ($result->rowCount()) {
    // Developer array
    $devArr = array();
    $devArr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $dev = array(
        'id' => $id,
        'username' => $username,
        'email' => $email,
        'password' => $password,
        'created_at' => $created_at
      );

      array_push($devArr['data'], $dev);
    }

    // jsonify
    echo json_encode($devArr);
  } else {
    echo json_encode(
      array('message' => 'No devs found!')
    );
  }
?>
