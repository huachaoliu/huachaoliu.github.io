window.onload = function(){
	var banner = document.getElementById('banner');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('li');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1;
	var timer;

	function showbtn(){
		for(var i=0 ; i < buttons.length ; i++){
			if(buttons[i].className=='on'){
				buttons[i].className='';
			}
		}
		buttons[index - 1].className = 'on';
	}

	function animate(offset/*ispeed*/){
		var newleft = parseInt(list.style.left) + offset;
		list.style.left = parseInt(list.style.left) + offset + 'px';
		if(newleft > -960){
			list.style.left = -3840 + 'px'; 
		}
		if(newleft < -3840){
			list.style.left = -960 + 'px'; 
		}
	}

	function play(){
		timer = setInterval(function(){
			next.onclick();
		},3000)
	}
		function stop(){
			clearInterval(timer);
		}

	next.onclick = function(){
		if(index == 4){
			index = 1;
		}
		else{
			index += 1;
		}
		showbtn();
		animate(-960);
	}
	prev.onclick = function(){
		if(index == 1){
			index = 4;
		}
		else{
			index -= 1;
		}
		showbtn();
		animate(960);
	}
	for(var i=0;i<buttons.length;i++){
		buttons[i].onclick = function(){
			if(this.className == 'on'){
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -960 * (myIndex - index);
			animate(offset);
			index = myIndex;
			showbtn();
		}
	}
	banner.onmouseover = stop;
	banner.onmouseout = play;

	play();
}


function adver() {
		var oadver = document.getElementById('adver');
		oadver.appendChild(oadver.firstChild);
	}

	setInterval('adver()',2000);

	function footmid() {
		var footmid = document.getElementById('footmid');
		footmid.appendChild(footmid.firstChild);
	}

	setInterval('footmid()',2000);