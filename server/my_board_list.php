<?php
require_once('conn.php');
require_once('info.php');

$sql = 'SELECT * FROM b_board WHERE creator="'.$_GET['me'].'"';
$retval = mysqli_query( $conn, $sql );
$myArray = array();
while($row = $retval->fetch_array(MYSQLI_ASSOC)) {
	$myArray[] = $row;
	}
echo(json_encode($myArray));
mysqli_close($conn);
?>