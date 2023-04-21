<?php
require('db_connect.php');
if ($statement = $connect->prepare('SELECT * FROM `users` WHERE `id` = ?')) {
    $statement->bind_param('i', $params['id']);
    $statement->execute();
    $produts = $statement->get_result()->fetch_all()[0];
    $res = [
        'id' => $produts[0],
        'username' => $produts[1],
        'ROLE' => $produts[4]
    ];
    print(json_encode($res));
} else {
    $error = $mysqli->errno . ' ' . $mysqli->error;
    echo $error;
}
