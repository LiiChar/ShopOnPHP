<?php
require('db_connect.php');
if (!empty($data['username']) && !empty($data['password'])) {
    if ($statement = $connect->prepare('SELECT id, password FROM users WHERE username = ?;')) {
        $statement->bind_param('s', $data['username']);
        $statement->execute();
        $isExist = $statement->get_result();
        if ($isExist->num_rows === 1) {
            $user = $isExist -> fetch_assoc();
            $id = $user['id'];
            $password = $user['password'];
            if (password_verify($data['password'], $password)) {
                print_r(json_encode(['user_id' => $id,'username' => $data['username']]));
            } else {
                print('неверный пароль');
            }
        } else {
            print('такого пользователя не существует');
        }
    } else {
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo $error;
    }
}
