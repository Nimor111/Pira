<?php
  include_once '../../config/Database.php';

  class Developer {
    // DB info
    private $connection;
    private $table = 'developers';

    // Developer properties
    public $id;
    public $email;
    public $password;
    public $username;
    public $created_at;

    // Constructor
    public function __construct(PDO $db) {
      $this->connection = $db;
    }

    // Get user by email
    public function getByEmail(string $email) {
      $query = '
      SELECT *
      FROM ' . $this->table . '
      WHERE email=:email
      ';
      // prepare statement
      $stmt = $this->connection->prepare($query);
      $stmt->bindParam(':email', $email);

      // execute query
      $stmt->execute();

      return $stmt;
    }
  }
?>
