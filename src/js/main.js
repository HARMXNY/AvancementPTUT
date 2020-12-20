var mode = 1;
var nbplayers = 1;
var lightprima = "#DEDEDE";
var lightsedonca = "#B7B7B7";
var lighttercia = "#E6E6E6";

var darkprima = "#474747";
var darkseconda = "#393939";
var darktercia = "#606060";
var carteselect = [];
var deckPartie = []; //Ensemble des cartes affichees a l'ecran
var TasDuJEU = []; // Ensemble de toutes les cartes presente dans le jeu





class Carte {

	constructor(id, allFigure/*,row,column,nbForme*/) { //a decommenter quand il y aura des prametres de partie
		//Attribut de Classe
		this.identifiant = id;
		this.row = 4 /*row*/;
		this.column = 3 /*column*/;
		this.Matrice = creaMatrice(this.row, this.column);
		this.SesFigures = [];
		for (var i = 0; i < allFigure.length; i++) {
			this.SesFigures.push(allFigure[i]);
		}

		//lien clicable
		this.link = document.createElement('a');
		this.link.id = this.identifiant;

		//div carte
		var divconteneur = document.createElement('div');
		divconteneur.className = "flex-item";
		divconteneur.id = "card" + this.identifiant;

		for (var i = 0; i < 12; i++) {

			var divcase = document.createElement('div');
			divcase.className = "item-form";
			var ajoute = true;
			for (var j = 0; j < this.SesFigures.length; j++) {
				if (i == this.SesFigures[j].X + (this.SesFigures[j].Y * 3)) {
					try {
						ajoute = false;
						var uneFigure = new Figure(this.SesFigures[j].type, this.SesFigures[j].forme, this.SesFigures[j].X, this.SesFigures[j].Y);
						divconteneur.appendChild(this.SesFigures[j].CodeHTML);
					} catch (e) {
						window.alert(this.SesFigures[j].type.length).length
					}
				}
			}
			if (ajoute) {
				divconteneur.appendChild(divcase);
			}
		}

		this.link.appendChild(divconteneur);
		//fonction de selection
		this.link.onclick = function selectioncarte() {
			var macarte = this.id;
			var lacarte = "card" + macarte;
			for (var i = 0; i < deckPartie.length; i++) {
				if (this.id == deckPartie[i].identifiant) {
					var laCarte = deckPartie[i];//Carte liee avec le code HTML
				}
			}
			if (document.getElementById(lacarte).style.boxShadow != "") {
				var pos = carteselect.indexOf(laCarte);
				carteselect.splice(pos, 1);
				document.getElementById(lacarte).style.boxShadow = "";
			}
			else {
				if (carteselect.length < 5) {
					carteselect.push(laCarte);
					document.getElementById(lacarte).style.boxShadow = "0 0 1vw red, 0 0 1vw red";
				}
				else
					window.alert("Bonjour !");
			}
		};
	}



	get carteVerticale() {

		for (var i = 0; i < this.SesFigures.length; i++) {
			this.SesFigures[i].X = this.column - this.SesFigures[i].X - 1;
		}

		this.Matrice = creaMatriceVierge(this.row, this.column);

		for (var i = 0; i < this.SesFigures.length; i++) {
			for (var j = 0; j < this.SesFigures[i].type.length; j++) {
				if (this.SesFigures[i].type[j] == TypeFigure.Petit) {
					this.Matrice[this.SesFigures[i].X][this.SesFigures[i].Y] += 1;
				} else if (this.SesFigures[i].type[j] == TypeFigure.Moyen) {
					this.Matrice[this.SesFigures[i].X][this.SesFigures[i].Y] += 2;
				} else if (this.SesFigures[i].type[j] == TypeFigure.Grand) {
					this.Matrice[this.SesFigures[i].X][this.SesFigures[i].Y] += 4;
				}
			}
		}
		return this;

	}

	get carteHorizontale() {

		for (var i = 0; i < this.SesFigures.length; i++) {
			this.SesFigures[i].Y = this.row - this.SesFigures[i].Y - 1;
		}

		this.Matrice = creaMatriceVierge(this.row, this.column);

		for (var i = 0; i < this.SesFigures.length; i++) {
			for (var j = 0; j < this.SesFigures[i].type.length; j++) {
				if (this.SesFigures[i].type[j] == TypeFigure.Petit) {
					this.Matrice[this.SesFigures[i].X][this.SesFigures[i].Y] += 1;
				} else if (this.SesFigures[i].type[j] == TypeFigure.Moyen) {
					this.Matrice[this.SesFigures[i].X][this.SesFigures[i].Y] += 2;
				} else if (this.SesFigures[i].type[j] == TypeFigure.Grand) {
					this.Matrice[this.SesFigures[i].X][this.SesFigures[i].Y] += 4;
				}
			}
		}
		return this;
	}

