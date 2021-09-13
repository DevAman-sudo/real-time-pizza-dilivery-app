// imported packages
import axios from "axios";

// dom elements
const addToCart = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('#cartCounter');

// update cart function
function updateCart(data) {
    axios.post('/update-cart' , data).then( res => {
        console.log(res);
        cartCounter.innerText = res.data.totalQty;
    });
}

// add to cart listener 
addToCart.forEach( (btn) => {
    btn.addEventListener('click' , (event) => {
        let data = JSON.parse(btn.dataset.pizza);
        updateCart(data);
    });
});
