<?php
    header("Access-Control-Allow-Origin: *");
    extract($_POST);

    $c = new mysqli("localhost", "root", "", "hybrid_160720034");
    $sql = "INSERT INTO ratings(user_id, comic_id, rating) VALUES(?,?,?)";
    $stmt = $c->prepare($sql);
    $stmt->bind_param("sii", $user_id, $comic_id, $rating);
    $stmt->execute();

    $myArr = array();
    if($stmt->affected_rows) {
        $myArr['pesan'] = "berhasil memberi rating!";
    } else {
        $myArr['pesan'] = "gagal memberi rating!";
    }
    echo json_encode($myArr);
