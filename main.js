var timer = 256
var tickRate = 16
var visualRate = 256
var resources = {"money":0,"passion":1}
var costs = {"poster":20,
		 "figure":100,
		 "pillow":200,
	     "dogecoin_miner":500,
	     "miner_pickaxe":15}
		 
var growthRate = {"poster":1.25,
		 "figure":1.25,
		 "pillow":1.25,
		 "dogecoin_miner":1.25,
	     "miner_pickaxe":1.75}

var increments = [{"input":["dogecoin_miner","miner_pickaxe"],
		   "output":"money"}]

var unlocks = {"poster":{"money":10},
		   "figure":{"money":50},
		   "pillow":{"money":100},
	       "dogecoin_miner":{"money":250},
	       "miner_pickaxe":{"dogecoin_miner":1}}

function work(num){
    resources["money"] += num*resources["passion"]
	
	var flavorText = Math.random()
	
	if(flavorText < 0.9) {
		writeText("You worked.")
	}
	else {
		writeText("You stare at your phone wallpaper. It's a picture of your waifu. Your boss gives you a confused look from a distance.")
	}
    updateText()
};

function upgradeMinerPickaxe(num){
    if (resources["money"] >= costs["miner_pickaxe"]*num){
	resources["miner_pickaxe"] += num
	resources["money"] -= costs["miner_pickaxe"]
	
	costs["miner_pickaxe"] *= growthRate["miner_pickaxe"]
	
	updateText()
    }
};

function buyPoster(num){
    if (resources["money"] >= costs["poster"]){
	resources["passion"] += num
	resources["money"] -= costs["poster"]
	
	costs["poster"] *= growthRate["poster"]
	
  writeText("You bought a poster. You feel a sense of accomplishment.")
	updateText()
    }
};

function buyFigure(num){
    if (resources["money"] >= costs["figure"]){
	resources["passion"] += num
	resources["money"] -= costs["figure"]
	
	costs["figure"] *= growthRate["figure"]
	
  writeText("You bought an anime figure. You feel a burning passion from within.")
	updateText()
    }
};

function buyPillow(num){
    if (resources["money"] >= costs["pillow"]){
	resources["passion"] += num
	resources["money"] -= costs["pillow"]
	
	costs["pillow"] *= growthRate["pillow"]
	
  writeText("You bought a body pillow. There's no turning back.")
	updateText()
    }
};

function hireDogecoinMiner(num){
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
	
	updateText()

	
    }
};

function writeText(text){
	document.getElementById('id01').value = text
} //note, make it so that the text is line by line

function updateText(){
    for (var key in unlocks){
	var unlocked = true
	for (var criterion in unlocks[key]){
	    unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
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
var rate = Math.random();
function gachaPull() {
	if (rate < 0.5) {
  	 //50% chance of being 1 star
    }
  else if (rate < 0.8) {
  	// 30% chance of being 2 star
	}
	else if (rate < 0.95) {
  	// 15% chance of being 3 star
	}
  else if (rate < 0.99) {
  	// 4% chance of being 4 star
	}
  else {
  	// 1% chance of being 5 star
	}
};

//popup box for gacha
$(document).ready(function() {
	$('.click, .fade').click(function(){
  	$('#pop').fadeToggle();
  });
});
