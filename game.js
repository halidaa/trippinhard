var tileSize = 100;
var realMap = [	[0,0,"h1p",0,"h2p",0,"h3p","t2y","t1g","t4p",  			1,1,1,0,0,0,0,0,0,0,									0,0,0,0,0,0,"g2",0,0,0],
			[0,"h1y",0,"h2y",0,"h3y",0,"t1p","t3b","t1y",  			0,1,0,0,0,0,"carrot",0,0,0,								0,0,0,0,0,"d2","dragon",0,0,0],
			[0,1,1,1,1,1,1,1,1,1,  									0,1,1,1,1,1,"t",1,1,1,									1,1,0,0,0,"d1","t",0,0,0],
			[0,1,0,"h3r","rosa","t1r","t2r","t3r","t4r",1,  		"w1","b","w2","w3","w4","w5","w1","w2","w3","w4",		0,1,1,1,1,1,1,0,0,0],
			[0,1,1,1,"t",1,1,1,1,1,  								0,"t","amber",0,0,0,0,0,0,0,							0,0,0,0,"s1",0,0,0,0,0],
			[0,1,0,0,0,0,0,0,0,0,  									0,"l2",0,0,0,0,0,0,0,0,									0,0,0,0,0,0,0,0,0,0], 
			
			[0,1,0,0,0,0,"h1p","h2r","h3r",0,  						0,"g1",0,0,0,0,0,0,0,0],
			[0,1,1,0,2,0,"h1g","h2b","h3g",0,  						"redguard-right","t","redguard-left",0,0,0,0,0,0,0],
			[0,0,1,"t","scarlett",0,"h1y","h2b","h3b",0,  			0,1,0,0,0,0,0,0,0,0],
			[0,0,0,1,1,0,"h1y","h2y","h3g",0,  						0,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,"h1p","h2r","h3p",0,  						0,1,0,0,0,0,0,0,0,0],
			[2,0,2,0,2,1,1,1,1,1,  									1,1,0,0,0,0,0,0,0,0]
		  ];

var map = [
	["t3b",0,0,0,0,0,0,0,"t3p",0,									1,1,1,0,0,0,0,"c1",0,0,										0,0,0,0,0,"c1","g2","c1",0,0],
	[0,"vernon","t2b",0,"t2p","h3p",0,0,0,0,						0,0,1,"s1",0,0,0,0,"carrot",0,								0,"c1",0,0,"c1","d2","dragon",0,"c1",0],
	[0,"t",1,1,1,1,0,"t4r","t2r",0,									0,0,1,1,1,1,"t",1,1,1,										1,1,1,0,0,"d1","t","w2","w1","w3"],
	[0,1,0,0,0,1,"rosa","h2r","t3r","t1r",							"w4","w1","w2","w4","b","w5","w1","w2","w3","w4",			"w1","w1","bw","w2","w1","w1",1,"w2","w1","w1"],
	[0,1,"h2y","t2y",0,1,"t",1,1,1,									0,0,0,0,"t","amber",0,0,0,0,								0,0,1,0,"c1",0,1,"w1","w3","w4"],
	["t4g",1,0,0,0,0,0,0,0,1,										0,"c1",0,0,"l2",0,"c1",0,0,0,								0,0,1,1,1,1,1,0,0,0],

	[0,1,"t1b","t4p",0,0,"h1p","h2r","h3r",0,						0,0,0,0,"g1",0,0,0,0,0],
	[0,1,1,1,1,0,"h1g","h2b","h3g",0,								0,0,0,"redguard-right","t","redguard-left",0,0,0,0],
	[0,0,0,0,"t","scarlett","h1y","h2b","h3b",0,					0,0,0,0,1,0,0,0,0,0],
	[0,"t2y",0,0,1,0,"h1y","h2y","h3g",0,							"t2r","t2r","t2r","t2r",1,"t2r","t2r","t2r","t2r","t2r"],
	[1,1,1,1,1,0,"h1p","h2r","h3p",0,								0,0,0,0,1,0,0,0,0,0],
	["h1y","h2b",0,0,1,1,1,1,1,1,									1,1,1,1,1,1,1,1,1,1]
];
		 
