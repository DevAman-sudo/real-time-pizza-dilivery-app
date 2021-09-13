// imported packages
import axios from "axios";
import Noty from "noty";

// dom elements
const addToCart = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('#cartCounter');

// update cart function
function updateCart(data) {
    axios.post('/update-cart' , data).then( res => {
        cartCounter.innerText = res.data.totalQty;

        new Noty({
            type: "success",
            timeout: 1000,
            text: "Item added to cart"
          }).show();
    });
}

// add to cart listener 
addToCart.forEach( (btn) => {
    btn.addEventListener('click' , (event) => {
        let data = JSON.parse(btn.dataset.pizza);
        updateCart(data);
    });
});
