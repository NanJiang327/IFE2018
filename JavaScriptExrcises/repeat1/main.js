var balls = [], bullets = [], numberOfBalls, user, timer;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight - 100;

// function to generate random number

function random(min,max) {
	var num = Math.floor(Math.random()*(max-min)) + min;
	return num;
}

function Shape(x, y, velX, velY, exist) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exist = exist;
}

function Ball(x, y, velX, velY, color, size, exist) {
	Shape.call(this, x, y, velX, velY, exist);

	this.size = size;
	this.color = color;
}

inherit(Ball, Shape);

Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
}

// Check bound
Ball.prototype.update = function() {
	if ((this.x + this.size) >= width) {
		this.velX = -(this.velX);
	}

	if ((this.x - this.size) <= 0) {
		this.velX = -(this.velX);
	}

	if ((this.y + this.size) >= height - 150) {
		this.velY = -(this.velY);
	}

	if ((this.y - this.size) <= 0) {
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;
}


Ball.prototype.collisionDetect = function() {
	for (var j = 0; j < balls.length; j++) {
		if (!(this === balls[j])) {
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size + balls[j].size) {
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
			}
		}
	}
}


function User(x, y, velX, velY) {
	Shape.call(this, x, y, velX, velY, true);
}

inherit(User, Shape);

User.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = 'royalblue';
	ctx.fillRect(this.x, this.y, 20, 40);
	ctx.fill();
}

User.prototype.setControl = function () {
	var _this = this;
	window.onkeydown = function(e) {
		if (e.keyCode === 65) {
			_this.x -= _this.velX;
		} else if (e.keyCode === 68) {
			_this.x += _this.velX;
		} else if (e.keyCode === 32) {
			if (bullets.length < 10) bullets.push(new Bullet(user.x, user.y, 0, 5, true));
			console.log(bullets);
		}
	}
}

User.prototype.update = function(){
	if ((this.x + 20) >= width) {
		this.x = (width - 20)/2;
	}

	if ((this.x - 20) < 0) {
		this.x = (width- 20)/2;
	}

}

function Bullet(x, y, velX, velY, exist) {
	Shape.call(this, x ,y, velX, velY, exist);
}

inherit(Bullet, Shape);

Bullet.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.fillRect(this.x + 7.5, this.y, 5, 10);
	ctx.fill();
}

Bullet.prototype.update1 = function () {
	this.y -= this.velY;
	if ((this.y - 10) <= 0) {
		return this.exist = false;
	}
}

Bullet.prototype.collisionDetect = function () {
	for (var  i = 0; i < balls.length; i++){
		if( balls[i].exist) {
			var dx = this.x - balls[i].x;
			var dy = this.y - balls[i].y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 10 + balls[i].size) {
				balls[i].exist = false;
				this.exist = false;
			}
		}
	}
}

function inherit(Child, Parent){
	function F() {}
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
}



document.querySelector('.newGame').addEventListener('click',function (e) {
	e.target.disabled = true;
	user = new User(
		(width - 20) / 2,
		height - 40,
		10,
		0
	)

	user.setControl();

	function loop() {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
		// 用黑色覆盖之前的画布
		ctx.fillRect(0, 0, width, height);

		while (balls.length < 20) {
			var ball = new Ball(
				random(0,width),
				random(0,height - 150),
				random(-5,5),
				random(-5,5),
				'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
				random(10,20),
				true
			);
			numberOfBalls++;
			balls.push(ball);
		}

		for (var j = 0; j < bullets.length; j++){
			if (bullets[j].exist) {
				bullets[j].draw();
				bullets[j].update1();
				bullets[j].collisionDetect();
			} else {
				bullets.splice(j, 1);
			}
		}

		for (var i = 0; i < balls.length; i++) {
			if(balls[i].exist){
				balls[i].draw();
				balls[i].update();
				balls[i].collisionDetect();
			}
		}

		timer = requestAnimationFrame(loop);

		if (balls.length === 0) {
			cancelAnimationFrame(timer);
		}


		user.draw();
		user.update();

	}


	loop();

})