var floatValue = 10;
var flyValue = 85;
//var animating = false;
var offsetY = 0;
var offsetX = 0;
var mapWidthTiles = 10 * tileSize;
var mapHeightTiles = 6 * tileSize;
var npcs = ["rosa", "amber", "redguard-left", "redguard-right", "orangeguard", "ray", "carrot", "scarlett", "vernon", "dragon"];
var timer;
var isInTask = false;
var walkableTiles = ["t", "l2", "bw", "dragon", "g2"];

//Needed for Rosa's tasks
var rosaClasses = ["tree-01-red", "tree-02-red", "tree-03-red", "tree-04-red"];
var rosaAnswers = ["green", "blue", "yellow", "purple"];
var rosaCurrentTask = 0;
var rosaDone = false;

//Needed for Scarlett's tasks
var scarlettClasses = ["purple-wall", "blue-wall", "yellow-wall", "green-wall", "red-wall"];
var scarlettAnswers = ["red", "green", "blue", "yellow", "purple"];
var scarlettCurrentTask = 0;
var scarlettDone = false;

//Needed for Amber's task
var amberClasses = ["bridge"];
var amberAnswers = ["200%"];
var amberCurrentTask = 0;
var amberDone = false;

//Needed for Carrot's task
var carrotClasses = ["carrot"];
var carrotAnswers = ["400%"];
var carrotCurrentTask = 0;
var carrotDone = false;

//Needed for Dragon's task
var dragonClasses = ["trogdor"];
var dragonAnswers = ["33% 50%"];
var dragonCurrentTask = 0;
var dragonDone = false;

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
	else if(typeof map[y][x] === 'string' && walkableTiles.indexOf(map[y][x]) == -1) {
			tileClass += "blank " + map[y][x] + "-tile";
	}
	else{
		if(map[y][x+1] != undefined && (map[y][x+1] == 1 || walkableTiles.indexOf(map[y][x+1]) > -1)){
			tileClass += "right-";
		}
		if(map[y][x-1] != undefined && (map[y][x-1] == 1 || walkableTiles.indexOf(map[y][x-1]) > -1)){
			tileClass += "left-";
		}
		if(map[y-1] != undefined && (map[y-1][x] == 1 || walkableTiles.indexOf(map[y-1][x]) > -1)){
			tileClass += "top-"
		}
		if(map[y+1] != undefined && (map[y+1][x] == 1 || walkableTiles.indexOf(map[y+1][x]) > -1)){
			tileClass += "bottom-";
		}
		tileClass += "open";
	}
	
	if(map[y][x] == "t"){ //talk space
		tileClass += " talk-tile";
	}
	if(map[y][x] == "bw"){ //bridge walkable space
		tileClass = "tile bw-tile";
	}
	if(map[y][x] == "g2"){ //gate 2 space
		tileClass = "tile blank g2-tile";
	}
	
	return tileClass;
}

function typeWrite(target) {
  var textHolder = target.text();
  target.text("");
  var toWrite = "";
  var index = 0;
  var interval = setInterval(function() {
    if (index == textHolder.length) {
      interval.clear();
    } else {
      toWrite += textHolder[index];
      index++;
      target.text(toWrite);
    }
  }, 100)
}

function isWalkable(y,x){
	if(y < 0 || y > map.length) return false;
	else if (x < 0 || x > map[0].length) return false;
	else return map[y][x] == 1 || walkableTiles.indexOf(map[y][x]) > -1;
}

function floatPlayer(){
	$("#player").animate({"margin-top":"+="+floatValue},650,function(){
			floatValue = floatValue*-1;
			floatPlayer();
		}
	)
}

