<?php
require_once('info.php');
$name=$_GET['name'];
$head=$_GET['head'];
$code=$_GET['code'];
//exit();
$url="https://api.weixin.qq.com/sns/jscode2session?appid=".APPID."&secret=".SECRET."&js_code=".$code."&grant_type=authorization_code";

    $arr=json_decode(file_get_contents($url),true);
$openid=$arr['openid'];
$res['id']=$openid;
if (empty($name)||empty($head)||empty($code)) {
    $res['msg']='options empty';
    $res['code']=-2;
    exit(json_encode($res));
}

require('conn.php');

$sql = 'SELECT * FROM b_user WHERE openid="'.$openid.'"';
$retval = mysqli_query( $conn, $sql );
$row = mysqli_fetch_array($retval,MYSQLI_ASSOC);

if (count($row)>0) {
    saveImage($head,$openid);
    $res['msg']='用户已存在';
    $res['code']=2;
} else {
    $sql = "INSERT INTO b_user ".
        "(openid,name) ".
        "VALUES ".
        "('$openid','$name')";
      
    $retval = mysqli_query( $conn, $sql );
    if(! $retval )
    {
        $res['msg']='无法添加用户: ' . mysqli_error($conn);
        $res['code']=-1;
    }
    saveImage($head,$openid);
    $res['msg']="成功添加用户";
    $res['code']=1;
}
echo(json_encode($res));
mysqli_close($conn);


function getOpenID($code){
    $url="https://api.weixin.qq.com/sns/jscode2session?appid=".APPID."&secret=".SECRET."&js_code=".$code."&grant_type=authorization_code";
    $arr=json_decode(file_get_contents($url),true);
    return $arr['openid'];
    }
    
function saveImage($head,$openid){
$state = @file_get_contents($head,0,null,0,1);//获取网络资源的字符内容
    if($state){
    $filename = './images/'.$openid.'.jpg';//文件名称生成
        ob_start();//打开输出
        readfile($head);//输出图片文件
        $img = ob_get_contents();//得到浏览器输出
        ob_end_clean();//清除输出并关闭
        $size = strlen($img);//得到图片大小
        $fp2 = @fopen($filename, "w");        
        fwrite($fp2, $img);//向当前目录写入图片文件，并重新命名
        fclose($fp2);        
        return 1;
    } else{        
           return 0;
           }
    }
?>