<?php
  include_once '../../config/Database.php';
  include_once 'Developer.php';

  class Board {
    // DB info
    private $connection;
    private $table = 'boards';

    // props
    public $id;
    public $title;
    public $team;
    public $lead;
    public $created_at;

    public function __construct(PDO $db) {
      $this->connection = $db;
    }

    public function getBoards(): PDOStatement {
      $query = '
      SELECT b.id,b.title,t.name,d.email,d.username,b.created_at
      FROM ' . $this->table . ' b
      INNER JOIN developers d ON b.lead = d.id
      INNER JOIN teams t ON t.id = b.team
      ORDER BY b.id ASC
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);
      // execute query
      $stmt->execute();

      return $stmt;
    }

    public function getSingleBoard(): bool {
      $query = '
      SELECT *
      FROM ' . $this->table . ' b
      INNER JOIN developers d ON b.lead = d.id
      WHERE b.id = :id
      ';

      // prepare stmt
      $stmt = $this->connection->prepare($query);

      // Bind id
      $stmt->bindParam(':id', $this->id);

      // Execute
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($row) {
        // set props
        $this->title = $row['title'];
        $this->team = $row['team'];
        $this->lead = array(
          'email' => $row['email'],
          'username' => $row['username'],
        );
        $this->created_at = $row['created_at'];

        return true;
      }

      return false;
    }

    public function getBoardLists(): PDOStatement {
      $query = '
      SELECT l.id, l.name, l.created_at
      FROM ' . $this->table . ' b
      INNER JOIN lists l
      ON b.id = l.board
      WHERE b.id = :id
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // bind id
      $stmt->bindParam(':id', $this->id);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    public function create(): bool {
      // create query
      $query = '
      INSERT INTO ' . $this->table . '
      SET
        title = :title,
        team = :team,
        lead = :lead
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->team = htmlspecialchars(strip_tags($this->team));
      $this->lead = htmlspecialchars(strip_tags($this->lead));

      // bind data
      $stmt->bindParam(':title', $this->title);
      $stmt->bindParam(':team', $this->team);
      $stmt->bindParam(':lead', $this->lead);

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
        title = :title,
        team = :team,
        lead = :lead
      WHERE
        id = :id
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->team = htmlspecialchars(strip_tags($this->team));
      $this->lead = htmlspecialchars(strip_tags($this->lead));
      $this->id = htmlspecialchars(strip_tags($this->id));

      // bind data
      $stmt->bindParam(':title', $this->title);
      $stmt->bindParam(':team', $this->team);
      $stmt->bindParam(':lead', $this->lead);
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
