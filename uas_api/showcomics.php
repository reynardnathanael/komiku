<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);
$c = new mysqli("localhost", "root", "", "hybrid_160720034");

if (isset($_POST['keyword'])) {
    $keyword = $_POST['keyword'];
    $sql = "SELECT c.comic_id, c.title, c.cover, c.view, ROUND(AVG(r.rating), 1) as average, count(distinct co.id) as count_comment FROM comics c LEFT JOIN ratings r ON c.comic_id = r.comic_id LEFT JOIN comments co ON c.comic_id = co.comic_id WHERE c.title like '%$keyword%' GROUP BY c.comic_id";
}
else if (isset($_POST['category_id'])) {
    $category_id = $_POST['category_id'];
    $sql = "SELECT c.comic_id, c.title, c.cover, c.view, ROUND(AVG(r.rating), 1) as average, count(distinct co.id) as count_comment FROM comics c LEFT JOIN ratings r ON c.comic_id = r.comic_id LEFT JOIN comments co ON c.comic_id = co.comic_id INNER JOIN comics_categories cc ON c.comic_id = cc.comic_id WHERE cc.category_id=$category_id GROUP BY c.comic_id";
}
else if(isset($_POST['order_rating'])) {
    $limit = $_POST['order_rating'];
    $sql = "SELECT c.comic_id, c.title, c.cover, c.view, ROUND(AVG(r.rating), 1) as average, count(distinct co.id) as count_comment FROM comics c LEFT JOIN ratings r ON c.comic_id = r.comic_id LEFT JOIN comments co ON c.comic_id = co.comic_id INNER JOIN comics_categories cc ON c.comic_id = cc.comic_id GROUP BY c.comic_id ORDER BY average DESC LIMIT $limit";
}
else if(isset($_POST['order_comment'])) {
    $limit = $_POST['order_comment'];
    $sql = "SELECT c.comic_id, c.title, c.cover, c.view, ROUND(AVG(r.rating), 1) as average, count(distinct co.id) as count_comment FROM comics c LEFT JOIN ratings r ON c.comic_id = r.comic_id LEFT JOIN comments co ON c.comic_id = co.comic_id INNER JOIN comics_categories cc ON c.comic_id = cc.comic_id GROUP BY c.comic_id ORDER BY count_comment DESC LIMIT $limit";
}
else if(isset($_POST['order_view'])) {
    $limit = $_POST['order_view'];
    $sql = "SELECT c.comic_id, c.title, c.cover, c.view, ROUND(AVG(r.rating), 1) as average, count(distinct co.id) as count_comment FROM comics c LEFT JOIN ratings r ON c.comic_id = r.comic_id LEFT JOIN comments co ON c.comic_id = co.comic_id INNER JOIN comics_categories cc ON c.comic_id = cc.comic_id GROUP BY c.comic_id ORDER BY c.view DESC LIMIT $limit";
}
else {
    $sql = "SELECT c.comic_id, c.title, c.cover, c.view, ROUND(AVG(r.rating), 1) as average, count(distinct co.id) as count_comment FROM comics c LEFT JOIN ratings r ON c.comic_id = r.comic_id LEFT JOIN comments co ON c.comic_id = co.comic_id GROUP BY c.comic_id";
}

$stmt = $c->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
$ps = array();
$i = 0;

while ($obj = $result->fetch_assoc()) {
	$ps[$i]['comic_id'] = $obj['comic_id'];
    $ps[$i]['title'] = addslashes(htmlentities($obj['title']));
    $ps[$i]['cover'] = addslashes(htmlentities($obj['cover']));
    $ps[$i]['view'] = addslashes(htmlentities($obj['view']));
    if ($obj['average'] == null) {
        $obj['average'] = 0;
    }
	$ps[$i]['average'] = $obj['average'];
	$ps[$i]['count_comment'] = $obj['count_comment'];
    $i++;
}
echo json_encode($ps);
$c->close();
