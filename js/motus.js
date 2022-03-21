//On initialialise à la première ligne pour la saisie
var currentLineCursor = 0;
var currentColumnCursor = 0;

var chosenWord;
var totalPoints = 0;

var success = false;
var points = 0;

var grid;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function loose(){
	currentLineCursor = 0;
	currentColumnCursor = 0;
	newGame();
}

function win(){
	currentLineCursor = 0;
	currentColumnCursor = 0;
	totalPoints++;
	$("#panel_score").html('Total : '+totalPoints+" pts");
	newGame();
}

class GameGrid {
	hauteur = 5;
	largeur = 5;
	selecteur = "";
  	constructor(largeur, hauteur, selecteur) {
	  this.hauteur = hauteur;
	  this.largeur = largeur;
	  this.selecteur = selecteur;
  	}
	  
	cleanGrid(){
		$(this.selecteur).html('');
	}
	  
	buildGridUnit(x, y){
		$('<div>', {'id':"unit_"+x+"_"+y}).appendTo(this.selecteur);
		$("#unit_"+x+"_"+y).css('width', 'calc('+(100/this.largeur)+'% - 8px)');
	}
	
	buidLine(y){
		for(var i=0; i<this.largeur; i++){
			this.buildGridUnit(i, y);
		}
		$('<div>', {'class':"breaker"}).appendTo(this.selecteur);
	}
	
	buildGrid(){
		for(var j=0; j<this.hauteur; j++){
			this.buidLine(j);
		}
	}
	
	fillCellWith(x,y,text,color){
		$("#unit_"+x+"_"+y).html(text);
		$("#unit_"+x+"_"+y).css('background-color', color);
	}
}

function newGame(){
	largeur = 5;
	hauteur = 4;
	grid = new GameGrid(largeur, hauteur, "#gameframe");
	grid.buildGrid();
	chosenWord = window['jsonData'+largeur][getRandomInt(window['jsonData'+largeur].length)];
}

$(function(){
	newGame();
	$('#proposition').keyup(function(event){
		var position = $(this).val().length-1;
		var colorBack;
		if(chosenWord.word.includes(event.key)){
			if(chosenWord.word.charAt(position)==event.key){
				colorBack = 'green';
				points++;
			}else{
				colorBack = 'red';
			}
		}else{
			colorBack = 'blue';
		}
		grid.fillCellWith(currentColumnCursor, currentLineCursor, event.key, colorBack);
		if(currentColumnCursor<largeur-1){
			currentColumnCursor++;
		}else{
			if(points == largeur){
				$(this).val('');
				grid.cleanGrid();
				points = 0;
				win();
			}else{
				if(currentLineCursor<hauteur-1){
					currentColumnCursor=0;
					currentLineCursor++;
					$(this).val('');
					points = 0;
				}else{
					grid.cleanGrid();
					points = 0;
					loose();
				}
			}
			
		}
		
	});
});