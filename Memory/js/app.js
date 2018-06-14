(function(w, d){


	/*
	 * Create a list that holds all of your cards
	 */

	 d.addEventListener('DOMContentLoaded', function(){
	 	w.Game = Game;
	 	Game.init();
	 }, false);


	/*
	 * Display the cards on the page
	 *   - shuffle the list of cards using the provided "shuffle" method below
	 *   - loop through each card and create its HTML
	 *   - add each card's HTML to the page
	 */
	 function randomId() {
	 	var chars = '0987654321qazwsxedcrfvtgbyhnujmiklop';
	 	return shuffle(chars.split('')).slice(0,7).join('');
	 }

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}


	/*
	 * set up the event listener for a card. If a card is clicked:
	 *  - display the card's symbol (put this functionality in another function that you call from this one)
	 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	 *  - if the list already has another card, check to see if the two cards match
	 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
	 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
	 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
	 */


	var Game = {

		started: false,

		options: {
			speed: 500
		},

	 	init: function() {
	 		Game.Board.init();
	 		Game.Statistics.init();
	 		Game.Gui.init({
				moves: Game.Statistics.get('moves'),
				stars: Game.Statistics.get('stars'),
			});
	 	},

	 	restart: function() {
	 		Game.Board.reset();
	 		Game.Statistics.reset();
	 		Game.Gui.reset({
				moves: Game.Statistics.get('moves'),
				stars: Game.Statistics.get('stars'),
			});
	 	},

	 	start: function() {
	 		this.started = true;
	 		Game.Statistics.start();
	 	},

	 	win: function() {
			var m = Game.Statistics.get('moves');
			var t = Game.Statistics.get('time');
			var message = 'you`v done with ' + m + ' moves in ' + t + ' seconds!';
			alert(message);
	 	},

	 	turn: function(data) {

	 		Game.Turn.execute(data);

	 		if(Game.Board.noMatchedLeft())
	 			this.win();
	 	},

	 	isStarted: function() {
	 		return this.started
	 	},

	 	message: function(source, data) {
	 		switch(source) {
	 			case 'turn' :
	 				Game.Statistics.update();

	 				this.Gui.update({
						moves: Game.Statistics.get('moves'),
						stars: Game.Statistics.get('stars'),
					});

	 				break;

 				case 'board':
 					if (!Game.isStarted())
 						Game.start();

 					break;

	 		}
	 	}

	 };

	 Game.Gui = {

	 	init: function(data) {
	 		this.container = d.querySelector('.score-panel');
	 		this.movesContainer = this.container.querySelector('.moves');
	 		this.starsContainer = this.container.querySelector('.stars');
	 		this.restartContainer = this.container.querySelector('.restart');

	 		this.restartContainer.addEventListener('click', Game.restart, false);

	 		this.update(data);
	 	},

	 	update: function(data) {
	 		this.movesContainer.innerText = data.moves;
			this.starsContainer.innerText = '';
	 		var dFrag = d.createDocumentFragment();
	 		while(data.stars > 0) {
	 			dFrag.appendChild( this.getStarsTemplate() );
	 			data.stars--;
	 		}

	 		this.starsContainer.appendChild(dFrag);

	 	},

	 	popup: function() {
	 		console.log('popup!!!');
	 	},

	 	getStarsTemplate: function() {
			var liBlock = d.createElement('li');
			var iBlock = d.createElement('i');
			iBlock.setAttribute('class', 'fa fa-star');
			liBlock.appendChild(iBlock);
			this.cachedBlock = liBlock;
			return this.cachedBlock;
	 	},
	 	reset: function(data) {
	 		this.update(data);
	 	}
	 };

	 Game.Statistics = {
	 	data: {
	 		moves: 0,
	 		timeStart: 0,
	 		timeEnd: 0,
	 		stars: 3
	 	},

	 	init: function() {

	 	},

	 	update: function() {
	 		this.addMoveCount();
	 	},

	 	reset: function() {
			this.data.stars = 3;
	 		this.data.moves = 0;
	 		this.data.timeStart = 0;
	 		this.data.timeEnd = 0;
		},

		addMoveCount: function() {
			this.data.moves++;
		},

		start: function() {
			this.startTimer();
		},

		startTimer: function() {
			this.data.timeStart = Math.round(window.performance.now()/ 1000);
		},

		stopTimer: function() {
			this.data.timeEnd = Math.round(window.performance.now()/ 1000);
		},

		get: function(property) {
			if(property == 'time') {
				return (this.data.timeEnd == 0 ? Math.round(window.performance.now()/ 1000) : this.data.timeEnd ) - this.data.timeStart
			}
			return this.data[property] || 0;
		}
	};

	Game.Board = {

		collection: {},

		init: function() {

			this.container = d.querySelector('.deck');

			this.onClick = this.onClick.bind(this);

			this.shuffleDOM();

			// Game.onMenu(this.reset);

			// Click to game elements means start
			this.container.addEventListener('click', this.onClick, false);

			document.querySelectorAll('.card').forEach(function(html) {
				var card = new Card(html);
				this.collection[card.id] = card;
			}.bind(this));
		},

		noMatchedLeft: function() {
			return Object.values(this.collection).every(function(card){
				return card.isMatched();
			})
		},

		matchCards: function() {
			return getCardSign(activeCards[0]) === getCardSign(activeCards[1]);
		},

		getByHtml: function(htmlNode) {
			var cardId = htmlNode.getAttribute('data-id');
			return this.collection[cardId];
		},

		onClick: function(event) {

			Game.message('board');

			//event delegation
			if(!event.target.classList.contains('card'))
				return;

			// Now we cat iteract with card as with handfull object
			var card = this.getByHtml(event.target);

			Game.turn(card);
		},

		reset: function() {
			//reset all Card Collection data, except ID
			Object.values(this.collection).forEach(function(card) {
				card.reset();
			});

			this.shuffleDOM();
		},

		shuffleDOM: function() {
			var cards = [];

			document.querySelectorAll('.card').forEach(function(html) {
				cards.push(html);
			});

			cards = shuffle(cards);

			var dFrag = d.createDocumentFragment();

			cards.forEach(function(card) {
				dFrag.appendChild(card);
			});

			this.container.innerHtml = '';
			this.container.appendChild(dFrag);
		}

	};

	function Card(html) {
		this.id = '';
		this.html = html;
		this.matched = false;
		this.open = false;

		this.init();
	}

	Card.prototype = {

		init: function() {
			this.id = randomId();
			this.html.setAttribute('data-id', this.id);
		},

		lock: function() {
			this.html.classList.remove('show', 'open');
			this.html.classList.add('match');
			this.matched = true;
		},

		hide: function() {
			setTimeout( function(){
				this.html.classList.remove('show', 'open', 'match');
			}.bind(this), Game.options.speed);
			this.open = false;
		},

		reveal: function() {
			this.html.classList.add('show', 'open');
			this.open = true;
		},

		isMatched: function() {
			return this.matched;
		},

		isOpened: function() {
			return this.open;
		},

		reset: function() {
			this.html.classList.remove('show', 'open', 'match');
			this.open = false;
			this.matched = false;
		},

		isMatchedTo: function(card) {
			return this.getSign() === card.getSign();
		},

		getSign: function() {
			return this.html.querySelector('.fa').getAttribute('class');
		},

		isEqualTo: function(card) {
			return this.id === card.id;
		}

	};


	Game.Turn = {

		previousCard: false,
		currentCard: false,

		execute: function(card) {

			//if card already on testing
			if(card.isOpened() || card.isMatched()) return;

			//if first card
			if(!this.previousCard) {
				this.previousCard = card;
				this.previousCard.reveal();
				return;
			}

			//if same card
			if( this.previousCard.isEqualTo(card) ) return;

			this.currentCard = card;
			this.currentCard.reveal();

			// match process
			var command = this.previousCard.isMatchedTo(this.currentCard) ? 'lock' : 'hide';

			this.previousCard[command]();
			this.currentCard[command]();

			Game.message('turn');
			this.reset();
		},

		reset: function() {
			this.previousCard = false;
			this.currentCard = false;
		}
	};

})(window, document);
