var isOnDialog = false;

var currentIdx = 0;
var currentLines = [];

var characters = [];
var story = [];

characters["joe"] = {
						"name":"Joe",
						"filename":"player",
						"hometown":"dark-gray"
					};
characters["rosa"] = {
						"name":"Rosa Redrose",
						"filename":"npc/rosa",
						"hometown":"red"
					};
characters["scarlett"] = {
							"name":"Scarlett Firework",
							"filename":"npc/scarlett",
							"hometown":"red"
						};
characters["vernon"] = {
							"name":"Vernon Vermilion",
							"filename":"npc/vernon",
							"hometown":"red"
						};
characters["redguard"] = {
							"name":"Guard of the Red Gate",
							"filename":"npc/redguard",
							"hometown":"red"
						};
characters["amber"] = {
							"name":"Amber Dawn",
							"filename":"npc/amber",
							"hometown":"yellow"
						};
characters["carrot"] = {
							"name":"Charles 'Carrot' Rodriguez",
							"filename":"npc/carrot",
							"hometown":"yellow"
						};
characters["ray"] = {
						"name":"Ray Sunshine",
						"filename":"npc/ray",
						"hometown":"yellow"
					};
characters["orangeguard"] = {
								"name":"Guard of the Orange Gate",
								"filename":"npc/orangeguard",
								"hometown":"yellow"
							};

//takes a character object and an array of lines
function showDialog(character,lines){
	currentLines = lines;
	isOnDialog = true;
	$("#speech-panel-wrapper").fadeIn(400,function(){
		var _speech = $("#speech-panel-wrapper");
		
		$("#speech-panel-wrapper").addClass(character.hometown);
		$("#speech-panel-wrapper").find(".avatar img").attr("src",character.filename+"-avatar.png");
		$("#speech-panel-wrapper").find(".name").text(character.name);
		$("#speech-panel-wrapper").find(".body .speech").html(currentLines[currentIdx]);
		$("#speech-panel-wrapper").find(".body .prev-button").hide();
		if(currentLines.length < 2)
			$("#speech-panel-wrapper").find(".body .next-button").hide();
		
		$("#speech-panel-wrapper").find(".panel").animate({"bottom":0},600);
	})
}

function closeDialog(){
	$("#speech-panel-wrapper .panel").animate({"bottom":"-100%"},400,function(){
		$("#speech-panel-wrapper").fadeOut();
		isOnDialog = false;
	})
}

function nextLine(){
	if(currentIdx < currentLines.length - 1)
		currentIdx ++;
	if(currentIdx == (currentLines.length - 1))
		$("#speech-panel-wrapper").find(".body .next-button").hide();
	if(currentIdx > 0)
		$("#speech-panel-wrapper").find(".body .prev-button").show();
	$("#speech-panel-wrapper").find(".body .speech").html(currentLines[currentIdx]);
}

function prevLine(){
	if(currentIdx > 0)
		currentIdx --;
	if(currentIdx == 0)
		$("#speech-panel-wrapper").find(".body .prev-button").hide();
	if(currentIdx < currentLines.length - 1)
		$("#speech-panel-wrapper").find(".body .next-button").show();
	$("#speech-panel-wrapper").find(".body .speech").html(currentLines[currentIdx]);
}

$("#speech-panel-wrapper .panel").click(function(e){
	e.stopPropagation();
})

$("#speech-panel-wrapper .next-button").click(function(e){
	e.stopPropagation();
	nextLine();
})

$("#speech-panel-wrapper .prev-button").click(function(e){
	e.stopPropagation();
	prevLine();
})

$("#speech-panel-wrapper .fa-times").click(function(e){
	e.stopPropagation();
	closeDialog();
})

$("#speech-panel-wrapper").click(function(){
	closeDialog();
})