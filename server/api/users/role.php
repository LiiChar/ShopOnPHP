<?php
    require('db_connect.php'); 
    if (!empty($params['name']) && !empty($data['role'])) {
        $statment = $connect -> prepare('SELECT `id`, `username` FROM `users` WHERE `username` = ?');
        $statment -> bind_param('i', $params['name']);
        $statment -> execute();
        $user_id = $statment -> get_result();
        $username = $user_id -> fetch_assoc();
        if ($user_id -> num_rows >= 1) {
            $statments = $connect -> prepare('UPDATE `users` SET `role`=? WHERE `id` = ?');
            $statments -> bind_param('si', $data['role'], $username['id']);
            $statments -> execute();
            print('У ' . $username['username'] .' сменнёна роль на ' . $data['role']);
        }
    } else {
        print('имя или роль не пришли');
    }
?>