	get getHTML() {
		return this.link;
	}

	get getIdentifiant() {
		return this.identifiant;
	}

	get getMatrice() {
		return this.Matrice;
	}

	get getSesFigures() {
		return this.SesFigures;
	}
}


class Figure {

	constructor(leType, forme, Cox, Coy) {
		this.X = Cox;
		this.Y = Coy;
		this.type = [];
		for (var i = 0; i < leType.length; i++) {
			this.type.push(leType[i]);
		}
		this.forme = forme;
		var pos = this.X + this.Y * 3;
		var divcase = document.createElement('div');
		divcase.className = "item-form";
		//Pour chaque type on regarde les formes
		switch (this.forme) {
			case FormeFigure.Rond:
				switch (this.type[0]) {

					case TypeFigure.Moyen:

						var divContainForm = document.createElement('div');
						divContainForm.className = "containform";

						var unCercle = document.createElement('div');
						unCercle.className = "anneau";
						unCercle.style.backgroundColor = "var(--colorbase)";
						if (pos == 0 || pos == 2 || pos == 9 || pos == 11) {
							unCercle.style.backgroundColor = "var(--colorone)";
						}
						if (pos == 1 || pos == 10) {
							unCercle.style.backgroundColor = "var(--colortwo)";
						}
						if (pos == 4 || pos == 7) {
							unCercle.style.backgroundColor = "var(--colorthree)";
						}

						var unRond = document.createElement('div');
						unRond.className = "rondinterieur inte";

						unCercle.appendChild(unRond);
						divContainForm.appendChild(unCercle);
						divcase.appendChild(divContainForm);
						this.CodeHTML = divcase;
						break;

					case TypeFigure.Petit:

						var divContainForm = document.createElement('div');
						divContainForm.className = "containform";

						var unRond = document.createElement('div');
						unRond.className = "rond";
						unRond.style.backgroundColor = "var(--colorbase)";

						if (pos == 0 || pos == 2 || pos == 9 || pos == 11) {
							unRond.style.backgroundColor = "var(--colorone)";
						}
						if (pos == 1 || pos == 10) {
							unRond.style.backgroundColor = "var(--colortwo)";
						}
						if (pos == 4 || pos == 7) {
							unRond.style.backgroundColor = "var(--colorthree)";
						}
						divContainForm.appendChild(unRond);
						divcase.appendChild(divContainForm);
						this.CodeHTML = divcase;
						break;

				}
		}
	}
	get getHTML() {
		return this.CodeHTML;
	}
	get getX() {
		return this.X;
	}
	get getY() {
		return this.Y;
	}
	get getType() {
		return this.type;
	}
	get getForme() {
		return this.forme;
	}


}

const FormeFigure = {
	Rond: 'rond',
	Carre: 'carre',
	Triangle: 'triangle',
	Pentagone: 'pentagone',
	Losange: 'Losange'
};

const TypeFigure = {
	Petit: 'p',
	Moyen: 'm',
	Grand: 'g'
};


function journuit() {
	//mode jour
	if (mode % 2 == 0) {
		//changer logo swish
		document.getElementById("imglogo").src = "imgs/swishjour.png";
		document.getElementById("imglogo2").src = "imgs/swishjour.png";
		/*
		MESSAGE POUR CEUX QUI FONT LES TESTS ! Recommentez les lignes après ! Merci
		*/
		//document.getElementById("fondinput").style.backgroundColor = lightsedonca;
		document.getElementById("contourbuttonvalider").style.backgroundColor = lightsedonca;
		//document.getElementById("textjouer").style.color = lightsedonca;
		//document.getElementById("textplus").style.color = lightprima;
		//changer montagnesfond
		document.getElementById("mount1").src = "imgs/mount1.png";
		document.getElementById("mount2").src = "imgs/mount2.png";
		//nuages
		document.getElementById("cloud").src = "imgs/lightcloud.png";
		//changer background color
		//document.getElementById("containplayers").style.color = lightsedonca;
		//maj couleur principales
		document.documentElement.style.setProperty('--lightprima', lightprima);
		document.documentElement.style.setProperty('--lightsedonca', lightsedonca);
		document.documentElement.style.setProperty('--lighttercia', lighttercia);
	}
	//mode nuit
	else {
		//changer logo swish
		document.getElementById("imglogo").src = "imgs/swishnuit.png";
		document.getElementById("imglogo2").src = "imgs/swishnuit.png";

		//document.getElementById("fondinput").style.backgroundColor = darkseconda;
		document.getElementById("contourbuttonvalider").style.backgroundColor = darkseconda;
		//document.getElementById("textjouer").style.color = darkseconda;
		//document.getElementById("textplus").style.color = darkprima;
		//changer montagnesfond
		document.getElementById("mount1").src = "imgs/darkmount1.png";
		document.getElementById("mount2").src = "imgs/darkmount2.png";
		//nuages
		document.getElementById("cloud").src = "imgs/darkcloud.png";
		//mode nuit
		//document.getElementById("containplayers").style.color = darkseconda;
		//maj couleur principales
		document.documentElement.style.setProperty('--lightprima', darkprima);
		document.documentElement.style.setProperty('--lightsedonca', darkseconda);
		document.documentElement.style.setProperty('--lighttercia', darktercia);
	}
	mode = mode + 1;
}

