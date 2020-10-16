let productData

function listProductData() {

    for (i = 0; i < productData.length; i++) {
        document.getElementById("main").innerHTML += `
        <div class="product-container">
        <div class="product-card">
            <h1 class="product-title">${productData[i].title}</h1>
            <p class="product-description">${productData[i].description}</p>
            <img class="product-image" src="imgs/${productData[i].image}" alt="">
            <h2 class="product-price">${productData[i].price} kr</h2>
            <button class="btn-add-to-cart">Lägg till i kundvagnen</button>
        </div>
        </div>
        `
    }
}

fetch("./products.json")
.then(response => {
   return response.json();
})
.then(products => {
    productData = products
    listProductData()
})