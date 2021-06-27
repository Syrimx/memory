//Variablen
const cards = ['img/ace_of_hearts.png',
				'img/ace_of_hearts.png',
				'img/ace_of_spades.png',
				'img/ace_of_spades.png',
				'img/ace_of_clubs.png',
				'img/ace_of_clubs.png',
				'img/ace_of_diamonds.png',
				'img/ace_of_diamonds.png'];

let rundenCounter = 0;
let points = 0;
let check = [];
let resetCard = [];

//Karten mischen
function shuffle() {
	for (let i = cards.length -1 ; i > 0; i--) {
		let j = Math.floor(Math.random() * (i+1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}
}

//deck erstellen
function setDeck() {
	deck = document.querySelectorAll('.cards');
	count = 0;

	deck.forEach((element) => {
		element.src = cards[count];
		count++;
	});
}

//score und runde anzeigen
let score = document.querySelector('.score');
score.innerText = `score ${points}`;


//sleep funktion
function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

//reset Funktion der Karten -> wird in aufdecken aufgerufen
function resetBack() {
	for (let i in resetCard) {
		const sw = resetCard[i];
		console.log(sw);

		sw.childNodes.forEach((type) => {
			if (type.nodeName != '#text') {
			if (type.style.display == 'none') type.style.display = 'block';													
			else if (type.style.display == 'block') type.style.display = 'none';
			}			
		})
	}
}

//click events
//wenn auf ein bild geclickt wird, wird der zustand beider childNodes geändert.
function aufdecken() {
	targets = document.querySelector('.grid').childNodes;

	targets.forEach((element) => {
		if (element.nodeName != '#text') {
			let get = element.childNodes		
			get.forEach((e) => {
				if (e.nodeName != '#text') {
					e.addEventListener('click', () => {
						e.style.display = 'none';
						e.previousElementSibling.style.display = 'block';
						
						resetCard.push(e.parentNode);
						check.push(e.previousElementSibling.src)
						rundenCounter += 1;
						console.log(check)
									
						//wenn zwei karten aufgedeckt werden
						if (rundenCounter === 2) {
							//wenn beide karten übereinstimmen
							if (check[0] === check[1]) {
								points += 1;
								score.innerText = `score: ${points}`;
								console.log(check);
								check = [];
								resetCard = [];
							}
							//wenn beide Karten nicht übereinstimmen
							else {
								console.log(resetCard)
								resetBack();
								resetCard = [];
								check = []

							}

							rundenCounter = 0;							
						}

					})
				}
			})
		}
	})

}



//reload button
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
	location.reload(true);
});



//programm logik
//funktionen

//vorbereitung
shuffle();
setDeck();


//spiellogik
aufdecken();

