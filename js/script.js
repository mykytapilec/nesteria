console.log(123);

const get = () => new Promise ((resolve, reject) => {

    const api = "https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&listing_type=rent&pretty=1&number_of_results=5&place_name=brighton&page=1";
    const request = new XMLHttpRequest();
    request.withCredentails = true;
    request.open("GET", api, true);
    request.onload = () => 
        (request.status === 200) ? resolve(JSON.parse(request.response)):
        reject(Error(request.statusText));
    request.oneerror = (err) => reject(err);
    request.send();
});

get().then(
	 data => {
	 	return data
	 },
	 err => console.error(new Error("mistake!"))
	).then(clientData =>{
		console.log(clientData)

		const modal = document.getElementById("myModal");
		const modalContent = document.getElementById("modal-content");
		const span = document.getElementsByClassName("close")[0];

		const form = document.getElementById("form");
		const input = document.getElementById("input");
		const list = document.getElementById("list");
		const container = document.getElementById("container");
		const itemsNew = document.querySelectorAll(".item");

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


		function createList (){
			
			let itemsArr = [];
			for (let i = 0; i < clientData.response.listings.length; i++){
				const favBtn = createElem("button", {id:"favBtn", type:"submit"}, "in favorites");
				const mortGage = createElem("a", {href:"https://www.sberbank.ru/ru/person", className:"mortGage"}, "View Your Credit Report");
				const priceNumber = createElem("span", {className:"priceNumber"}, `${clientData.response.listings[i].price_currency} ${clientData.response.listings[i].price}`);
				const price = createElem("div", {className:"price"}, priceNumber);
				const priceDiv = createElem("div", {className:"priceDiv"}, price, mortGage, favBtn);
				const datasource = createElem("div", {className:"datasource"}, clientData.response.listings[i].datasource_name)
				const description = createElem("div", {className:"description"}, clientData.response.listings[i].summary)
				const keyWords = createElem("div", {className:"keyWords"}, clientData.response.listings[i].keywords)
				const title = createElem("div", {className:"title"}, clientData.response.listings[i].title);
				const infoDiv = createElem("div",{className:"infoDiv"}, title, keyWords, description, datasource);
				const img = createElem("img", {src: clientData.response.listings[i].img_url});
				const imgDiv = createElem("div", {className: "imgDiv"}, img);
				const generalDiv = createElem("div", {className: "generalDiv"}, imgDiv, infoDiv, priceDiv);
				const container = createElem("div", {className: "container"}, generalDiv);
				const item = createElem ("li", {className:"item"}, container);
				
				// console.log(item);

				itemsArr.push(item);

			}
			// bindEvents(itemsArr);
			console.log(itemsArr);
			return itemsArr
		}

		function bindEvents(item){

			// console.log(item);
			// for(let i=0; i<item.length; i++){
			// 	console.log(item[i]);
			// 	const favBtn = item[i].querySelector("favBtn");
			// 	console.log(favBtn);
			// }

			// const favBtn = item.querySelector("favBtn");

			

			// const checkbox = todoItem.querySelector(".checkbox");
			// const editButton = todoItem.querySelector("button.edit");
			// const deleteButton = todoItem.querySelector("button.delete");

			// checkbox.addEventListener("change", toggleTodoItem);
			// editButton.addEventListener("click", editTodoItem);
			// deleteButton.addEventListener("click", deleteTodoItem);
		}


		function addBtn(){

			const addBtn = createElem("button", {className:"addMore", type: "submit"}, "ADD MORE");
			return addBtn;
		}

		function addLink(index, items){
			const copy = createList();
			console.log(copy);
			console.log(clientData);
			console.log(clientData.response.listings[0].lister_url)

			if(index == 0){
				items[0].onclick = function (){
					console.log(clientData.response.listings[index].lister_url);
					window.open(clientData.response.listings[index].lister_url);
				}
			} else {
				items[index].onclick = function(){
					console.log(clientData.response.listings[index].lister_url);
					window.open(clientData.response.listings[index].lister_url);
				}
			}
		}

		function addModel (index){

			const copy = createList();
			console.log(copy);

			if(index == 0){
				favBtn.onclick = function(){
					modal.style.display = "block";
					
					modalContent.appendChild(copy[index]);

				}
			} else {
				favBtn[index].onclick = function(){
					modal.style.display = "block";
					modalContent.appendChild(copy[index]);
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

		function addTodoItem (event){
			// console.log(event);
			event.preventDefault();

			const changeInputValue = input.value.toLowerCase();

			if (changeInputValue == clientData.request.location){
				const items = createList();
				console.log(items);
				const btn = addBtn();
				let j = 0;
				list.appendChild(items[j]);
				container.appendChild(btn);
				addModel(j);
				addLink(j, items);
				btn.addEventListener("click", () => {
					event.preventDefault();
					// console.log(event);
					list.appendChild(items[++j]);
					if(j == items.length - 1){
						container.removeChild(btn);
					}
					addModel(j);
					addLink(j, items);
				});
			} else {
				return alert (`you need to choose ${clientData.request.location}`);
				input.value = "";
			}
		
			input.value = "";
		}

		function main (){
			form.addEventListener("submit", addTodoItem);
			// items.forEach(item => bindEvents(item));
		}

		main();
});