function animateCompanion(){
	$("#player .companion").animate({"left":flyValue+"%","margin-top":floatValue+"px"},850,function(){
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
	if(carrotDone) 	$('.carrot-tile').append('<div class="carrot"></div>');
	else 			$('.carrot-tile').append('<div class="tiny-carrot"></div>');
	$('.redguard-right-tile').append('<div class="redguard-right"></div>');
	$('.redguard-left-tile').append('<div class="redguard-left"></div>');
	$('.g1-tile').append('<div class="gate-lv1"></div>');
	$('.g2-tile').append('<div class="gate-lv2"></div>');
	$('.w1-tile').append('<div class="water-tiles-01"></div>');
	$('.w2-tile').append('<div class="water-tiles-02"></div>');
	$('.w3-tile').append('<div class="water-tiles-03"></div>');
	$('.w4-tile').append('<div class="water-tiles-04"></div>');
	$('.w5-tile').append('<div class="water-tiles-05"></div>');
	$('.b-tile').append('<div class="bridge-50"></div>');
	$('.bw-tile').append('<div class="bridge-100"></div>');
	$('.d2-tile').append('<div class="d2"></div>');
	$('.s1-tile').append('<div class="sandhouse-01"></div>');
	$('.c1-tile').append('<div class="cactus-01"></div>');
	
	var  assetColors = ["red", "blue", "green", "yellow", "purple"];
	for(var i = 0; i < assetColors.length; i++) {
		//4 types of Trees
		for(var t = 1; t < 5; t++) { 
			$('.t' + t + assetColors[i][0] + '-tile').append('<div class="tree-0' + t + '-' + assetColors[i] + '"></div>');
		}
		//3 types of Houses
		for(var h = 1; h < 4; h++) {
			$('.h' + h + assetColors[i][0] + '-tile').append('<div class="house-0' + h + '-' + assetColors[i] + '"></div>');
		}
	}

	if($("#player").length < 1)
		$("#map").append("<div id='player'><div class='companion'></div></div>");
}

//Totally using this for things that aren't just talking to NPCs
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
	
	//Transition from red world to yellow world
	if(talkable == "l2") {
		$('#world').removeClass('red');
		$('#world').addClass('yellow');
	}
	
	//Call gameOver when you walk through the yellow world's gate
	if(talkable == "g2") {
		gameOver();
	}
}

function gameOver() {
	$('body').html('').append('<img id="endImage" src="end.gif" />')
}

function rosaTask() {
	if(timer)
		clearTimeout(timer);
	
	if(rosaCurrentTask >= rosaClasses.length) {
		characters["rosa"].hasTask = false;
		isInTask = false;
		closeDialog();
		$('#task').hide();
		
		$('.t1r-tile').html('').append('<div class="tree-01-green"></div>');
		$('.t2r-tile').html('').append('<div class="tree-02-blue"></div>');
		$('.t3r-tile').html('').append('<div class="tree-03-yellow"></div>');
		$('.t4r-tile').html('').append('<div class="tree-04-purple"></div>');
		map[3][9] = "t1g";
		map[2][8] = "t2b";
		map[3][8] = "t3y";
		map[2][7] = "t4p";
		rosaDone = true;

		$(".content").html("Try talking to people!");
		
		return;
	}

	showTaskDialog(characters["rosa"],characters["rosa"].tasks[rosaCurrentTask]);
	$('#task').show();
	$('#task').append('<img id="rosaImage" src="trees/task-' + rosaClasses[rosaCurrentTask] + '.png" height="400" width="400" />');
	if(rosaCurrentTask < 2) {
		$('.content').html('.' + rosaClasses[rosaCurrentTask].replace('-red','') + ' { <br />' + 
						   '&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;<input type="text" id="answer" placeholder="__________">;<br />}');
	}
    else {
		$('.content').html('.' + rosaClasses[rosaCurrentTask].replace('-red','') + ' { <br />' + 
						   '&nbsp;&nbsp;&nbsp;&nbsp;    <input type="text" id="answer" placeholder="color:&nbsp;__________">;<br />}');
   }
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
		isInTask = false;
		closeDialog();
		$('#task').hide();
		
		$('.h1p-tile[data-x="6"][data-y="6"]').html('').append('<div class="house-01-red"></div>');
		$('.h2b-tile[data-x="7"][data-y="7"]').html('').append('<div class="house-02-green"></div>');
		$('.h1y-tile[data-x="6"][data-y="8"]').html('').append('<div class="house-01-blue"></div>');
		$('.h3g-tile[data-x="8"][data-y="9"]').html('').append('<div class="house-03-yellow"></div>');
		$('.h2r-tile[data-x="7"][data-y="10"]').html('').append('<div class="house-02-purple"></div>');
		map[6][6] = "h1r";
		map[7][7] = "h2g";
		map[8][6] = "h1b";
		map[9][8] = "h3y";
		map[10][7] = "h2p";

		scarlettDone = true;
		$(".content").html("Try talking to people!");
		
		return;
	}
	showTaskDialog(characters["scarlett"],characters["scarlett"].tasks[scarlettCurrentTask]);
	$('#task').show();
	$('#task').append('<img id="scarlettImage" src="walls/' + scarlettClasses[scarlettCurrentTask] + '.png" height="400" width="600" />');
	if(scarlettCurrentTask < 3) {
		$('.content').html('.'+ scarlettClasses[scarlettCurrentTask] +' { <br />' +
							   '<input type="text" class="scarlettTaskAnswers" id="answer" name="partTwo" placeholder="background-color:&nbsp;_____;"> <br />' +
						   '}');
		$('#answer').focus();
	}
	else {
		$('.content').html('<input type="text" class="scarlettTaskAnswers" id="partOne" name="partOne" placeholder=".'+ scarlettClasses[scarlettCurrentTask] +'"> { <br />' +
						   '<input type="text" class="scarlettTaskAnswers" id="partTwo" name="partTwo" placeholder="background-color:&nbsp;_____;"> <br />' +
					   '}');
	    $('#partOne').focus();
	}
	//'.' + scarlettClasses[scarlettCurrentTask] + ' { <br />background-color:&nbsp;<span id="answer" contenteditable="true"> </span>;<br />}')
	
	
	$('.scarlettTaskAnswers').on('keyup', function(e) {
		if(!$(this).html())
			$(this).html('&nbsp;');
		if (e.keyCode == 13) {
			e.preventDefault();
			$("#submit").click();
		}
	});
}

