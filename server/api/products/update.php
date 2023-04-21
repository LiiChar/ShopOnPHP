<?php
require('db_connect.php');



if (!empty($_POST['id'])) {
    if ($statement = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `products`.`id` = ?;')) {
        $id = intval($_POST['id']);
        $sale = intval($_POST['sale']);
        $statement->bind_param('i', $id);
        $statement->execute();
        $isExist = $statement->get_result();
        $product = $isExist->fetch_assoc();

        $statmentsss = $connect->prepare('SELECT * FROM `manufacturer` WHERE `manufacturer` = ?');
        $statmentsss->bind_param('s', $_POST['company']);
        $statmentsss->execute();
        $manufacturer = $statmentsss->get_result()->fetch_assoc()['id'];
           
        $statementss = $connect->prepare('SELECT * FROM `categories` WHERE `category` = ?');
        $statementss->bind_param('s', $_POST['category']);
        $statementss->execute();
        $category = $statementss->get_result()->fetch_assoc()['id'];
        
        $description = $_POST['description'];
        
        if ($isExist->num_rows === 1) {
            if (!empty($_FILES['file'])) {
                $upload_dir = 'api/products/uploads/';
                $server_url = 'http://127.0.0.1:80';
                $count = count($_FILES['file']['name']);
                $file_name = $_FILES["file"]["name"][0];
                $file_tmp_name = $_FILES["file"]["tmp_name"][0];
                $error = $_FILES["file"]["error"][0];
                
                $random_name = rand(1000, 1000000) . "-" . $file_name;
                $upload_name = $upload_dir . strtolower($random_name);
                $upload_name = preg_replace('/\s+/', '-', $upload_name);
                
                if (move_uploaded_file($file_tmp_name, $upload_name)) {
                    $path = './' . $upload_name;
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $sale = intval($_POST['sale']);
                    $category = intval($_POST['category']);
                    $company = intval($_POST['company']);
                    $image = 'data:image/' . $type . ';base64,' . base64_encode($data);
                    $statements = $connect->prepare('UPDATE `products` SET `name`= ? ,`sale`= ? ,`manufacturer_id`= ? ,`category_id`= ? ,`image`= ?,`description`= ?  WHERE `id` = ?');
                    $statements->bind_param('siiissi', $_POST['name'], $sale, $manufacturer, $category, $image, $description, $id);
                    $statements->execute();
                    print('обновление товара прошло успешно');
                }
            } else {
                $image = $product['image'];
                $statements = $connect->prepare('UPDATE `products` SET `name`= ? ,`sale`= ? ,`manufacturer_id`= ? ,`category_id`= ? ,`image`= ?,`description`= ?  WHERE `id` = ?');
                $statements->bind_param('siiissi', $_POST['name'], $sale, $manufacturer, $category, $image, $description, $id);
                $statements->execute();
                print('обновление товара прошло успешно');
            }
        } else {
            print('такого товара не существует');
        }
    } else {
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo $error;
    }
} else {
    print('Индетефикатор не пришёл');
}



// <?php
// require('db_connect.php');



// if (!empty($_POST['id'])) {
//     if ($statement = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `products`.`id` = ?;')) {
//         $id = intval($_POST['id']);
//         $statement->bind_param('i', $id);
//         $statement->execute();
//         $isExist = $statement->get_result();
//         $product = $isExist->fetch_assoc();

//         $name = null;
//         if (!empty($_POST['name'])) {
//             $name = $_POST['name'];
//         } else {
//             $name = $product['name'];
//         }

//         $sale = null;
//         if (!empty($_POST['sale'])) {
//             $sale = $_POST['sale'];
//         } else {
//             $sale = $product['sale'];
//         }

//         $manufacturer = null;
//         if (!empty($_POST['company'])) {
//             if ($statmentsss = $connect->prepare('SELECT * FROM `manufacturer` WHERE `manufacturer` = ?')) {
//                 $statmentsss->bind_param('s', $_POST['company']);
//                 $statmentsss->execute();
//                 $manufacturer = $statmentsss->get_result()->fetch_assoc()['id'];
//             }
//         } else {
//             $manufacturer = $product['manufacturer_id'];
//         }

//         $category = null;
//         if (!empty($_POST['category'])) {
//             if ($statementss = $connect->prepare('SELECT * FROM `categories` WHERE `category` = ?')) {
//                 $statementss->bind_param('s', $_POST['category']);
//                 $statementss->execute();
//                 $category = $statementss->get_result()->fetch_assoc()['id'];
//                 var_dump($category);
//             }
//         } else {
//             $category = $product['category_id'];
//         }

//         $image = null;
//         if (!empty($_FILES['file'])) {
//             $upload_dir = 'api/products/uploads/';
//             $server_url = 'http://127.0.0.1:80';
//             $count = count($_FILES['file']['name']);
//             $file_name = $_FILES["file"]["name"][0];
//             $file_tmp_name = $_FILES["file"]["tmp_name"][0];
//             $error = $_FILES["file"]["error"][0];

//             $random_name = rand(1000, 1000000) . "-" . $file_name;
//             $upload_name = $upload_dir . strtolower($random_name);
//             $upload_name = preg_replace('/\s+/', '-', $upload_name);

//             if (move_uploaded_file($file_tmp_name, $upload_name)) {
//                 $path = './' . $upload_name;
//                 $type = pathinfo($path, PATHINFO_EXTENSION);
//                 $data = file_get_contents($path);
//                 $sale = intval($_POST['sale']);
//                 $category = intval($_POST['category']);
//                 $company = intval($_POST['company']);
//                 $image = 'data:image/' . $type . ';base64,' . base64_encode($data);
//             }
//         } else {
//             $image = $product['image'];
//         }
//         $description = null;
//         if ($_POST['description']) {
//             $description = $_POST['description'];
//         } else {
//             $description = $product['description'];
//         }
//         if ($isExist->num_rows === 1) {
//             $statements = $connect->prepare('UPDATE `products` SET `name`= ? ,`sale`= ? ,`manufacturer_id`= ? ,`category_id`= ? ,`image`= ?,`description`= ?  WHERE `id` = ?');
//             $statements->bind_param('siiissi', $name, $sale, $manufacturer, $category, $image, $description, $id);
//             $statements->execute();
//             print('обновление товара прошло успешно');
//         } else {
//             print('такого товара не существует');
//         }
//     } else {
//         $error = $mysqli->errno . ' ' . $mysqli->error;
//         echo $error;
//     }
// } else {
//     print('Индетефикатор не пришёл');
// }