//===================================================================================
//FONCTION GESTION DE GAME

function lancerpartie() {
	document.getElementById("pageAccueil").style.visibility = "hidden";
	//fonction de creation de partie a changer en fonction du test voulu
	creePartieClassique();
	document.getElementById("pageGame").style.visibility = "visible";
}

function retour() {
	document.getElementById("pageAccueil").style.visibility = "visible";
	document.getElementById("pageGame").style.visibility = "hidden";
}

function rechargerGAME() {
	while (document.getElementById("containcards").firstElementChild != null) {
		document.getElementById("containcards").firstElementChild.remove();
	}
	for (var i = 0; i < deckPartie.length; i++) {
		document.getElementById("containcards").appendChild(deckPartie[i].getHTML);
	}
}

function redistribuer() {
	deckPartie = [];
	for (var i = 0; i < 16; i++) {
		var index = getRandom(0, TasDuJEU.length - 1)
		var dejaPresente = false;//Permet de savoir si la carte est deja dans la liste
		for (var j = 0; j < deckPartie.length; j++) {
			if (TasDuJEU[index].identifiant == deckPartie[j].identifiant) {
				dejaPresente = true;
			}
		}
		while (dejaPresente == true) {
			index = getRandom(0, TasDuJEU.length - 1)
			dejaPresente = false;//Permet de savoir si la carte est deja dans la liste
			for (var j = 0; j < deckPartie.length; j++) {
				if (TasDuJEU[index].identifiant == deckPartie[j].identifiant) {
					dejaPresente = true;
				}
			}
		}

		deckPartie.push(copieCarte(TasDuJEU[index]));
	}
	afficherCartes(deckPartie);
}

//================================================================================================================================================================
//Fonction creations de game

function genererTouteslesCartes3_4Possibles() {
	deckPartie = [];
	carteselect = [];
	while (document.getElementById("containcards").firstElementChild != null) {
		document.getElementById("containcards").firstElementChild.remove();
	}

	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < 12; i++) {
			var AllFigure = [];
			AllFigure.push(new Figure(new Array(TypeFigure.Petit), FormeFigure.Rond, 0, j));
			if (i != 3 * j) {
				AllFigure.push(new Figure(new Array(TypeFigure.Moyen), FormeFigure.Rond, i % 3, Math.floor(i / 3)));
				var uneCarte = new Carte(deckPartie.length + 1, AllFigure);
				deckPartie.push(uneCarte);
				if (!doublonInterdit(uneCarte)) {
					AllFigure = [];
					AllFigure.push(new Figure(new Array(TypeFigure.Petit), FormeFigure.Rond, 0, j));
					AllFigure.push(new Figure(new Array(TypeFigure.Moyen), FormeFigure.Rond, i % 3, Math.floor(i / 3)));
					var unDoublon = new Carte(deckPartie.length + 1, AllFigure);
					deckPartie.push(unDoublon);
				}
			}
		}
	}
	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < 12; i++) {
			var AllFigure = [];
			AllFigure.push(new Figure(new Array(TypeFigure.Petit), FormeFigure.Rond, 1, j));
			if (i != 3 * j + 1) {
				if (i != 2 && i != 5 && i != 8 && i != 11) {
					AllFigure.push(new Figure(new Array(TypeFigure.Moyen), FormeFigure.Rond, i % 3, Math.floor(i / 3)));
					var uneCarte = new Carte(deckPartie.length + 1, AllFigure);
					deckPartie.push(uneCarte);
					if (!doublonInterdit(uneCarte)) {
						AllFigure = [];
						AllFigure.push(new Figure(new Array(TypeFigure.Petit), FormeFigure.Rond, 1, j));
						AllFigure.push(new Figure(new Array(TypeFigure.Moyen), FormeFigure.Rond, i % 3, Math.floor(i / 3)));
						var unDoublon = new Carte(deckPartie.length + 1, AllFigure);
						deckPartie.push(unDoublon);
					}
				}
			}
		}
	}
	return deckPartie;
}

