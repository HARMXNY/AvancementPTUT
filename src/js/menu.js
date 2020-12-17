var FormeSelect = [];
var ListeCouleur = ["colorbase","colorcarre","colorone","colortwo","colorthree"]
function chooseForm(element){
	//récupérer l'élément
	var e = document.getElementById(element);
	//vérifier l'existance
	var pos = verifPresence(element);	
	//SI PAS PRESENT
	/*
	Faire un systeme pour supprimer de la liste de couleur quand on attribue et ajouter qand on supprime l'élément

	*/
	if(pos == -1){
		if(FormeSelect.length > 4){
			alert("non");
		} else{
			var couleurdonne = "var(--"+ListeCouleur[0]+")";
			if(element == 2){ //cas triangle
				e.style.borderBottom = "var(--y) solid "+couleurdonne;
			}else if(element == 3){ //cas croix
				var a = document.getElementById("a");
				var b = document.getElementById("b");
				a.style.backgroundColor = couleurdonne;
				b.style.backgroundColor = couleurdonne;

			}else{
				e.style.backgroundColor = couleurdonne;
			}
			FormeSelect.push(element);
			ListeCouleur.splice(0,1)
		}
	} else {	
		var x = e.style.backgroundColor;
		var x = recupVariable(x);	
		var couleurdonne = "black";	
		//transformer la valeur en simplement la variable
		if(element == 2){ //cas triangle
			e.style.borderBottom = "var(--y) solid "+couleurdonne;
		}else if(element == 3){ //cas croix
			var a = document.getElementById("a");
			var b = document.getElementById("b");
			a.style.backgroundColor = couleurdonne;
			b.style.backgroundColor = couleurdonne;
		}else{
			e.style.backgroundColor = couleurdonne;
		}
		FormeSelect.splice(pos, 1);
		ListeCouleur.push(x);
		//document.documentElement.style.setProperty('--'+couleur, 'black');
	}
	document.getElementById("text").innerHTML = ListeCouleur.length;

}


function verifPresence(e){
	return FormeSelect.indexOf(e);
}


function recupVariable(v){
	var value = v;
	var z = value.length - 1;
	value = value.substring(6,z);

	return value;
}


