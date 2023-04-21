<?php
require('db_connect.php');
if (!empty($data['prod_id']) && !empty($data['user_id']) && !empty($data['star'])) {
    $prod_id = intval($data['prod_id']);
    $user_id = intval($data['user_id']);
    $rate = intval($data['star']);
    $statment = $connect -> prepare('SELECT * FROM `rate` WHERE `user_id` = ? AND `product_id` = ?');
    $statment -> bind_param('ii', $user_id, $prod_id);
    $statment -> execute();
    if ($statment -> get_result() -> num_rows === 0) {
        if ($statments = $connect->prepare('INSERT INTO `rate`(`user_id`, `product_id`, `rate`) VALUES (?,?,?);')) {
            $statments->bind_param('iii', $user_id, $prod_id, $rate);
            $statments->execute();
            print_r('Рейтинг успешно создан');
        } else {
            $error = $mysqli->errno . ' ' . $mysqli->error;
            echo $error;
        }
    } else {
        print('Реитинг от  пользователя уже существует');
    }
}