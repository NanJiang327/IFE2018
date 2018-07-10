var nodeList = [];
var timer, interval, currentNode;

function act(isSearch, found) {
	currentNode.style.background = '#fff';
	if (nodeList.length === 0) {
		clearInterval(timer);
		if (isSearch){
			if (found) currentNode.style.background = 'red';
			else alert('没有找到符合条件的节点');
		}
	} else {
		currentNode = nodeList.shift();
		currentNode.style.background = 'royalblue';
	}
}

// 深度优先遍历
function dfs(root) {
	nodeList.push(root);
	for (var i in root.childNodes) {
		if (root.childNodes[i].nodeType === 1){
			dfs(root.childNodes[i]);
		}
	}
}

// 广度优先遍历
function bfs(root){
	var queue = [];
	var current =root;
	queue.push(current);
	while (queue.length > 0) {
		current = queue.shift();
		nodeList.push(current);
		for (var i in current.childNodes){
			if (current.childNodes[i].nodeType === 1){
				queue.push(current.childNodes[i]);
			}
		}
	}
}

// 广度优先搜索
function bfSearch(root, query){
	var queue = [];
	var current =root;
	queue.push(current);
	while (queue.length > 0) {
		current = queue.shift();
		nodeList.push(current);
		for (var i in current.childNodes){
			if (current.childNodes[i].nodeType === 3){
				if (current.childNodes[i].textContent.indexOf(query) !== -1) return current;
			}
			if (current.childNodes[i].nodeType === 1){
				queue.push(current.childNodes[i]);
			}
		}
	}
	return null;
}




function buttonHandler(e) {
	var target = e.target || e.srcElement;
	var option = document.getElementsByName('speed');
	var isSearch, searchResult = null;
	if (option[0].checked) interval = 100;
	else if (option[1].checked) interval = 800;
	//若有动画在执行, 清除动画
	if (currentNode != null) currentNode.style.background = '#fff';
	nodeList.length = 0;
	clearInterval(timer);
	currentNode = document.getElementById('root');
	switch (target.id) {
		case 'dfs' :
			isSearch = false;
			dfs(currentNode);
			break;
		case 'bfs':
			isSearch = false;
			bfs(currentNode);
			break;
		case 'search':
			searchResult = bfSearch(currentNode, document.getElementById('searchText').value);
			isSearch = true;
			break;
		default:
			break;
	}
	timer = setInterval(function () {
		act(isSearch, searchResult != null);
	}, interval);
}


addEvent(document.getElementById('dfs'), 'click', buttonHandler);
addEvent(document.getElementById('bfs'), 'click', buttonHandler);
addEvent(document.getElementById('search'), 'click', buttonHandler);


// 跨浏览器事件函数
function addEvent(ele, event, handler) {
	if (ele.addEventListener){
		ele.addEventListener(event, handler);
	} else if (ele.attachEvent) {
		ele.attachEvent('on'+ event, handler);
	} else {
		ele['on'+ event] = handler;
	}
}