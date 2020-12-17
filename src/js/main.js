var mode = 1;
var nbplayers = 1;
var lightprima = "#DEDEDE";
var lightsedonca = "#B7B7B7";
var lighttercia = "#E6E6E6";

var darkprima = "#474747";
var darkseconda = "#393939";
var darktercia = "#606060";
var carteselect = [];
var deckPartie = []; //Ensemble des cartes affichées à l'écran




class Carte {

	constructor(id, allFigure/*,row,column,nbForme*/) { //à décommenter quand il y aura des prametres de partie
		//Attribut de Classe
		this.identifiant = id;
		this.row = 4 /*row*/;
		this.column = 4 /*column*/;
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

		for (var i = 0; i < 16; i++) {

			var divcase = document.createElement('div');
			divcase.className = "item-form";
			var ajouté = true;
			for (var j = 0; j < this.SesFigures.length; j++) {
				if (i == this.SesFigures[j].X + (this.SesFigures[j].Y * 3)) {
					ajouté = false;
					var uneFigure = new Figure(this.SesFigures[j].type[0], this.SesFigures[j].forme, this.SesFigures[j].X, this.SesFigures[j].Y);
					divconteneur.appendChild(uneFigure.CodeHTML);
				}
			}
			if (ajouté) {
				divconteneur.appendChild(divcase);
			}
		}

		this.link.appendChild(divconteneur);
		//fonction de selection
		this.link.onclick = function selectioncarte() {
			var macarte = this.id;
			var lacarte = "card" + macarte;

			var laCarte = deckPartie[this.id - 1]; //Carte liée avec le code HTML
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
		this.type.push(leType);
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
						unRond.className = "rondinterieur inté";

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
	Petit: 'petit',
	Moyen: 'moyen',
	Grand: 'grand'
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
	//fonction de création de partie à changer en fonction du test voulu
	genererTouteslesCartes3_4Possibles();
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
//================================================================================================================================================================
//Fonction créations de game

function genererTouteslesCartes3_4Possibles() {
	deckPartie = [];
	carteselect = [];
	while (document.getElementById("containcards").firstElementChild != null) {
		document.getElementById("containcards").firstElementChild.remove();
	}
	for (var k = 0; k < 2; k++) {
		for (var j = 0; j < 2; j++) {
			for (var i = 0; i < 12; i++) {
				var AllFigure = [];
				AllFigure.push(new Figure(TypeFigure.Petit, FormeFigure.Rond, k, j));
				if (i != k + 3 * j) {
					if (k == 0) {
						AllFigure.push(new Figure(TypeFigure.Moyen, FormeFigure.Rond, i % 3, Math.floor(i / 3)));
						var uneCarte = new Carte(i + 12 * j , AllFigure);
						deckPartie.push(uneCarte);
						document.getElementById("containcards").appendChild(uneCarte.link);
					} else if (i != 2 && i != 5 && i != 8 && i != 11) {
						AllFigure.push(new Figure(TypeFigure.Moyen, FormeFigure.Rond, i % 3, Math.floor(i / 3)));
						var uneCarte = new Carte(i + 12 * (1 + k + j), AllFigure);
						deckPartie.push(uneCarte);
						document.getElementById("containcards").appendChild(uneCarte.link);
					}
				}
			}
		}
	}
}

function creePartieDeTest() {
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
		AllFigure.push(new Figure(TypeFigure.Petit, FormeFigure.Rond, Cox1, Coy1));

		Cox2 = getRandom(0, 2);
		Coy2 = getRandom(0, 3);

		while (Cox2 == Cox1 && Coy1 == Coy2) {
			Cox2 = getRandom(0, 2);
			Coy2 = getRandom(0, 3);
		}
		AllFigure.push(new Figure(TypeFigure.Moyen, FormeFigure.Rond, Cox2, Coy2));
		//Code de Génération de Figure
		var uneCarte = new Carte(j, AllFigure);

		deckPartie.push(uneCarte);

		document.getElementById("containcards").appendChild(uneCarte.link);
	}
}

//========================================================================================================================================================
//Changer les cartes

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
	AllFigure.push(new Figure(TypeFigure.Petit, FormeFigure.Rond, Cox1, Coy1));

	Cox2 = getRandom(0, 2);
	Coy2 = getRandom(0, 3);

	while (Cox2 == Cox1 && Coy1 == Coy2) {
		Cox2 = getRandom(0, 2);
		Coy2 = getRandom(0, 3);
	}
	AllFigure.push(new Figure(TypeFigure.Moyen, FormeFigure.Rond, Cox2, Coy2));
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
//FONCTION DE TEST => permet de tester des fonctionnalité via le bouton VALIDER

function test() {
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
				copie.push(carteselect[i]);
			}
			var tab = [];
			tab = AssemblageARBRE(copieListeDeCarte(copie), carteselect[0]);
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
				window.alert("Rien trouvé chef !!!");
			}
			if (!solution) {
				window.alert("J'ai une solution chef !!!!");
			}

		}
	} catch (e) {
		window.alert(e);
	}
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
	var carte = new Carte(uneCarte.getIdentifiant, uneCarte.SesFigures);
	carte.SesFigures = new Array();
	for (var i = 0; i < uneCarte.SesFigures.length; i++) {
		carte.SesFigures.push(new Figure(uneCarte.SesFigures[i].type[0], uneCarte.SesFigures[i].getForme, uneCarte.SesFigures[i].getX, uneCarte.SesFigures[i].getY));
		if (uneCarte.SesFigures[i].type.length > 1) {
			for (var j = 1; j < uneCarte.SesFigures[i].type.length; j++) {
				carte.SesFigures[carte.SesFigures.length - 1].type.push(uneCarte.SesFigures[i].type[j]);
			}
		}
	}
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
	tab.push(AssemblageARBRE(uneTable, Horizontale(uneTable[0])));
	tab.push(AssemblageARBRE(uneTable, Verticale(uneTable[0])));
	var derniereCarte = Horizontale(Verticale(uneTable[0]));
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
					//Coordonnées identiques
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
						//Si le type de la figure n'y est pas on l'ajoute à la liste de carte Mere;
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



/*
function addplayer(){
	//j'ai mis une limite de 6joueurs, mais c'est à voir
	if(nbplayers < 7){
		//création de la div contenant le pseudo
		var divpseudo = document.createElement('div');
		divpseudo.id = 'pseudolist';
		//reprise du pseudo entré par le joueur
		var pseudo = document.getElementById("inputpseudo").value;
		//vérification si pseudo vide pour lui donner un pseudo du style "Joueur3"
		if(pseudo == "")
		{
			pseudo = "Joueur " + nbplayers;
		}
		//création du text-pseudo
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





