var tileSize = 100;
var map = [	[0,0,0,0,0,0,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,1,0,0,0,0,1,0],
			[1,1,1,1,1,1,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,1,1,1,1,1,0],
			[0,1,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,0,0,0,0,0,0]
		  ];
var floatValue = 10;
var flyValue = 85;
var animating = false;

function getTileClass(y,x){
	var tileClass = "tile ";
	if(map[y][x] == 0){
		tileClass += "blank";
	}
	else{
		if(map[y][x+1] != undefined && map[y][x+1] ==1){
			tileClass += "right-";
		}
		if(map[y][x-1] != undefined && map[y][x-1] ==1){
			tileClass += "left-";
		}
		if(map[y-1] != undefined && map[y-1][x] == 1){
			tileClass += "top-"
		}
		if(map[y+1] != undefined && map[y+1][x] == 1){
			tileClass += "bottom-";
		}
		tileClass += "open";
	}
	return tileClass;
}

function isWalkable(y,x){
	if(y < 0 || y > map.length) return false;
	else if (x < 0 || x > map[0].length) return false;
	else return map[y][x] == 1;
}

function floatPlayer(){
	$("#player").animate({"margin-top":"+="+floatValue},650,function(){
			floatValue = floatValue*-1;
			floatPlayer();
		}
	)
}

function animateCompanion(){
	$("#player .companion").animate({"left":flyValue+"%","margin-top":"+="+floatValue},850,function(){
			if(flyValue == 85)
				flyValue = 5;
			else
				flyValue = 85;
			animateCompanion();
		}
	)
}

function drawMap(){
	$("#map").height(map.length * 100).width(map[0].length * 100);
	for (var y = 0; y < map.length; y++){
		$("#map").append("<div class='row'></div>");
		for (var x = 0; x < map[y].length; x++){
			$("#map").find(".row").eq(y).append("<div class='"+getTileClass(y,x)+"'></div>");
		}
	}
}

$(document).keydown(function(e) {
	var positionX = parseInt($("#player").css("left"));
	var positionY = parseInt($("#player").css("top"));
	var shouldAnimate = false;
	if(e.keyCode==37) {
		//if dialog is on, arrow keys control dialogs
		if(isOnDialog){
			prevLine();
		}
		//else, it controls the player
		else{
			//only move if already facing that direction
			if($("#player").hasClass("left")){
				positionX-=tileSize;
				shouldAnimate = true;
			}
			$("#player").removeClass().addClass("left");
		}
	} else if(e.keyCode == 39) {
		if(isOnDialog){
			nextLine();
		}
		else{
			if($("#player").hasClass("right")){
				positionX+=tileSize;
				shouldAnimate = true;
			}
			$("#player").removeClass().addClass("right");
		}
	} else if(e.keyCode==38) {
		if(isOnDialog){
			prevLine();
		}
		else{
			if($("#player").hasClass("top")){
				positionY-=tileSize;
				shouldAnimate = true;
			}
			$("#player").removeClass().addClass("top");
		}
	} else if(e.keyCode == 40) {
		if(isOnDialog){
			nextLine();
		}
		else{
			if($("#player").attr("class") == ""){
				positionY+=tileSize;
				shouldAnimate = true;
			}
			$("#player").removeClass();
		}
	}
	//prevent keydown when still animating
	if(!animating && shouldAnimate && isWalkable((positionY/tileSize),(positionX/tileSize))){
		animating = true;
		$("#player").animate({"top":positionY+"px","left":positionX+"px"},750,function(){
			animating = false;
		});
	}
});

$(document).ready(function(){
	//draw the board
	drawMap();
	
	//float the avatar thingy
	floatPlayer();
	
	//make the companion fly around
	animateCompanion();
})