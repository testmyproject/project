<?php
/**
  * wechat php test
  */

//define your token
//echo "index.php begin";

include_once "qyhwechat.class.php";
include_once "qyhmessage.class.php";

$options = array(
        'token'=>'sampletoken',															//��дӦ�ýӿڵ�Token
        'encodingaeskey'=>'nACE9ktYns2DhjHyzHo1dD6PfqdQYbswVNkkrp7nwwg',				//��д�����õ�EncodingAESKey
		'corpid'=>'wxf67aba8f77aa5117',													////��д�߼����ù��ܵ�corpid
		'secret'=>'Oj6s8WaNbKvRjEXdvCEU41iGlRqtAT3GnQWUP2DIdPtBT5lDX36f0K3GREx9NJWw',	//��д�߼����ù��ܵ�secret
		'agentid'=>'3',	
		);

$wechatObj = new wechatCallbackapiIMP();
$wechatObj->responseMsg($options);

class wechatCallbackapiIMP
{
	public function responseMsg($options)
    {
		$method=$_SERVER['REQUEST_METHOD'];
		if($method=='GET')
		{
			$qyhWechat = new QYHWechat($options);
			echo $qyhWechat->valid();
		}
		else 
		{
			$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
			$qyhMessage = new QYHMessage($postStr,$options);
		}

		exit;
		
    }
}

?>