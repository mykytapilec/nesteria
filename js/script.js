const main = (document => {

	function createElem(tag, props,...children){
		const element = document.createElement(tag);
		Object.keys(props).forEach(key => element[key] = props[key]);
		if(children.length > 0){
			children.forEach(child => {
				if(typeof child === "string"){
					child = document.createTextNode(child);
				}
				element.appendChild(child);
			});
		}
		return element;
	}

	function createList (houses, data, btn = "favBtn", sm = "showMore", text = "in favorites"){
		const itemsArr = [];
		for (let i = 0; i < houses.length; i++){
				const showMore = createElem("button", {id:sm, type:"submit"}, "show more");
				const favBtn = createElem("button", {id:btn, type:"submit"}, text);
				const priceNumber = createElem("span", {className:"priceNumber"}, `${houses[i].price_currency} ${houses[i].price}`);
				const price = createElem("div", {className:"price"}, priceNumber);
				const priceDiv = createElem("div", {className:"priceDiv"}, price, favBtn, showMore);
				const datasource = createElem("div", {className:"datasource"}, houses[i].datasource_name);
				const description = createElem("div", {className:"description"}, houses[i].summary);
				const keyWords = createElem("div", {className:"keyWords"}, houses[i].keywords);
				const title = createElem("div", {className:"title"}, houses[i].title);
				const infoDiv = createElem("div",{className:"infoDiv"}, title, keyWords, description, datasource);
				const img = createElem("img", {src: houses[i].img_url});
				const imgDiv = createElem("div", {className: "imgDiv"}, img);
				const generalDiv = createElem("div", {className: "generalDiv"}, imgDiv, infoDiv, priceDiv);
				const contain = createElem("div", {className: "contain"}, generalDiv);
				const item = createElem ("li", {className:"item", id: data.request.location}, contain);
										
				itemsArr.push(item);
		}
		return itemsArr;
	}

	function addBtn(className, name){
		return createElem("button", {className: className, type: "submit"}, name);
	}

	function removeFavHouses (arr){
		let removeFavBtn = document.querySelectorAll("#removeFavBtn");
		let superArr = [];
		superArr.push(...favHouses);
		for (let i = 0; i < favHouses.length; i++){
			removeFavBtn[i].onclick = function (){
				superArr.splice(i, 1, "");
				const anotherArr = superArr.filter(item => item !== "");
				ifmc.removeChild(arr[i]);
				if(!ifmc.firstChild){
					modalPhrase.style.display = "block";
				}
				localStorage.setItem("favHouses", JSON.stringify(anotherArr));
				favHouses = JSON.parse(localStorage.getItem("favHouses"));
			}	
		}
	}
	
	function addFavHouses(houses, data){
		let arr = [];
		const favBtn = document.querySelectorAll("#favBtn");
		for (let i = 0; i < houses.length; i++){
			favBtn[i].onclick = function (){
				modalPhrase.style.display = "none";
				const filter = [];
				for (let j = 0; j < favHouses.length; j++){
					filter.push(favHouses[j].lister_url);
				}
				if(!filter.includes(houses[i].lister_url)){
					favHouses.push(houses[i]);
				}
				localStorage.setItem("favHouses", JSON.stringify(favHouses));
				favHouses = JSON.parse(localStorage.getItem("favHouses"));
				const favLi = createList(favHouses, data, "removeFavBtn", "newShowMore", "remove");
				ifmc.innerHTML = "";
				for( let i = 0; i < favLi.length; i++){
					ifmc.appendChild(favLi[i]);
				}
				removeFavHouses(favLi);
			}
		}
	}

	function moreInfo(houses, data){
		const showMore = document.querySelectorAll("#showMore");
		for (let i = 0; i < houses.length; i++){
			showMore[i].onclick = function (){
				showModal.style.display = "block";
				app.className = "fixed";
				ismc.appendChild(createElem("img", {src: `${houses[i].img_url}`, alt: "", className: "imgModal"}));
				ismc.appendChild(createElem("span", {className: "titleText"}, `${houses[i].title}` ));
				showClose.onclick = function(){
					app.className ="nonFixed";
					showModal.style.display = "none";
					ismc.innerHTML = "";	
				}		
			}	
		}
	}

	function viewOfHouses (houses, data){
		const items = createList(houses, data);
		for (let i = 0; i < items.length; i++){
			list.appendChild(items[i]);
		}
	}

	const request = (city, page) => new Promise ((resolve, reject) => {
	    const api = `https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&listing_type=rent&pretty=1&number_of_results=5&place_name=${city}&page=${page}`;
	    const request = new XMLHttpRequest();
	    request.withCredentails = true;
	    request.open("GET", api, true);
	    request.onload = () => (request.status === 200) ? resolve(JSON.parse(request.response)) : reject(Error(request.statusText));
	    request.oneerror = (err) => reject(err);
	    request.send();
	});

	function addMore(event){
		event.preventDefault();
		let params = event.target.myParam;
		request(params[0], ++params[1])
			.then(nextData => {
				list.innerHTML = "";
				houses.push(...nextData.response.listings);
				viewOfHouses(houses, nextData);
				moreInfo(houses, nextData);
				addFavHouses(houses, nextData);
				btn.addEventListener("click", addMore);
			})
			.catch("error on next step");
	}

	function addItems (event){
		event.preventDefault();
		const changeInputValue = input.value.toLowerCase();
		let page = 1;
		request(changeInputValue, page)
		 .then(data => {
		 		console.log(data)
				list.innerHTML = "";
				if(data.response.application_response_code === "100"){
					houses.push(...data.response.listings);
					if (houses.length > 5){
						houses.splice(0, houses.length - +data.request.num_res);
					}
					viewOfHouses(houses, data);
					moreInfo(houses, data);
					addFavHouses(houses, data);
					container.appendChild(btn);
					btn.myParam = [changeInputValue, page];
					btn.addEventListener("click", addMore);
				} else {
					alert("incorrect name!!!");
				}
			})
		.catch("error!");	
		input.value = "";
	}

	const favModal = document.getElementById("myFavModal");
	const ifmc = document.getElementById("inside-fav-modal-content");
	const favClose = document.getElementsByClassName("favClose")[0];

	const modalPhrase = document.getElementById("modalPhrase");

	const showModal = document.getElementById("myShowModal");
	const ismc = document.getElementById("inside-show-model-content");
	const showClose = document.getElementsByClassName("showClose")[0];

	const app = document.getElementById("app");
	const form = document.getElementById("form");
	const input = document.getElementById("input");
	const list = document.getElementById("list");
	const container = document.getElementById("container");

	const btn = addBtn("addMore", "ADD MORE");
	const favModelButton = addBtn("favorBtn","FAVORITIES");

	const houses = [];
	let favHouses = [];

	container.insertBefore(favModelButton, list);

	function main (){

		favModelButton.onclick = function(){
	 		favModal.style.display = "block";
	 		app.className = "fixed";
	 	}

		favClose.onclick = function(){
			favModal.style.display = "none";
			app.className = "nonFixed";	
		}

		if(localStorage.getItem("favHouses")){
			ifmc.innerHTML ="";
			favHouses = JSON.parse(localStorage.getItem("favHouses"));	
			const li = createList(favHouses, data = {request: {location:"somePlace"}}, "removeFavBtn", "newShowMore", "remove");
			for( let i = 0; i < li.length; i++){
				ifmc.appendChild(li[i]);
				modalPhrase.style.display = "none";
			}
			removeFavHouses(li);
		}
		form.addEventListener("submit", addItems);
	}

	return main;

})(document);

main();



