<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);

$c = new mysqli("localhost", "root", "", "hybrid_160720034");
$sql = "SELECT * FROM users WHERE user_id=? AND user_password=?";
$ps = array();
$stmt = $c->prepare($sql);
$stmt->bind_param("ss", $user_id, $user_password);
$stmt->execute();
$result = $stmt->get_result();

if ($obj = $result->fetch_assoc()) {
    $ps['user_id'] = addslashes(htmlentities($obj['user_id']));
	$ps['user_name'] = addslashes(htmlentities($obj['user_name']));
	$ps['user_password'] = addslashes(htmlentities($obj['user_password']));
	$ps['avatar'] = addslashes(htmlentities($obj['avatar']));
	$ps['result'] = "success";
}
else {
    $ps['result'] = "failed";
}
echo json_encode($ps);
$c->close();