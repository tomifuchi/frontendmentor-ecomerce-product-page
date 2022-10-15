//Product image area
//Navigating the using thumbnail image below main image
const pd_img_detail = document.querySelectorAll('.product-img-detail li');
const pd_img_variation = document.querySelectorAll('.product-img-variation li');

//Initial scroll to the active image
pd_img_detail[
    [...pd_img_detail].indexOf(document.querySelector('.product-img-detail li[data-active-image]'))
].scrollIntoView();

pd_img_variation.forEach( img => {
    img.addEventListener('click', () => {
        //Scroll to image, not necessarily through each image.
        let currentIndex = [...pd_img_variation].indexOf(img);
        delete document.querySelector('.product-img-variation li[data-active-overlay]').dataset.activeOverlay;
        delete document.querySelector('.product-img-detail li[data-active-image]').dataset.activeImage;
        img.dataset.activeOverlay = true;
        pd_img_detail[currentIndex].dataset.activeImage = true;
        pd_img_detail[currentIndex].scrollIntoView(); //Huehuehuehue
    })
});

//Button on the detail image itself
const pd_img_detail_button_next = document.querySelector('.product-img-detail button[data-button-next]');
const pd_img_detail_button_prev = document.querySelector('.product-img-detail button[data-button-prev]');
function scroll_img_carousel(step) {
   const active_img = document.querySelector('.product-img-detail li[data-active-image]');
   let currentIndex = [...pd_img_detail].indexOf(active_img);
   let nextIndex;

   if (currentIndex + step < 0) {
    nextIndex = pd_img_detail.length - 1;
   } else if ( currentIndex + step > pd_img_detail.length - 1) {
    nextIndex = 0;
   }
   else {
    nextIndex = currentIndex + step;
   }

   delete document.querySelector('.product-img-variation li[data-active-overlay]').dataset.activeOverlay;
   delete document.querySelector('.product-img-detail li[data-active-image]').dataset.activeImage;
   pd_img_variation[nextIndex].dataset.activeOverlay = true;
   pd_img_detail[nextIndex].dataset.activeImage = true;
   pd_img_detail[nextIndex].scrollIntoView();
}

pd_img_detail_button_next.addEventListener('click', () => {scroll_img_carousel(1);});
pd_img_detail_button_prev.addEventListener('click', () => {scroll_img_carousel(-1);});


window.addEventListener('keyup', event => {
    switch(event.key) {
        case 'ArrowRight':
            scroll_img_carousel(1);
            break;
        case 'ArrowLeft':
            scroll_img_carousel(-1);
            break;
    }
});

//---Zoomed active box area for the image detail zoomed in----
/*
pd_img_detail.forEach( img => {
    img.addEventListener('click', () => {
        if(document.getElementById('active-box')){
            document.body.removeChild(document.getElementById('active-box'));
            document.body.classList.toggle('lock-body');
        } else {
            const pd_img_active_box = document.querySelector('.product-img').cloneNode(true);
            pd_img_active_box.setAttribute('id', 'active-box');
            pd_img_active_box.style.cssText = '\
                position: fixed; \
                max-width: 500px;\
                height: 100%;\
                inset: 0;\
                border: 1px solid black;\
                z-index: 2;\
                display: flex;\
                justify-content: center;\
                align-items: center;\
            ';
            pd_img_active_box.querySelectorAll('button[data-button-next], button[data-button-prev]').forEach(button => {
                button.style.display = 'block';
            });

            document.body.insertBefore(pd_img_active_box, document.body.firstChild);
            document.body.classList.toggle('lock-body');
        }
    });
});
*/

/*
const pd_img_active_box = document.querySelector('.product-img').cloneNode(true);
pd_img_active_box.setAttribute('id', 'active-box');
pd_img_active_box.style.cssText = '\
    position: fixed; \
    max-width: 500px;\
    height: 100%;\
    inset: 0;\
    border: 1px solid black;\
    z-index: -2;\
    opacity: 0;\
    display: flex;\
    justify-content: center;\
    align-items: center;\
    transition: 300ms;\
';

pd_img_active_box.querySelectorAll('button[data-button-next], button[data-button-prev]').forEach(button => {
    button.style.display = 'block';
});
document.body.insertBefore(pd_img_active_box, document.body.firstChild);

pd_img_detail.forEach( img => {
    img.addEventListener('click', () => {
    });
});
*/

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