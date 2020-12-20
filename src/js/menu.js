var FormeSelect = [];
var ListeCouleur = ["colorbase","colorcarre","colorone","colortwo","colorthree"]
var ListeClassForme = ["rond","carre","triangle","losange","croix","penta","hexa","hocto"]

//3 modes : 0 = couleurs // 1 = formes // 2 = personnaliser les cartes
var mode = 0;

function settingOpen(){
	var elements = document.getElementsByClassName("pcr-button"); 
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.add(ListeClassForme[i]);
	}
}

function SelectShape(shape){
	//recuperer la forme
	var forme = "set"+shape;
	var selection = document.getElementById(forme);
	//Que si deja selectionne
	var couleurBase = selection.style.backgroundColor;
	//deselection
	if(couleurBase[0] == "v" && couleurBase[1] == "a" && couleurBase[2] == "r"){
		//supprime de la liste des selectionne
		var pos = FormeSelect.indexOf(shape);
		FormeSelect.splice(pos, 1);
		//recuperer la couleur
		var recupColor = getVarColor(couleurBase);
		ListeCouleur.push(recupColor);
		//mettre a jour la couleur
		selection.style.backgroundColor  = "#333";
		//document.getElementById("SettingName").innerHTML = recupColor;


	}else{ //selection
		if(FormeSelect.length > 4){
			alert("NON NON NOOOOOON");
		} else{
			FormeSelect.push(shape);
			//definir la couleur
			var couleur = "var(--" + ListeCouleur[0] + ")";
			selection.style.backgroundColor  = couleur;
			//Supprimer la couleur de la liste
			ListeCouleur.splice(0, 1);	
			//document.getElementById("SettingName").innerHTML = ListeCouleur.length;
		}	
	}	
}

function getVarColor(color){
	var getvar = color;
	getvar = getvar.substring(6,getvar.length-1);

	return getvar;
}

function varColorToHex(color){
	hex = getComputedStyle(document.documentElement).getPropertyValue(color);
	hex = hex.substring(1,hex.length);
	return hex;
}
