<?php
require('db_connect.php');
if ($statement = $connect->prepare('SELECT * FROM `comments` JOIN `users` ON `users`.id = `comments`.`user_id` WHERE `comments`.`product_id` = ? ORDER BY `comments`.`created_at` DESC ')) {
    $prodId = $params['id'];
    $statement -> bind_param('i', $prodId);
    $statement->execute();
    $produts = $statement->get_result() ->fetch_all();
    $res = [];
    foreach ($produts as $value) {
        $res[] = ['name' => $value[1],
            'message' => $value[3],
            'username' => $value[6],
            'role' => $value[9],
            'id' => $value[0],
            'created' => $value[4]];
    }
    print(json_encode($res));
} else {
    $error = $mysqli->errno . ' ' . $mysqli->error;
    echo $error;
}