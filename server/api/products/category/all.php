<?php
    require('db_connect.php');
    $statment = $connect -> prepare('SELECT `category` FROM `categories`');
    $statment -> execute();
    print_r(json_encode($statment -> get_result() -> fetch_all()));
?>