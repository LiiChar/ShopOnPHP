<?php
require('db_connect.php');
if (!empty($params['name'])) {
    $name = $params['name'];
    if ($statement = $connect->prepare('SELECT `id` FROM `products` WHERE `name` = ?;')) {
        $statement->bind_param('s', $name);
        $statement->execute();
        $isExist = $statement->get_result();
            $statements = $connect -> prepare('DELETE FROM `products` WHERE `name` = ?');
            $statements -> bind_param('s', $name);
            $statements -> execute();
            print('удаление товара прошло успешно');
        
    } else {
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo $error;
    }
}
