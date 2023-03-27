const productList = new ProductList();
const cartItemList = new CartItemList();

let list = document.querySelector(".product__display .row");
let listCard = document.querySelector('.listCard');
let closeShopping = document.querySelector('.closeShopping');
let openShopping = document.querySelector('#shopping');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let body = document.querySelector('body');

openShopping.addEventListener('click', ()=>{
    body.classList.add('actived');
})

closeShopping.addEventListener('click', ()=>{
    body.classList.remove('actived');
})


const initApp = () =>{
    productList.ProductList.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('col-lg-4');
        newDiv.classList.add('mb-3');
        newDiv.innerHTML = `
            <div class="card">
                <div class="img-container">
                    <img src="${value.img}" alt="" class="image card-img top">
                    <div class="overlay">
                        <button class="btn btn-outline-secondary btn-sm" onclick="addToCard(${key})">
                            <i class="fa-solid fa-cart-shopping mr-2"></i>Add to Cart
                        </button>
                        <button class="btn btn-outline-secondary btn-sm">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                
                <div class="card-body">
                    <h5 class="card-title">${value.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">$${value.price}</h6>
                    <p class="card-text .description">${value.desc}</p>
                </div>
            </div>
        `;
        list.appendChild(newDiv);
    })
}
initApp();


const addToCard = (key) => {
    if(cartItemList.Cart[key] == null){
        cartItemList.Cart[key] = productList.ProductList[key];
        cartItemList.Cart[key].quantity = 1;
    }
    reloadCard();
}


const reloadCard = () =>{
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    cartItemList.Cart.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.img}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}



const changeQuantity = (key, quantity) => {
    console.log(key, quantity);
    if(quantity == 0){
        delete cartItemList.Cart[key];
    }else{
        cartItemList.Cart[key].quantity = quantity;
        cartItemList.Cart[key].price = quantity * productList.ProductList[key].price;
    }
    reloadCard();
}