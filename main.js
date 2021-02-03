var timer = 256
var tickRate = 16
var visualRate = 256
var resources = {"money":0,"passion":1}
var costs = {"passion":15,
	     "dogecoin_miner":200,
	     "miner_pickaxe":15}
var growthRate = {"passion":1.25,
		  "dogecoin_miner":1.25,
	     "miner_pickaxe":1.75}

var increments = [{"input":["dogecoin_miner","miner_pickaxe"],
		   "output":"money"}]

var unlocks = {"passion":{"money":10},
	       "dogecoin_miner":{"money":100},
	       "miner_pickaxe":{"dogecoin_miner":1}}

function mineGold(num){
    resources["money"] += num*resources["passion"]
    writeText("You worked.")
    updateText()
};

function upgradeMinerPickaxe(num){
    if (resources["money"] >= costs["miner_pickaxe"]*num){
	resources["miner_pickaxe"] += num
	resources["money"] -= num*costs["miner_pickaxe"]
	
	costs["miner_pickaxe"] *= growthRate["miner_pickaxe"]
	
	updateText()
    }
};

function upgradePassion(num){
    if (resources["money"] >= costs["passion"]*num){
	resources["passion"] += num
	resources["money"] -= num*costs["passion"]
	
	costs["passion"] *= growthRate["passion"]
	
  writeText("You bought an anime figure. You feel a burning passion from within.")
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
	document.getElementById('id01').value = text + " " + document.getElementById('id01').value
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
	total = 1
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
