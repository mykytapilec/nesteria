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

function request (city, page){
	console.log(city);

	const get = () => new Promise ((resolve, reject) => {

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

	return get;
}

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
						
	let itemsArr = [];
	for (let i = 0; i < data.response.listings.length; i++){
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
		const container = createElem("div", {className: "container"}, generalDiv);
		const item = createElem ("li", {className:"item", id: data.request.location}, container);
							
		// console.log(item);

		itemsArr.push(item);

	}
	// console.log(itemsArr);
	return itemsArr
}

function addBtn(city){
	const addBtn = createElem("button", {className:"addMore", type: "submit"}, `ADD MORE FOR ${city}`);
	return addBtn;
}

function circle (length){
	let number;
	number = length - 5;
	return number;
}



function addModelInfo (index, data, a = 0){
	const copy = createList(data, "favBtnNew", "newShowMore");
	// console.log(copy);
	console.log(showMore);

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
	console.log(favBtn);


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
		console.log(a);
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

function addItems (event){
	// console.log(event);
	event.preventDefault();
	
	const changeInputValue = input.value.toLowerCase();

	// console.log(changeInputValue);
	let page = 1
	const data = request(changeInputValue, page);
	data().then(
		data => {
		 	return data
		},
		err => console.error(new Error("mistake!"))
		).then(clientData =>{

			console.log(clientData);

			function addMore(){
				event.preventDefault();
				console.log("add more");
				const newData = request(changeInputValue, ++page);
				newData().then(
					data => {
					 	return data
					},
					err => console.error(new Error("mistake!"))
					).then(newClientData =>{
						console.log(newClientData);
						const items = createList(newClientData);
						const btn = addBtn(newClientData.request.location);
						let num = document.getElementById('list').childNodes.length;
						console.log(num);
						for (let i = 0; i < items.length; i++){
							list.appendChild(items[i]);
							console.log(list);
							// addModel(i, newClientData, 5, num -5);
							addModelFav(i, newClientData, num -5);
							addModelInfo(i, newClientData, num -5);
						}	
						btn.addEventListener("click", addMore);
					});
			}

			if(clientData.response.application_response_code == "100"){
				console.log("nice");
				const items = createList(clientData);
				console.log(items);
				const btn = addBtn(clientData.request.location);
				let num = document.getElementById('list').childNodes.length;
				console.log(num);
				for (let i = 0; i < items.length; i++){
					list.appendChild(items[i]);
					if (num > 0){
						addModelFav(i, clientData, num - 5);
						addModelInfo(i, clientData, num - 5);
					}
					addModelFav(i, clientData);
					addModelInfo(i, clientData);
				}
				container.appendChild(btn);
				console.log(favBtn);
				btn.addEventListener("click", addMore);
			} else {
				alert("incorrect name");
			}
		});	
	input.value = "";

}

function main (){
	form.addEventListener("submit", addItems);
}



main();