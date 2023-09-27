<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);
$c = new mysqli("localhost", "root", "", "hybrid_160720034");

$sql = "SELECT * FROM categories";
$result = $c->query($sql);

$ps = array();
$i = 0;

while ($obj = $result->fetch_assoc()) {
	$ps[$i]['category_id'] = $obj['category_id'];
    $ps[$i]['category_name'] = addslashes(htmlentities($obj['category_name']));
    $i++;
}
echo json_encode($ps);
$c->close();
