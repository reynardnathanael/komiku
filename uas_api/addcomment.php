<?php
    date_default_timezone_set("Asia/Jakarta");
    header("Access-Control-Allow-Origin: *");
    extract($_POST);

    $c = new mysqli("localhost", "root", "", "hybrid_160720034");
    $date = date('Y-m-d H:i:s');
    if ($_POST['parent_id'] == 0) {
        $sql = "INSERT INTO comments(user_id, comic_id, isi, timestamp) VALUES(?,?,?,?)";
        $stmt = $c->prepare($sql);
        $stmt->bind_param("siss", $user_id, $comic_id, $isi, $date);
    }
    else {
        $sql = "INSERT INTO comments(user_id, comic_id, isi, timestamp, parent_id) VALUES(?,?,?,?,?)";
        $stmt = $c->prepare($sql);
        $stmt->bind_param("sissi", $user_id, $comic_id, $isi, $date, $parent_id);
    }
    $stmt->execute();

    $myArr = array();
    if($stmt->affected_rows) {
        $myArr['pesan'] = "berhasil menambahkan komentar!";
    } else {
        $myArr['pesan'] = "gagal menambahkan komentar!";
    }
    echo json_encode($myArr);
