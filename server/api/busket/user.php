<?php
    require('db_connect.php');
    $statment = $connect -> prepare('SELECT * FROM `basket` JOIN `products` ON `products`.`id` = `basket`.`product_id` WHERE `basket`.`user_id` = ?' );
    $statment -> bind_param('i', $params['id']);
    $statment -> execute();
    $res = [];
    foreach ($statment -> get_result() -> fetch_all() as $value) {
        $res[] = [
            'id' => $value[0],
            'product_id' => $value[3],
            'name' => $value[4],
            'sale' => $value[5],
            'image' => $value[8],
            'description' => $value[11],
        ];
    }
    print_r(json_encode($res));
?>