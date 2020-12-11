//Variabel som håller JSON-datan *S
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

//Hämtar JSON-datan och lagrar den i variabeln productData *S
fetch("./products.json")
.then(response => {
   return response.json();
})
.then(data => {
    productData = data
    
    //Ritar ut huvudsidan eller varukorgen beroende på om man står på huvudsidan eller varukorgen *S
    if (document.getElementById("main") === null){
        renderCartPage()
    } else {
        renderStartPage()
    }   
})

//Funktion som ritar ut vad som visas på huvudsidan *S
function renderStartPage() {

    //Variabel för main-diven på huvudsidan
    let main = document.getElementById("main")

    //Skriver ut produkterna på huvudsidan
    //Loopas för varje element i productData-arrayen
    productData.forEach((product, index) => {

        let productContainer = document.createElement("div")
        productContainer.className = "product-container"
        main.appendChild(productContainer)

        let productCard = document.createElement("div")
        productCard.className = "product-card"
        productContainer.appendChild(productCard)

        /* let titleDiv = document.createElement("div")
        titleDiv.className = "title-div" */
        let productTitle = document.createElement("h1")
        productTitle.className = "product-title"
        productTitle.innerText = product.title
        /* titleDiv.append(productTitle) */
        
        /* let descrDiv = document.createElement("div")
        descrDiv.className = "descr-div" */
        let productDescription = document.createElement("h2")
        productDescription.className = "product-description"
        productDescription.innerText = product.description
        /* descrDiv.append(productDescription) */

        /* let imgDiv = document.createElement("div")
        imgDiv.className = "img-div" */
        let productImage = document.createElement("img")
        productImage.className = "product-image"
        productImage.src = "assets/" + product.image
        /* imgDiv.append(productImage) */

        /* let priceDiv = document.createElement("div")
        priceDiv.className = "price-div" */
        let productPrice = document.createElement("h2")
        productPrice.className = "product-price"
        productPrice.innerText = product.price + " kr"
        /* priceDiv.append(productPrice) */

        /* let addButtonDiv = document.createElement("div")
        addButtonDiv.className = "addButton-div" */
        let addButton = document.createElement("button")
        addButton.className = "btn-add-to-cart"
        let addToCartIcon = document.createElement("i")
        addToCartIcon.className = "fas fa-cart-arrow-down"
        let addButtonText = document.createElement("h2")
        addButtonText.innerHTML = "Lägg till i kundvagnen"
        addButton.append(addToCartIcon, addButtonText)
        addButton.addEventListener("click", () => {
            addToCart(index)
        })

        /* addButtonDiv.append(addButton) */

        /* productCard.append(titleDiv, descrDiv, imgDiv, priceDiv, addButtonDiv) */
        productCard.append(productTitle, productDescription, productImage, productPrice, addButton)

    })
}

//Funktion som kallas när man klickar på "lägg till i varukorgen"-knapparna
//Använder index från elementet i arrayn för att veta vilken produkt som ska läggas till i productsToBuy-arrayen
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

//Funktion som ritar ut vad som visas på varukorg-sidan
function renderCartPage() {

    //Variabel för main-diven i varukorgen
    let main = document.getElementById("mainVarukorg")

    //Skriver ut "Din varukorg är tom!" om productsToBuy-arrayen är tom
    if (productsToBuy[0] == undefined) {
        let emptyCart = document.createElement("p")
        emptyCart.className = "cart"
        emptyCart.innerText = "Din varukorg är tom!"
        main.appendChild(emptyCart)
    }

    //Bekräftelse-modalen
    let modal = document.getElementById("checkout");
    let checkoutButton = document.getElementById("buttonKop");
    let span = document.getElementsByClassName("checkout-close")[0];

    //Om varukorgen är tom ska "Slutför ditt köp"-knappen ej visas
    if (productsToBuy[0] == undefined) {
        checkoutButton.style.display = "none"
    } else {
        checkoutButton.style.display = "flex"
    }

    //Bekräfta-knappen
    checkoutButton.onclick = function() {
        modal.style.display = "block";
        
        let checkoutText = document.getElementById("checkout-text")
        checkoutText.innerText = "Köp bekräftat!"
        counter = 0
        total = 0
        localStorage.clear()
    }

    //När man stänger modalen
    span.onclick = function() {
        modal.style.display = "none";
        window.location.href=window.location.href
    }

    //När man klickar utanför modalen (stängs)
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.href=window.location.href
        }
    }

    //Skriver ut produkterna i varukorgen
    //Loopas för varje element i productsToBuy-arrayen
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
        let trashIcon = document.createElement("i")
        trashIcon.className = "far fa-trash-alt fa-me"
        let deleteButtonText = document.createElement("p")
        deleteButtonText.innerHTML = "Ta Bort"
        deleteButton.append(trashIcon, deleteButtonText)
        deleteButton.addEventListener("click", () => {
            RemoveFromCart(index)
        })

        produktVal.append(productImage, productTitle, productPrice, deleteButton)
    })

    //Räknar ut totalpriset och skriver ut det
    //Loopas för varje element i productsToBuy-arrayen
    for (i = 0; i < productsToBuy.length; i++) {
        total = total + productsToBuy[i].price
        document.getElementById("varukorgTotal").innerHTML = `<h5>Totalt pris: ${total} kr</h5>`
    }

    //Om totalsumman är noll skrivs totalpriset ej ut
    if (total == 0) {
        document.getElementById("varukorgTotal").innerHTML = ""
    }
}

//Funktion som kallas när man klickar på "ta bort"-knapp i varukorgen
//Använder index från elementet i arrayn för att veta vilken produkt som tas bort
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

