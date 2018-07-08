/*
 * Game类
 * @map  Map类的实例 负责地图
 * @snake Snake类的实例 负责蛇
 * @food Food类的实例 负责食物
 * @block Block类的实例 负责障碍
 */
function Game(map, snake, food, block) {
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	this.score = 0;
	this.timer = null;
	this.init();
}
// 方法写在原型上
// 初始化
Game.prototype.init = function() {
	this.renderMap();
	this.renderSnake();
	this.bindEvent();
	this.start();
}

// 判定游戏
Game.prototype.check = function() {
	this.checkMap();
	this.checkFood();
	this.checkSnake();
	this.checkBlock();
}
// 定义边界检测
Game.prototype.checkMap = function() {
	// 只要蛇头符合判定 游戏正常 蛇头不符合判定游戏立即结束
	// 所以，只需要检测蛇头即可。
	// 获取蛇的头部
	var snake_head = this.snake.arr[this.snake.arr.length - 1];
	console.log(snake_head.x);
	console.log(snake_head.y);
	if(snake_head.x < 0 || snake_head.x > this.map.rows - 1 || snake_head.y < 0 || snake_head.y > this.map.cols - 1) {
		this.snake.goDie();
		this.end();
		openModel();
	}
}

// 开始游戏
Game.prototype.start = function() {
	// 备份this
	var me = this;
	this.timer = setInterval(function() {
		// 移动
		me.snake.move();
		// 检测
		me.check();
		// 清屏
		me.snake.alive && me.clear();
		// 渲染
		me.snake.alive && me.renderSnake();
		me.renderFood();
		me.renderBlock();
	}, 350);
}

// 结束游戏
Game.prototype.end = function() {
	// 清除定时器
	clearInterval(this.timer);
}
// 让map上树
Game.prototype.renderMap = function() {
	document.body.appendChild(this.map.mainDom);
}

// 清除屏幕方法
Game.prototype.clear = function() {
	this.map.clear();
}
// 渲染蛇到地图上方法
Game.prototype.renderSnake = function() {
	// 循环渲染蛇的数组
	for(var i = 1, l = this.snake.arr.length - 1; i < l; i++) {
		// 定义变量 简化书写
		var node = this.snake.arr[i];
		// 将对应的元素的样式 改变
		this.map.arr[node.x][node.y].style.background = "url(" + this.snake.body_img + ")";
	}
	this.map.arr[this.snake.arr[i].x][this.snake.arr[i].y].style.background = "url(" + this.snake.head_img + ")";
	this.map.arr[this.snake.arr[0].x][this.snake.arr[0].y].style.background = "url(" + this.snake.tail_img + ")";
}

// 绑定事件
Game.prototype.bindEvent = function() {
	// 备份this
	var me = this;
	// 给document添加onkeydown事件
	document.onkeydown = function(e) {
		if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
			me.snake.change(e.keyCode);
		}
	}
}

// 渲染食物
Game.prototype.renderFood = function() {
	// 食物也是一个坐标
	this.map.arr[this.food.x][this.food.y].style.background = 'url("../img/food.jpg") no-repeat center';
	this.map.arr[this.food.x][this.food.y].style.backgroundSize = "cover";
}

// 吃食物
// 就是检测蛇头和食物的坐标是否重合
Game.prototype.checkFood = function() {
	// 获取蛇的头
	var snake_head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物
	var food = this.food;
	// 判定
	if(snake_head.x === food.x && snake_head.y === food.y) {
		// 蛇长长
		this.snake.growUp();
		this.score++;
		this.resetFood();
	}
}

// 由Game的实例决定将食物放在新位置
Game.prototype.resetFood = function() {
	// 产生一个食物的x值
	var food_x = parseInt(Math.random() * this.map.rows); 
	// 产生一个食物的y值
	var food_y = parseInt(Math.random() * this.map.cols); 
	// 循环与蛇的每一个节坐标进行判断 检测是否重合
	for(var i = 0, l = this.snake.arr.length; i < l; i++) {
		if(food_x === this.snake.arr[i].x && food_y === this.snake.arr[i].y) {
			// 如果重合了 需要重新设置food_x和food_y的值。
			console.log("蛇的位置重合了，重新随机新值");
			this.resetFood();
			return;
		}
	}
	// 如果循环完毕 没有发现重合现象 应用这两个值
	this.food.x = food_x;
	this.food.y = food_y;
}

// 检测蛇的方法
Game.prototype.checkSnake = function() {
	this.snake.eatSelf();
	this.snake.alive || this.end();
	this.snake.alive  || openModel();

}

// 渲染障碍
Game.prototype.renderBlock = function() {
	var arr = this.block.arr;
	for(var i = 0, l = this.block.arr.length; i < l; i++) {
		// 获取当前障碍的行位置
		var row = arr[i].x;
		// 获取当前障碍的列位置
		var col = arr[i].y;
		// 与地图的二维数组结合 定位具体的元素
		console.log(this.map.arr[row][col]);
		this.map.arr[row][col].style.backgroundColor = "#000";
	}
}

// 检测蛇头与障碍
Game.prototype.checkBlock = function() {
	// 获取蛇头
	var snake_head = this.snake.arr[this.snake.arr.length - 1];
	// 循环障碍数组
	for(var i = 0, l = this.block.arr.length; i < l; i++) {
		// 定义变量简化代码
		var nowblock = this.block.arr[i];
		// 判定
		if(nowblock.x === snake_head.x && nowblock.y === snake_head.y) {
			// 碰到障碍了
		
        document.getElementById("myModel").style.display = 'block';
    
			this.snake.goDie();
			this.end();
		}
	}
}

	function openModel() {
		document.getElementById("myModel").style.display = 'block';
	}
    function closeModel() {
        document.getElementById("myModel").style.display = 'none';
    }