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
							"All of my trees are shades of red, I wish their <i>color</i> would change to something different!",
							"Do you think you could help me change the <i>color</i> of these trees?"
						],
						"tasks":[
							"Let's change tree-01 <i>color</i> to green.",
							"Let's change tree-02 <i>color</i> to blue.",
							"Let's change tree-03 <i>color</i> to yellow.",
							"Let's change tree-04 <i>color</i> to purple."
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
								"Hey, are you the one who did Rosa's trees?",
								"Those trees are looking beautiful, I was hoping you'd help me too!",
								"Can you help me paint these houses back to their original <i>background-color</i>?"
							],
							"tasks":[
								"Let's paint this purple-wall red again.",
								"Let's paint this blue-wall green again.",
								"Let's paint this yellow-wall blue again.",
								"Let's paint this green-wall yellow again.",
								"Let's paint this red-wall purple again.",
							],
							"hasRequirement": !rosaDone,
							"requirement": [
								"I think you should help Rosa up above before assisting me."
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
characters["redguard-right"] = {
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
characters["redguard-left"] = {
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
	
	var requirementPassed = true;
	if(characterName == "Scarlett Firework") requirementPassed = rosaDone;
	
	if(character.hasTask && requirementPassed){
		currentLines = character.taskIntro;
	}
	else{
		if(character.taskFinished != undefined){
			currentLines = character.taskFinished;
		}
		else if(character.hasRequirement && !requirementPassed) {
			currentLines = character.requirement;
		}
		else{	
			var rand = defaultLines[character.hometown][Math.floor(Math.random() * defaultLines.length)];
			currentLines.push(rand);
		}
	}
	isOnDialog = true;
	$("#speech-panel-wrapper").removeClass("in-task").fadeIn(300,function(){
		var _speech = $("#speech-panel-wrapper");
		
		$("#speech-panel-wrapper").addClass(character.hometown);
		$("#speech-panel-wrapper").find(".avatar img").attr("src",character.filename+"-avatar.png");
		$("#speech-panel-wrapper").find(".name").text(character.name);
		$("#speech-panel-wrapper").find(".body .speech").html(currentLines[currentIdx]);
		$("#speech-panel-wrapper").find(".body .prev-button").hide();
		$("#speech-panel-wrapper").find(".body .start-button").hide();
		if(currentLines.length < 2)
			$("#speech-panel-wrapper").find(".body .next-button").hide();
		else {
			$("#speech-panel-wrapper").find(".body .next-button").show();
		}
		
		$("#speech-panel-wrapper").find(".panel").animate({"bottom":0},400);
	})
}

function showTaskDialog(character, line){
	$("#speech-panel-wrapper").addClass(character.hometown+" in-task");
	$("#speech-panel-wrapper").find(".avatar img").attr("src",character.filename+"-avatar.png");
	$("#speech-panel-wrapper").find(".name").text(character.name);
	$("#speech-panel-wrapper").find(".body .speech").html(line);
	$("#speech-panel-wrapper span").hide();
}

function closeDialog(){
	//Made it so if they're in a class and click on the screen, it doesn't close the dialog
	if(!isInTask) {
		currentLines = [];
		currentIdx = 0;
		$("#speech-panel-wrapper .panel").animate({"bottom":"-100%"},400,function(){
			$("#speech-panel-wrapper").fadeOut();
			isOnDialog = false;
		})
	}
}

function nextLine(){
	if($(".start-button").is(":visible")){
		startTask();
		return;
	}
	if(currentIdx < currentLines.length - 1)
		currentIdx ++;
	if(currentIdx == (currentLines.length - 1)) {
		$("#speech-panel-wrapper .next-button").hide();
		$("#speech-panel-wrapper .start-button").show();
	}
	if(currentIdx > 0)
		$("#speech-panel-wrapper .prev-button").show();
	$("#speech-panel-wrapper .body .speech").html(currentLines[currentIdx]);
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