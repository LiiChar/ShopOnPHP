<?php
require('db_connect.php');
if ($data['name']) {
    $statment = $connect->prepare('INSERT INTO `categories`(`category`) VALUES (?)');
    $statment->bind_param('s', $data['name']);
    $statment->execute();
    print('категория успешно создана');
} else {
    print('название категории не пришло');
}
