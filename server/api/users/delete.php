<?php
    require('db_connect.php');
    $id = intval($params['id']);
    $statment = $connect -> prepare('SELECT `username` FROM `users` WHERE `id` = ?');
    $statment -> bind_param('i', $id);
    $statment -> execute();
    $user = $statment -> get_result();
    if ($user -> num_rows == 1) {
        $statment = $connect -> prepare('DELETE FROM `users` WHERE `id` = ?');
        $statment -> bind_param('i', $id);
        $statment -> execute();
        print('пользователь успешно удалён');
    } else {
        print('Такого плдьзователя нет');
    }
?>