function afficherCartes(Liste) {
	while (document.getElementById("containcards").firstElementChild != null) {
		document.getElementById("containcards").firstElementChild.remove();
	}
	for (var i = 0; i < Liste.length; i++) {
		document.getElementById("containcards").appendChild(Liste[i].link);
	}
}

function creePartieClassique() {
	TasDuJEU = genererTouteslesCartes3_4Possibles();
	deckPartie = [];
	for (var i = 0; i < TasDuJEU.length; i++) {
		CodeRotation = getRandom(0, 3);
		if (CodeRotation == 0) {
			TasDuJEU[i] = TasDuJEU[i];
		} else if (CodeRotation == 1) {
			TasDuJEU[i] = Horizontale(TasDuJEU[i]);
		} else if (CodeRotation == 2) {
			TasDuJEU[i] = Verticale(TasDuJEU[i]);
		} else if (CodeRotation == 3) {
			TasDuJEU[i] = Verticale(TasDuJEU[i]);
			TasDuJEU[i] = Horizontale(TasDuJEU[i]);
		}
	}
	for (var i = 0; i < 16; i++) {
		var index = getRandom(0, TasDuJEU.length - 1)
		var dejaPresente = false;//Permet de savoir si la carte est deja dans la liste
		for (var j = 0; j < deckPartie.length; j++) {
			if (TasDuJEU[index].identifiant == deckPartie[j].identifiant) {
				dejaPresente = true;
			}
		}
		while (dejaPresente == true) {
			index = getRandom(0, TasDuJEU.length - 1)
			dejaPresente = false;//Permet de savoir si la carte est deja dans la liste
			for (var j = 0; j < deckPartie.length; j++) {
				if (TasDuJEU[index].identifiant == deckPartie[j].identifiant) {
					dejaPresente = true;
				}
			}
		}

		deckPartie.push(copieCarte(TasDuJEU[index]));
	}
	afficherCartes(deckPartie);
}

function creePartieInfini() {
	deckPartie = [];
	carteselect = [];
	while (document.getElementById("containcards").firstElementChild != null) {
		document.getElementById("containcards").firstElementChild.remove();
	}
	for (var j = 1; j <= 16; j++) {

		var AllFigure = [];
		var Cox1, Coy1, Cox2, Coy2;

		Cox1 = getRandom(0, 2);
		Coy1 = getRandom(0, 3);
		AllFigure.push(new Figure(new Array(TypeFigure.Petit), FormeFigure.Rond, Cox1, Coy1));

		Cox2 = getRandom(0, 2);
		Coy2 = getRandom(0, 3);

		while (Cox2 == Cox1 && Coy1 == Coy2) {
			Cox2 = getRandom(0, 2);
			Coy2 = getRandom(0, 3);
		}
		AllFigure.push(new Figure(new Array(TypeFigure.Moyen), FormeFigure.Rond, Cox2, Coy2));
		//Code de Generation de Figure
		var uneCarte = new Carte(j, AllFigure);

		deckPartie.push(uneCarte);

		document.getElementById("containcards").appendChild(uneCarte.link);
	}
}

//========================================================================================================================================================
//Changer les cartes et Changer les cartes de Tas de jeu

function changerlesCartesDeTasDeJeu() {
	while (carteselect.length != 0) {
		var unIndex = TasDuJEU.indexOf(carteselect[0]);
		TasDuJEU.splice(unIndex, 1);
		if (TasDuJEU.length > 16) {
			var index2 = getRandom(0, TasDuJEU.length - 1)
			var dejaPresente = false;//Permet de savoir si la carte est deja dans la liste
			for (var j = 0; j < deckPartie.length; j++) {
				if (TasDuJEU[index2].identifiant == deckPartie[j].identifiant) {
					dejaPresente = true;
				}
			}
			while (dejaPresente == true) {
				index2 = getRandom(0, TasDuJEU.length - 1)
				dejaPresente = false;//Permet de savoir si la carte est deja dans la liste
				for (var j = 0; j < deckPartie.length; j++) {
					if (TasDuJEU[index2].identifiant == deckPartie[j].identifiant) {
						dejaPresente = true;
					}
				}
			}
			unIndex = deckPartie.indexOf(carteselect[0]);
			deckPartie[unIndex] = TasDuJEU[index2];
		} else {
			unIndex = deckPartie.indexOf(carteselect[0]);
			deckPartie.splice(unIndex, 1);
		}
		carteselect.shift();
	}
	afficherCartes(deckPartie);
}



