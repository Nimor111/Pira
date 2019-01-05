<?php
  include_once __DIR__.'/../models/CardList.php';

  class ListController {
    public function __construct(PDO $conn) {
      $this->list = new CardList($conn);
    }

    public function getCards(string $id) {
      $this->list->id = $id;

      $result = $this->list->getListCards();

      if ($result->rowCount()) {
        $cards = array();
        $cards['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          $card = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'created_at' => $row['created_at'],
            'assignee' => array(
              'username' => $row['username'],
              'email' => $row['email']
            )
          );

          array_push($cards['data'], $card);
        }

        echo json_encode($cards);
      } else {
        echo json_encode(
          array('message' => 'No cards found!')
        );
      }
    }

    public function get() {
      $result = $this->list->getLists();

      if ($result->rowCount()) {
        $lists = array();
        $lists['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          $list = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'board' => $row['board'],
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

    public function getObject(string $id) {
      // Set id to fetch
      $this->list->id = $id;

      // Get list
      if($this->list->getSingleList()) {
        $list_arr = array(
          'id' => $this->list->id,
          'name' => $this->list->name,
          'board' => $this->list->board,
          'created_at' => $this->list->created_at
        );

        echo json_encode($list_arr);
      } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found!'));
      }
    }

    public function post(object $data) {
      $this->list->name = $data->name ;
      $this->list->board = $data->board ;

      // Create list
      if ($this->list->create()) {
        http_response_code(201);
        header("Location: /routes/list/read_single.php?id=" . $this->list->id);
        echo json_encode(
          array(
            'id' => $this->list->id,
            'name' => $this->list->name,
            'board' => $this->list->board
          )
        );
      } else {
        echo json_encode(
          array('message' => 'List not created!')
        );
      }
    }

    public function update(object $data) {
      // Set ID to be updated
      $this->list->id = $data->id;

      $this->list->name = $data->name;
      $this->list->board = $data->board;

      // Update list
      if ($this->list->update()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'List updated!'
          )
        );
      } else {
        http_response_code(400);
        echo json_encode(
          array('message' => 'List not updated!')
        );
      }
    }

    public function delete(object $data) {
      // Set ID to be deleted
      $this->list->id = $data->id;

      // Delete list
      if ($this->list->delete()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'List deleted!'
          )
        );
      } else {
        http_response_code(404);
        echo json_encode(
          array('message' => 'List not found!')
        );
      }
    }
  }
?>
