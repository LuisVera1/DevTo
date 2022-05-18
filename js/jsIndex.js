
let blog = "blog.html"
const URL = 'https://kdm1-11734-default-rtdb.firebaseio.com/DevTo/';
//const URL = 'https://nestorfirebase-default-rtdb.firebaseio.com/';


// let hashCollection = [];
// let data = {}

//DB reading
function getData() {
	const xhr = new XMLHttpRequest();
	const URL_FIREBASE = URL + '.json';
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
				const response = JSON.parse(xhr.response)
				for(let property in response ) {
					//data[property] = response[property];
					//hashCollection.push(property)
					let dateArt = calcDate(response[property].date);

					if (dateArt > range){
						createCard(response[property],property)
					}
				}
			}
		};
	};
	xhr.open("GET",URL_FIREBASE);
	xhr.send();	
}
getData();

function deleteElement(hash) {
	const URL_DELETE = URL + hash + ".json"
	console.log(URL_DELETE);
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
				getData();
			}
		};
	};
	xhr.open("DELETE",URL_DELETE);
	xhr.send();	
	//getData();
}

function showDate(strDate) {
	let res;
	let dmy = strDate.split("-");

	let month ={
		"01": "Jan",
		"02": "Feb",
		"03": "Mar",
		"04": "Apr",
		"05": "May",
		"06": "Jun",
		"07": "Jul",
		"08": "Ago",
		"09": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	}

	let d = dmy[0];
	let m = month[dmy[1]];
	let y = dmy[2];

	if(y === "22"){
		res = m + " " + d
	} else{
		res = m + " " + d + " '" + y
	}
return res
}

//function to Create card
let numCard = 0;
let main = document.querySelector('#mainContent');
function createCard(data,hash) {

	if(numCard == 0){
		let imgTop = document.querySelector("#ImgTop");
		imgTop.src = data.imgPost;
		//console.log(data.imgPost);
		numCard++
	}

	//Head
	let row = document.createElement('div');
	row.classList.add('row',"fullCard");  //hash
	let card = document.createElement('div');
	card.classList.add('card');
	let CardHead = document.createElement('div');
	CardHead.classList.add('CardHead');
	let img = document.createElement('img');
	img.classList.add('ImgTmb');
	img.src = "img/" + data.autorName + ".png"
	let cardTitleHead = document.createElement('div');
	cardTitleHead.classList.add('CardTitleHead');

	let Name = document.createElement('div');
	Name.classList.add('Name');
	Name.textContent = data.autorName;
	let date = document.createElement('div');
	date.classList.add('FS12', 'FGray');
	date.textContent = showDate(data.date);

	cardTitleHead.appendChild(Name);
	cardTitleHead.appendChild(date);
	CardHead.appendChild(img);
	CardHead.appendChild(cardTitleHead);
	card.appendChild(CardHead);

	//Body
	let CardBody = document.createElement('div');
	CardBody.classList.add('CardBody');
	let ArticleName = document.createElement('div');
	ArticleName.classList.add('ArticleName');
	let LinkArticle = document.createElement('a');
	LinkArticle.classList.add('LinkArticle');
	LinkArticle.textContent = data.title;
	LinkArticle.setAttribute("href", blog);
	LinkArticle.setAttribute("data-post", hash);
	let Hashtags = document.createElement('div');
	Hashtags.classList.add('Hashtags');

	ArticleName.appendChild(LinkArticle);
	CardBody.appendChild(ArticleName);
	CardBody.appendChild(Hashtags);

	data.hastags.forEach((item) => {
		let listHastags = document.createElement('a');
		listHastags.setAttribute('href', '#');
		listHastags.classList.add('LinksHashtags', 'FGray');
		listHastags.text = item;
		Hashtags.appendChild(listHastags);
	});
	card.appendChild(CardBody);

	//footer
	let CardFoot = document.createElement('div');
	CardFoot.classList.add('CardFoot');

	let heart = document.createElement('button');
	heart.setAttribute('type', 'button');
	heart.classList.add('btn', 'btn-sm', 'LinkReactions');
	let imgHeart = document.createElement('img');
	imgHeart.classList.add('Reactions');
	imgHeart.src = 'img/Heart.png';
	heart.appendChild(imgHeart);
	let txtH = document.createTextNode(data.reactions + ' reactions');
	heart.appendChild(txtH);

	let globe = document.createElement('button');
	globe.setAttribute('type', 'button');
	globe.classList.add('btn', 'btn-sm', 'LinkReactions');
	let imgGlobe = document.createElement('img');
	imgGlobe.classList.add('Reactions');
	imgGlobe.src = 'img/Gb.png';
	globe.appendChild(imgGlobe);
	let numComments = data.coments.length;
	let txtG = document.createTextNode(numComments + ' comments');
	globe.appendChild(txtG);

	let Spacer = document.createElement('div');
	Spacer.classList.add('Spacer');

	let readingTime = document.createElement('div');
	readingTime.classList.add('FS12', 'FGray', 'p-1');
	let minutes = Math.floor(Math.random() * (15 - 3)) + 3;
	readingTime.textContent =  minutes + ' min read';

	let btnDelete = document.createElement('button');
	btnDelete.setAttribute('type', 'button');
	btnDelete.setAttribute("data-hash", hash)
	btnDelete.classList.add('btn', 'btn-sm', 'Save');
	btnDelete.textContent = 'Delete';

	CardFoot.appendChild(heart);
	CardFoot.appendChild(globe);
	CardFoot.appendChild(Spacer);
	CardFoot.appendChild(readingTime);
	CardFoot.appendChild(btnDelete);
	card.appendChild(CardFoot);

	row.appendChild(card);
	main.appendChild(row);
}


function deleteCard(){
	let elementToDel = document.querySelectorAll(".fullCard")
	elementToDel.forEach((item) => {
		item.remove();
	})
}

main.addEventListener("click",(event) =>{
	if(event.target.dataset.hash){
		// let del = event.target.dataset.hash;
		// let elementDel = document.querySelector("."+del)
		// elementDel.remove();
		deleteCard();
		deleteElement(event.target.dataset.hash);
	}

	if(event.target.dataset.post){
		sessionStorage.setItem("Hash",event.target.dataset.post)
	}
});

let f30d = document.querySelector("#d30");
let f365d = document.querySelector("#d365");

f30d.addEventListener("click",(event) =>{
range = valToday - 30;
deleteCard();
getData();
});


f365d.addEventListener("click",(event) =>{
	range = valToday - 365;
	deleteCard();
	getData();
});

//#region Date



function calcDate(str){
	let spl = str.split("-");
	let num = Number(spl[0]);
	num += Number(spl[1]) *30;
	num += Number(spl[2]) * 365;
return num
	};




let date = "17-05-22";
let valToday = calcDate(date);
let range = 0;
//#endregion
