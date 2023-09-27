<?php
    header("Access-Control-Allow-Origin: *");
    extract($_POST);

    $c = new mysqli("localhost", "root", "", "hybrid_160720034");
    $sql = "DELETE FROM favorites WHERE user_id=? AND comic_id=?";
    $stmt = $c->prepare($sql);
    $stmt->bind_param("si", $user_id, $comic_id);
    $stmt->execute();

    $myArr = array();
    if($stmt->affected_rows) {
        $myArr['pesan'] = "berhasil menghapus komik dari favorite!";
    } else {
        $myArr['pesan'] = "gagal menghapus komik dari favorite!";
    }
    echo json_encode($myArr);
