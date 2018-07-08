/*
 * 定义蛇类
 */
function Snake(imgOption) {
	this.head_imgs = imgOption.head_imgs;
	this.body_img = imgOption.body_img;
	this.tail_imgs = imgOption.tail_imgs;
	// 定义蛇头图片属性
	this.head_img = this.head_imgs[2];
	// 定义蛇尾图片属性
	this.tail_img = this.tail_imgs[0];
	this.arr = [{x: 4, y: 5}, {x: 4, y: 6}, {x: 4, y: 7}, {x: 4, y: 8}];
	// 蛇的方向属性
	this.direction = 39; // 37 左 38 上 39 右 40 下
	// 蛇的状态属性
	this.alive = true;
	// 设置一个锁 
	this.lock = true;
}
// 蛇要移动 要根据方向来移动
// 而且 蛇的移动规则并不是所有的坐标都+1 或者-1 （没法转弯）
// 蛇的移动之前与移动之后的差别只有一个蛇头和蛇尾 我们将蛇尾去掉 安装一个新头到蛇的头上
Snake.prototype.move = function() {
	// 蛇的尾巴是数组的头部 去蛇尾就是去数组的头
	this.arr.shift();
	// 根据蛇方向 判定新头的位置
	var head = {
		x: 0,
		y: 0
	}
	var length = this.arr.length;
	if(this.direction === 37) {
		// 如果蛇的方向是左
		head.x = this.arr[length - 1].x;
		head.y = this.arr[length - 1].y - 1;
	} else if(this.direction === 38) {
		// 如果蛇的方向是上
		head.x = this.arr[length - 1].x - 1;
		head.y = this.arr[length - 1].y;
	} else if(this.direction === 39) {
		// 如果蛇的方向是右
		head.x = this.arr[length - 1].x;
		head.y = this.arr[length - 1].y + 1;
	} else if(this.direction === 40) {
		// 如果蛇的方向是下
		head.x = this.arr[length - 1].x + 1;
		head.y = this.arr[length - 1].y;
	} else {
		return;
	}
	// 新头的位置已经确定 要将它放入蛇的头部 就是放入数组的尾部
	this.arr.push(head);
	this.checkTail();
	this.lock = true;
}

// 蛇死亡
Snake.prototype.goDie = function() {
	this.alive = false;
}

// 蛇的调头方法
Snake.prototype.change = function(direction) {
	if(!this.lock) {
		console.log("蛇还没动呢 请慢一点")
		return;
	}
	// 判断 如果蛇的方向是37 此时direction不可以是39 
	// 如果蛇的方向是38 direction不可以是 40
	this.direction = Math.abs(direction - this.direction) === 2 ? this.direction : direction; 
	if(this.direction === 37) {
		this.head_img = this.head_imgs[0];
	} else if(this.direction === 38) {
		this.head_img = this.head_imgs[1];
	} else if(this.direction === 39) {
		this.head_img = this.head_imgs[2];
	} else if(this.direction === 40) {
		this.head_img = this.head_imgs[3];
	}
	this.lock = false;
}
// 蛇长长
Snake.prototype.growUp = function() {
	// 蛇长长其实就是数组变长一位 而且是蛇的尾巴长长 也就是数组的头部增加一位
	// 复制一个蛇的尾巴
	var newTail = {
		x: this.arr[0].x,
		y: this.arr[0].y
	}
	// 放入数组头部
	this.arr.unshift(newTail);
}
// 检测蛇吃自己的方法
Snake.prototype.eatSelf = function() {
	// 获取蛇头
	var head = this.arr[this.arr.length - 1];
	// 开始循环 注意不能循环到数字末尾（蛇头）
	for(var i = 0, l = this.arr.length - 1; i < l; i++) {
		// 判断
		if(head.x === this.arr[i].x && head.y === this.arr[i].y) {
			// 说明吃到了
			this.goDie();
		}
	}
}

// 定义检测尾巴朝向的方法
Snake.prototype.checkTail = function() {
	// 获取尾巴 
	var tail = this.arr[0];
	// 再获取尾巴的前一个
	var tailNext = this.arr[1];
	// 比较两者的关系
	if(tail.x === tailNext.x) {
		// 如果两者的x值相同 说明在同一行
		if(tail.y > tailNext.y) {
			// 比较y值 
			// 如果尾巴的y值大 说明尾巴在右边 朝右
			this.tail_img = this.tail_imgs[2];
		} else {
			this.tail_img = this.tail_imgs[0];
		}
	} else {
		if(tail.x > tailNext.x) {
			this.tail_img = this.tail_imgs[3];
		} else {
			this.tail_img = this.tail_imgs[1];
		}
	}
}