function amberTask() {
	if(timer)
		clearTimeout(timer);
	
	if(amberCurrentTask >= amberClasses.length) {
		characters["amber"].hasTask = false;
		isInTask = false;
		closeDialog();
		$('#task').hide();
		
		$('.b-tile').html('').append('<div class="bridge-100"></div>');
		map[3][14] = "bw";
		amberDone = true;
		$(".content").html("Try talking to people!");
		
		return;
	}
	showTaskDialog(characters["amber"],characters["amber"].tasks[amberCurrentTask]);
	$('#task').show();
	$('#task').append('<img id="amberImage" src="bridge/task-' + amberClasses[amberCurrentTask] + '-50.png" height="400" width="400" />');
	
	$('.content').html('<input type="text" class="amberTaskAnswers" id="partOne" name="partOne" placeholder=".'+ amberClasses[amberCurrentTask] +' {"><br />' +
					   '&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" class="amberTaskAnswers" id="partTwo" name="partTwo" placeholder="width:&nbsp;_____;"> <br />' +
					   '<input type="text" class="amberTaskAnswers" id="partThree" name="partThree" placeholder="}">');
	$('#partOne').focus();
	
	$('.amberTaskAnswers').on('keyup', function(e) {
		if(!$(this).html())
			$(this).html('&nbsp;');
		if (e.keyCode == 13) {
			e.preventDefault();
			$("#submit").click();
		}
	});
}

