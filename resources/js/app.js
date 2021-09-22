// imported packages
import axios from "axios";
import Noty from "noty";
import moment from "moment";
import { initAdmin } from "./adminDemo";

// dom elements
const addToCart = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('#cartCounter');

// update cart function
function updateCart(pizza) {
    axios.post('/update-cart' , pizza).then( res => {
        cartCounter.innerText = res.data.totalQty;

        new Noty({
            type: "success",
            timeout: 1000,
            layout: 'bottomRight',
            text: "Item added to cart"
          }).show();
    }).catch( (error) => {

        new Noty({
            type: "error",
            timeout: 1000,
            layout: 'bottomRight',
            text: "Something went wrong"
          }).show();

    })
}

// add to cart listener 
addToCart.forEach( (btn) => {
    btn.addEventListener('click' , (event) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    });
});

// removing alert message after some seconds
const alertMsg = document.querySelector("#success-alert");

if (alertMsg) {
    setTimeout( () => { 
        alertMsg.remove;
    }, 2000);
    location.reload();
}

initAdmin()