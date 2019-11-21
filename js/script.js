console.log(123);

const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");
const span = document.getElementsByClassName("close")[0];

const modal2 = document.getElementById("myModal2");
const modalContent2 = document.getElementById("modal-content2");
const span2 = document.getElementsByClassName("close2")[0];

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const container = document.getElementById("container");
const itemsNew = document.querySelectorAll(".item");

const btn = addBtn("addMore", "ADD MORE");
const favModelButton = addBtn("favorBtn","FAVORITIES");

const houses = [];
const favHouses = [];
console.log(houses);

container.appendChild(favModelButton);

const request = (city, page) => new Promise ((resolve, reject) => {
    const api = `https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&listing_type=rent&pretty=1&number_of_results=5&place_name=${city}&page=${page}`;
    const request = new XMLHttpRequest();
    request.withCredentails = true;
    request.open("GET", api, true);
    request.onload = () => 
        (request.status === 200) ? resolve(JSON.parse(request.response)):
        reject(Error(request.statusText));
    request.oneerror = (err) => reject(err);
    request.send();
});


function createElem(tag, props,...children){
	// console.log("creating elem");
	const element = document.createElement(tag);
	// console.log(element); 
	// console.log(children);

	Object.keys(props).forEach(key => element[key] = props[key]);

	if(children.length > 0){
		children.forEach(child => {
			if(typeof child === "string"){
				child = document.createTextNode(child);
				// console.log(child);
			}
			element.appendChild(child);
		});
	}
	// console.log(element);
	return element;
}

function createList (data, btn = "favBtn", sm = "showMore"){
						
	const itemsArr = [];
	for (let i = 0; i < data.request.num_res; i++){
		const showMore = createElem("button", {id:sm, type:"submit"}, "show more");
		const favBtn = createElem("button", {id:btn, type:"submit"}, "in favorites");
		// const mortGage = createElem("span", {className:"mortGage"}, "View Your Credit Report");
		const priceNumber = createElem("span", {className:"priceNumber"}, `${data.response.listings[i].price_currency} ${data.response.listings[i].price}`);
		const price = createElem("div", {className:"price"}, priceNumber);
		const priceDiv = createElem("div", {className:"priceDiv"}, price, favBtn, showMore);
		const datasource = createElem("div", {className:"datasource"}, data.response.listings[i].datasource_name)
		const description = createElem("div", {className:"description"}, data.response.listings[i].summary)
		const keyWords = createElem("div", {className:"keyWords"}, data.response.listings[i].keywords)
		const title = createElem("div", {className:"title"}, data.response.listings[i].title);
		const infoDiv = createElem("div",{className:"infoDiv"}, title, keyWords, description, datasource);
		const img = createElem("img", {src: data.response.listings[i].img_url});
		const imgDiv = createElem("div", {className: "imgDiv"}, img);
		const generalDiv = createElem("div", {className: "generalDiv"}, imgDiv, infoDiv, priceDiv);
		const contain = createElem("div", {className: "contain"}, generalDiv);
		const item = createElem ("li", {className:"item", id: data.request.location}, contain);
							
		// console.log(item);

		itemsArr.push(item);
		// houses.push(item);

	}
	// console.log(itemsArr);
	// console.log(houses);
	return itemsArr
}

function addBtn(className, name){
	return createElem("button", {className: className, type: "submit"}, name);
	
}

function circle (length){
	let number;
	number = length - 5;
	return number;
}



function addModelInfo (index, data, a = 0){
	const copy = createList(data, "favBtnNew", "newShowMore");
	// console.log(copy);
	// console.log(showMore);

	if(index == 0 && a == false){
		showMore.onclick = function(){
			modal2.style.display = "block";	
			modalContent2.appendChild(copy[index]);
			// console.log(showMore);
			// console.log(copy[0]);
			// console.log(favBtnNew);
			span2.onclick = function(){
				modal2.style.display = "none";
				const removeItem = copy[index];
				removeItem.remove();	
			}
		}
	} else if (index == 0 && a == true) {
		showMore[index + a].onclick = function(){
			modal2.style.display = "block";	
			modalContent2.appendChild(copy[index]);
			// console.log(showMore);
			// console.log(copy[index]);
			// console.log(favBtnNew);
			span2.onclick = function(){
				modal2.style.display = "none";
				const removeItem = copy[index];
				removeItem.remove();	
			}
		}
	} else {
		console.log(a);
		showMore[index + a].onclick = function(){
			modal2.style.display = "block";	
			modalContent2.appendChild(copy[index]);
			// console.log(showMore);
			// console.log(copy[index]);
			// console.log(favBtnNew);
			span2.onclick = function(){
				modal2.style.display = "none";
				const removeItem = copy[index];
			removeItem.remove();	
			}
		}
	}




	// span2.onclick = function(){
	// 	modal2.style.display = "none";
	// }

	window.onclick = function(event){
		if(event.target == modal2){
			modal2.style.display = "none";
		}
	}	
}

function addModelFav (index, data, a = 0){

	const copy = createList(data, "favBtnNew", "newShowMore");
	// console.log(copy);
	// console.log(favBtn);


	if(index == 0 && a == false){
		// num = circle(favBtn.length);
		favBtn.onclick = function(){
			modal.style.display = "block";	
			modalContent.appendChild(copy[index]);
			// console.log(favBtn);
			// console.log(copy[0]);
			// console.log(favBtnNew);
		}
	} else if (index == 0 && a == true) {
		// num = circle(favBtn.length);
		favBtn[index + a].onclick = function(){
			modal.style.display = "block";	
			modalContent.appendChild(copy[index]);
			// console.log(favBtn);
			// console.log(copy[index]);
			// console.log(favBtnNew);
		}
	} else {
		// console.log(a);
		favBtn[index + a].onclick = function(){
			modal.style.display = "block";	
			modalContent.appendChild(copy[index]);
			// console.log(favBtn);
			// console.log(copy[index]);
			// console.log(favBtnNew);
		}
	}


	span.onclick = function(){
		modal.style.display = "none";
				
	}

	window.onclick = function(event){
		if(event.target == modal){
			modal.style.display = "none";
		}
	}			
}

