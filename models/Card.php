<?php
  include_once '../../config/Database.php';
  include_once 'Developer.php';

  class Card {
    // DB info
    private $connection;
    private $table = 'cards';

    // props
    public $id;
    public $title;
    public $description;
    public $assignee;
    public $list;
    public $created_at;

    public function __construct(PDO $db) {
      $this->connection = $db;
    }

    public function getCards(): PDOStatement {
      $query = '
      SELECT c.id,c.title,c.description,c.list,c.created_at,a.email,a.username
      FROM ' . $this->table . ' c
      INNER JOIN developers a ON c.assignee = a.id
      ORDER BY c.id ASC
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    public function getSingleCard(): bool {
      $query = '
      SELECT *
      FROM
        ' . $this->table . ' c
      INNER JOIN developers a ON c.assignee = a.id
      WHERE
        c.id = ?
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
        $this->title = $row['title'];
        $this->description = $row['description'];
        $this->list = $row['list'];
        $this->assignee = array(
          'email' => $row['email'],
          'username' => $row['username'],
        );
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
        title = :title,
        description = :description,
        list = :list,
        assignee = :assignee
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->description = htmlspecialchars(strip_tags($this->description));
      $this->list = htmlspecialchars(strip_tags($this->list));
      $this->assignee = htmlspecialchars(strip_tags($this->assignee));

      // bind data
      $stmt->bindParam(':title', $this->title);
      $stmt->bindParam(':description', $this->description);
      $stmt->bindParam(':list', $this->list);
      $stmt->bindParam(':assignee', $this->assignee);

      // Execute query
      if($stmt->execute()) {
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
        description = :description,
        list = :list,
        assignee = :assignee
      WHERE
        id = :id
      ';

      // prepare statement
      $stmt = $this->connection->prepare($query);

      // clean data
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->description = htmlspecialchars(strip_tags($this->description));
      $this->list = htmlspecialchars(strip_tags($this->list));
      $this->assignee = htmlspecialchars(strip_tags($this->assignee));
      $this->id = htmlspecialchars(strip_tags($this->id));

      // bind data
      $stmt->bindParam(':title', $this->title);
      $stmt->bindParam(':description', $this->description);
      $stmt->bindParam(':assignee', $this->assignee);
      $stmt->bindParam(':list', $this->list);
      $stmt->bindParam(':id', $this->id);

      // Execute query
      if($stmt->execute()) {
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
