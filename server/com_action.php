<?php
require_once('conn.php');

$board=$_GET['board'];
$creator=$_GET['creator'];

$sql = 'SELECT * FROM b_board WHERE id="'.$board.'" and creator="'.$creator.'"';
$retval = mysqli_query( $conn, $sql );
$row = mysqli_fetch_array($retval,MYSQLI_ASSOC);
if (empty($row['name'])) {
    exit('die');
}


switch ($_GET['action']) {
    case 'pass':
        $sql = 'UPDATE b_c SET flag=1 WHERE id='.$_GET['id'];
 
        break;
    case 'del':
        $sql = 'DELETE FROM b_c WHERE id="'.$_GET['id'].'"';

        break;
    
    default:
        break;
}

 $retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    $res['msg']='失败 ' . mysqli_error($conn);
    $res['code']=-1;
    exit(json_encode($res));
}
$res['msg']="成功";
$res['code']=1;
exit(json_encode($res));
mysqli_close($conn);
?>