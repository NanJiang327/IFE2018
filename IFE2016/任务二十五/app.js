function TreeNode(obj) {
	this.parent = obj.parent;
	this.childs = obj.childs || [];
	this.data =obj.data || '';
	this.selfElement = obj.selfElement;
	this.selfElement.TreeNode = this; // 对应的DOM结点访问回来
}

TreeNode.prototype = {
	constructor: TreeNode,
	// 解耦样式操作, 四个参数表示是否改变箭头, 可见性, 改为高亮和普通, 后两个参数可省略
	render: function (arrow, visibility, toHighlight, deHighlight) {
		// 当传入参数少于3个时, 设置后两位参数为false
		if (arguments.length < 3) {
			toHighlight = false;
			deHighlight = false;
		}

		if (arrow) {
			var element = this.selfElement.getElementsByClassName('arrow')[0];
			if (this.isLeaf()) {
				element.className = 'arrow empty-arrow';
			} else if (this.isFolded()) {
				element.className = 'arrow right-arrow';
			} else {
				element.className = 'arrow down-arrow';
			}
		}

		if (visibility) {
			if (this.selfElement.className.indexOf('nodebody-visible') === -1) {// 本不可见, 设为可见
				this.selfElement.className = this.selfElement.className.replace('hidden', 'visible');
			} else { //改为不可见
				this.selfElement.className = this.selfElement.className.replace('visible', 'hidden');
			}
		}

		if (toHighlight) {
			this.selfElement.getElementsByClassName('node-title')[0].className = 'node-title node-title-highlight';
		}

		if (deHighlight) {
			this.selfElement.getElementsByClassName('node-title')[0].className = 'node-title';
		}
	},

		deleteNode: function () {
			var i;
			if (!this.isLeaf()){
				for (i = 0; i < this.childs.length; i++){
					this.childs[i].deleteNode();
				}
			}
			this.parent.selfElement.removeChild(this.selfElement);
			for (i = 0; i < this.parent.childs.length; i++){
				this.parent.childs.splice(i, 1);
				break;
			}
			this.parent.render(true, false);
	},
		addChild: function (text) {
			if (text === null) return this;
			if (text.trim() === ''){
				alert('节点内容不能为空')
				return this;
			}

			// 先增加子节点, 再渲染自身样式
			// 若当前节点关闭, 则将其展开
			if (!this.isLeaf() && this.isFolded()){
				this.toggleFold();
			}

			// 创建新的DOM结点并附加
			var newNode = newEle('div');
			newNode.className = 'nodebody-visible';
			var newHeader = newEle('label');
			newHeader.className = 'node-header';
			var newSymbol = newEle('div');
			newSymbol.className = 'arrow empty-arrow';
			var newTitle = newEle('span');
			newTitle.className = 'node-title';
			newTitle.innerHTML = text;
			var space = newEle('span');
			space.innerHTML = '&nbsp;&nbsp;';
			var newDelete = newEle('img');
			newDelete.className = 'deleteIcon';
			newDelete.src = 'images/delete.png';
			var newAdd = newEle('img');
			newAdd.className = 'addIcon';
			newAdd.src = 'images/add.png';
			newHeader.appendChild(newSymbol);
			newHeader.appendChild(newTitle);
			newHeader.appendChild(space);
			newHeader.appendChild(newAdd);
			newHeader.appendChild(newDelete);
			newNode.appendChild(newHeader);
			this.selfElement.appendChild(newNode);
			// 创建对应的TreeNode 对象并添加到子节点队列
			this.childs.push(new TreeNode({parent: this, childs: [], data: text, selfElement: newNode}));
			// 渲染自身样式
			this.render(true, false);
			return this; // 返回自身, 以便链式操作
		},

		// 展开, 收拢节点
		toggleFold: function () {
			if (this.isLeaf()) return this; // 叶节点, 无需操作
			// 改变所有子节点的可见状态
			for (var i = 0; i < this.childs.length; i++){
				this.childs[i].render(false, true);
			}
			// 渲染本节点的箭头
			this.render(true, false);
			return this; // 返回自身, 以便链式操作
		},

	   // 判断是否为叶结点
		isLeaf: function () {
			return this.childs.length === 0;
		},

		// 判断节点是否处于折叠状态
		isFolded: function () {
			if (this.isLeaf()) return false; // 叶节点返回false
			if (this.childs[0].selfElement.className === 'nodebody-visible') return false;
			return true;
		}
}

var root = new TreeNode({parent: null, childs: [],  data: 'Fontend', selfElement: document.getElementsByClassName('nodebody-visible')[0]});

addEvent(root.selfElement, 'click', function (e) {
	var target = e.target || e.srcElement;
	var domNode = target;
	while (domNode.className.indexOf('nodebody') === -1) domNode = domNode.parentNode; // 找到类名有nodebody前缀的结点
	selectedNode = domNode.TreeNode; // 获取DOM对象对应的TreeNode
	// 如果点在结点文字或者箭头上
	if (target.className.indexOf('node-title') !== -1 || target.className.indexOf('arrow') !== -1){
		selectedNode.toggleFold(); // 触发toggle操作
	}
	else if (target.className === 'addIcon'){
		selectedNode.addChild(prompt('请输入子结点的内容:'));
	}
	else if (target.className === 'deleteIcon') {
		selectedNode.deleteNode();
	}
});

root.search = function (query) {
	var resultList = [];
	var queue = [];
	var current = this;
	queue.push(current);
	while (queue.length > 0){
		current = queue.shift();

		current.render(false,false,false,true);
		if (current.data === query) resultList.push(current);

		for (var i = 0; i < current.childs.length; i++){
			queue.push(current.childs[i]);
		}
	}
	return resultList;
};

addEvent(document.getElementById('search'), 'click', function () {
	var text =document.getElementById('searchText').value.trim();
	if (text === ''){
		return alert('请输入内容');
	}

	var resultList = root.search(text);

	if (resultList.length === 0){
		document.getElementById('result').innerHTML = '没有查询到符合条件的结点';
	} else {
		document.getElementById('result').innerHTML = '查询到' + resultList.length + '个符合条件的结点';
		var pathNode;
		for (var x = 0; x < resultList.length; x++){
			pathNode = resultList[x];
			pathNode.render(false, false, true, false);
			// 展开父元素
			while (pathNode.parent != null){
				if (pathNode.selfElement.className === 'nodebody-hidden') pathNode.parent.toggleFold();
				pathNode = pathNode.parent;
			}
		}
	}
});

addEvent(document.getElementById('clear'), 'click', function () {
	document.getElementById('searchText').value = '';
	root.search(null);
	document.getElementById('result').innerHTML = '';
})


function newEle(type) {
	return document.createElement(type)
}

// 生成DOM树
root.addChild('技术').addChild('IT公司').addChild('Laugh');
root.childs[0].addChild('HTML5').addChild('CSS').addChild('JavaScript').addChild('PHP').addChild('NodeJS').toggleFold();
root.childs[0].childs[4].addChild('JavaScript').toggleFold();
root.childs[1].addChild('百度').addChild('腾讯').addChild('阿里').toggleFold();
root.childs[2].addChild('学习一个').addChild('身经百战').addChild("吟诗两句").toggleFold();
root.childs[2].childs[2].addChild('啊, 好难啊').toggleFold();



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
