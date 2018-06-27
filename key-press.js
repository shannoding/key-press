var spaces = 60;
// make it a square somehow

var moveCount = 0;

var player = {
	position: Math.floor(Math.random() * spaces),
	fadeArray: [],
	trail: 60,
	name: "play"
}

var computer1 = {
	position: Math.floor(Math.random() * spaces),
	fadeArray: [],
	trail: 20,
	name: "comp1"
}

var computer2 = {
	position: Math.floor(Math.random() * spaces),
	fadeArray: [],
	trail: 20,
	name: "comp2"
}

var computer3 = {
	position: Math.floor(Math.random() * spaces),
	fadeArray: [],
	trail: 20,
	name: "comp3"
}
var computer4 = {
	position: Math.floor(Math.random() * spaces),
	fadeArray: [],
	trail: 20,
	name: "comp4"
}
var computer5 = {
	position: Math.floor(Math.random() * spaces),
	fadeArray: [],
	trail: 20,
	name: "comp5"
}
var computer6 = {
	position: Math.floor(Math.random() * spaces),
	fadeArray: [],
	trail: 20,
	name: "comp6"
}

var move = {
	up: function(current) {
		if (current.position - findNumberSpacesRow() >= 0) {
			current.position -= findNumberSpacesRow();
			drawBoard(current);
			return true;
		}
		return false;
	},
	down: function(current) {
		if (current.position + findNumberSpacesRow() < spaces) {
			current.position += findNumberSpacesRow();
			drawBoard(current);
			return true;
		}
		return false;
	},
	left: function(current) {
		if (current.position % findNumberSpacesRow() === 0) {
			// current.position += findNumberSpacesRow() - 1;
			return false;
		}
		current.position--;
		drawBoard(current);
		return true;
	},
	right: function(current) {
		if (current.position % findNumberSpacesRow() === findNumberSpacesRow() - 1 || current.position === spaces - 1) {
			// current.position -= findNumberSpacesRow() - 1;
			return false;
		}
		current.position++;
		drawBoard(current);
		return true;
	},
	random: function(current) {
		var r = Math.floor(Math.random() * 4);
		if (r === 0) {
			this.up(current);
		}
		else if (r === 1) {
			this.down(current);
		}
		else if (r === 2) {
			this.left(current);
		}
		else if (r === 3) {
			this.right(current);
		}
	}
}

init();


function init() {
	buildBoard(spaces);
	drawBoard(player);
	drawBoard(computer1);
	drawBoard(computer2);
	drawBoard(computer3);
	drawBoard(computer4);
	drawBoard(computer5);
	drawBoard(computer6);
}

function buildBoard(num) {
	for (var i = 0; i < num; i++) {
		$(".board").append("<div class='space'></div>");
	}
}


$(document).keypress(function(e) {
	findSpaceIndex(player, e.which);

	move.random(computer1);
	move.random(computer2);
	move.random(computer3);
	move.random(computer4);
	move.random(computer5);
	move.random(computer6);

	moveCount++;
	$("#move-count").text(moveCount);
});

function findSpaceIndex(current, key) {
	if (key === 119) {
		move.up(current);
	}
	else if (key === 115) {
		move.down(current);
	}
	else if (key === 97) {
		move.left(current);
	}
	else if (key === 100) {
		move.right(current);
	}
}


function findNumberSpacesRow() {
	return Math.floor($(".board").width() / $(".space").outerWidth(true));

}


function drawBoard(current) {
	var s = $(".space")[current.position];
	if (current.fadeArray.includes(s)) {
		current.fadeArray.splice(current.fadeArray.indexOf(s), 1);
	}


	$(s).removeClass();
	$(s).addClass("space");
	// fix the remove all classes with "activated"
	$(s).css("opacity","");


	$(s).addClass("activated-" + current.name);
	
	current.fadeArray.unshift(s);
	if (current.fadeArray.length > current.trail) {
		var end = current.fadeArray.pop();
		$(end).removeClass("activated-" + current.name);
		$(end).css("opacity","");
	}


	var decay = 1 / current.trail;
	for (var i = 0; i < current.fadeArray.length; i++) {
		var element = current.fadeArray[i];
		if (!$(element).hasClass("activated-" + current.name))
		{
			current.fadeArray.splice(i,1);
			i--;
		}
		else {
			$(element).css("opacity", "-=" + decay);
			if ($(element).css("opacity") <= 0) {
				$(element).removeClass("activated-" + current.name);
				$(element).css("opacity","");
				current.fadeArray.splice(i, 1);
				i--;
			}
		}
		
	}

}