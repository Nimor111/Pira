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

    public function getUsers(): PDOStatement {
      $query='
      SELECT d.id, d.username, d.email
      FROM ' . $this->table . ' d
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);
      // execute query
      $stmt->execute();

      return $stmt;
    }

    // Attempt to login user with email and password
    public function getByEmail(): bool {
      $query = '
      SELECT *
      FROM ' . $this->table . '
      WHERE email=:email
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);
      $stmt->bindParam(':email', $this->email);

      // execute query
      $stmt->execute();

      if(!$stmt->rowCount()) {
        return false;
      }

      // check password
      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      if (!password_verify($this->password, $row['password'])) {
        return false;
      }

      $this->username = $row['username'];

      return true;
    }

    public function create() {
      // create query
      $query = '
      INSERT INTO ' . $this->table . '
      SET
        username = :username,
        email = :email,
        password = :password
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->username = htmlspecialchars(strip_tags($this->username));
      $this->password = htmlspecialchars(strip_tags($this->password));
      $this->email = htmlspecialchars(strip_tags($this->email));

      $hash = password_hash($this->password, PASSWORD_DEFAULT);

      // bind data
      $stmt->bindParam(':username', $this->username);
      $stmt->bindParam(':password', $hash);
      $stmt->bindParam(':email', $this->email);

      // execute query
      if ($stmt->execute()) {
        if(!$stmt->rowCount()) {
          return false;
        }

        $this->id = $this->connection->lastInsertId();
        return true;
      }

      // print error if something goes wrong
      printf("Error: %s. \n", $stmt->error);

      return false;
    }
  }
?>
