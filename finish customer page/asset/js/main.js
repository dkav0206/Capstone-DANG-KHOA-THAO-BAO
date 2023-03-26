let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Iphone 14 Pro Max 128GB',
        image: '1.webp',
        type: 'Iphone' ,     
        price: 28050000
        
    },
    {
        id: 2,
        name: 'Iphone 13 128GB',
        image: '2.webp',
        type: 'Iphone' ,     
        price: 178900000
    },
    {
        id: 3,
        name: 'Iphone 12 Pro Max 128GB',
        image: '3.webp',
        type: 'Iphone' ,     
        price: 23490000
    },
    {
        id: 4,
        name: 'Galaxy S23 Ultra',
        image: '4.webp',
        type: 'Samsung' ,     
        price: 28990000
    },
    {
        id: 5,
        name: 'Samsung Galaxy Z Flip 4',
        image: '5.jpeg',
        type: 'Samsung' ,     
        price: 19990000
    },
    {
        id: 6,
        name: 'Samsung Galaxy A73',
        image: '6.jpg',
        type: 'Samsung' ,     
        price: 11990000
    },
    {
        id: 7,
        name: 'Samsung Galaxy S21',
        image: '7.jpg',
        type: 'Samsung' ,     
        price: 6990000
    },
    {
        id: 8,
        name: 'Samsung Galaxy S22 Ultra',
        image: '8.jpeg',
        type: 'Samsung' ,     
        price: 21490000
    },
    {
        id: 9,
        name: 'Samsung Galaxy S21 Ultra',
        image: '9.jpg',
        type: 'Samsung' ,     
        price: 11690000
    },
    

];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="asset/image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="asset/image/${value.image}"/></div>
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
function changeQuantity(key, quantity){
    console.log(key, quantity);
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}