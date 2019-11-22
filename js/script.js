const modal = document.getElementById("myModal")
const modalContent = document.getElementById("modal-content")
const span = document.getElementsByClassName("close")[0]

const modal2 = document.getElementById("myModal2")
const modalContent2 = document.getElementById("modal-content2")
const span2 = document.getElementsByClassName("close2")[0]

const form = document.getElementById("form")
const input = document.getElementById("input")
const list = document.getElementById("list")
const container = document.getElementById("container")
const itemsNew = document.querySelectorAll(".item")

const btn = addBtn("addMore", "ADD MORE")
const favModelButton = addBtn("favorBtn","FAVORITIES")

const houses = []
let favHouses = []

container.appendChild(favModelButton)

const request = (city, page) => new Promise ((resolve, reject) => {
    const api = `https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&listing_type=rent&pretty=1&number_of_results=5&place_name=${city}&page=${page}`
    const request = new XMLHttpRequest()
    request.withCredentails = true
    request.open("GET", api, true)
    request.onload = () => 
        (request.status === 200) ? resolve(JSON.parse(request.response)):
        reject(Error(request.statusText))
    request.oneerror = (err) => reject(err)
    request.send()
})

function createElem(tag, props,...children){
	const element = document.createElement(tag)

	Object.keys(props).forEach(key => element[key] = props[key]);

	if(children.length > 0){
		children.forEach(child => {
			if(typeof child === "string"){
				child = document.createTextNode(child);
			}
			element.appendChild(child)
		})
	}
	return element
}

function createList (houses, data, btn = "favBtn", sm = "showMore"){
	const itemsArr = []

	for (let i = 0; i < houses.length; i++){
			const showMore = createElem("button", {id:sm, type:"submit"}, "show more")
			const favBtn = createElem("button", {id:btn, type:"submit"}, "in favorites")
			const priceNumber = createElem("span", {className:"priceNumber"}, `${houses[i].price_currency} ${houses[i].price}`)
			const price = createElem("div", {className:"price"}, priceNumber)
			const priceDiv = createElem("div", {className:"priceDiv"}, price, favBtn, showMore)
			const datasource = createElem("div", {className:"datasource"}, houses[i].datasource_name)
			const description = createElem("div", {className:"description"}, houses[i].summary)
			const keyWords = createElem("div", {className:"keyWords"}, houses[i].keywords)
			const title = createElem("div", {className:"title"}, houses[i].title)
			const infoDiv = createElem("div",{className:"infoDiv"}, title, keyWords, description, datasource)
			const img = createElem("img", {src: houses[i].img_url})
			const imgDiv = createElem("div", {className: "imgDiv"}, img)
			const generalDiv = createElem("div", {className: "generalDiv"}, imgDiv, infoDiv, priceDiv)
			const contain = createElem("div", {className: "contain"}, generalDiv)
			const item = createElem ("li", {className:"item", id: data.request.location}, contain)
									
			itemsArr.push(item);
	}
	return itemsArr
}

function addBtn(className, name){
	return createElem("button", {className: className, type: "submit"}, name)
	
}

function filter(arr){
	const newArr = arr.filter((item, index, self) =>
  		index === self.findIndex((t) => (
    	t.title === item.title
  		))
		)

	return newArr
}

function addFavHouses(houses, data){
	let arr = []

	for (let i = 0; i < houses.length; i++){
		favBtn[i].onclick = function (){
			favBtn[i].style.display ="none"
			arr = favHouses.slice()
			arr.push(houses[i])
			const newArr = filter(arr)
			localStorage.setItem("favHouses", JSON.stringify(newArr))
			favHouses = JSON.parse(localStorage.getItem("favHouses"))
			const favLi = createList(favHouses, data, "favBtnNew", "newShowMore")
			modalContent.innerHTML =""
			for( let i = 0; i < favLi.length; i++){
				modalContent.appendChild(favLi[i])
			}
			modal.style.display = "block"
			favBtn[i].style.display ="none"
		}
	}
}

function moreInfo(houses, data){
	for (let i = 0; i < houses.length; i++){
		showMore[i].onclick = function (){
			modal2.style.display = "block"
			modalContent2.appendChild(createElem("img", {src: `${houses[i].img_url}`, alt: "", className: "imgModal"}))
			span2.onclick = function(){
				modal2.style.display = "none"
				modalContent2.innerHTML = ""
			}	
		}	
	}

	window.onclick = function(event){
		if(event.target == modal){
			modal.style.display = "none"
		}
	}
}


function viewOfHouses (houses, data){
	const items = createList(houses, data)

	for (let i = 0; i < items.length; i++){
		list.appendChild(items[i])
	}
}

function addMore(event){
	event.preventDefault()
	let params = event.target.myParam
	request(params[0], ++params[1])
		.then(
		nextData => {
			list.innerHTML = "";
			houses.push(...nextData.response.listings)

			viewOfHouses(houses, nextData)
			moreInfo(houses, nextData)
			addFavHouses(houses, nextData)

			btn.addEventListener("click", addMore)
		})
		.catch("error on next step")
}

function addItems (event){
	event.preventDefault()
	const changeInputValue = input.value.toLowerCase()
	let page = 1
	request(changeInputValue, page)
	 .then(
		data => {
			list.innerHTML = "";
			if(data.response.application_response_code === "100"){
				houses.push(...data.response.listings)
				if (houses.length > 5){
					houses.splice(0, houses.length - +data.request.num_res)
				}
				viewOfHouses(houses, data)
				moreInfo(houses, data)
				addFavHouses(houses, data)
				
				container.appendChild(btn)
				btn.myParam = [changeInputValue, page]

				btn.addEventListener("click", addMore)

			} else {
				alert("incorrect name!!!")
			}
		})
	.catch("error!")	
	input.value = ""

}

function main (){

	favModelButton.onclick = function(){
 		modal.style.display = "block"
 	}

	span.onclick = function(){
		modal.style.display = "none"
				
	}

	window.onclick = function(event){
		if(event.target == modal){
			modal.style.display = "none"
		}
	}	

	if(localStorage.getItem("favHouses")){
		favHouses = JSON.parse(localStorage.getItem("favHouses"));	
		const li = createList(favHouses, data = {request: {location:"somePlace"}}, "favBtnNew", "newShowMore")
		for( let i = 0; i < li.length; i++){
			modalContent.appendChild(li[i])
		}
	}

	form.addEventListener("submit", addItems)
}

main()
