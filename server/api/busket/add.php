<?php
require('db_connect.php');
if (!empty($data['user_id']) && !empty($data['product_id'])) {
    if ($statement = $connect -> prepare('INSERT INTO `basket` (`user_id`, `product_id`) VALUES (?, ?)')) {
        $statement -> bind_param('ii', $data['user_id'], $data['product_id']);
        $statement -> execute();
        print('товар успешно добавлен');
    } else {
        print('товар не добавлен');
    } 
} else {
    print('ошибка в добавлении');
}
?>