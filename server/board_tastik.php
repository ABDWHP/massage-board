<?php
require_once('conn.php');
require_once('info.php');

$board=$_GET['board'];
$creator=$_GET['creator'];

$sql = 'SELECT * FROM b_board WHERE id="'.$board.'" and creator="'.$creator.'"';
$retval = mysqli_query( $conn, $sql );
$row = mysqli_fetch_array($retval,MYSQLI_ASSOC);
if (empty($row['name'])) {
    exit('die');
}

$sql = 'SELECT * FROM b_c WHERE board="'.$board.'" order by flag';
$retval = mysqli_query( $conn, $sql );
$myArray = array();
while($row =  $retval->fetch_array(MYSQLI_ASSOC)) {
    if (!empty($row['father'])) {
        $sql2 = 'SELECT * FROM b_c WHERE id="'.$row['father'].'"';
        $retval2 = mysqli_query( $conn, $sql2 );
        while($row2 = $retval2->fetch_array(MYSQLI_ASSOC)) {
            $row['yuan'][]=$row2;
            }
    }
	$myArray[] = $row;
	}
$res=$myArray;
echo(json_encode($res));
mysqli_close($conn);


?>