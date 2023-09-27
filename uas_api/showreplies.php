<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);

$c = new mysqli("localhost", "root", "", "hybrid_160720034");
$sql = "SELECT c.id, c.isi, DATE_FORMAT(c.timestamp, '%d %b %Y') as timestamp, c.parent_id, u.user_name, u.avatar FROM comments c INNER JOIN users u ON c.user_id = u.user_id WHERE c.comic_id=? AND c.parent_id IS NOT NULL ORDER BY c.timestamp ASC";
$stmt = $c->prepare($sql);
$stmt->bind_param("i", $comic_id);
$stmt->execute();
$result = $stmt->get_result();
$ps = array();
$i = 0;

while ($obj = $result->fetch_assoc()) {
    $ps[$i]['id'] = $obj['id'];
    $ps[$i]['user_name'] = addslashes(htmlentities($obj['user_name']));
    $ps[$i]['isi'] = addslashes(htmlentities($obj['isi']));
    $ps[$i]['timestamp'] = addslashes(htmlentities($obj['timestamp']));
    $ps[$i]['parent_id'] = addslashes(htmlentities($obj['parent_id']));
    $ps[$i]['avatar'] = addslashes(htmlentities($obj['avatar']));
    $i++;
}
echo json_encode($ps);
$c->close();
