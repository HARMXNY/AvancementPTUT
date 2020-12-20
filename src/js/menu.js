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

function disableCache(formName){
	cacheName = "cache"+formName;
	document.getElementById(cacheName).style.display = "none";
	FormeSelect.push(form);

	//document.getElementById("SettingName").innerHTML = FormeSelect.length;
}

function ableCache(formName){
	cacheName = "cache"+formName;
	const pos = FormeSelect.indexOf(formName);
	if (pos > -1) {
	  FormeSelect.splice(pos, 1);
	}
	document.getElementById(cacheName).style.display = "block";
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
