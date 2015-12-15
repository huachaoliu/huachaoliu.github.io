window.onload = function(){
	var link = $('link');
	var showBox = $('showbox');
	var Screen = $('screen');
	var Close = showBox.getElementsByTagName('span')[0];
	var move = false;
	onResize(Screen)
	
	hover(Close);
	link.onclick = function(){
		var t = setTimeout(function(){
			Screen.style.display = 'block';
			moveTop(showBox,0,10);
		},100);	
	}
	Close.onclick = function(){
		setNone(Screen,1000);
		moveTop(showBox,-488,10);
	}
	Screen.onclick = function(){
		setNone(Screen,1000);
		moveTop(showBox,-488,10);
	}
	select();
	focus();
	banner();	
	
	
}
//获取id方法
function $(id){
	return document.getElementById(id);
}
//top下拉
function select(){
	var Cart = $('cart');
	var Cartp = cart.getElementsByTagName('p')[0];
	var timer = null;
	function show(){
		clearInterval(timer);
		Cart.className = 'cart-show';
		Cartp.style.display = 'block';
	}
	function hide(){
		timer=setInterval(function(){
			Cart.className = 'top-car';
			Cartp.style.display = 'none';
		},1000);
	}
	Cart.onmouseover = Cartp.onmouseover = show;
	Cart.onmouseout = Cartp.onmouseout = hide;
}

//设置隐藏
function setNone(str,time){
	if (str.style.display != '') {
		var t = setTimeout(function(){
			str.style.display = '';	
		},time);
	}
}
//鼠标移入移出改变背景图片
function hover(str,value){
	str.onmouseover = function(){
		this.style.background = 'url(images/close1.png) no-repeat center center';
	}
	str.onmouseout = function(){
		this.style.background = '';
	}
}

//获取浏览器宽高
function onResize(str){
	var ww = window.innerWidth;
	var wh = window.innerHeight;
	str.style.width = ww;
	str.style.height = wh;
	// document.body.style.overflow = 'hidden';
}
//运动函数
function moveTop(str,target,num){
	var timer = setInterval(function(){
		var speed = (target - str.offsetTop)/num;
		speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
		if (str.offsetTop == target) {
			clearInterval(timer);
			// return;
		}else{
			str.style.top = str.offsetTop + speed + 'px';
		}
	},30);	
}
//聚焦事件

function focus(){
	var forms = $('form');
	var inputOne = forms.getElementsByTagName('input')[0];
	var inputTwo = forms.getElementsByTagName('input')[1];
	var formDiv = forms.getElementsByTagName('div')[0];
	var formDiv2 =forms.getElementsByTagName('div')[1];
	inputOne.onfocus = function(){
		this.style.borderColor = '#f60';
		inputTwo.style.borderColor = '#f60';
		formDiv.style.display = 'none';
		formDiv2.style.display = 'block';
	}
	inputOne.onblur = function(){
		this.style.borderColor = '';
		inputTwo.style.borderColor = '';
		formDiv.style.display = 'block';
		formDiv2.style.display = 'none';
	}
}
//轮播图事件
function banner(){
	var slider = $('slider');
	var sliderpic = slider.getElementsByTagName('ul')[0];
	var sliderbtn = slider.getElementsByTagName('ul')[1];
	var sliderbtnli = sliderbtn.getElementsByTagName('li');
	var prev = $('prev');
	var next = $('next');
	var index = 0;
	var time;
	var inteval = 3000;
	var len = 5;
	
	function animate(ispeed){

		var newleft = sliderpic.offsetLeft;
		if (newleft < -6130) {
			sliderpic.style.left = -1226 + 'px';
		}else if(newleft > -1226){
			sliderpic.style.left = -6130 + 'px';
		}
		sliderpic.style.left = sliderpic.offsetLeft + ispeed + 'px';
	}

	function showbtn(){
		for (var i = 0; i < sliderbtnli.length; i++) {
			if (sliderbtnli[i].className == 'on') {
				sliderbtnli[i].className = '';
			}
		}
		sliderbtnli[index].className = 'on';
	}

	prev.onclick = function(){
		if (index == 0) {
			index = 4;
		}else{
			index -= 1;
		}
		animate(-1226);
		showbtn();
	}
	next.onclick = function(){
		if (index == 4) {
			index = 0;
		}else{
			index += 1;
		}
		animate(1226);
		showbtn();
	}
	function play(){
		time = setInterval(function(){
			next.onclick();
		},3000);
	}
	function stop(){
		clearInterval(time);
	}
	for (var i = 0; i < sliderbtnli.length; i++) {
		sliderbtnli[i].onclick = function(){
			if (this.className == 'on') return;
			var myIndex = parseInt(this.getAttribute('index'));
			var speed = -1226 * (myIndex-index);
			animate(speed);
			index=myIndex;
			showbtn();
		}
	}

	slider.onmouseover = stop;
	slider.onmouseout = play;
	play();

	function star(){
		var star = $('star');
		var starprev = $('starprev');
		var starnext = $('starnext');
		var starlist = star.getElementsByTagName('div')[0];
		var t;

		starprev.onclick = function(){
			var starleft = starlist.offsetLeft;
			if (starleft < 0) {
				return;
			}
			starlist.style.left = starlist.offsetLeft -1226 + 'px';
		}
		starnext.onclick = function(){
			var starleft = starlist.offsetLeft;
			if (starleft > -1226) {
				return;
			}
			starlist.style.left = starlist.offsetLeft +1226 + 'px';
		}

		function starplay(){
			t = setInterval(function(){
				var starleft = starlist.offsetLeft;
				if (starleft < 0) {
					starnext.onclick();
				}else if (starleft > -1226) {
					starprev.onclick();
				}
			},5000)
		}
		function starstop(){
			clearInterval(t);
		}
		star.onmouseover = starstop;
		star.onmouseout = starplay;
		starplay();
	}
	star();
}