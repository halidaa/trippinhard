var tileSize = 100;
var map = [	[0,0,"h1p",0,"h2r",0,"h3y","t2y","t1g","t4p",  1,1,1,0,0,0,0,0,0,0],
			[0,"h2y",0,"h3g",0,"h1b",0,"t1p","t3b","t1y",  0,1,0,0,0,0,0,0,0,0],
			[0,1,1,1,1,1,1,1,1,1,  0,1,1,1,1,1,1,1,1,1],
			[0,1,0,0,"rosa","t1r","t2r","t3r","t4r",1,  0,1,0,0,0,0,0,0,0,0],
			[0,1,1,1,"t",1,1,1,1,1,  0,1,0,0,0,0,0,0,0,0],
			["redguard-right","t","redguard-left",0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0], 
			
			[0,1,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0],
			[0,1,1,0,2,0,0,3,0,0,  0,0,0,0,0,0,0,0,0,0],
			[0,0,1,"t","scarlett",0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0],
			[0,0,0,1,1,0,0,"amber","vernon",0,  "rosa",0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,0,0,0,0,  "t",0,0,0,0,0,0,0,0,0],
			[2,0,2,0,2,1,1,1,1,1,  1,0,0,0,0,0,0,0,0,0],
	
			[0,1,0,0,0,0,1,0,0,0,  0,0,1,0,0,0,0,0,0,0], 
			[0,1,0,0,0,0,0,0,0,0,  0,0,1,0,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,0,0,0,  0,0,1,1,1,0,0,0,0,0],
			[0,1,0,0,0,0,0,0,0,0,  0,0,0,0,1,0,0,0,0,0],
			[0,1,0,0,0,0,0,0,0,0,  0,0,0,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0]
		  ];
		 
var floatValue = 10;
var flyValue = 85;
var animating = false;
var offsetY = 0;
var offsetX = 0;
var mapWidthTiles = 10 * tileSize;
var mapHeightTiles = 6 * tileSize;
var npcs = ["rosa", "amber", "redguard-left", "redguard-right", "orangeguard", "ray", "carrot", "scarlett", "vernon"];
var timer;
var isInTask = false;

//Needed for Rosa's tasks
var rosaClasses = ["tree-01-red", "tree-02-red", "tree-03-red", "tree-04-red"];
var rosaAnswers = ["blue", "green", "yellow", "purple"];
var rosaCurrentTask = 0;

//Needed for Scarlett's tasks
var scarlettClasses = ["DOOR", "WALL", "FENCES"];
var scarlettAnswers = ["brown", "white", "red"];
var scarlettCurrentTask = 0;

function getTileClass(y,x){
	var tileClass = "tile ";
	if(map[y][x] == 0){
		tileClass += "blank";
	}
	else if(map[y][x] == 2){ //houses
		tileClass += "blank house-tile";
	}
	else if(map[y][x] == 3){ //buildings
		tileClass += "blank building-tile";
	}
	else if(typeof map[y][x] === 'string' && map[y][x] != "t") {
			tileClass += "blank " + map[y][x] + "-tile";
	}
	else{
		if(map[y][x+1] != undefined && (map[y][x+1] ==1 || map[y][x+1] == "t")){
			tileClass += "right-";
		}
		if(map[y][x-1] != undefined && (map[y][x-1] ==1 || map[y][x-1] == "t")){
			tileClass += "left-";
		}
		if(map[y-1] != undefined && (map[y-1][x] == 1 || map[y-1][x] == "t")){
			tileClass += "top-"
		}
		if(map[y+1] != undefined && (map[y+1][x] == 1 || map[y+1][x] == "t")){
			tileClass += "bottom-";
		}
		tileClass += "open";
	}
	
	if(map[y][x] == "t"){ //talk space
		tileClass += " talk-tile";
	}
	
	return tileClass;
}

