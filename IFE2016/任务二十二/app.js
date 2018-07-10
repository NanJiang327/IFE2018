var nodeList = [], timer, interval , currentNode;
var tree = document.getElementsByClassName('box')[0];



function mlr(obj) {
	if (obj){
		nodeList.push(obj);
		mlr(obj.firstElementChild);
		mlr(obj.lastElementChild);
	}
}

function lmr(obj) {
	if (obj){
		lmr(obj.firstElementChild);
		nodeList.push(obj);
		lmr(obj.lastElementChild);
	}
}

function lrm(obj) {
	if (obj){
		lrm(obj.firstElementChild);
		lrm(obj.lastElementChild);
		nodeList.push(obj);
	}
}


function act(){
	currentNode.style.background = '#fff';
	if (nodeList.length === 0){
		clearInterval(timer);
	} else {
		currentNode = nodeList.shift();
		currentNode.style.background = 'blue';
	}
}

function buttonHandler(e) {
	var target = e.target || e.srcElement;
	var option = document.getElementsByName('speed');
	if (option[0].checked) interval = 400;
	else if (option[1].checked) interval = 800;
	//若有动画在执行, 清除动画
	if (currentNode != null) currentNode.style.background = '#fff';
	nodeList.length = 0;
	clearInterval(timer);
	currentNode = document.getElementsByClassName('box')[0];
	switch (target.id) {
		case 'DLR' :
			mlr(currentNode);
			break;
		case 'LDR':
			lmr(currentNode);
			break;
		case 'LRD':
			lrm(currentNode);
			break;
		default:
			break;
	}
	timer = setInterval(act, interval);
}

function addEvent(ele, event, handler){
	if (ele.addEventListener) {
		ele.addEventListener(event, handler);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler);
	} else {
		ele['on' + event] = handler;
	}
}

addEvent(document.getElementById('DLR'), 'click', buttonHandler)
addEvent(document.getElementById('LDR'), 'click', buttonHandler)
addEvent(document.getElementById('LRD'), 'click', buttonHandler)