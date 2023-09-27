<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);

$c = new mysqli("localhost", "root", "", "hybrid_160720034");
$sql = "SELECT * FROM contents WHERE comic_id = ?";
$stmt = $c->prepare($sql);
$stmt->bind_param("i", $comic_id);
$stmt->execute();
$result = $stmt->get_result();
$ps = array();
$i = 0;

while ($obj = $result->fetch_assoc()) {
	$ps[$i]['url'] = addslashes(htmlentities($obj['url']));
    $i++;
}
echo json_encode($ps);
$c->close();
