var timer = 256
var tickRate = 16
var visualRate = 256
var resources = {"money":0,"passion":1}
var costs = { "onePull":2,
		"tenPull":20,
		"poster":20,
		"figure":100,
		"pillow":200,
	    "dogecoin_miner":500}
		
var totalPulls = {"one": 0,
		"two": 0,
		"three": 0,
		"four": 0,
		"five": 0,}
		 
var growthRate = {"poster":1.25,
		"figure":1.25,
		"pillow":1.25,
		"dogecoin_miner":1.25,
	    "miner_pickaxe":1.75,
		"onePull":1.01,
		"tenPull":1.01}

var increments = [{"input":["dogecoin_miner"],
		   "output":"money"}]

var unlocks = {"poster":{"money":10},
		"figure":{"money":50},
		"pillow":{"money":150},
	    "dogecoin_miner":{"money":250},
	    "miner_pickaxe":{"dogecoin_miner":1},
		"ending":{"five":1}}

function work(num){
    resources["money"] += num*resources["passion"]
	
	var flavorText = Math.random()
	
	if(flavorText < 0.88) {
		writeText("You worked.")
	}
	else if(flavorText < 0.90) {
		writeText("It's not an addiction. You can stop at any time. You just choose not to.")
	}
	else if(flavorText < 0.92) {
		writeText("You stare at your phone wallpaper. It's a picture of your waifu. Your boss gives you a confused look from a distance.")
	}
	else if(flavorText < 0.94) {
		writeText("Every day blends into each other. The only way you keep track of dates now is when the next event comes out.")
	}
	else if(flavorText < 0.96) {
		writeText("Your coworkers invite you out to a social. You decline; you have better things to do tonight.")
	}
	else if(flavorText < 0.98) {
		writeText("Your back and eyes hurt.")
	}
	else {
		writeText("Sometimes, you think about life before you installed your favorite game. You don't remember much at all.")
	}
    updateText()
};

function buyPoster(num){
    if (resources["money"] >= costs["poster"]){
		resources["passion"] += num
		resources["money"] -= costs["poster"]
		
		costs["poster"] *= growthRate["poster"]
		
		writeText("You bought a poster. You feel a sense of accomplishment.")
    }
	else {
		writeText("You don't have enough money.")
	}
	updateText()
};

function buyFigure(num){
    if (resources["money"] >= costs["figure"]){
		resources["passion"] += num
		resources["money"] -= costs["figure"]
		
		costs["figure"] *= growthRate["figure"]
		
		writeText("You bought an anime figure. You feel a burning passion from within.")
    }
	else {
		writeText("You don't have enough money.")
	}
	updateText()
};

function buyPillow(num){
    if (resources["money"] >= costs["pillow"]){
		resources["passion"] += num
		resources["money"] -= costs["pillow"]
		
		costs["pillow"] *= growthRate["pillow"]
		
		writeText("You bought a body pillow. There's no turning back.")
    }
	else {
		writeText("You don't have enough money.")
	}
	updateText()
};

function buyDogeCoin(num){
    if (resources["money"] >= costs["dogecoin_miner"]*num){
		if (!resources["dogecoin_miner"]){
			resources["dogecoin_miner"] = 0
		}
		if (!resources["miner_pickaxe"]){
			resources["miner_pickaxe"] = 1
		}
		resources["dogecoin_miner"] += num
		resources["money"] -= num*costs["dogecoin_miner"]
		
		costs["dogecoin_miner"] *= growthRate["dogecoin_miner"]
		
		writeText("You hear about a new fangled crypto currency and decide to try it out.")
    }
	else {
		writeText("You don't have enough money.")
	}
	updateText()
};

function writeText(text){
	document.getElementById('id01').value = text
} //note, make it so that the text is line by line

function writeTextTwo(text){
	document.getElementById('id02').value = text + document.getElementById('id02').value
}

function writeTextThree(text){
	document.getElementById('id03').value = text
} 

function theEnd(){
    if(totalPulls["five"] >= 1){
		writeText("You really spent all that money?")
        //var element = document.getElementsByClassName("show_ending")
        //element.style.display = "block"
        //element.innterHTML = totalPulls["five"].toFixed(2)
    }
    else{
        writeText("You cannot rest until you get a five star.")
    }
}

