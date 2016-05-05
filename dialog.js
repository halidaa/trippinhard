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
							"Let's change <b>tree-01</b> <i>color</i> to <u>green</u>.",
							"Let's change <b>tree-02</b> <i>color</i> to <u>blue</u>.",
							"Let's change <b>tree-03</b> <i>color</i> to <u>yellow</u>.",
							"Let's change <b>tree-04</b> <i>color</i> to <u>purple</u>."
						],
						"positiveFeedback":"Great!",
						"negativeFeedback":[
							"Hmmm, try just inputting the name of the color that's underlined in my text.",
							"That's not the color I want though :(",
							"Don't forget to include <i>color</i>.",
							"Don't forget to add a ':' between the property name and property value!",
							"Hmmm, try formatting it like 'color: your_color'."
						]
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
								"Let's paint this <b>purple-wall</b> to have a <u>red</u> <i>background-color</i> again.",
								"Let's paint this <b>blue-wall</b> to have a  <u>green</u> <i>background-color</i> again.",
								"Let's paint this <b>yellow-wall</b> to have a  <u>blue</u> <i>background-color</i> again.",
								"Let's paint this <b>green-wall</b> to have a  <u>yellow</u> <i>background-color</i> again.",
								"Let's paint this <b>red-wall</b> to have a <u>purple</u> <i>background-color</i> again.",
							],
							"hasRequirement": !rosaDone,
							"requirement": [
								"I think you should help Rosa up above before assisting me."
							],
							"positiveFeedback":"Great!",
							"negativeFeedback":[
								"Looks like you forgot to put a '.' before the class name.",
								"Don't forget to include the class name that I'm stating in bold!",
								"Don't forget to include <i>background-color</i>.",
								"Don't forget to add a ':' between the property name and property value!",
								"Looks like you didn't include the correct background-color I want.",
								"Don't forget to add a ';' after your property value.",
								"Hmmm, try formatting it like 'background-color: your_color'."
							]
						};
characters["vernon"] = {
							"name":"Vernon Vermilion",
							"filename":"npc/vernon",
							"hometown":"red",
							"hasTask":false
						};
characters["schmo"] = {
							"name":"Schme Schmo",
							"filename":"npc/schmo",
							"hometown":"dark-gray",
							"hasTask":true,
							"taskIntro":[
								"Welcome to material!",
								"In this place, everything can be modified with CSS",
								"On your left, you'll find the console for you to write your code.",
								"But! You can only use it when you have a task.",
								"Try talking to people to get the tasks and find your way home."
							],
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
						"hasTask":true,
						"taskIntro":[
							"If you're looking to cross the bridge, you'll need to increase the <i>width</i>!",
							"Do you think you think you could somehow double the bridge's <i>width</i>?"
						],
						"tasks":[
							"The <i>width</i> of the <b>bridge</b> is currently 100%, can you double it so we can cross?",
						],
						"positiveFeedback":"Great!",
						"negativeFeedback":[
								"Looks like you forgot to put a '.' before the class name.",
								"Don't forget to include the class name that I'm stating in bold!",
								"Ooo, can't forget to include the '{' after the class name.",
								"Don't forget to include <i>width</i>.",
								"Don't forget to add a ':' between the property name and property value!",
								"Looks like you didn't make the bridge double it's current 100% width.",
								"Don't forget to include a '%' following your width's value.",
								"Don't forget to add a ';' after your property value.",
								"Ooo, can't forget to include the '}' at the end!",
								"Hmmm, try formatting it like 'width: your_width%'."
							]
					};
characters["carrot"] = {
						"name":"Charles 'Carrot' Rodriguez",
						"filename":"npc/carrot",
						"hometown":"yellow",
						"hasTask":true,
						"taskIntro":[
							"Hey, I saw what you did to that bridge, it was incredible!",
							"Do you think you think you could help me out with my <i>height</i>?"
						],
						"tasks":[
							"Could you make me four times taller!",
						],
						"positiveFeedback":"Great!",
						"negativeFeedback":"Hm, not quite...but almost..."
					};
characters["ray"] = {
						"name":"Ray Sunshine",
						"filename":"npc/ray",
						"hometown":"yellow",
						"hasTask":false
					};
characters["dragon"] = {
						"name":"Trogdor",
						"filename":"npc/dragon",
						"hometown":"yellow",
						"hasTask":true,
						"taskIntro":[
							"STOP! You cannot escape past me!",
							"At my current <i>width</i> and <i>height</i> you'll be not match for me!"
						],
						"tasks":[
							"TODO",
						],
						"positiveFeedback":"Noooooooooooooo",
						"negativeFeedback":"Ha, ha, ha that won't work on me!"
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