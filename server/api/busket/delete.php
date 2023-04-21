<?php
require('db_connect.php');
if (!empty($params['id'])) {
    $id = $params['id'];
    if ($statement = $connect->prepare('SELECT `id` FROM `basket` WHERE `id` = ?;')) {
        $statement->bind_param('i', $id);
        $statement->execute();
        $isExist = $statement->get_result();
            $statements = $connect -> prepare('DELETE FROM `basket` WHERE `id` = ?');
            $statements -> bind_param('i', $id);
            $statements -> execute();
            print('удаление товара из корзины прошло успешно');
        
    } else {
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo $error;
    }
}
