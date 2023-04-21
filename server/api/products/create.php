<?php
require('db_connect.php');

$upload_dir = 'api/products/uploads/';
$server_url = 'http://127.0.0.1:80';

if ($_FILES['file'] && $_POST['name']) {
    $count = count($_FILES['file']['name']);
    $file_name = $_FILES["file"]["name"][0];
    $file_tmp_name = $_FILES["file"]["tmp_name"][0];
    $error = $_FILES["file"]["error"][0];

    $random_name = rand(1000, 1000000) . "-" . $file_name;
    $upload_name = $upload_dir . strtolower($random_name);
    $upload_name = preg_replace('/\s+/', '-', $upload_name);

    $category = strval($_POST['category']);
    $company = strval($_POST['company']);

    $category_id = null;
    if ($statementss = $connect->prepare('SELECT * FROM `categories` WHERE `category` = ?')) {
        $statementss->bind_param('s', $category);
        $statementss->execute();
        // $statementss->bind_result($category);
        $category_id = $statementss->get_result()->fetch_assoc()['id'];
    }
    $company_id = null;
    if ($statmentsss = $connect->prepare('SELECT * FROM `manufacturer` WHERE `manufacturer` = ?')) {
        var_dump($company);
        $statmentsss->bind_param('s', $company);
        $statmentsss->execute();
        // $statementss->bind_result($company);
        $company_id = $statmentsss->get_result()->fetch_assoc()['id'];
    }




    if (move_uploaded_file($file_tmp_name, $upload_name)) {
        $path = './' . $upload_name;
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $sale = intval($_POST['sale']);
        $base64URL = 'data:image/' . $type . ';base64,' . base64_encode($data);
        $statment = $connect->prepare('INSERT INTO `products` (`name`, `sale`, `manufacturer_id`, `category_id`, `image`, `description`) VALUES (?, ?, ?, ?, ?, ?)');
        $statment->bind_param('siiiss', $_POST['name'], $sale, $company_id, $category_id, $base64URL, $_POST['description']);
        $statment->execute();
        print('продукт успешно создан');
    }
} else {
    print('произошла ошибка');
}
