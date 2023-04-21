<?php
require('db_connect.php');
if (!empty($data['prod_id']) && !empty($data['user_id']) && !empty($data['comment'])) {
    $prod_id = intval($data['prod_id']);
    $user_id = intval($data['user_id']);
    if ($statments = $connect->prepare('INSERT INTO `comments`(`product_id`, `user_id`, `message`) VALUES (?,?,?);')) {
        $statments->bind_param('iis', $prod_id, $user_id, $data['comment']);
        $statments->execute();
        print_r('Коментарий успешно создан');
    } else {
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo $error;
    }
}
