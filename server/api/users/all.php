<?php
    require('db_connect.php');
    $statment = $connect -> prepare('SELECT `username` FROM `users`');
    $statment -> execute();
    $users = $statment -> get_result() -> fetch_all();
    print_r(json_encode($users));
?>