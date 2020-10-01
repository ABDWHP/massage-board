<?php
require_once('conn.php');

$board=$_GET['board'];
$user=$_GET['user'];

$sql = 'SELECT * FROM b_board WHERE id="'.$board.'"';
$retval = mysqli_query( $conn, $sql );
$row = $retval->fetch_array(MYSQLI_ASSOC);
$res['name']=$row['name'];
$res['url']=$row['url'];
$res['creator']=$row['creator'];

$islike= array();
$likeres=mysqli_query( $conn, 'SELECT * FROM b_like WHERE board="'.$board.'" and user="'.$user.'"' );
   while($like = $likeres->fetch_array(MYSQLI_ASSOC)) {
        $islike[]=$like['comment'];
    }
$res['likelist']=$islike;


$retval = mysqli_query( $conn,'SELECT * FROM b_c WHERE board="'.$board.'" and father="0" and flag=1');
$myArray = array();
while($row = $retval->fetch_array(MYSQLI_ASSOC)){
    
    //
$row['like']['count']=mysqli_num_rows(mysqli_query( $conn, 'SELECT * FROM b_like WHERE comment="'.$row['id'].'"' ));
    //
    if (in_array($row['id'],$islike)) {
        $row['like']['flag']=1;
    } else {
        $row['like']['flag']=0;
        
    }
    
    
    $sql2 = 'SELECT * FROM b_c WHERE board="'.$board.'" and father="'.$row['id'].'" and flag=1';
    $retval2 = mysqli_query( $conn, $sql2 );
    while($row2 = $retval2->fetch_array(MYSQLI_ASSOC)) {
        $row2['like']['count']=mysqli_num_rows(mysqli_query( $conn, 'SELECT * FROM b_like WHERE comment="'.$row2['id'].'"' ));
            if (in_array($row2['id'],$islike)) {
        $row2['like']['flag']=1;
    } else {
        $row2['like']['flag']=0;
        
    }

        $row['feedback'][]=$row2;
    }
	$myArray[] = $row;
	}
$res['list']=$myArray;
echo(json_encode($res));
mysqli_close($conn);


?>