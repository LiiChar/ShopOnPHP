<?php
require('db_connect.php');
$page = intval($params['page']);
$pages = 3;
$offset = ($page - 1) * $pages;
$res = null;
if ($page === 0) {
    $page = 100000;
    $offset = 0;
}
if (!empty($params['cat']) && !empty($params['man']) && $statement = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `manufacturer`.manufacturer = ? && `categories`.category = ?  LIMIT ?, ?')) {
    $statement->bind_param('ssii', $params['man'], $params['cat'], $offset, $pages);
    $statement->execute();
    $produts = $statement->get_result()->fetch_all();
    $res = [];
    foreach ($produts as $value) {
        $res['products'][] = [
            'name' => $value[1],
            'id' => $value[0],
            'sale' => $value[2],
            'manufacturer' => $value[10],
            'categories' => $value[12],
            'image' => $value[5],
            'created' => $value[6],
            'updated' => $value[7],
            'description' => $value[8]
        ];
    }
    if (!empty($produts)) {
        $man_id = $produts[0][9];
        $cat_id = $produts[0][11];
        $statement1 = $connect->prepare('SELECT * FROM `products` WHERE `manufacturer_id` = ? & `category_id` = ?');
        $statement1->bind_param('ii', $man_id,  $$cat_id);
        $statement1->execute();
        $num = $statement1->get_result()->fetch_assoc()['count'];
        $res['num'] = ceil($num / $pages);
        print(json_encode($res));
    } else {
        $num = 0;
        $res['num'] = ceil($num / $pages);
        print(json_encode($res));
    }

} else {
    if ($params['cat'] && $statements = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `categories`.category = ?  LIMIT ?, ?')) {
        $statements->bind_param('sii', $params['cat'], $offset, $pages);
        $statements->execute();
        $produts = $statements->get_result()->fetch_all();
        $res = [];
        foreach ($produts as $value) {
            $res['products'][] = [
                'name' => $value[1],
                'id' => $value[0],
                'sale' => $value[2],
                'manufacturer' => $value[10],
                'categories' => $value[12],
                'image' => $value[5],
                'created' => $value[6],
                'updated' => $value[7],
                'description' => $value[8]
            ];
        }
        $num = 0;
        if (!empty($produts)) {            
            $cat_id = $produts[0][11];
            $statements1 = $connect->prepare('SELECT COUNT(*) as count FROM `products` WHERE `category_id` = ?');
            $statements1->bind_param('i', $cat_id);
            $statements1->execute();
            $num = $statements1->get_result()->fetch_assoc()['count'];
        }
        $res['num'] = ceil($num / $pages);
        print(json_encode($res));
    } else {
        if (!empty($params['man']) && $statementss = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `manufacturer`.manufacturer = ? LIMIT ?, ?')) {
            $statementss->bind_param('sii', $params['man'], $offset, $pages);
            $statementss->execute();
            $produts = $statementss->get_result()->fetch_all();
            $res = [];
            foreach ($produts as $value) {
                $res['products'][] = [
                    'name' => $value[1],
                    'id' => $value[0],
                    'sale' => $value[2],
                    'manufacturer' => $value[10],
                    'categories' => $value[12],
                    'image' => $value[5],
                    'created' => $value[6],
                    'updated' => $value[7],
                    'description' => $value[8]
                ];
            }
            $num = 0;
            if (!empty($produts)) {
                $man_id = $produts[0][9];
                $statementss1 = $connect->prepare('SELECT COUNT(*) as count FROM `products` WHERE `manufacturer_id` = ?');
                $statementss1->bind_param('i', $man_id);
                $statementss1->execute();
                $num = $statementss1->get_result()->fetch_assoc()['count'];
            }
            $res['num'] = ceil($num / $pages);
            print(json_encode($res));
        } else {
            $statementsss = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` LIMIT ?, ?');
            $statementsss->bind_param('ii', $offset, $pages);
            $statementsss->execute();
            $produts = $statementsss->get_result()->fetch_all();
            $res = [];
            foreach ($produts as $value) {
                $res['products'][] = [
                    'name' => $value[1],
                    'id' => $value[0],
                    'sale' => $value[2],
                    'manufacturer' => $value[10],
                    'categories' => $value[12],
                    'image' => $value[5],
                    'created' => $value[6],
                    'updated' => $value[7],
                    'description' => $value[8]
                ];
            }
            $statementsss1 = $connect->prepare('SELECT COUNT(*) as count FROM `products`');
            $statementsss1->execute();
            $num = $statementsss1->get_result()->fetch_assoc()['count'];
            $res['num'] = ceil($num / $pages);
            print(json_encode($res));
        }
    }
}












// <?php
// require('db_connect.php');
// $page = intval($params['page']);
// if ($page === 0) {
//     $page = 100000;
// } 
// $pages = 2;
// $offset =( $page - 1) * $pages;
// if (!empty($params['cat']) && !empty($params['man'])) {
//     if ($statement = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `manufacturer`.manufacturer = ? & `categories`.category = ?  LIMIT ?, ?')) {
//         $statement -> bind_param('ssii',$params['man'], $params['cat'], $offset, $pages);
//         $statement->execute();
//         $produts = $statement->get_result() ->fetch_all();
//         $res = [];
//         foreach ($produts as $value) {
//             $res['products'][] = ['name' => $value[1],
//                 'id' => $value[0],
//                 'sale' => $value[2],
//                 'manufacturer' => $value[10],
//                 'categories' => $value[12],
//                 'image' => $value[5],
//                 'created' => $value[6],
//                 'updated' => $value[7],
//                 'description' => $value[8]];
//         }

//         $man_id = $produts[0][9];
//         $cat_id = $produts[0][11];
//         $statements = $connect -> prepare('SELECT COUNT(*) as count FROM `products` WHERE `manufacturer_id` = ? & `category_id` = ?`');
//         $statements -> bind_param('ii', $man_id,  $$cat_id);
//         $statements -> execute();
//         $num = $statements -> get_result() -> fetch_assoc()['count'];
//         $res['num'] = ceil($num / $pages);
        
//         print(json_encode($res));
//     } else {
//         $error = $mysqli->errno . ' ' . $mysqli->error;
//         echo $error;
//     }
// } else if (!empty($params['cat'])) {
//     if ($statement = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `categories`.category = ?  LIMIT ?, ?')) {
//         $statement -> bind_param('sii', $params['cat'], $offset, $pages);
//         $statement->execute();
//         $produts = $statement->get_result() ->fetch_all();
//         $res = [];
//         foreach ($produts as $value) {
//             $res['products'][] = ['name' => $value[1],
//                 'id' => $value[0],
//                 'sale' => $value[2],
//                 'manufacturer' => $value[10],
//                 'categories' => $value[12],
//                 'image' => $value[5],
//                 'created' => $value[6],
//                 'updated' => $value[7],
//                 'description' => $value[8]];
//         }
//         $cat_id = $produts[0][11];
//         $statements = $connect -> prepare('SELECT COUNT(*) as count FROM `products` WHERE  && `category_id` = ?');
//         $statements -> bind_param('i', $cat_id);
//         $statements -> execute();
//         $num = $statements -> get_result() -> fetch_assoc()['count'];
//         $res['num'] = ceil($num / $pages);
//         print(json_encode($res));
//     } else {
//         $error = $mysqli->errno . ' ' . $mysqli->error;
//         echo $error;
//     }
// } else if (!empty($params['man'])) {
//     if ($statement = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` WHERE `manufacturer`.manufacturer = ? LIMIT ?, ?')) {
//         $statement -> bind_param('sii', $params['man'], $offset, $pages);
//         $statement->execute();
//         $produts = $statement->get_result() ->fetch_all();
//         $res = [];
//         foreach ($produts as $value) {
//             $res['products'][] = ['name' => $value[1],
//                 'id' => $value[0],
//                 'sale' => $value[2],
//                 'manufacturer' => $value[10],
//                 'categories' => $value[12],
//                 'image' => $value[5],
//                 'created' => $value[6],
//                 'updated' => $value[7],
//                 'description' => $value[8]];
//         }
//         $man_id = $produts[0][9];
//         $statements = $connect -> prepare('SELECT COUNT(*) as count FROM `products` WHERE `manufacturer_id` = ?');
//         $statements -> bind_param('i', $man_id);
//         $statements -> execute();
//         $num = $statements -> get_result() -> fetch_assoc()['count'];
//         $res['num'] = ceil($num / $pages);
//         print(json_encode($res));
//     } else {
//         $error = $mysqli->errno . ' ' . $mysqli->error;
//         echo $error;
//     }
// } else if ($statement = $connect->prepare('SELECT * FROM `products` JOIN `manufacturer` ON `manufacturer`.id = `products`.`manufacturer_id` JOIN `categories` ON `categories`.id = `products`.`category_id` LIMIT ?, ?')) {
//     $statement -> bind_param('ii', $offset, $pages);
//     $statement->execute();
//     $produts = $statement->get_result() ->fetch_all();
//     $res = [];
//     foreach ($produts as $value) {
//         $res['products'][] = ['name' => $value[1],
//             'id' => $value[0],
//             'sale' => $value[2],
//             'manufacturer' => $value[10],
//             'categories' => $value[12],
//             'image' => $value[5],
//             'created' => $value[6],
//             'updated' => $value[7],
//             'description' => $value[8]];
//     }
//     $statements = $connect -> prepare('SELECT COUNT(*) as count FROM `products`');
//     $statements -> execute();
//     $num = $statements -> get_result() -> fetch_assoc()['count'];
//     $res['num'] = ceil($num / $pages);
//     print(json_encode($res));
// } else {
//     $error = $mysqli->errno . ' ' . $mysqli->error;
//     echo $error;
// }