var timer = 256
var tickRate = 32
var visualRate = 256
var end = 0
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
		"onePull":1.10,
		"tenPull":1.10}

var increments = [{"input":["dogecoin_miner"],
		   "output":"money"}]

var unlocks = {"poster":{"money":20},
		"figure":{"money":40},
		"pillow":{"money":100},
	    "dogecoin_miner":{"money":150},
	    "miner_pickaxe":{"dogecoin_miner":1},
		"ending":{"five":1}}

function work(num){
	if(end < 1) {
		resources["money"] += num*resources["passion"]
	
		var flavorText = Math.random()
		
		if(flavorText < 0.88) {
			writeText("You worked.\n\n+$" + num*resources["passion"])
		}
		else if(flavorText < 0.90) {
			writeText("It's not an addiction. You can stop at any time. You just choose not to.\n\n+$" + num*resources["passion"])
		}
		else if(flavorText < 0.92) {
			writeText("You stare at your phone wallpaper. It's a picture of your waifu. Your boss gives you a confused look from a distance.\n\n+$" + num*resources["passion"])
		}
		else if(flavorText < 0.94) {
			writeText("Every day blends into each other. The only way you keep track of dates now is when the next event comes out.\n\n+$" + num*resources["passion"])
		}
		else if(flavorText < 0.96) {
			writeText("Your coworkers invite you out to a social. You decline; you have better things to do tonight.\n\n+$" + num*resources["passion"])
		}
		else if(flavorText < 0.98) {
			writeText("Your back and eyes hurt.\n\n+$" + num*resources["passion"])
		}
		else {
			writeText("Sometimes, you think about life before you installed your favorite game. You don't remember much at all.\n\n+$" + num*resources["passion"])
		}
	}
	else {
		resources["money"] += 10
		writeText("You worked, but there's nothing to work towards anymore.\n\n+$10")
	}
    updateText()
};

function buyPoster(num){
	if(end < 1) {
		if (resources["money"] >= costs["poster"]){
			resources["passion"] += num
			resources["money"] -= costs["poster"]
			
			costs["poster"] *= growthRate["poster"]
			
			writeText("You bought a poster. You feel a slight spark of passion.\n\nYou feel like you can work harder.\n\n+0.5 Passion")
		}
		else {
			writeText("You don't have enough money.")
		}
	}
	else {
		if (resources["money"] >= costs["poster"]){
			resources["passion"] += 0
			resources["money"] -= costs["poster"]
			
			costs["poster"] *= growthRate["poster"]
			
			writeText("You bought a poster, but feel nothing.\n\n+0.0 Passion")
		}
		else {
			writeText("You don't have enough money.")
		}
	}
	updateText()
};

function buyFigure(num){
	if(end < 1) {
		if (resources["money"] >= costs["figure"]){
			resources["passion"] += num
			resources["money"] -= costs["figure"]
			
			costs["figure"] *= growthRate["figure"]
			
			writeText("You bought an anime figure. You feel a burning passion from within.\n\nYou feel like you can work harder.\n\n+1.0 Passion")
		}
		else {
			writeText("You don't have enough money.")
		}
	}
	else {
		if (resources["money"] >= costs["figure"]){
			resources["passion"] += 0
			resources["money"] -= costs["figure"]
			
			costs["figure"] *= growthRate["figure"]
			
			writeText("You bought an anime figure, but it feels more like a paperweight.\n\n+0.0 Passion")
		}
		else {
			writeText("You don't have enough money.")
		}
	}
	updateText()
};

function buyPillow(num){
	if(end < 1) {
		if (resources["money"] >= costs["pillow"]){
			resources["passion"] += num
			resources["money"] -= costs["pillow"]
			
			costs["pillow"] *= growthRate["pillow"]
			
			writeText("You bought a body pillow. Your passion passes the point of no return.\n\nYou feel like you can work harder.\n\n+2.0 Passion")	
		}
		else {
			writeText("You don't have enough money.")
		}
	}
	else {
		if (resources["money"] >= costs["pillow"]){
			resources["passion"] += 0
			resources["money"] -= costs["pillow"]
			
			costs["pillow"] *= growthRate["pillow"]
			
			writeText("You bought a body pillow, but is there really a point now?\n\n+0.0 Passion")
		}
		else {
			writeText("You don't have enough money.")
		}
	}
	updateText()
};

/*
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
*/

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
    if(totalPulls["five"] < 1){
		writeText("You cannot rest until you get a five star.")
        //var element = document.getElementsByClassName("show_ending")
        //element.style.display = "block"
        //element.innterHTML = totalPulls["five"].toFixed(2)
    }
    else if (totalPulls["five"] < 2){
        writeText("You want to upgrade your waifu. You must get a second five star.")
    }
	else {
		end++
		resources["passion"] = 0
		writeText("You really spent all that money?\n\nYou lose your passion.")
	}
	updateText()
}

function updateText(){
    for (var key in unlocks){
		var unlocked = true
		for (var criterion in unlocks[key]){
			unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
			unlocks["ending"].unlocked = unlocked && totalPulls["five"] >= 5
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
	document.getElementById('id02').value = ""
	
	if (resources["money"] >= costs["onePull"]){
		resources["money"] -= costs["onePull"]
		costs["onePull"] *= growthRate["onePull"]
		if(end < 1) {
			writeText("You decide to do a single pull in the current event.")
		}
		else {
			writeText("You decide to do a single pull in the current event, but what's the point now?")
		}
		
		var rate = Math.random();
		if (rate < 0.5) {
			writeTextTwo("1*\n")
			totalPulls["one"]++
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
			if(end < 1) {
				writeText("Your eyes light up at the 5 star unit on your phone screen. Your passion burns all the brighter.\n\n+1 Passion")
				resources["passion"] += 1
			}
			else {
				writeText("Getting a five star doesn't feel the same.\n\n+0 Passion")
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

function gachaTen() {
	document.getElementById('id02').value = ""
	
	if (resources["money"] >= costs["tenPull"]){
		resources["money"] -= costs["tenPull"]
		costs["tenPull"] *= growthRate["tenPull"]
		if(end < 1) {
			writeText("You decided to do a 10-pull in the current event.")
		}
		else {
			writeText("You decide to do a 10-pull in the current event, but what's the point now?")
		}
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
				totalPulls["five"]++
				
				if(end < 1) {
					document.getElementById('id01').value += " Your eyes light up at the 5 star unit on your phone screen. Your passion burns all the brighter. \n\n+1 Passion"
					resources["passion"] += 1
				}
				else {
					document.getElementById('id01').value += " Getting a five star doesn't feel the same.\n\n+0 Passion"
					resources["passion"] += 0
				}
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