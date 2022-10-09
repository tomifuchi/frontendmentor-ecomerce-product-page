//Product image area
const pd_img_detail = document.querySelectorAll('.product-img-detail li');
const pd_img_variation = document.querySelectorAll('.product-img-variation li');

//Navigating the using thumbnail image below main image
pd_img_variation.forEach( img => {
    img.addEventListener('click', () => {
        let currentIndex = [...pd_img_variation].indexOf(img);
        delete document.querySelector('.product-img-variation li[data-active-overlay]').dataset.activeOverlay;
        delete document.querySelector('.product-img-detail li[data-active-image]').dataset.activeImage;
        img.dataset.activeOverlay = true;
        pd_img_detail[currentIndex].dataset.activeImage = true;
    })
});




//Zooming into centering the product image section in center of screen
const toggle_activeOverlay = document.querySelector('.body-overlay'); //activeBodyOverlay;
const toggle_pd_imgOverlay = document.querySelector('.product-img'); //activeOverlay;

//Besure to pass in a node
function toggle_attrib(element, attrib){
    console.log(element.hasAttribute(attrib));
    if(element.hasAttribute(attrib)) {
        element.removeAttribute(attrib);
    } else
        element.setAttribute(attrib,'');
    console.log(element.getAttribute(attrib));
}

pd_img_detail.forEach( img => {
    img.addEventListener('click', () => {
        document.body.classList.toggle('body-fixed');
        toggle_attrib(toggle_pd_imgOverlay, 'data-active-overlay');
        toggle_attrib(toggle_activeOverlay, 'data-active-body-overlay');
    });
});
toggle_activeOverlay.addEventListener('click', () => {
        document.body.classList.toggle('body-fixed');
        toggle_attrib(toggle_pd_imgOverlay, 'data-active-overlay');
        toggle_attrib(toggle_activeOverlay, 'data-active-body-overlay');
});


//Product detail area
//Button for the add to cart and incrementing the 
//item in the cart
const btn_increment = document.getElementById('cart-increment');
const btn_decrement = document.getElementById('cart-decrement');
const cart_input = document.getElementById('cart-input');

btn_increment.addEventListener('click', () => {
    let val = Number(cart_input.value);
    if (val < 10)
    cart_input.value = parseInt(Number(cart_input.value) + 1);
});

btn_decrement.addEventListener('click', () => {
    let val = Number(cart_input.value);
    if (val >= 1)
    cart_input.value = parseInt(Number(cart_input.value) - 1);
});