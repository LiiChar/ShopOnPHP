<?php
    require('db_connect.php');
    if (!empty($params['user_id']) && !empty($params['prod_i'])) {
        $user_id = intval($params['user_id']);
        $prod_id = intval($params['prod_i']);
        $statment = $connect -> prepare('SELECT AVG(`rate`) as `rate` FROM `rate` WHERE `user_id` = ? AND `product_id` = ?');
        $statment -> bind_param('ii', $user_id, $prod_id);
        $statment -> execute();
        $rate = $statment -> get_result() -> fetch_assoc();
        print_r(json_encode($rate));
    }
?>