function changerlesCartes() {
	while (carteselect.length != 0) {
		remplacerLaCarte(carteselect[0]);
		carteselect.shift();
	}
	rechargerGAME();
}

function remplacerLaCarte(uneCarte) {
	pos = deckPartie.indexOf(uneCarte);
	var AllFigure = [];
	var Cox1, Coy1, Cox2, Coy2;

	Cox1 = getRandom(0, 2);
	Coy1 = getRandom(0, 3);
	AllFigure.push(new Figure(new Array(TypeFigure.Petit), FormeFigure.Rond, Cox1, Coy1));

	Cox2 = getRandom(0, 2);
	Coy2 = getRandom(0, 3);

	while (Cox2 == Cox1 && Coy1 == Coy2) {
		Cox2 = getRandom(0, 2);
		Coy2 = getRandom(0, 3);
	}
	AllFigure.push(new Figure(new Array(TypeFigure.Moyen), FormeFigure.Rond, Cox2, Coy2));
	//Code de Generation de Figure
	var newCarte = new Carte(pos + 1, AllFigure);
	deckPartie[pos] = newCarte;
}

//====================================================================================
//GESTION DE MATRICE

function somMatrice(matrice1, matrice2, row, column) {
	var somMatrice = creaMatriceVierge(row, column);
	for (var i = 0; i < column; i++) {
		for (var j = 0; j < row; j++) {
			somMatrice[i][j] = matrice1[i][j] + matrice2[i][j];
		}
	}
	return somMatrice;
}

function copieMatrice(laMatrice, row, column) {
	var myMatrice = new Array();
	for (var i = 0; i < column; i++) {
		myMatrice[i] = new Array();
		for (var j = 0; j < row; j++) {
			myMatrice[i][j] = laMatrice[i][j];
		}
	}
	return myMatrice;
}

function getRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function creaMatriceVierge(row, column) {
	var myMatrice = new Array();
	for (var i = 0; i < column; i++) {
		myMatrice[i] = new Array();
		for (var j = 0; j < row; j++) {
			myMatrice[i][j] = 0;
		}
	}
	return myMatrice;
}

function creaMatrice(row, column) {

	var myMatrice = creaMatriceVierge(row, column);

	var Cox1, Coy1, Cox2, Coy2;

	Cox1 = getRandom(0, 2);
	Coy1 = getRandom(0, 3);

	myMatrice[Cox1][Coy1] = 1;

	Cox2 = getRandom(0, 2);
	Coy2 = getRandom(0, 3);

	while (Cox2 == Cox1 && Coy1 == Coy2) {
		Cox2 = getRandom(0, 2);
		Coy2 = getRandom(0, 3);
	}
	myMatrice[Cox2][Coy2] = 2;

	return myMatrice;

}

//=================================================================================
//chercheCombi => Compte les combinainsons de 2 cartes a l'ecran
function chercheCombi2() {

	var Cptsolution = 0;
	for (var i = 0; i < 15; i++) {

		for (var j = 0; j < 15 - i; j++) {

			var DeckTeste = [];
			var tabCode = [];
			var tab = [];
			var copie = [];
			copie.splice(0, DeckTeste.length);
			DeckTeste.splice(0, DeckTeste.length);
			tab.splice(0, DeckTeste.length);
			tabCode.splice(0, DeckTeste.length);

			DeckTeste.push(copieCarte(deckPartie[i]));
			DeckTeste.push(copieCarte(deckPartie[j + i + 1]));


			for (var h = 0; h < DeckTeste.length; h++) {
				copie.push(DeckTeste[i]);
			}

			tab = AssemblageARBRE(copieListeDeCarte(DeckTeste), copieCarte(DeckTeste[0]));

			var solution = true;


			for (var h = 0; h < tab.length; h++) {
				tabCode.push(tab[h].code);
			}

			for (var g = 0; g < tab.length; g++) {
				if (tab[g].code == DeckTeste.length) {
					solution = false;
				}
			}
			if (!solution) {
				Cptsolution++;
				window.alert("Combinaison a 2 trouve: " + (i + 1) + " " + (i + j + 2));
			}
		}
	}
	window.alert("Nombre de solution a 2 cartes : " + Cptsolution);
}

