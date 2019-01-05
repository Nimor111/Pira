<?php
  include_once __DIR__.'/../models/Developer.php';

  class UserController {
    public function __construct(PDO $conn) {
      $this->user = new Developer($conn);
    }

    public function register(object $data) {
      $this->user->username = $data->username;
      $this->user->password = $data->password;
      $this->user->email = $data->email;

      if($this->user->create()) {
        http_response_code(201);
        header("Location: /routes/user/login.php");
        echo json_encode(
          array('message' => 'Registration successful!')
        );
      } else {
        http_response_code(400);
        echo json_encode(
          array('message' => 'Registration unsuccessful!')
        );
      }
    }

    public function login(object $data) {
      $this->user->email = $data->email;
      $this->user->password = $data->password;

      if($this->user->getByEmail()) {
        // base64 encode string with format username:password
        $encoded = base64_encode($this->user->username . ':' . $this->user->password);
        header("Authorization: Basic " . $encoded);

        echo json_encode(
          array('message' => 'Login successful')
        );
      } else {
        http_response_code(401);
        echo json_encode(
          array('message' => 'Unauthorized!')
        );
      }
    }
  }
?>
