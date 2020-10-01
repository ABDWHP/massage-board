<?php
$openid=$_GET['openid'];
$code=$_GET['name'];
if (empty($openid)||empty($name)) {
    $res['msg']='options empty';
    $res['code']=-2;
    exit(json_encode($res));
}

require_once('info.php');
require('conn.php');





?>