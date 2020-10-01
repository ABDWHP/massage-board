<?php
require_once('conn.php');

$sql = 'DELETE FROM b_board WHERE id="'.$_GET['id'].'" and creator="'.$_GET['user'].'"';
$retval = mysqli_query( $conn, $sql );
$sql = 'DELETE FROM b_c WHERE board="'.$_GET['id'].'"';
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    $res['msg']='无法删除: ' . mysqli_error($conn);
    $res['code']=-1;
    exit(json_encode($res));
}
$res['msg']="删除成功";
$res['code']=1;
exit(json_encode($res));
mysqli_close($conn);
?>