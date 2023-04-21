<?php
    require('db_connect.php');
    $statment = $connect -> prepare('SELECT `manufacturer` FROM `manufacturer`');
    $statment -> execute();
    print_r(json_encode($statment -> get_result() -> fetch_all()));
?>