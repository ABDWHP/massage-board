<?php
$dbhost = 'localhost:3306';
$dbuser = 'appche';
$dbpass = 'abdwhp';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: '.mysqli_error($conn));
}
mysqli_query($conn,"set names utf8");
mysqli_select_db( $conn, 'appche' );
?>