//=================================================================================
//chercheCombi => Compte les combinainsons de 3 cartes a l'ecran
function chercheCombi3() {
	var Cptsolution = 0;
	for (var i = 0; i < 15; i++) { //Partie fixe

		for (var j = 0; j < 15 - i; j++) {  //Partie movible 1

			for (var k = 0; k < 15 - j; k++) { //Partie movible 2

				var DeckTeste = [];
				var tabCode = [];
				var tab = [];
				var copie = [];
				copie.splice(0, DeckTeste.length);
				DeckTeste.splice(0, DeckTeste.length);
				tab.splice(0, DeckTeste.length);
				tabCode.splice(0, DeckTeste.length);

				DeckTeste.push(deckPartie[i]);
				DeckTeste.push(deckPartie[j + i + 1]);
				DeckTeste.push(deckPartie[k + j + i + 2]);

				for (var h = 0; h < DeckTeste.length; h++) {
					copie.push(DeckTeste[i]);
				}

				for (var z = 0; z < DeckTeste; z++) {
					if (DeckTeste[z] == null) {
						window.alert("Pb carte null :" + i + j + k);
					}
				}

				tab = AssemblageARBRE(copieListeDeCarte(DeckTeste), copieCarte(DeckTeste[0]));
				var solution = true;

				for (var h = 0; h < tab.length; h++) {
					tabCode.push(tab[h].code);
				}

				for (var g = 0; g < tab.length; g++) {
					if (tab[g].code == DeckTeste.length) {
						solution = false;
					}
				}
				if (!solution) {
					Cptsolution++;
					window.alert("Combinaison a 3 trouve: " + (i + 1) + " " + (i + j + 2) + " " + (k + j + i + 3));
				}
			}
		}
	}
	if (Cptsolution == 0) {
		window.alert("Pas de solution");
	}
	window.alert("Nombre de solution a 3 cartes : " + Cptsolution);
}


//=================================================================================
//FONCTION DE TEST => permet de tester des fonctionnalite via le bouton VALIDER

function testPourJeuInfini() {
	try {
		if (carteselect.length == 0) {
			window.alert("Selection Vide");
			return;
		} else if (carteselect.length < 2) {
			window.alert("Selection Trop Petite");
			return;
		} else {
			var copie = [];
			for (var i = 0; i < carteselect.length; i++) {
				copie.push(copieCarte(carteselect[i]));
			}
			var tab = [];
			tab = AssemblageARBRE(copieListeDeCarte(copie), copieCarte(carteselect[0]));
			var solution = true;
			var tabCode = [];
			for (var i = 0; i < tab.length; i++) {
				tabCode.push(tab[i].code);
			}
			for (var i = 0; i < tab.length; i++) {
				if (tab[i].code == carteselect.length) {
					solution = false;
					changerlesCartes();
				}
			}
			if (solution) {
				window.alert("Rien trouve chef !!!");
			}
			if (!solution) {
				window.alert("J'ai une solution chef !!!!");
			}
			window.alert(TasDuJEU.length)
		}
	} catch (e) {
		window.alert(e);
	}
}

//Fonction de test mias pour le jeu classique

function testPourJeuClassique() {
	//try {
	if (carteselect.length == 0) {
		window.alert("Selection Vide test pour jeu classique");
		return;
	} else if (carteselect.length < 2) {
		window.alert("Selection Trop Petite");
		return;
	} else {
		var copie = [];
		for (var i = 0; i < carteselect.length; i++) {
			copie.push(copieCarte(carteselect[i]));
		}
		var tab = [];
		tab = AssemblageARBRE(copie, copieCarte(carteselect[0]));
		var solution = true;
		var tabCode = [];
		for (var i = 0; i < tab.length; i++) {
			tabCode.push(tab[i].code);
		}
		for (var i = 0; i < tab.length; i++) {
			if (tab[i].code == carteselect.length) {
				solution = false;
				changerlesCartesDeTasDeJeu();
			}
		}
		if (solution) {
			window.alert("Rien trouve chef !!!");
		}
		if (!solution) {
			window.alert("J'ai une solution chef !!!!");
		}
		window.alert(TasDuJEU.length)
	}
	/*} catch (e) {
		window.alert(e);
	}*/
}

//===================================================================================
//Function de copie diverse

function copieListeDeCarte(Liste) {
	var copie = [];
	for (var i = 0; i < Liste.length; i++) {
		copie.push(copieCarte(Liste[i]));
	}
	return copie;
}

function copieCarte(uneCarte) {
	if (uneCarte == null) {
		return null;
	}
	var AllFigure = [];
	for (var i = 0; i < uneCarte.SesFigures.length; i++) {
		AllFigure.push(new Figure(uneCarte.SesFigures[i].type, uneCarte.SesFigures[i].forme, uneCarte.SesFigures[i].X, uneCarte.SesFigures[i].Y));
	}
	var carte = new Carte(uneCarte.getIdentifiant, AllFigure);
	carte.Matrice = copieMatrice(uneCarte.Matrice, uneCarte.row, uneCarte.column);
	return carte;
}

