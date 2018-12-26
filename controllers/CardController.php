<?php
  include_once __DIR__.'/../models/Card.php';

  class CardController {
    public function __construct(PDO $conn) {
      $this->card = new Card($conn);
    }

    public function get() {
      $result = $this->card->getCards();

      if ($result->rowCount()) {
        $cards = array();
        $cards['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          $card = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'list' => $row['list'],
            'assignee' => array(
              'email' => $row['email'],
              'username' => $row['username'],
            ),
            'created_at' => $row['created_at']
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

    public function getObject(string $id) {
      // Set id to fetch
      $this->card->id = $id;

      // Get card
      if($this->card->getSingleCard()) {
        $card_arr = array(
          'id' => $this->card->id,
          'title' => $this->card->title,
          'description' => $this->card->description,
          'list' => $this->card->list,
          'assignee' => array(
            'email' => $this->card->assignee['email'],
            'username' => $this->card->assignee['username'],
          ),
          'created_at' => $this->card->created_at
        );

        echo json_encode($card_arr);
      } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found!'));
      }
    }

    public function post(object $data) {
      $this->card->title = $data->title ;
      $this->card->description = $data->description ;
      $this->card->assignee = $data->assignee;
      $this->card->list = $data->list;

      // Create card
      if ($this->card->create()) {
        http_response_code(201);
        header("Location: /routes/card/read_single.php?id=" . $this->card->id);
        echo json_encode(
          array(
            'id' => $this->card->id,
            'title' => $this->card->title,
            'description' => $this->card->description,
            'assignee' => $this->card->assignee,
            'list' => $this->card->list,
          )
        );
      } else {
        echo json_encode(
          array('message' => 'Card not created!')
        );
      }
    }

    public function update(object $data) {
      // Set ID to be updated
      $this->card->id = $data->id;

      $this->card->title = $data->title;
      $this->card->description = $data->description;
      $this->card->assignee = $data->assignee;
      $this->card->list = $data->list;

      // Update card
      if ($this->card->update()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'Card updated!'
          )
        );
      } else {
        http_response_code(400);
        echo json_encode(
          array('message' => 'Card not updated!')
        );
      }
    }

    public function delete(object $data) {
      // Set ID to be deleted
      $this->card->id = $data->id;

      // Delete card
      if ($this->card->delete()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'Card deleted!'
          )
        );
      } else {
        http_response_code(404);
        echo json_encode(
          array('message' => 'Card not found!')
        );
      }
    }
  }
?>
