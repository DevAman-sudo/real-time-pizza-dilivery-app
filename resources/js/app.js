// imported packages

// dom elements
const addToCart = document.querySelectorAll('.add-to-cart');

// add to cart listener 
addToCart.forEach( (btn) => {
    btn.addEventListener('click' , (event) => {
        let data = btn.dataset.pizza;
        console.log(data);
    });
});