// function clear (city){
// 	console.log(city);
// 	let elem = list.querySelector('[id]');
// 	console.log(elem);
// 	let oldCity = elem.getAttribute('id')
// 	console.log(oldCity);
// 	if (city !== oldCity ){
// 		console.log("differ")
// 		elem.style.display = "block";
// 	}
// }

function viewOfHouses (data){


	// console.log(houses);

	if(houses[0].id !== houses[houses.length - 1].id){
		for (let i = 0; i < houses.length - +data.request.num_res; i++){
			// list.removeChild(houses[i]);
			houses[i].remove()
		}
		houses.splice(0, houses.length - +data.request.num_res)
	} 


	for (let i = 0; i < houses.length; i++){
		list.appendChild(houses[i]);
	}
	// console.log(oldCity);
	// console.log(houses);


}

function addFavHouses (){
	// console.log(favBtn);

	// console.log(houses);
	// console.log(favHouses);

	for (let i = 0; i < houses.length; i++){
		favBtn[i].onclick = function (){
			console.log("fav");
			console.log(houses[i])
			localStorage.setItem("favHouses", JSON.stringify(houses[i]))
			if (localStorage.getItem("favHouses")){
				favHouses.push (JSON.parse(localStorage.getItem("favHouses")))
			}
			console.log(favHouses);
			// favHouses.push(houses[i]);
		}	
	}

}


function favModel (){
	// console.log(houses);
	// console.log(favHouses);
	// let arr = [];

	// localStorage.setItem("favHouses", JSON.stringify(favHouses))

	// console.log(localStorage)
	// if (localStorage.getItem("favHouses")){
	// 	arr = JSON.parse(localStorage.getItem("favHouses"))
	// }
	// console.log(arr);

	// for (let i = 0; i < favHouses.length; i++){
	// 	modalContent.appendChild(favHouses[i]);	
	// }


	// console.log()

	// localStorage.item = JSON.stringify(favHouses);
	// console.log(localStorage.item)
	// const item = JSON.parse(localStorage.item)
	
	// console.log(item)
	// console.log(item[0])

	// for (let i = 0; i < arr.length; i++){
	// 	modalContent.appendChild(arr[i]);	
	// }


 	favModelButton.onclick = function(){
 		modal.style.display = "block";
 	}


	span.onclick = function(){
		modal.style.display = "none";
				
	}

	window.onclick = function(event){
		if(event.target == modal){
			modal.style.display = "none";
		}
	}	

}

function moreInfo(){
	// console.log(showMore);
	for (let i = 0; i < houses.length; i++){
		showMore[i].onclick = function (){
			console.log("fav");
			console.log(houses[i])
			modal2.style.display = "block";	
			modalContent2.appendChild(houses[i]);
			span2.onclick = function(){
				modal2.style.display = "none";
				houses[i].remove();
			}	
		}	
	}

	window.onclick = function(event){
		if(event.target == modal){
			modal.style.display = "none";
		}
	}


}

function addMore(event){
	event.preventDefault();
	let params = event.target.myParam;
	console.log("add more");
	request(params[0], ++params[1])
		.then(
		nextData => {
			console.log(nextData);
			const items = createList(nextData);
			items.forEach(item => houses.push(item));
			// console.log(houses);
			// const btn = addBtn(nextData.request.location);

			viewOfHouses(nextData);
			addFavHouses()
			favModel()
			moreInfo()
			

			// let num = document.getElementById('list').childNodes.length + +nextData.request.num_res - 1;
			// console.log(num);
			// for (let i = 0; i < items.length; i++){
			// 	list.appendChild(items[i]);
			// 	console.log(list);
			// 	// addModel(i, newClientData, 5, num -5);
			// 	addModelFav(i, nextData, num - nextData.request.num_res);
			// 	addModelInfo(i, nextData, num - nextData.request.num_res);
			// }


			btn.addEventListener("click", addMore);
		},
		).catch("error on next step");
}

function addItems (event){
	// console.log(event);
	event.preventDefault();
	
	const changeInputValue = input.value.toLowerCase();

	// console.log(changeInputValue);
	let page = 1
	request(changeInputValue, page)
	 .then(
		data => {
			console.log(data);

			if(data.response.application_response_code == "100"){
				// console.log("nice");
				const items = createList(data);
				items.forEach(item => houses.push(item));
				// houses.push(items);
				// console.log(items);
				console.log(houses);


				

				viewOfHouses(data);
				addFavHouses();
				favModel()
				moreInfo()

				// let num = document.getElementById('list').childNodes.length + +data.request.num_res - 1;
				// console.log(num);
				// for (let i = 0; i < items.length; i++){
				// 	list.appendChild(items[i]);

				// 	if (num >=5){
				// 		addModelFav(i, data, num - data.request.num_res);
				// 		addModelInfo(i, data, num - data.request.num_res);
				// 	}
				// 	addModelFav(i, data);
				// 	addModelInfo(i, data);
				// }



				
				container.appendChild(btn);
				btn.myParam = [changeInputValue, page];


				btn.addEventListener("click", addMore);




			} else {
				alert("incorrect name");
			}
		}
	 ).catch("error!");	
	input.value = "";

}

function main (){
	form.addEventListener("submit", addItems);
}



main();