function copieLiseDeFigure(Liste) {
	var copie = [];
	for (var i = 0; i < Liste.length; i++) {
		copie.push(copieFigure(Liste[i]));
		window.alert("code " + copie[i].CodeHTML)
	}
	return copie;
}

function copieFigure(uneFigure) {
	window.alert("Avant copiage " + uneFigure.CodeHTML)
	if (uneFigure == null) {
		return null;
	}
	window.alert("je fais la copie")
	var copie = new Figure(uneFigure.type, uneFigure.forme, uneFigure.X, uneFigure.Y);
	return copie;
}
//=====================================================================================================
//Function de manipulataion de Carte

function Verticale(coCarte) {
	var laCarte;
	laCarte = copieCarte(coCarte);
	laCarte = laCarte.carteVerticale;
	return laCarte;
}

function Horizontale(coCarte) {
	var laCarte;
	laCarte = copieCarte(coCarte);
	laCarte = laCarte.carteHorizontale;
	return laCarte;
}

//==============================================================================================================================

//FONCTION POUR TESTER L'ARBRE

class CODE {
	constructor(Carte) {
		this.code = 0;
		this.laCarte = Carte;
	}
}

function AssemblageARBRE(TasDeCarte, Carte) {
	var uneTable = copieListeDeCarte(TasDeCarte);
	var tab = new Array();
	var tabCode = new Array();
	uneTable.splice(0, 1);
	if (uneTable.length == 0) {
		var leCode = new CODE(Carte);
		tab.push(leCode);
		return tab;
	}
	tab.push(AssemblageARBRE(uneTable, copieCarte(uneTable[0])));
	tab.push(AssemblageARBRE(uneTable, Horizontale(copieCarte(uneTable[0]))));
	tab.push(AssemblageARBRE(uneTable, Verticale(copieCarte(uneTable[0]))));
	var derniereCarte = Horizontale(Verticale(copieCarte(uneTable[0])));
	tab.push(AssemblageARBRE(uneTable, derniereCarte));
	for (var i = 0; i < tab.length; i++) {
		for (var j = 0; j < tab[i].length; j++) {
			tabCode.push(tab[i][j]);
		}
	}

	for (var i = 0; i < tabCode.length; i++) {
		if (tabCode[i].code != -1) {
			var enregistrement = tabCode[i].code;
			tabCode[i] = comparaisonARBRE(tabCode[i].laCarte, Carte);
			tabCode[i].code += enregistrement;
		}
	}
	return tabCode;
}


function comparaisonARBRE(CarteMereEntree, CarteFilleEntree) {
	var retour = [];
	var liaison = 0;
	var CarteMere = copieCarte(CarteMereEntree);
	var CarteFille = copieCarte(CarteFilleEntree);
	for (var i = 0; i < CarteFille.SesFigures.length; i++) {
		for (var j = 0; j < CarteMere.SesFigures.length; j++) {
			if (CarteFille.SesFigures[i].X == CarteMere.SesFigures[j].X) {
				if (CarteFille.SesFigures[i].Y == CarteMere.SesFigures[j].Y) {
					//Coordonnees identiques
					if (CarteFille.SesFigures[i].forme == CarteMere.SesFigures[j].forme) {
						//Forme identiques
						for (var k = 0; k < CarteMere.SesFigures[j].type.length; k++) {
							if (CarteFille.SesFigures[i].type[0] == TypeFigure.Petit) {
								if (CarteMere.SesFigures[j].type[k] == TypeFigure.Petit) {
									var leCode = new CODE(CarteMere);
									leCode.code = -1;
									return leCode;
								}
							} else if (CarteFille.SesFigures[i].type[0] == TypeFigure.Moyen) {
								if (CarteMere.SesFigures[j].type[k] == TypeFigure.Moyen) {
									var leCode = new CODE(CarteMere);
									leCode.code = -1;
									return leCode;
								}
							} else if (CarteFille.SesFigures[i].type[0] == TypeFigure.Grand) {
								if (CarteMere.SesFigures[j].type[k] == TypeFigure.Grand) {
									var leCode = new CODE(CarteMere);
									leCode.code = -1;
									return leCode;
								}
							}
						}
						//Si le type de la figure n'y est pas on l'ajoute a la liste de carte Mere;
						liaison = liaison + 1;
						CarteMere.SesFigures[j].type.push(CarteFille.SesFigures[i].type[0]);
					} else {
						var leCode = new CODE(CarteMere);
						leCode.code = -1;
						return leCode;
					}
				}
			}
		}
	}
	var CarteSomme = SommeDeCarte(CarteMere, copieCarte(CarteFille));
	var leCode = new CODE(CarteSomme);
	leCode.code = liaison;
	return leCode;
}

