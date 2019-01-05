<?php
  include_once '../../config/Database.php';

  class Team {
    // DB info
    private $connection;
    private $table = 'teams';

    // props
    public $id;
    public $name;
    public $created_at;

    public function __construct(PDO $db) {
      $this->connection = $db;
    }

    public function getTeamBoards(): PDOStatement {
      $query = '
      SELECT b.id, b.title, b.created_at, d.username, d.email
      FROM ' . $this->table . ' t
      INNER JOIN boards b
      ON b.team = t.id
      INNER JOIN developers d
      ON d.id = b.lead
      WHERE t.id = :id
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // bind id
      $stmt->bindParam(':id', $this->id);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    public function getTeams(): PDOStatement {
      $query = '
      SELECT *
      FROM ' . $this->table;

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    public function getSingleTeam(): bool {
      $query = '
      SELECT *
      FROM ' . $this->table . ' t
      WHERE
        t.id = ?
      LIMIT
        0,1
      ';

      // prepare stmt
      $stmt = $this->connection->prepare($query);

      // Bind id
      $stmt->bindParam(1, $this->id);

      // Execute
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($row) {
        // set props
        $this->name = $row['name'];
        $this->created_at = $row['created_at'];

        return true;
      }

      return false;
    }

    public function create(): bool {
      // create query
      $query = '
      INSERT INTO ' . $this->table . '
      SET
        name = :name
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->name = htmlspecialchars(strip_tags($this->name));

      // bind data
      $stmt->bindParam(':name', $this->name);

      // Execute query
      if($stmt->execute()) {
        if(!$stmt->rowCount()) {
          return false;
        }
        $this->id = $this->connection->lastInsertId();
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s. \n", $stmt->error);

      return false;
    }

    public function update(): bool {
      // create query
      $query = '
      UPDATE ' . $this->table . '
      SET
        name = :name,
      WHERE
        id = :id
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->name = htmlspecialchars(strip_tags($this->name));
      $this->id = htmlspecialchars(strip_tags($this->id));

      // bind data
      $stmt->bindParam(':name', $this->name);
      $stmt->bindParam(':id', $this->id);

      // Execute query
      if($stmt->execute()) {
        if(!$stmt->rowCount()) {
          return false;
        }
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s. \n", $stmt->error);

      return false;
    }

    public function delete(): bool {
      // create query
      $query = '
      DELETE
      FROM ' . $this->table . '
      WHERE id = :id
      ';

      // prepare stmt
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->id = htmlspecialchars(strip_tags($this->id));

      // bind params
      $stmt->bindParam(':id', $this->id);

      // execute query
      if($stmt->execute()) {
        if(!$stmt->rowCount()) {
          return false;
        }
        return true;
      }

      printf("Error: %s.\n", $stmt->error);

      return false;
    }
  }
?>
