<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST, UPDATE, DELETE");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, '?') !== false) {
    $parts = parse_url($url);
    parse_str($parts['query'], $params);
    require('api' .  substr($url, 0, strpos($url, '?')) . '.php');
} else {
    require('api' .  $url . '.php');
}
