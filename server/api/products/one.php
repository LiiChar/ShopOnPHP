<?php
require('db_connect.php');
if ($statement = $connect->prepare('SELECT *, AVG(`rate`.`rate`) as `r` FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` LEFT JOIN `rate` ON `rate`.`product_id` = `products`.`id` WHERE `products`.`id` = ?')) {
    $id = intval($params['id']);
    $statement->bind_param('i', $id);
    $statement->execute();
    $produts = $statement->get_result()->fetch_assoc();
    $res = [
        'name' => $produts['name'],
        'id' => $id,
        'sale' => $produts['sale'],
        'manufacturer' => $produts['manufacturer'],
        'categories' => $produts['category'],
        'image' => $produts['image'],
        'created' => $produts['created_at'],
        'updated' => $produts['updated_at'],
        'description' => $produts['description'],
        'rate' => $produts['r']
    ];
    print(json_encode($res));
} else {
    $error = $mysqli->errno . ' ' . $mysqli->error;
    echo $error;
}