//variabel som lagrar datan fråm JSON-filen
let productData

//variabel som håller reda på antalet produkter i varukorgen. Hämtar värde från localstorage om det finns 
//Skriver ut antalet i headern
let counter = localStorage.getItem ("counter")
document.getElementById("counter").innerHTML = counter

//array som lagrar produkter som lagts till i varukorgen. Hämtar värde från localstorage om det finns
let productsToBuy = JSON.parse(localStorage.getItem("productsToBuy"))
if (productsToBuy === null){
    productsToBuy = []
}

//variabler som blir knappar
let btnOne
let btnTwo
let btnThree
let btnFour

//variabel för totalvärdet i varugkorgen
let total = 0

//arary till "Ta bort"-knapparna i varukorgen
let deleteBtn = []

//funktion som ritar ut produkterna på startsidan
function listProductData() {

    for (i = 0; i < productData.length; i++) {
        document.getElementById("main").innerHTML += `
        <div class="product-container">
        <div class="product-card" onload="productsLoaded()">
            <h1 class="product-title">${productData[i].title}</h1>
            <p class="product-description">${productData[i].description}</p>
            <img class="product-image" src="imgs/${productData[i].image}" alt="">
            <h2 class="product-price">${productData[i].price} kr</h2>
            <button class="btn-add-to-cart" id="btn${i}"><img src="/imgs/cart-icon.png" height="16px">Lägg till i kundvagnen</button>
        </div>        </div>
        `
    }
}

//funktion som ritar ut produkterna i varukorgen - flyttad till varukorg.js
function listProductToBuy() {

    for (i = 0; i < productsToBuy.length; i++) {
        document.getElementById("mainVarukorg").innerHTML += `
        <div class="flexItem">
            <div id="produktVal">
                <img class="product-image" src="imgs/${productsToBuy[i].image}" alt="">
                <h1 class="product-title">${productsToBuy[i].title}</h1>
                <h2 class="product-price">${productsToBuy[i].price} kr</h2>
            </div>
            <div>
                <button class="buttonDelete" id="deleteBtn0${i}"><img src="imgs/icon_trashBin.png" height="16px">Ta bort</button> 
            </div>
        </div>
    `
        total = total + productsToBuy[i].price
        document.getElementById("varukorgTotal").innerHTML = `<h5>Totalt pris: ${total} kr</h5>`
    }
}

//$('deleteBtn0${i}').remove();


//Hämtar datam från JSON-filen
fetch("./products.json")
.then(response => {
   return response.json();
})
//Lagrar datan i variabeln productData. Sen kör funktion som ritar ut produkterna beroende på om man är på startsida eller varukorg
.then(products => {
    productData = products
    if (document.getElementById("main") === null){
        listProductToBuy()
    } else {
        listProductData() 
    }   
})
//Skapar funktioner för knappar på startsida eller varukorg
.then(productsLoaded => {
    //om js inte hittar element med id main vet den att man står i varukorg och kör följande kod
    if (document.getElementById("main") == null){
        //ger id'n till "ta bort"-knapparna
        for (i = 0; i < productsToBuy.length; i++) {
        //deleteBtn[i] = document.getElementById("deleteBtn"+i)
        }

        //tar bort produkten från varukorgen(denna funkar inte helt än)
        for (i = 0; i < productsToBuy.length; i++) {
            deleteBtn[i].onclick = function(){
                productsToBuy.splice[i]
                localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy))
                
                document.removeChild("mainVarukorg") =""
                //listProductToBuy()
            }
        }

        // 92 deleteBtn[i].onclick = function(){
        // 95 document.getElementById("mainVarukorg").innerHTML =""

    //om js hittar elementet main vet den att man står på startsidan, då körs följande kod
    } else {
        //"lägg till i varukorg"-knappar
        btnOne = document.getElementById("btn0")
        btnTwo = document.getElementById("btn1")
        btnThree = document.getElementById("btn2")
        btnFour = document.getElementById("btn3")

        //vid klick: öka countern, skriv ut countern, lagra countern i localstorage, 
        //lägg produkten i en array som representerar produkter i varukorgen, lagrar arrayen i localstorage
        btnOne.onclick = function(){
            counter++
            document.getElementById("counter").innerHTML = counter
            localStorage.setItem("counter", counter)
            productsToBuy.push(productData[0])
            localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy))
        }
        
        btnTwo.onclick = function(){
            counter++
            document.getElementById("counter").innerHTML = counter
            localStorage.setItem("counter", counter)
            productsToBuy.push(productData[1])
            localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy))
        }
        btnThree.onclick = function(){
            counter++
            document.getElementById("counter").innerHTML = counter
            localStorage.setItem("counter", counter)
            productsToBuy.push(productData[2])
            localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy))
        }
        
        btnFour.onclick = function(){
            counter++
            document.getElementById("counter").innerHTML = counter
            localStorage.setItem("counter", counter)
            productsToBuy.push(productData[3])
            localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy))
        }        
    }     
})

//$("buttonDelete").remove();
