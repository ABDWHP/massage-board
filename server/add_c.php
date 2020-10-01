<?php
require_once('conn.php');

$text=$_GET["text"];
$user=$_GET["user"];
$board=$_GET["board"];
$father=$_GET['father'];

$sql='SELECT * FROM b_board where id="'.$board.'"';
$retval = mysqli_query( $conn, $sql );
$row = mysqli_fetch_array($retval,MYSQLI_ASSOC);
if ($_GET["user"]==$row['creator']) {
    $flag=1;
} else {
    $flag=0;
}

$sql='SELECT * FROM b_user where openid="'.$user.'"';
$retval = mysqli_query( $conn, $sql );
$row = mysqli_fetch_array($retval,MYSQLI_ASSOC);
$name=$row['name'];

$sql = "INSERT INTO b_c ".
        "(text,user,nickName,board,flag,father) ".
        "VALUES ".
        "('$text','$user','$name','$board','$flag','$father')";
        
    $retval = mysqli_query( $conn, $sql );
    if(! $retval )
    {
        $res['msg']='无法评论: ' . mysqli_error($conn);
        $res['code']=-1;
    exit(json_encode($res));
    }
    $res['msg']="评论成功";
    $res['code']=1;
    exit(json_encode($res));
?>