function carrotTask() {
	if(timer)
		clearTimeout(timer);
	
	if(carrotCurrentTask >= carrotClasses.length) {
		characters["carrot"].hasTask = false;
		isInTask = false;
		closeDialog();
		$('#task').hide();
		
		$('.carrot-tile').html('').append('<div class="carrot"></div>');
		map[3][11] = "bw";
		carrotDone = true;
		$(".content").html("Try talking to people!");
		
		return;
	}
	showTaskDialog(characters["carrot"],characters["carrot"].tasks[carrotCurrentTask]);
	$('#task').show();
	$('#task').append('<img id="carrotImage" src="npc/tiny-' + carrotClasses[carrotCurrentTask] + '-front.png" height="400" width="400" />');
	$('.content').html('.' + carrotClasses[carrotCurrentTask] + ' { <br />height:&nbsp;<span id="answer" contenteditable="true"> </span>;<br />}')
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

function dragonTask() {
	if(timer)
		clearTimeout(timer);
	
	if(dragonCurrentTask >= dragonClasses.length) {
		characters["dragon"].hasTask = false;
		isInTask = false;
		closeDialog();
		$('#task').hide();
		
		$('.d1-tile').append('<div class="d1"></div>');
		$('.d2-tile').html('');
		dragonDone = true;
		$(".content").html("Try talking to people!");
		
		return;
	}
	showTaskDialog(characters["dragon"],characters["dragon"].tasks[dragonCurrentTask]);
	$('#task').show();
	$('#task').append('<img id="dragonImage" src="task-trogdor.png" height="400" width="400" />');
	$('.content').html('.' + dragonClasses[dragonCurrentTask] + ' { <br />' + 
																	'width:&nbsp;<span id="answer" contenteditable="true"> </span>;<br />' + 
																	'height:&nbsp;<span id="answer2" contenteditable="true"> </span>;<br />' + 
																 '}')
	$('#answer').focus();
	
	$('#answer').on('keyup', function(e) {
		if(!$(this).html())
			$(this).html('&nbsp;');
		if (e.keyCode == 13) {
			e.preventDefault();
			$('#answer2').focus();
		}
	});
	
	$('#answer2').on('keyup', function(e) {
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
		case "Amber Dawn": 
			isInTask = true;
			amberTask();
			break;
		case "Charles 'Carrot' Rodriguez": 
			isInTask = true;
			carrotTask();
			break;
		case "Trogdor": 
			isInTask = true;
			dragonTask();
			break;
		case "Guard of the Red Gate":
			break;
		case "Schme Schmo":
			closeDialog();
			break;
	}
}

$(document).one("keyup",function(e) {
	if(!isOnDialog) return;
	if(e.keyCode==37) {
		$("#speech-panel-wrapper .prev-button").click();
	} else if(e.keyCode==39) {
		$("#speech-panel-wrapper .next-button").click();
		nextLine();
	} else if(e.keyCode==38) {
		$("#speech-panel-wrapper .prev-button").click();
	} else if(e.keyCode==40) {
		$("#speech-panel-wrapper .next-button").click();
	}
})
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

	//It's gross, but this will move ya up twice when ya go through the red gate
	if(map[Math.ceil(pY)][Math.ceil(pX)] == "g1") {
		positionY-=tileSize;
		pY = ((positionY+offsetY)/tileSize);
	}
	
	//prevent keydown when still animating
	if(shouldAnimate && isWalkable(pY,pX)){
		//animating = true;
		//$("#player").stop().animate({"top":positionY+"px","left":positionX+"px"},400,"linear",function(){
			$("#player").css({"top":positionY+"px","left":positionX+"px"})
			
			if(right && pX % (mapWidthTiles/tileSize) == 0) {
				offsetX += mapWidthTiles;
				$('#map').children('.row').remove();
				$('#player').remove();
				drawMap(offsetY/tileSize, offsetX/tileSize);
				$("#player").css({"top":positionY+"px","left":"0px"});
				positionX = 0;
			}
			if(left && (pX+1) % (mapWidthTiles/tileSize) == 0) {
				offsetX -= mapWidthTiles;
				$('#map').children('.row').remove();
				$("#player").remove();
				drawMap(offsetY/tileSize, offsetX/tileSize);
				var leftOffset = mapWidthTiles - tileSize;
				$("#player").css({"top":positionY+"px","left":leftOffset+"px"});
				positionX = leftOffset;
			}
			
			if(down && pY % (mapHeightTiles/tileSize) == 0) {
				offsetY += mapHeightTiles;
				$('#map').children('.row').remove();
				$("#player").remove();
				drawMap(offsetY/tileSize, offsetX/tileSize);
				$("#player").css({"top":"0px","left":positionX+"px"});
				positionY = 0;
			}
			if(up && (pY+1) % (mapHeightTiles/tileSize) == 0) {
				offsetY -= mapHeightTiles;
				$('#map').children('.row').remove();
				$("#player").remove();
				drawMap(offsetY/tileSize, offsetX/tileSize);
				var topOffset = mapHeightTiles - tileSize;
				$("#player").css({"top":topOffset+"px","left":positionX+"px"});
				positionY = topOffset;
			}
		//});
	}
	
	talk(Math.ceil(pY),Math.ceil(pX));
});

