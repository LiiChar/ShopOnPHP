<?php
require('db_connect.php');
if (!empty($data['user_id']) && !empty($data['prod_id']) && !empty($data['star'])) {
    $user_id = intval($data['user_id']);
    $prod_id = intval($data['prod_id']);
    $rate = intval($data['star']);

    $statements = $connect->prepare('UPDATE `rate` SET `rate`= ? WHERE `user_id` = ? AND `product_id` = ?;');
    $statements->bind_param('iii', $rate, $user_id, $prod_id);
    $statements->execute();
    print('обновление товара прошло успешно');
} else {
    print('Индетефикатор не пришёл');
}
