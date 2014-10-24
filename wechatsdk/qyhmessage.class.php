<?php
class QYHMessage
{
	private $receviedObj;
	private $qyhWechat;
	
	public function __construct($receivedMsg,$options)
	{
		logTrace("QYHMessage::construct----begin");
		
		$this->qyhWechat = new QYHWechat($options);
		
		if($this->qyhWechat->decryptMsg($receivedMsg))
		{
			logTrace("QYHMessage::construct----receivedMsg:".$this->qyhWechat->receivedXML);			
			
			$this->receviedObj = simplexml_load_string($this->qyhWechat->receivedXML, 'SimpleXMLElement', LIBXML_NOCDATA);	   	    
			$msgType = $this->receviedObj->MsgType;
			
			if($msgType=='text')
			{
				$this->textMessage();
			}
			else
			{
				logTrace("QYHMessage::construct----developing!");
			}

		}
		else
		{
			logTrace("QYHMessage::construct----null");
		}	
		
		logTrace("QYHMessage::construct----end");
	}
	
	private function responseMessage($responseXML)
	{
		logTrace("QYHMessage::responseMessage----begin");
		if ($this->qyhWechat->encryptMsg($responseXML)) {
			// 加密成功，企业需要将加密之后的sEncryptMsg返回
			logTrace("QYHMessage::responseMessage----qyhWechat->responseMsg:".$this->qyhWechat->responseMsg);
			echo  $this->qyhWechat->responseMsg;
			exit;
		} 
		else 
		{
			logTrace("QYHMessage::responseMessage----responseMessage error.");
			exit;
		}

	}
	
	private function textMessage()
	{
		logTrace("QYHMessage::textMessage----begin");
		$toUserName = $this->receviedObj->FromUserName;	   	
		$fromUserName = $this->receviedObj->FromUserName;	   	    
		$agentID = $this->receviedObj->AgentID;	   	    
		$content = $this->receviedObj->Content;
		$msgId = $this->receviedObj->MsgId;
		$responseXML=null;

		logTrace("QYHMessage::textMessage----Content:$content ");
		
		$keyword=strtolower($content);
		$wechatContent=new WechatContent($fromUserName,$toUserName,$keyword);
		$responseXML=$wechatContent->getResponseXML();
		
		if($responseXML==null)
		{
			switch($keyword)
			{
				case 'qyhmenu':
					$responseXML = makeText($fromUserName,$toUserName,$agentID,$msgId,$keyword);
					break;
				default:
					$responseXML = makeText($fromUserName,$toUserName,$agentID,$msgId,"echo:".$keyword);
					break;
			}
		}
		
		logTrace("QYHMessage::textMessage----sResponseData:$responseXML");
		$this->responseMessage($responseXML);		
		logTrace("QYHMessage::textMessage----end");
		
	}
	
	
}
?>