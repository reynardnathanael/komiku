<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);

$c = new mysqli("localhost", "root", "", "hybrid_160720034");
$sql = "UPDATE comics SET view = view + 1 WHERE comic_id = ?";
$stmt = $c->prepare($sql);
$stmt->bind_param("i", $comic_id);
$stmt->execute();

$c->close();
