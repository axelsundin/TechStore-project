//Variabel som håller JSON-datan
let productData

//Array som lagrar produkter som lagts till i varukorgen. Hämtar värde från localstorage om det finns
let productsToBuy = JSON.parse(localStorage.getItem("productsToBuy"))
if (productsToBuy === null){
    productsToBuy = []
}

/**variabel som håller reda på antalet produkter i varukorgen. Hämtar värde från localstorage om det finns 
*Skriver ut antalet i headern */
let counter = localStorage.getItem ("counter")
if (counter != 0) {
    document.getElementById("counter").innerHTML = counter
} else {
    document.getElementById("counter").innerHTML = ""   
}
  
//variabel för totalvärdet i varugkorgen
let total = 0

//Hämtar JSON-datan och lagrar den i variabeln productData
fetch("./products.json")
.then(response => {
   return response.json();
})
.then(data => {
    productData = data
    
    if (document.getElementById("main") === null){
        renderCartPage()
    } else {
        renderStartPage()
    }   
})

function renderStartPage() {

    let main = document.getElementById("main")

    productData.forEach((product, index) => {

        let productContainer = document.createElement("div")
        productContainer.className = "product-container"
        main.appendChild(productContainer)

        let productCard = document.createElement("div")
        productCard.className = "product-card"
        productContainer.appendChild(productCard)

        let productTitle = document.createElement("h1")
        productTitle.className = "product-title"
        productTitle.innerText = product.title
        
        let productDescription = document.createElement("p")
        productDescription.className = "product-description"
        productDescription.innerText = product.description

        let productImage = document.createElement("img")
        productImage.className = "product-image"
        productImage.src = "assets/" + product.image

        let productPrice = document.createElement("h2")
        productPrice.className = "product-price"
        productPrice.innerText = product.price + " kr"

        let addButton = document.createElement("button")
        addButton.className = "btn-add-to-cart" 
        addButton.innerText = "Lägg till i kundvagnen"
        addButton.addEventListener("click", () => {
            addToCart(index)
        })

        productCard.append(productTitle, productDescription, productImage, productPrice, addButton)

    })
}

function addToCart(indexToAdd) {
    counter++
    if (counter != 0) {
        document.getElementById("counter").innerHTML = counter
    } else {
        document.getElementById("counter").innerHTML = ""   
    }
    localStorage.setItem("counter", counter)
    productsToBuy.push(productData[indexToAdd])
    localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy))
}

function renderCartPage() {

    //Bekräftelse-modalen
    let modal = document.getElementById("checkout");
    let checkoutButton = document.getElementById("buttonKop");
    let span = document.getElementsByClassName("checkout-close")[0];

    //Bekräfta-knappen
    checkoutButton.onclick = function() {
        modal.style.display = "block";
        if (productsToBuy[0] == undefined) {
            let checkoutText = document.getElementById("checkout-text")
            checkoutText.innerText = "Din varukorg är tom!"
        } else {
            let checkoutText = document.getElementById("checkout-text")
            checkoutText.innerText = "Köp bekräftat!"
            productsToBuy.splice(0, productsToBuy.length)
            counter = 0
            total = 0
            localStorage.clear()
        }
    }

    //När man stänger modalen
    span.onclick = function() {
        modal.style.display = "none";
        window.location.href=window.location.href
    }

    //När man klickar utanför modalen
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.href=window.location.href
        }
    }

    let main = document.getElementById("mainVarukorg")

    if (productsToBuy[0] == undefined) {
        let emptyCart = document.createElement("h1")
        emptyCart.className = "product-title"
        emptyCart.innerText = "Din varukorg är tom!"
        main.appendChild(emptyCart)
    }

    if (total == 0) {
        document.getElementById("varukorgTotal").innerHTML = ""
    }

    productsToBuy.forEach((product, index) => {

        let flexItem = document.createElement("div")
        flexItem.className = "flexItem"
        main.appendChild(flexItem)

        let produktVal = document.createElement("div")
        produktVal.className = "produktVal"
        flexItem.appendChild(produktVal)

        let productImage = document.createElement("img")
        productImage.className = "product-image"
        productImage.src = "assets/" + product.image

        let productTitle = document.createElement("h1")
        productTitle.className = "product-title"
        productTitle.innerText = product.title

        let productPrice = document.createElement("h2")
        productPrice.className = "product-price"
        productPrice.innerText = product.price + " kr"

        let deleteButton = document.createElement("button")
        deleteButton.className = "buttonDelete"
        deleteButton.innerText = "Ta Bort"
        deleteButton.addEventListener("click", () => {
            RemoveFromCart(index)
        })

        produktVal.append(productImage, productTitle, productPrice, deleteButton)

    })

    for (i = 0; i < productsToBuy.length; i++) {
        total = total + productsToBuy[i].price
        document.getElementById("varukorgTotal").innerHTML = `<h5>Totalt pris: ${total} kr</h5>`
    }
    
}

function RemoveFromCart(indexToRemove) {
    counter--
    if (counter != 0) {
        document.getElementById("counter").innerHTML = counter
    } else {
        document.getElementById("counter").innerHTML = ""   
    }
    localStorage.setItem("counter", counter)

    productsToBuy.splice(indexToRemove, 1)
    localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy))

    total = 0

    document.getElementById("mainVarukorg").innerHTML = ""
    renderCartPage()
}

