window.onresize=function(){
	var _body = document.getElementsByTagName('body')[0];
	_body.style.height=_body.clientHeight+"px";
};

//通过className获取元素
function getClass(oParent,sClass){
	if (oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		// 获取所有子级
		var aTmp=oParent.getElementsByTagName('*');
		var aRes=[];
		
		for (var i=0; i<aTmp.length; i++){
			var arr=aTmp[i].className.split(' ');
			
			for (var j=0; j<arr.length; j++){
				if (arr[j] == sClass){
					aRes.push(aTmp[i]);
				}
			}
		}
		
		return aRes;
	}
}

/*手机自适应设置*/
window.onload=window.onresize=function(){	
	fontSize();
	pageShow();	
};


function pageShow(){
	var oBox = document.getElementsByTagName('body')[0];
	oBox.style.visibility = 'visible';
}

function fontSize(){
	document.documentElement.style.fontSize = 100*(document.documentElement.clientWidth/750)+'px';
}
/*手机自适应设置end*/

//input输入框光标点入，默认文字消失
function inpTextF(id,text){
	$(id).focus(function(){
		$(this).attr('placeholder','');
	});
	$(id).blur(function(){
		if($(this).attr('placeholder')==''){
			$(this).attr('placeholder',text);
		}
	});
}


//下拉菜单模拟点击
function selLink(spanId,selId){
	$(spanId).text($(''+selId+' option:eq(0)').text());
	$(selId).change(function(){
		var selOption=$(''+selId+' option:selected').val();
		$(spanId).text(selOption);
	});
}

//截取url
function GetRequest() {   
   var url = location.search; //获取url中"?"符后的字串   
   var theRequest = new Object();   
   if (url.indexOf("?") != -1) {   
      var str = url.substr(1);   
      strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
      }   
   }   
   return theRequest;   
}



function weixin(){
	this.timeout = null;
}

weixin.prototype.showToast = function(opa){
	var title = opa.title?opa.title:'toast的title'
	var dur = opa.duration?opa.duration:2000;
	if ($('.weixin-toast').length>0){
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function(){
			$('div').remove('.weixin-toast');
		},dur)
		return;
	}
	var div = document.createElement('div');
	div.className = 'weixin-toast';
	$('body').append(div);
	if (opa.title){
		$('.weixin-toast').html(title)
	}
	this.timeout = setTimeout(function(){
		$('.weixin-toast').remove();
	},dur)
}
weixin.prototype.showModal = function(options){
	$('.chat-modal-box').show();
	$('.chat-modal-box .chat-modal-title').html(options.title);
	var confirm = document.querySelector('.chat-modal-box .chat-modal-confirm');
	var cancel =  document.querySelector('.chat-modal-box .chat-modal-cancel');
	var optionBox = document.querySelector('.chat-modal-box .chat-modal-option');
	if (typeof (options.confirm) == 'function'){
		confirm.onclick = options.confirm;
	}	
	if (typeof (options.cancel) == 'function') {
		cancel.onclick = options.cancel;
	}
	optionBox.onclick = function() {
		$('.chat-modal-box').hide();
	}
}


var wx = new weixin();
