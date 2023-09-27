<?php
    header("Access-Control-Allow-Origin: *");
    extract($_POST);

    $c = new mysqli("localhost", "root", "", "hybrid_160720034");
    $sql = "INSERT INTO favorites(user_id, comic_id) VALUES(?,?)";
    $stmt = $c->prepare($sql);
    $stmt->bind_param("si", $user_id, $comic_id);
    $stmt->execute();

    $myArr = array();
    if($stmt->affected_rows) {
        $myArr['pesan'] = "berhasil menambahkan ke favorite!";
    } else {
        $myArr['pesan'] = "gagal menambahkan ke favorite!";
    }
    echo json_encode($myArr);