function isWalkable(y,x){
	if(y < 0 || y > map.length) return false;
	else if (x < 0 || x > map[0].length) return false;
	else return map[y][x] == 1 || map[y][x] == "t";
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

//minus y in height and eq();
function drawMap(yCoord,xCoord){
	$("#map").height((map.length - yCoord) * 100).width(map[0].length * 100);
	for (var y = yCoord; y < map.length; y++){
		$("#map").append("<div class='row'></div>");
		for (var x = xCoord; x < map[y].length; x++){
			$("#map").find(".row").eq(y - yCoord).append("<div class='"+getTileClass(y,x)+"' data-x='"+x+"' data-y='"+y+"'></div>");
		}
	}
	
	//Adds the images to their respective tiles
	$('.house-tile').append('<div class="house"></div>');
	$('.building-tile').append('<div class="building"></div>');
	$('.rosa-tile').append('<div class="rosa"></div>');
	$('.scarlett-tile').append('<div class="scarlett"></div>');
	$('.vernon-tile').append('<div class="vernon"></div>');
	$('.amber-tile').append('<div class="amber"></div>');
	$('.redguard-right-tile').append('<div class="redguard-right"></div>');
	$('.redguard-left-tile').append('<div class="redguard-left"></div>');
	
	var  colors = ["red", "blue", "green", "yellow", "purple"];
	for(var i = 0; i < colors.length; i++) {
		//Trees
		for(var t = 1; t < 5; t++) {
			$('.t' + t + colors[i][0] + '-tile').append('<div class="tree-0' + t + '-' + colors[i] + '"></div>');
		}
		//Houses
		for(var h = 1; h < 4; h++) {
			$('.h' + h + colors[i][0] + '-tile').append('<div class="house-0' + h + '-' + colors[i] + '"></div>');
		}
	}
}

function talk(pY, pX) {
	var talkable = map[pY][pX];
	if(talkable == "t") {
		if(map[pY][pX+1] != undefined && npcs.indexOf(map[pY][pX+1]) > -1 && $("#player").hasClass('right')){
			showDialog(characters[map[pY][pX+1]]);
		}
		if(map[pY][pX-1] != undefined && npcs.indexOf(map[pY][pX-1]) > -1 && $("#player").hasClass('left')){
			showDialog(characters[map[pY][pX-1]]);
		}
		if(map[pY-1] != undefined && npcs.indexOf(map[pY-1][pX]) > -1 && $("#player").hasClass('top')){
			showDialog(characters[map[pY-1][pX]]);
		}
		if(map[pY+1] != undefined && npcs.indexOf(map[pY+1][pX]) > -1 && $("#player").hasClass('bottom')){
			showDialog(characters[map[pY+1][pX]]);
		}
	}
}

function rosaTask() {
	if(timer)
		clearTimeout(timer);
	
	if(rosaCurrentTask >= rosaClasses.length) {

		characters["rosa"].hasTask = false;
		closeDialog();
		$('#task').hide();
		isInTask = false;
		
		$('.t1r-tile').html('').append('<div class="tree-01-blue"></div>');
		$('.t2r-tile').html('').append('<div class="tree-02-green"></div>');
		$('.t3r-tile').html('').append('<div class="tree-03-yellow"></div>');
		$('.t4r-tile').html('').append('<div class="tree-04-purple"></div>');
		
		return;
	}

	showTaskDialog(characters["rosa"],characters["rosa"].tasks[rosaCurrentTask]);
	$('#task').show();
	$('#task').append('<img id="rosaImage" src="trees/' + rosaClasses[rosaCurrentTask] + '.png" height="400" width="400" />');
	$('.content').html('.' + rosaClasses[rosaCurrentTask].replace('-red','') + ' { <br />&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;<span id="answer" contenteditable="true"> </span>;<br />}')
	$('#answer').focus();
	
	$('#answer').on('keyup', function(e) {
		if(!$(this).html())
			$(this).html('&nbsp;');
		if (e.keyCode == 13) {
			e.preventDefault();
			$("#submit").click();
		}
	});
}

function scarlettTask() {
	if(timer)
		clearTimeout(timer);
	
	if(scarlettCurrentTask >= scarlettClasses.length) {
		characters["scarlett"].hasTask = false;
		closeDialog();
		$('#task').hide();
		isInTask = false;
		return;
	}
	showTaskDialog(characters["scarlett"],characters["scarlett"].tasks[scarlettCurrentTask]);
	$('#task').show();
	$('#task').append('<img id="scarlettImage" src="' + scarlettClasses[scarlettCurrentTask] + '.png" />');
	$('.content').html('.' + scarlettClasses[scarlettCurrentTask] + ' { <br />background-color:&nbsp;<span id="answer" contenteditable="true"> </span>;<br />}')
	$('#answer').focus();
	
	$('#answer').on('keyup', function(e) {
		if(!$(this).html())
			$(this).html('&nbsp;');
		if (e.keyCode == 13) {
			e.preventDefault();
			$("#submit").click();
		}
	});
}

function startTask() {
	switch (characterName) {
		case "Rosa Redrose":
			isInTask = true;
			rosaTask();
			break;
		case "Scarlett Firework":
			isInTask = true;
			$('#programming-panel').css('font-size', '14px');
			scarlettTask();
			break;
		case "Guard of the Red Gate":
			break;
	}
}

$(document).keydown(function(e) {
	if (isInTask) return;
	var up, down, left, right = false;
	var positionX = parseInt($("#player").css("left"));
	var positionY = parseInt($("#player").css("top"));
	var shouldAnimate = false;
	if(e.keyCode==37) {
		//if dialog is on, arrow keys control dialogs
		if(isOnDialog){
			//prevLine();
		}
		//else, it controls the player
		else{
			//only move if already facing that direction
			if($("#player").hasClass("left")){
				positionX-=tileSize;
				left = true;
				shouldAnimate = true;
			}
			$("#player").removeClass().addClass("left");
		}
	} else if(e.keyCode == 39) {
		if(isOnDialog){
			//nextLine();
		}
		else{
			if($("#player").hasClass("right")){
				positionX+=tileSize;
				right = true;
				shouldAnimate = true;
			}
			$("#player").removeClass().addClass("right");
		}
	} else if(e.keyCode==38) {
		if(isOnDialog){
			//prevLine();
		}
		else{
			if($("#player").hasClass("top")){
				positionY-=tileSize;
				up = true;
				shouldAnimate = true;
			}
			$("#player").removeClass().addClass("top");
		}
	} else if(e.keyCode == 40) {
		if(isOnDialog){
			//nextLine();
		}
		else{
			if($("#player").attr("class") == ""){
				positionY+=tileSize;
				down = true;
				shouldAnimate = true;
			}
			$("#player").removeClass();
		}
	}
	var pY = ((positionY+offsetY)/tileSize); //0-5 + offsetY
	var pX = ((positionX+offsetX)/tileSize); //0-9 + offsetX
	//prevent keydown when still animating
	
	if(!animating && shouldAnimate && isWalkable(pY,pX)){
		animating = true;
		$("#player").animate({"top":positionY+"px","left":positionX+"px"},750,function(){
			animating = false;
			
			if(right && pX % (mapWidthTiles/tileSize) == 0) {
				offsetX += mapWidthTiles;
				$('#map').children('.row').remove()
				drawMap(offsetY/tileSize, offsetX/tileSize);
				$("#player").css({"top":positionY+"px","left":"0px"});
				positionX = 0;
			}
			if(left && (pX+1) % (mapWidthTiles/tileSize) == 0) {
				offsetX -= mapWidthTiles;
				$('#map').children('.row').remove()
				drawMap(offsetY/tileSize, offsetX/tileSize);
				var leftOffset = mapWidthTiles - tileSize
				$("#player").css({"top":positionY+"px","left":leftOffset+"px"});
				positionX = leftOffset;
			}
			
			if(down && pY % (mapHeightTiles/tileSize) == 0) {
				offsetY += mapHeightTiles;
				$('#map').children('.row').remove()
				drawMap(offsetY/tileSize, offsetX/tileSize);
				$("#player").css({"top":"0px","left":positionX+"px"});
				positionY = 0;
			}
			if(up && (pY+1) % (mapHeightTiles/tileSize) == 0) {
				offsetY -= mapHeightTiles;
				$('#map').children('.row').remove()
				drawMap(offsetY/tileSize, offsetX/tileSize);
				var topOffset = mapHeightTiles - tileSize;
				$("#player").css({"top":topOffset+"px","left":positionX+"px"});
				positionY = topOffset;
			}
		});
	}
	
	talk(Math.ceil(pY),Math.ceil(pX));
});

$(document).ready(function(){
	$('#task').hide();
	$('#submit').on('click', function() {
		var answer = $('#answer').html().replace('&nbsp;', '').replace('<br>', '').trim();
		
		//ROSA
		if(!(rosaCurrentTask >= rosaClasses.length)) {
			if(answer == rosaAnswers[rosaCurrentTask]){
				$('#rosaImage').attr('src', 'trees/' + rosaClasses[rosaCurrentTask].replace('red', rosaAnswers[rosaCurrentTask]) + '.png');
				showTaskDialog(characters["rosa"],characters["rosa"].positiveFeedback);
				timer = setTimeout(function(){ 
					//TODO: Dialog
					rosaCurrentTask++;
					$('#task').html('');
					rosaTask();
				}, 2000);  
			}
			else {
				showTaskDialog(characters["rosa"],characters["rosa"].negativeFeedback);
				setTimeout(function(){
					showTaskDialog(characters["rosa"],characters["rosa"].tasks[rosaCurrentTask]);
					$('#answer').focus();
				}, 600)
			}
		}
		
		//SCARLETT
		if(!(scarlettCurrentTask >= scarlettClasses.length) && (rosaCurrentTask >= rosaClasses.length)) {
			if(answer == scarlettAnswers[scarlettCurrentTask]){
				$('#scarlettImage').attr('src', scarlettClasses[scarlettCurrentTask] + '_DONE.png');
				showTaskDialog(characters["scarlett"],characters["scarlett"].positiveFeedback);
				timer = setTimeout(function(){ 
					//TODO: Dialog
					scarlettCurrentTask++;
					$('#task').html('');
					scarlettTask();
				}, 2000);  
			}
			else if((rosaCurrentTask >= rosaClasses.length)) {
				showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback);
				setTimeout(function(){
					showTaskDialog(characters["scarlett"],characters["scarlett"].tasks[scarlettCurrentTask]);
					$('#answer').focus();
				}, 600)
			}
		}
	});
	
	//draw the board
	drawMap(0,0);
	
	//float the avatar thingy
	floatPlayer();
	
	//make the companion fly around
	animateCompanion();
})