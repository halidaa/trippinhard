var tileSize = 100;
var map = [	[0,0,0,0,0,0,1,1,1,1],
			[0,0,0,0,0,0,1,0,0,0],
			[1,1,1,1,1,1,1,0,0,0],
			[0,1,0,0,0,0,1,0,0,0],
			[0,1,0,0,0,0,1,1,1,1],
			[0,1,0,0,0,0,0,0,0,0]];
var floatValue = 10;
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

$(document).keydown(function(e) {
	var positionX = parseInt($("#player").css("left"));
	var positionY = parseInt($("#player").css("top"));
	if(e.keyCode==37) {
		positionX-=tileSize;
		$("#player").removeClass().addClass("left");
	} else if(e.keyCode == 39) {
		positionX+=tileSize;
		$("#player").removeClass().addClass("right");
	} else if(e.keyCode==38) {
		positionY-=tileSize;
		$("#player").removeClass().addClass("top");
	} else if(e.keyCode == 40) {
		positionY+=tileSize;
		$("#player").removeClass();
	}
	//prevent keydown when still animating
	if(!animating && isWalkable((positionY/tileSize),(positionX/tileSize))){
		animating = true;
		$("#player").animate({"top":positionY+"px","left":positionX+"px"},750,function(){
			animating = false;
		});
	}
});

$(document).ready(function(){
	//draw the board
	for (var y = 0; y < map.length; y++){
		$("#board").append("<div class='row'></div>");
		for (var x = 0; x < map[y].length; x++){
			$("#board").find(".row").eq(y).append("<div class='"+getTileClass(y,x)+"'></div>");
		}
	}
	
	//float the avatar thingy
	floatPlayer();
})