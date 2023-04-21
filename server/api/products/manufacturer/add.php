<?php
require('db_connect.php');
if ($data['name']) {
    $statment = $connect->prepare('INSERT INTO `manufacturer`(`manufacturer`) VALUES (?)');
    $statment->bind_param('s', $data['name']);
    $statment->execute();
    print('производитель успешно создан');
} else {
    print('название предприятия не пришло');
}