function SommeDeCarte(CarteMere, CarteFille) {
	CarteMere.Matrice = creaMatriceVierge(CarteMere.row, CarteMere.column);
	for (var i = 0; i < CarteFille.SesFigures.length; i++) {
		var manquant = true;
		for (var j = 0; j < CarteMere.SesFigures.length; j++) {
			if (CarteFille.SesFigures[i].X == CarteMere.SesFigures[j].X) {
				if (CarteFille.SesFigures[i].Y == CarteMere.SesFigures[j].Y) {
					manquant = false;
				}
			}
		}
		if (manquant) {
			CarteMere.SesFigures.push(CarteFille.SesFigures[i]);
		}
	}

	for (var i = 0; i < CarteMere.SesFigures.length; i++) {
		for (var j = 0; j < CarteMere.SesFigures[i].type.length; j++) {
			if (CarteMere.SesFigures[i].type[j] == TypeFigure.Petit) {
				CarteMere.Matrice[CarteMere.SesFigures[i].X][CarteMere.SesFigures[i].Y] += 1;
			} else if (CarteMere.SesFigures[i].type[j] == TypeFigure.Moyen) {
				CarteMere.Matrice[CarteMere.SesFigures[i].X][CarteMere.SesFigures[i].Y] += 2;
			} else if (CarteMere.SesFigures[i].type[j] == TypeFigure.Grand) {
				CarteMere.Matrice[CarteMere.SesFigures[i].X][CarteMere.SesFigures[i].Y] += 4;
			}
		}
	}
	return CarteMere;
}

//================================================================================================================================

//==================================================================================


/*
function ChoisirPseudo() {
	let nom = localStorage.getItem('nom');
	if (nom == null) {
		nom = "SWISH";
	}
	document.getElementById('inputpseudo').setAttribute('value', nom);
};

function EnvoyerNouveauNom() {

	let pseudo = document.getElementById('inputpseudo').value;
	localStorage.setItem('nom', pseudo);
	document.location.reload(true);

};
*/


/*
function addplayer(){
	//j'ai mis une limite de 6joueurs, mais c'est a voir
	if(nbplayers < 7){
		//creation de la div contenant le pseudo
		var divpseudo = document.createElement('div');
		divpseudo.id = 'pseudolist';
		//reprise du pseudo entre par le joueur
		var pseudo = document.getElementById("inputpseudo").value;
		//verification si pseudo vide pour lui donner un pseudo du style "Joueur3"
		if(pseudo == "")
		{
			pseudo = "Joueur " + nbplayers;
		}
		//creation du text-pseudo
		var tag = document.createElement("p");
		tag.className = "pseudojoueur";
	    var text = document.createTextNode(pseudo);
	    tag.appendChild(text);
	    //mise du text dans la division
	    divpseudo.appendChild(tag);
	    //insertion pseudo dans liste
		document.getElementById("containplayers").appendChild(divpseudo);
		//remise input vide ;)
		document.getElementById("inputpseudo").value = "";
		nbplayers = nbplayers +1;
	}
}

function ajouterplayer(event){
	if(event.keyCode == 13)
		addplayer();
}

*/

function doublonInterdit(uneCarte) {
	var lesCoPetit = [];
	lesCoPetit.push([1, 1], [1, 1], [1, 2], [1, 2], [1, 1], [2, 2], [1, 1], [2, 1], [1, 2], [2, 2], [1, 2], [2, 1]);
	var lesCoMoyens = [];
	lesCoMoyens.push([2, 1], [3, 3], [1, 1], [3, 4], [2, 3], [1, 4], [1, 2], [1, 1], [2, 3], [1, 3], [2, 4], [1, 3]);
	for (var i = 0; i < lesCoPetit.length; i++) {
		if (uneCarte.SesFigures[0].X == (lesCoPetit[i][0]) - 1) {
			if (uneCarte.SesFigures[0].Y == (lesCoPetit[i][1]) - 1) {
				if (uneCarte.SesFigures[1].X == (lesCoMoyens[i][0]) - 1) {
					if (uneCarte.SesFigures[1].Y == (lesCoMoyens[i][1]) - 1) {
						return true;
					}
				}
			}
		}
	}
	return false;
}




