<?php
  class Database {
    // DB parameters
    private $host;
    private $dbName;
    private $username;
    private $password;
    private $connection;

    public function __construct(string $host, string $dbName, string $username, string $password) {
      $this->host = $host;
      $this->dbName = $dbName;
      $this->username = $username;
      $this->password = $password;
      $this->connection = null;
    }

    public function connect(): ?PDO {
      try {
        $this->connection = new PDO(
          'mysql:host=' . $this->host . ';dbname=' . $this->dbName,
          $this->username,
          $this->password
        );
        // Set PDO to throw exceptions when queries go wrong
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
        echo 'Connection Error: ' . $e->getMessage();
      }

      return $this->connection;
    }
  }
?>
