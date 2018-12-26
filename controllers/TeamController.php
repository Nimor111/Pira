<?php
  include_once __DIR__.'/../models/Team.php';

  class TeamController {
    public function __construct(PDO $conn) {
      $this->team = new Team($conn);
    }

    public function get() {
      $result = $this->team->getTeams();

      if ($result->rowCount()) {
        $teams = array();
        $teams['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          $team = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'created_at' => $row['created_at']
          );

          array_push($teams['data'], $team);
        }

        echo json_encode($teams);
      } else {
        echo json_encode(
          array('message' => 'No teams found!')
        );
      }
    }

    public function getObject(string $id) {
      // Set id to fetch
      $this->team->id = $id;

      // Get team
      if($this->team->getSingleTeam()) {
        $team_arr = array(
          'id' => $this->team->id,
          'name' => $this->team->name,
          'created_at' => $this->team->created_at
        );

        echo json_encode($team_arr);
      } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found!'));
      }
    }

    public function post(object $data) {
      $this->team->name = $data->name ;

      // Create team
      if ($this->team->create()) {
        http_response_code(201);
        header("Location: /routes/team/read_single.php?id=" . $this->team->id);
        echo json_encode(
          array(
            'id' => $this->team->id,
            'name' => $this->team->name,
          )
        );
      } else {
        echo json_encode(
          array('message' => 'Team not created!')
        );
      }
    }

    public function update(object $data) {
      // Set ID to be updated
      $this->team->id = $data->id;

      $this->team->name = $data->name;

      // Update team
      if ($this->team->update()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'Team updated!'
          )
        );
      } else {
        http_response_code(400);
        echo json_encode(
          array('message' => 'Team not updated!')
        );
      }
    }

    public function delete(object $data) {
      // Set ID to be deleted
      $this->team->id = $data->id;

      // Delete team
      if ($this->team->delete()) {
        http_response_code(200);
        echo json_encode(
          array(
            'message' => 'Team deleted!'
          )
        );
      } else {
        http_response_code(404);
        echo json_encode(
          array('message' => 'Team not found!')
        );
      }
    }
  }
?>
