<?php
  include_once '../../config/Database.php';

  class CardList {
    // DB info
    private $connection;
    private $table = 'lists';

    // props
    public $id;
    public $name;
    public $board;
    public $created_at;

    public function __construct(PDO $db) {
      $this->connection = $db;
    }

    public function getLists(): PDOStatement {
      $query = '
      SELECT *
      FROM ' . $this->table;

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    public function getListCards(): PDOStatement {
      $query = '
      SELECT c.id, c.title, c.description, c.created_at, a.email,a.username
      FROM ' . $this->table . ' l
      INNER JOIN cards c
      ON l.id = c.list
      INNER JOIN developers d
      ON d.id = c.assignee
      WHERE l.id = :id
      ORDER BY c.id ASC
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // bind id
      $stmt->bindParam(':id', $this->id);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    public function getSingleList(): bool {
      $query = '
      SELECT *
      FROM ' . $this->table . ' l
      WHERE
        l.id = ?
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
        $this->board = $row['board'];
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
        name = :name,
        board = :board
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->name = htmlspecialchars(strip_tags($this->name));
      $this->board = htmlspecialchars(strip_tags($this->board));

      // bind data
      $stmt->bindParam(':name', $this->name);
      $stmt->bindParam(':board', $this->board);

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
        board = :board,
      WHERE
        id = :id
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->name = htmlspecialchars(strip_tags($this->name));
      $this->board = htmlspecialchars(strip_tags($this->board));
      $this->id = htmlspecialchars(strip_tags($this->id));

      // bind data
      $stmt->bindParam(':name', $this->name);
      $stmt->bindParam(':board', $this->board);
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
