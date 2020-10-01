<?php
require_once('conn.php');
require_once('info.php');
$n=$_GET['n'];
$c=$_GET['c'];
$url=$_GET['u'];
$sql = "insert into b_board values ('{}','{$n}','{$c}','{$url}')";
mysqli_select_db( $conn, 'appche' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    $res['msg']='无法添加留言区: ' . mysqli_error($conn);
    $res['code']=-1;
    exit(json_encode($res));
}
$sql='select id from b_board where name="'.$n.'" and creator="'.$c.'" order by id desc limit 1';
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    $res['msg']='无法获取留言区: ' . mysqli_error($conn);
    $res['code']=-2;
    exit(json_encode($res));
}
$res['msg']="成功添加留言区";
$res['code']=1;
$row = mysqli_fetch_array($retval,MYSQLI_ASSOC);
$res['id']= $row['id'];
mysqli_close($conn);

// $text="欢迎使用 INKAS留言板，你可以在本页面通过点击管理留言内容达到审核，回复，删除留言的目的，在首页你可以通过左滑列表来删除，浏览留言板或复制留言板地址。谢谢你的使用！本条留言可以自行删除。";
// file_get_contents('https://xxx.xxx.xxx/add_c.php?board='.$res['id'].'&user=test&father=0&text='.$text);

exit(json_encode($res));
?>