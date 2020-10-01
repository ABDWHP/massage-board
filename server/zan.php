<?php
require_once('conn.php');

$user=$_GET["user"];
$board=$_GET["board"];
$c=$_GET["c"];
$action=$_GET['action'];
switch ($action) {
    case 'like':
        $sql = "INSERT INTO b_like (user,board,comment) VALUES ('$user','$board','$c')";
        break;
    case 'dislike':
        $sql = 'DELETE FROM b_like WHERE user="'.$user.'" and board="'.$board.'" and comment="'.$c.'"';
        break;
    
    default:
        // code...
        break;
}

$retval = mysqli_query($conn, $sql);
if(! $retval )
    {
        $res['msg']='失败: ' . mysqli_error($conn);
        $res['code']=-1;
    exit(json_encode($res));
    }
    $res['msg']="成功";
    $res['code']=1;
    exit(json_encode($res));
?>