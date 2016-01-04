<?php require_once __DIR__ . '/../../application.php'; ?>

<?php
$color = $_POST['color'];

if ($color == null) die;

if (!isset($_SESSION['color_array'])) {
    $_SESSION['color_array'] = array();
}

if ($_SESSION['color_array'][count($_SESSION['color_array']) - 1] != $color || count($_SESSION['color_array']) <= 0) {
	$_SESSION['color_array'][] = $color;
    echo 'true';
} else {
    echo 'false';
}

?>