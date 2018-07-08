/*
 * 定义地图类
 * @cols 表示地图的列数
 * @rows 表示地图的行数
 */
function Map(cols, rows) {
	// 列数
	this.cols = cols;
	// 行数
	this.rows = rows;
	// 主容器
	this.mainDom = document.createElement("div");
	this.mainDom.className = "mainDom";
	// 为了简化书写 我们将所有的dom元素 放入数组 并每行作为一个数组 再将每一个行数组放入arr属性
	this.arr = [];
	this.init();
}

// 方法定义在原型上
Map.prototype.init = function() {
	this.create();
}

// 创建元素
Map.prototype.create = function() {
	// 根据行数和列数进行元素的创建 
	// 创建多行
	for(var j = 0; j < this.rows; j++) {
		// 为了放一行元素 容器元素创建出来
		var row_dom = document.createElement("div");
		row_dom.className = "row";
		// 定义一个行数组
		var row_arr = [];
		// 根据列数进行循环创建 并填充到航容器中
		for(var i = 0; i < this.cols; i++) {
			// 创建了一个元素
			var b = document.createElement("div");
			// 将该元素放入row_arr中
			row_arr.push(b);
			b.className = "block";
			// 并填充到row_dom行容器中
			row_dom.appendChild(b);
			// b.innerHTML = "" + j + i;
		}
		// 内部循环结束 一个行容器已经被创建出来并填充完毕
		// 将这个行容器放在主容器中
		this.mainDom.appendChild(row_dom);
		// 一个行数组已经满了 此时将该行数组放入this.arr中
		this.arr.push(row_arr);
	}
}

// 定义清除方法
Map.prototype.clear = function() {
	for(var i = 0; i < this.rows; i++) {
		for(var j = 0; j < this.cols; j++) {
			this.arr[i][j].style = "";
		}
	}
}