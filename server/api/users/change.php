<?php
    require('db_connect.php');
    if (!empty($data['id'])) {
        $id = intval($data['id']);
        if ($statement = $connect->prepare('SELECT * FROM `users` WHERE `id` = ?')) {
            $statement->bind_param('i', $id);
            $statement->execute();
            $num = $statement -> get_result();
            if ($num -> num_rows === 1) {
                $users = $num->fetch_all()[0];
                $user = [
                    'id' => $users[0],
                    'username' => $users[1],
                    'password' => $users[2],
                    'ROLE' => $users[4]
                ];
                if (password_verify($data['passwordOld'], $user['password'])) {
                    $username = null;
                    if (!empty($data['username'])) {
                        $username = $data['username'];
                    } else {
                        $username = $user['username'];
                    }
    
                    $password = null;
                    if (!empty($data['passwordNew'])) {
                        $password = $data['passwordNew'];
                    } else {
                        $password = $user['password'];
                    }
    
                    $ROLE = null;
                    if (!empty($data['role'])) {
                        $ROLE = $data['role'];
                    } else {
                        $ROLE = $data['ROLE'];
                    }
                    $stats = $connect -> prepare('UPDATE `users` SET `username`= ? ,`password`= ?, `role`= ?  WHERE id = ?');
                    $stats -> bind_param('sssi', $username, $password, $ROLE, $id);
                    $stats -> execute();
                    print_r($username);
                }
            }
        }
    }
?>