$(document).ready(function(){
	$('#task').hide();
	$('#submit').on('click', function() {
		var possibleColors = ["red","yellow","blue","purple","green","pink","white","black","brown","aqua","orange","coral","violet"];
		
		//ROSA
		if(!rosaDone) {
			var answer = $('#answer').val().split('&nbsp;').join('').split('<br>').join('').trim();
			if(rosaCurrentTask < 2) {
				if(answer == rosaAnswers[rosaCurrentTask]){
					$('#rosaImage').attr('src', 'trees/task-' + rosaClasses[rosaCurrentTask].replace('red', rosaAnswers[rosaCurrentTask]) + '.png');
					showTaskDialog(characters["rosa"],characters["rosa"].positiveFeedback);
					timer = setTimeout(function(){ 
						//TODO: Dialog
						rosaCurrentTask++;
						$('#task').html('');
						rosaTask();
					}, 2500);  
				}
				else {
					if(possibleColors.indexOf(answer) > -1){
						showTaskDialog(characters["rosa"],characters["rosa"].negativeFeedback[1]);
					}else{
						showTaskDialog(characters["rosa"],characters["rosa"].negativeFeedback[0]);
					}
					setTimeout(function(){
						showTaskDialog(characters["rosa"],characters["rosa"].tasks[rosaCurrentTask]);
						$('#answer').text("");
						$('#answer').focus();
					}, 2500)
				}
			}
			else if (rosaCurrentTask >= 2) {
				answer = answer.split(' ').join('');
				if(answer == ('color:'+rosaAnswers[rosaCurrentTask])){
					$('#rosaImage').attr('src', 'trees/task-' + rosaClasses[rosaCurrentTask].replace('red', rosaAnswers[rosaCurrentTask]) + '.png');
					showTaskDialog(characters["rosa"],characters["rosa"].positiveFeedback);
					timer = setTimeout(function(){ 
						//TODO: Dialog
						rosaCurrentTask++;
						$('#task').html('');
						rosaTask();
					}, 2500);  
				}
				else {
					if(answer.indexOf('color') == -1){
						showTaskDialog(characters["rosa"],characters["rosa"].negativeFeedback[2]); //forgot 'color'
					}else if (answer.indexOf(':') == -1){
						showTaskDialog(characters["rosa"],characters["rosa"].negativeFeedback[3]); //forgot ':'
					}
					else {
						showTaskDialog(characters["rosa"],characters["rosa"].negativeFeedback[4]);
					}
					setTimeout(function(){
						showTaskDialog(characters["rosa"],characters["rosa"].tasks[rosaCurrentTask]);
						$('#answer').text("");
						$('#answer').focus();
					}, 2500)
				}
			}
		}
		
		//SCARLETT
		if(rosaDone && !scarlettDone) {
			if(scarlettCurrentTask < 3) {
				var answer = $('#answer').val().split('&nbsp;').join('').split('<br>').join('').split(' ').join('').trim(); //reallllly chopping up this answer lol
				if(answer == ('background-color:'+scarlettAnswers[scarlettCurrentTask]+';')){
					$('#scarlettImage').attr('src', 'walls/' + scarlettClasses[scarlettCurrentTask] + '-done.png');
					showTaskDialog(characters["scarlett"],characters["scarlett"].positiveFeedback);
					timer = setTimeout(function(){ 
						//TODO: Dialog
						scarlettCurrentTask++;
						$('#task').html('');
						scarlettTask();
					}, 2500);  
				}
				else {
					if(answer.indexOf('background-color') == -1){
						showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[2]); //forgot 'background-color'
					}else if (answer.indexOf(':') == -1){
						showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[3]); //forgot ':'
					}
					else if (answer.indexOf(scarlettAnswers[scarlettCurrentTask]) == -1){
						showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[4]); //forgot the correct background-color
					}
					else if (answer.indexOf(';') == -1){
						showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[5]); //forgot ';'
					}
					else {
						showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[6]); //catch all
					}
					setTimeout(function(){
						showTaskDialog(characters["scarlett"],characters["scarlett"].tasks[scarlettCurrentTask]);
						$('#answer').text("");
						$('#answer').focus();
					}, 2500);
				}
			}
			else if (scarlettCurrentTask >= 3) {
				var partOne = $('#partOne').val().split('&nbsp;').join('').split('<br>').join('').split(' ').join('').trim(); 
				var partTwo = $('#partTwo').val().split('&nbsp;').join('').split('<br>').join('').split(' ').join('').trim(); 
				if(partOne == ('.' + scarlettClasses[scarlettCurrentTask])) {
					if(partTwo == ('background-color:'+scarlettAnswers[scarlettCurrentTask]+';')){
						$('#scarlettImage').attr('src', 'walls/' + scarlettClasses[scarlettCurrentTask] + '-done.png');
						showTaskDialog(characters["scarlett"],characters["scarlett"].positiveFeedback);
						timer = setTimeout(function(){ 
							//TODO: Dialog
							scarlettCurrentTask++;
							$('#task').html('');
							scarlettTask();
						}, 2500);  
					}
					else {
						if(partTwo.indexOf('background-color') == -1){
							showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[2]); //forgot 'background-color'
						}else if (partTwo.indexOf(':') == -1){
							showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[3]); //forgot ':'
						}
						else if (partTwo.indexOf(scarlettAnswers[scarlettCurrentTask]) == -1){
							showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[4]); //forgot the correct background-color
						}
						else if (partTwo.indexOf(';') == -1){
							showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[5]); //forgot ';'
						}
						else {
							showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[6]); //catch all
						}
						setTimeout(function(){
							showTaskDialog(characters["scarlett"],characters["scarlett"].tasks[scarlettCurrentTask]);
							$('#partTwo').text("");
							$('#partTwo').focus();
						}, 2500);
					}
				}
				else {
					if(partOne.indexOf('.') == -1) { //forgot the .
						showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[0]); //forgot 'background-color'
					}else if (partOne.indexOf(scarlettClasses[scarlettCurrentTask]) == -1){
						showTaskDialog(characters["scarlett"],characters["scarlett"].negativeFeedback[1]); //forgot class name
					}
					setTimeout(function(){
							showTaskDialog(characters["scarlett"],characters["scarlett"].tasks[scarlettCurrentTask]);
							$('#partOne').text("");
							$('#partOne').focus();
						}, 2500);
				}
			}
		}
		
		//AMBER
		if(rosaDone && scarlettDone) {
			var answer;
			var partOne = $('#partOne').val().split('&nbsp;').join('').split('<br>').join('').split(' ').join('').trim(); 
			var partTwo = $('#partTwo').val().split('&nbsp;').join('').split('<br>').join('').split(' ').join('').trim(); 
			var partThree = $('#partThree').val().split('&nbsp;').join('').split('<br>').join('').split(' ').join('').trim(); 
			
			if(partOne == ('.' + amberClasses[amberCurrentTask] + '{')) {
				if(partTwo == ('width:'+amberAnswers[amberCurrentTask]+';')){
					if(partThree == '}') {
						$('#amberImage').attr('src', 'bridge/task-' + amberClasses[amberCurrentTask] + '-100.png');
						showTaskDialog(characters["amber"],characters["amber"].positiveFeedback);
						timer = setTimeout(function(){ 
							//TODO: Dialog
							amberCurrentTask++;
							$('#task').html('');
							amberTask();
						}, 3000);  
					}
					else {
						if(partThree.indexOf('}') == -1){
							showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[8]); //forgot '}'
						} else {
							showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[9]); //catch all
						}
						setTimeout(function(){
							showTaskDialog(characters["amber"],characters["amber"].tasks[amberCurrentTask]);
							$('#partThree').text("");
							$('#partThree').focus();
						}, 3000);
					}
				}
				else {
					if(partTwo.indexOf('width') == -1){
						showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[3]); //forgot 'width'
					}else if (partTwo.indexOf(':') == -1){
						showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[4]); //forgot ':'
					}
					else if (partTwo.indexOf(amberAnswers[amberCurrentTask].replace('%','')) == -1){
						showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[5]); //forgot the correct width
					}
					else if (partTwo.indexOf(amberAnswers[amberCurrentTask]) == -1){
						showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[6]); //forgot the correct width
					}
					else if (partTwo.indexOf(';') == -1){
						showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[7]); //forgot ';'
					}
					else {
						showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[9]); //catch all
					}
					setTimeout(function(){
						showTaskDialog(characters["amber"],characters["amber"].tasks[amberCurrentTask]);
						$('#partTwo').text("");
						$('#partTwo').focus();
					}, 3000);
				}
			}
			else {
				if(partOne.indexOf('.') == -1) { //forgot the .
					showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[0]); //forgot '.'
				}else if (partOne.indexOf(amberClasses[amberCurrentTask]) == -1){
					showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[1]); //forgot class name
				}
				else if (partOne.indexOf('{') == -1){
					showTaskDialog(characters["amber"],characters["amber"].negativeFeedback[2]); //forgot '{'
				}
				setTimeout(function(){
						showTaskDialog(characters["amber"],characters["amber"].tasks[amberCurrentTask]);
						$('#partOne').text("");
						$('#partOne').focus();
					}, 3000);
			}
		}
		
		//CARROT
		if(rosaDone && scarlettDone && amberDone) {
			var answer = $('#answer').html().replace('&nbsp;', '').replace('<br>', '').trim();
			if(answer == carrotAnswers[carrotCurrentTask]){
				$('#carrotImage').attr('src', 'npc/' + carrotClasses[carrotCurrentTask] + '-front.png');
				showTaskDialog(characters["carrot"],characters["carrot"].positiveFeedback);
				timer = setTimeout(function(){ 
					carrotCurrentTask++;
					$('#task').html('');
					carrotTask();
				}, 2000);  
			}
			else {
				showTaskDialog(characters["carrot"],characters["carrot"].negativeFeedback);
				setTimeout(function(){
					showTaskDialog(characters["carrot"],characters["carrot"].tasks[carrotCurrentTask]);
					$('#answer').focus();
				}, 2000)
			}
		}
		
		//TROGDOR
		if(rosaDone && scarlettDone && amberDone && carrotDone) {
			var answer = $('#answer').html().replace('&nbsp;', '').replace('<br>', '').trim();
			var width = $('#answer').html().replace('&nbsp;', '').split('<br>').join('').trim();
			var height = $('#answer2').html().replace('&nbsp;', '').split('<br>').join('').trim();
			
			if(width == '33%' && height == '50%'){ //Hardcoding because tired
				$('#dragonImage').attr('src', 'trogdor100.png');
				$('#dragonImage').css('width','100');
				$('#dragonImage').css('height','100');
				showTaskDialog(characters["dragon"],characters["dragon"].positiveFeedback);
				timer = setTimeout(function(){ 
					dragonCurrentTask++;
					$('#task').html('');
					dragonTask();
				}, 2000);  
			}
			else {
				showTaskDialog(characters["dragon"],characters["dragon"].negativeFeedback);
				setTimeout(function(){
					showTaskDialog(characters["dragon"],characters["dragon"].tasks[dragonCurrentTask]);
					$('#answer').focus();
				}, 2000)
			}
		}
	});
	
	//change it to drawMap(0,0) to start from the actual start!
	//draw the board
	//offsetX = 1000;//2000;
	//offsetY = 0;
	//drawMap(offsetY/tileSize, offsetX/tileSize);
	drawMap(0,0);
	
	//float the avatar thingy
	floatPlayer();
	
	//make the companion fly around
	animateCompanion();
	
	//show schmo's intro
	showDialog(characters["schmo"]);
})