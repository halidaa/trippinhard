var isOnDialog = false;

var currentIdx = 0;
var currentLines = [];
var defaultLines = [];
defaultLines["red"] = ["Welcome to Red Town, where everyone speaks red!",
					"Definitely check out the marketplace. There's a shop that sells the most delicious fruits!",
					"Hm, I've heard about the portal in stories. You'll need to leave through the gate to move north."];
defaultLines["yellow"] = ["Welcome to Yellowville, yo! We speak multicolors as long as you're cool.",
						  "Did you hear? That weird girl got her cat is stuck on the tree again.",
						  "Hm, I've heard about the portal in stories. You'll need to leave through the gate to move north."];

var characters = [];
var story = [];
var characterName = '';

characters["joe"] = {
						"name":"Joe",
						"filename":"player",
						"hometown":"dark-gray"
					};
characters["rosa"] = {
						"name":"Rosa Redrose",
						"filename":"npc/rosa",
						"hometown":"red",
						"hasTask":true,
						"taskIntro":[
							"We just can't compare against some of the fancy stores in other towns...they look so nice and shiny.",
							"Do you think you can help us spruce up and add some color to our signs?"
						],
						"tasks":[
							"",
							"Let's change the APPLES sign to red text.",
							"Let's change the ORANGES sign to orange text.",
							"Let's change the LEMONS sign to yellow text.",
							"Let's change the LIMES sign to green text.",
							"Let's change the BERRIES sign to blue text."
						],
						"positiveFeedback":"Great!",
						"negativeFeedback":"Hm, not quite...but almost..."
					};
characters["scarlett"] = {
							"name":"Scarlett Firework",
							"filename":"npc/scarlett",
							"hometown":"red",
							"hasTask":true,
							"taskIntro":[
								"Hey, are you the one who did Rosa's signs?",
								"Those signs are looking beautiful, I was hoping you'd help me, too.",
								"Can you help add some color to our walls?"
							],
							"tasks":[
								"Let's color the front door brown.",
								"The front wall of the store should be white",
								"I think red would be good for the fences"
							],
							"positiveFeedback":"Great!",
							"negativeFeedback":"Hm, not quite...but almost..."
						};
characters["vernon"] = {
							"name":"Vernon Vermilion",
							"filename":"npc/vernon",
							"hometown":"red",
							"hasTask":false
						};
characters["redguard"] = {
							"name":"Guard of the Red Gate",
							"filename":"npc/redguard",
							"hometown":"red",
							"hasTask":true,
							"taskIntro":[
								"I think there's still more for you to do here in Red Town."
							],
							"taskFinished":[
								"Good luck on your journey, Joe. I hope we can meet again."
							]
						};
characters["amber"] = {
							"name":"Amber Dawn",
							"filename":"npc/amber",
							"hometown":"yellow",
							"hasTask":false
						};
characters["carrot"] = {
							"name":"Charles 'Carrot' Rodriguez",
							"filename":"npc/carrot",
							"hometown":"yellow",
							"hasTask":false
						};
characters["ray"] = {
						"name":"Ray Sunshine",
						"filename":"npc/ray",
						"hometown":"yellow",
						"hasTask":false
					};
characters["orangeguard"] = {
								"name":"Guard of the Orange Gate",
								"filename":"npc/orangeguard",
								"hometown":"yellow",
								"hasTask":false
							};

//Can remove this optional text param, was just trying to get it to read the text and positive feedbakc
function showDialog(character){
	characterName = character.name;
	if(character.hasTask){
		currentLines = character.taskIntro;
	}
	else{
		if(character.taskFinished != undefined){
			currentLines = character.taskFinished;
		}
		else{	
			var rand = defaultLines[character.hometown][Math.floor(Math.random() * defaultLines.length)];
			currentLines.push(rand);
		}
	}
	isOnDialog = true;
	$("#speech-panel-wrapper").fadeIn(300,function(){
		var _speech = $("#speech-panel-wrapper");
		
		$("#speech-panel-wrapper").addClass(character.hometown);
		$("#speech-panel-wrapper").find(".avatar img").attr("src",character.filename+"-avatar.png");
		$("#speech-panel-wrapper").find(".name").text(character.name);
		$("#speech-panel-wrapper").find(".body .speech").html(currentLines[currentIdx]);
		$("#speech-panel-wrapper").find(".body .prev-button").hide();
		if(currentLines.length < 2)
			$("#speech-panel-wrapper").find(".body .next-button").hide();
		else {
			$("#speech-panel-wrapper").find(".body .next-button").show();
			$("#speech-panel-wrapper").find(".body .start-button").hide();
		}
		
		$("#speech-panel-wrapper").find(".panel").animate({"bottom":0},400);
	})
}

function closeDialog(){
	currentLines = [];
	currentIdx = 0;
	$("#speech-panel-wrapper .panel").animate({"bottom":"-100%"},400,function(){
		$("#speech-panel-wrapper").fadeOut();
		isOnDialog = false;
	})
}

function nextLine(){
	if(currentIdx < currentLines.length - 1)
		currentIdx ++;
	if(currentIdx == (currentLines.length - 1)) {
		$("#speech-panel-wrapper").find(".body .next-button").hide();
		$("#speech-panel-wrapper").find(".body .start-button").show();
	}
	if(currentIdx > 0)
		$("#speech-panel-wrapper").find(".body .prev-button").show();
	$("#speech-panel-wrapper").find(".body .speech").html(currentLines[currentIdx]);
}

function prevLine(){
	if(currentIdx > 0)
		currentIdx --;
	if(currentIdx == 0)
		$("#speech-panel-wrapper").find(".body .prev-button").hide();
	if(currentIdx < currentLines.length - 1) {
		$("#speech-panel-wrapper").find(".body .next-button").show();
		$("#speech-panel-wrapper").find(".body .start-button").hide();
	}
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