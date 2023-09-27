<?php
    header("Access-Control-Allow-Origin: *");
    extract($_POST);

    $c = new mysqli("localhost", "root", "", "hybrid_160720034");
    $sql = "SELECT * FROM ratings WHERE user_id=? AND comic_id=?";
    $stmt = $c->prepare($sql);
    $stmt->bind_param("si", $user_id, $comic_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $myArr = array();
    if ($obj = $result->fetch_assoc()) {
        $myArr['pesan'] = "sudah";
    }
    else {
        $myArr['pesan'] = "belum";
    }
    echo json_encode($myArr);
