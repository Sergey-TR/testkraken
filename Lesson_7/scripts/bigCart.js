'use strict';
let cart = document.querySelector('.cart');
let details = document.querySelector('details');
let bigCartHead = document.querySelector('.bigCart__header');
let bigCart = document.querySelector('.bigCart');
let goToCartBtn = document.querySelector('.goCart');
goToCartBtn.addEventListener('click', function (event) {
    addBigCart(event)
});

function addBigCart() {
    if (document.querySelector('.total').textContent != "0") {
        bigCart.style.visibility = 'visible';
    } else {
        alert('your cart is empty');
    }
}

let backBtn = document.querySelector('.back');
backBtn.addEventListener('click', function () {
    bigCart.style.visibility = 'hidden';
});

/*let unityBigCart = document.querySelectorAll('.product__btn');
unityBigCart.forEach(function (btn) {
    btn.addEventListener('click', function(event) {
        hendleClick(event)
    });
});

function hendleClick (event) {
    let prodNode = event.target.parentNode;
    
    
}*/


    