// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";
var moneyReady = false;
var moneyImage=new Image();
moneyImage.onload = function () {
	moneyReady = true;
};
moneyImage.src="images/git.png"
// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monster2 = {};
var monster3 = {};
var money={};
var monstersCaught = 0;
var moneyCaught=0;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));

};

var reset2 = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly

	monster2.x = 32 + (Math.random() * (canvas.width - 64));
	monster2.y = 32 + (Math.random() * (canvas.height - 64));
};
var reset3 = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster3.x = 32 + (Math.random() * (canvas.width - 64));
	monster3.y = 32 + (Math.random() * (canvas.height - 64));
};
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
			heroImage.src = "images/hero.png";
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
			heroImage.src = "images/hero.png";
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		heroImage.src = "images/heroleft.png";
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	heroImage.src = "images/heroright.png";
	}
if(hero.x<0)
	{
		hero.x=0;
	}
	if(hero.x>512-32)
	{
		hero.x=512-32;
	}
	if(hero.y<0)
	{
		hero.y=0;
	}
	if(hero.y>480-32)
	{
		hero.y=480-32;
	}
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
		
	) {
		
		++monstersCaught;
		reset();
    money.x = 32 + (Math.random() * (canvas.width - 64));
	money.y = 32 + (Math.random() * (canvas.height - 64));
	moneyReady=true;
	
	}
	//吃金币
	if(hero.x <= (money.x + 32)
		&& money.x <= (hero.x + 32)
		&& hero.y <= (money.y + 32)
		&& money.y <= (money.y + 32)
		){
			moneyReady=false;
			++moneyCaught;
		}
		
		if (
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
		
	) {
		
		++monstersCaught;
		reset2();
	money.x = 32 + (Math.random() * (canvas.width - 64));
	money.y = 32 + (Math.random() * (canvas.height - 64));
	moneyReady=true;
		
	}
	if(monstersCaught>=10 ){
	bgImage.src = "images/background2.png";

		if (
			
		hero.x <= (monster3.x + 32)
		&& monster3.x <= (hero.x + 32)
		&& hero.y <= (monster3.y + 32)
		&& monster3.y <= (hero.y + 32)
		
	) {
			
		++monstersCaught;
		reset3();
    money.x = 32 + (Math.random() * (canvas.width - 64));
	money.y = 32 + (Math.random() * (canvas.height - 64));
	moneyReady=true;
	}

}
	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
		ctx.drawImage(monsterImage, monster2.x, monster2.y);
		if(monstersCaught>=10){
		ctx.drawImage(monsterImage, monster3.x, monster3.y);
		}
		if(moneyReady){
			ctx.drawImage(moneyImage, money.x, money.y);
			
		}
		
		
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("已得分数: " + monstersCaught*100+"分", 32, 32);
	//money
		ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("已得金币(随机): " + moneyCaught, 32,70);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	if(monstersCaught>=10){
		ctx.fillText("第二关", 40, 100);
	}else{
	ctx.fillText("第一关", 40, 100);
	}
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
		if(monstersCaught>=10){
	ctx.fillText("目标击杀：17只后通关", 250, 32);
	}else{
ctx.fillText("目标击杀：10只", 250, 32);
	}
	
if(monstersCaught>17){
	if(confirm("恭喜你已经通关了！ 点击确定按钮重新游戏或许点击取消按钮关闭游戏" )){
		history.go(0)
		monstersCaught=0;
	}else{
		window.opener = null; 
window.open('', '_self'); 
window.close() 
	}
	
}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
     var i=document.getElementById("myaudio");
     i.play();
	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();

reset();
reset2();
reset3();
main();
