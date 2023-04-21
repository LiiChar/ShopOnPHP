<?php
require('db_connect.php');
if (!empty($params['id'])) {
    $id = intval($params['id']);
    $statements = $connect->prepare('DELETE FROM `comments` WHERE `id` = ?');
    $statements->bind_param('i', $id);
    $statements->execute();
    print('удаление комментария прошло успешно');
}