function updateText(){
    for (var key in unlocks){
		var unlocked = true
		for (var criterion in unlocks[key]){
			unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
			unlocks["ending"].unlocked = unlocked && totalPulls["five"] >= 1
		}
		if (unlocked){
			for (var element of document.getElementsByClassName("show_"+key)){		
				element.style.display = "block"
			}
		}
	}
		
	for (var key in resources){
		for (var element of document.getElementsByClassName(key)){
			element.innerHTML = resources[key].toFixed(2)
		}
	}
	for (var key in costs){
		for (var element of document.getElementsByClassName(key+"_cost")){
			element.innerHTML = costs[key].toFixed(2)
		}
    }
};

window.setInterval(function(){
    timer += tickRate

    
    for (var increment of increments){
		total = 0.5
		for (var input of increment["input"]){
			total *= resources[input]
			
		}
		if (total){
			console.log(total)
			resources[increment["output"]] += total/tickRate
		}
    }
    
    if (timer > visualRate){
	timer -= visualRate
	updateText()
    }
  

}, tickRate);



//gacha mechanic

function gachaPull() {
	if (resources["money"] >= costs["onePull"]){
		resources["money"] -= costs["onePull"]
		costs["onePull"] *= growthRate["onePull"]
		writeText("You decide to do a single pull in the current event.")
		
		var rate = Math.random();
		if (rate < 0.5) {
			writeTextTwo("1*\n")
			totalPulls["one"]++
			if (rate < 0.25) {
				writeText("You're getting tired of seeing 1 stars.")
			}
		}
		else if (rate < 0.9) {
			writeTextTwo("2*\n")
			totalPulls["two"]++
		}
		else if (rate < 0.97) {
			writeTextTwo("3*\n")
			totalPulls["three"]++
		}
		else if (rate < 0.99) {
			writeTextTwo("4*\n")
			totalPulls["four"]++
		}
		else {
			writeTextTwo("5*\n")
			totalPulls["five"]++
			writeText("Your eyes light up at the 5 star unit on your phone screen. Your passion burns all the brighter.")
			resources["passion"] += 2
		}
	}
	else {
		writeText("You don't have enough money.")
	}
	writeTextThree("1* = " + totalPulls["one"] +
		"\n 2* = " + totalPulls["two"] +
		"\n 3* = " + totalPulls["three"] +
		"\n 4* = " + totalPulls["four"] +
		"\n 5* = " + totalPulls["five"]);
	updateText()
};

function gachaTen() {
	if (resources["money"] >= costs["tenPull"]){
		resources["money"] -= costs["tenPull"]
		costs["tenPull"] *= growthRate["tenPull"]
		writeText("You decided to do a 10-pull in the current event.")
		var i;
		writeTextTwo("\n")
		for (i = 0; i < 10; i++) {
			var rate = Math.random();
			if (rate < 0.5) {
				writeTextTwo("1* ")
				totalPulls["one"]++
			}
			else if (rate < 0.9) {
				writeTextTwo("2* ")
				totalPulls["two"]++
			}
			else if (rate < 0.97) {
				writeTextTwo("3* ")
				totalPulls["three"]++
			}
			else if (rate < 0.99) {
				writeTextTwo("4* ")
				totalPulls["four"]++
			}
			else {
				writeTextTwo("5* ")
				document.getElementById('id01').value += " Your eyes light up at the 5 star unit on your phone screen.  Your passion burns all the brighter."
				totalPulls["five"]++
				resources["passion"] += 2
			}
		}
	}
	else {
		writeText("You don't have enough money.")
	}
	writeTextThree("1* = " + totalPulls["one"] +
		"\n 2* = " + totalPulls["two"] +
		"\n 3* = " + totalPulls["three"] +
		"\n 4* = " + totalPulls["four"] +
		"\n 5* = " + totalPulls["five"]);
	updateText()
};

//popup box for gacha
$(document).ready(function() {
	$('.click, .fade').click(function(){
  	$('#pop').fadeToggle();
  });
});
