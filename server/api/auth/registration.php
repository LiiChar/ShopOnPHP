<?php
require('db_connect.php');
if (!empty($data['username']) && !empty($data['password'])) {
    $email = null;
    if (!empty($data['email'])) {
        $email = $data['email'];
    }
    if ($statement = $connect->prepare('SELECT id FROM users WHERE username = ?;')) {
        $statement->bind_param('s', $data['username']);
        $statement->execute();
        $isntExist = $statement->get_result()->num_rows === 0;
        if ($isntExist) {
            if ($statments = $connect->prepare('INSERT INTO `users` (`username`, `password`, `email`) VALUES (?, ?, ?);')) {
                $hashPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                $statments->bind_param('sss', $data['username'], $hashPassword, $email);
                $statments->execute();
                $user_id = $statments->insert_id;
                print_r(json_encode(['user_id' => $user_id,'username' => $data['username']]));
            } else {
                $error = $mysqli->errno . ' ' . $mysqli->error;
                echo $error;
            }
        } else {
            print('такой пользователь существует');
        }
    } else {
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo $error;
    }
}
