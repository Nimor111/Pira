<?php
  include_once __DIR__.'/../models/Board.php';

  class BoardController {
    public function __construct(PDO $conn) {
      $this->board = new Board($conn);
    }

    public function getLists(string $id) {
      $this->board->id = $id;

      $result = $this->board->getBoardLists();

      if ($result->rowCount()) {
        $lists = array();
        $lists['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          $list = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'created_at' => $row['created_at']
          );

          array_push($lists['data'], $list);
        }

        echo json_encode($lists);
      } else {
        echo json_encode(
          array('message' => 'No lists found!')
        );
      }
    }

    public function get() {
      $result = $this->board->getBoards();

      if ($result->rowCount()) {
        $boards = array();
        $boards['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          $board = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'team' => $row['name'],
            'lead' => array(
              'email' => $row['email'],
              'username' => $row['username'],
            ),
            'created_at' => $row['created_at']
          );

          array_push($boards['data'], $board);
        }

        echo json_encode($boards);
      } else {
        echo json_encode(
          array('message' => 'No boards found!')
        );
      }
    }

    public function getObject(string $id) {
      // Set id to fetch
      $this->board->id = $id;

      // Get board
      if($this->board->getSingleBoard()) {
        $board_arr = array(
          'id' => $this->board->id,
          'title' => $this->board->title,
          'team' => $this->board->team,
          'lead' => array(
            'email' => $this->board->lead['email'],
            'username' => $this->board->lead['username'],
          ),
          'created_at' => $this->board->created_at
        );

        echo json_encode($board_arr);
      } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found!'));
      }
    }

    public function post(object $data) {
      $this->board->title = $data->title;
      $this->board->lead = $data->lead;
      $this->board->team = $data->team;

      // Create board
      if ($this->board->create()) {
        http_response_code(201);
        header("Location: /routes/board/read_single.php?id=" . $this->board->id);
        echo json_encode(
          array(
            'id' => $this->board->id,
            'title' => $this->board->title,
            'lead' => $this->board->lead ,
            'team' => $this->board->team,
          )
        );
      } else {
        http_response_code(400);
        echo json_encode(
          array('message' => 'Board not created!')
        );
      }
    }

    public function update(object $data) {
      // Set ID to be updated
      $this->board->id = $data->id;

      $this->board->title = $data->title;
      $this->board->lead = $data->lead;
      $this->board->team = $data->team;

      // Update board
      if ($this->board->update()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'Board updated!'
          )
        );
      } else {
        http_response_code(400);
        echo json_encode(
          array('message' => 'Board not updated!')
        );
      }
    }

    public function delete(object $data) {
      // Set ID to be deleted
      $this->board->id = $data->id;

      // Delete board
      if ($this->board->delete()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'Board deleted!'
          )
        );
      } else {
        http_response_code(404);
        echo json_encode(
          array('message' => 'Board not found!')
        );
      }
    }
  }
?>
