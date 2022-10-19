//Navigation area
//Shopping cart listing content the big one
const cart_content_btn = document.getElementById('cart-content-btn');
const cart_content_btn_noti = document.getElementById('cart-notification');
const cart_content = document.getElementsByClassName('cart-content')[0];
cart_content_btn.addEventListener('click', () => {
    cart_content_btn_noti.classList.toggle('active');
    cart_content.classList.toggle('active');
});

//Inner listing of the shopping cart when the cart is empty or not
const cart_list = document.getElementsByClassName('cart-list')[0];
const items = document.getElementsByClassName('items')[0];
const checkout_btn = document.querySelector('.cart-list button');

function toggle_empty() {
    if(items.childNodes.length == 0){
        cart_content_btn_noti.classList.toggle('empty');
        items.classList.toggle('empty');
        checkout_btn.classList.toggle('empty');
        cart_list.classList.toggle('empty');
    }
}
toggle_empty();



//Add to cart button

//Product image area
//Initializing
const pd_img_detail = document.querySelectorAll('#img-detail .product-img-detail li');
const pd_img_variation = document.querySelectorAll('#img-detail .product-img-variation li');

//Go to zoomed state
const body_dark_overlay = document.querySelector('.body-dark-overlay');
pd_img_detail.forEach( img => {
    img.addEventListener('click', () => {
        document.body.classList.toggle('lock-body');
        body_dark_overlay.dataset.active = true;
        syncScrollToActiveImage(img);
    });
});

//The close button on zoomed state
const active_box_close_btn = document.getElementById('close-btn');
active_box_close_btn.addEventListener('click', () => {
    document.body.classList.toggle('lock-body');
    delete body_dark_overlay.dataset.active;
});

//Sync to active box and scroll to active image
function syncScrollToActiveImage(img) {
    const pd_img_detail = document.querySelectorAll('#active-box .product-img-detail li');
    const pd_img_variation = document.querySelectorAll('#active-box .product-img-variation li');

    let currentIndex = [...document.querySelectorAll('#img-detail .product-img-detail li')].indexOf(img);
    delete document.querySelector('#active-box .product-img-variation li[data-active-overlay]').dataset.activeOverlay;
    delete document.querySelector('#active-box .product-img-detail li[data-active-image]').dataset.activeImage;

    pd_img_variation[currentIndex].dataset.activeOverlay = true;
    pd_img_detail[currentIndex].dataset.activeImage = true;
    pd_img_detail[currentIndex].scrollIntoView(); //Huehuehuehue
}

//Add event for both zoomed, and normal state
function add_event(id) {
    const pd_img_detail = document.querySelectorAll(`${id} .product-img-detail li`);
    const pd_img_variation = document.querySelectorAll(`${id} .product-img-variation li`);

    pd_img_detail[
        [...pd_img_detail].indexOf(document.querySelector(`${id} .product-img-detail li[data-active-image]`))
    ].scrollIntoView();

    //Initial scroll to the active image
    pd_img_variation.forEach( img => {
         img.addEventListener('click', () => {
            //Scroll to image, not necessarily through each image.
            let currentIndex = [...pd_img_variation].indexOf(img);
            delete document.querySelector(`${id} .product-img-variation li[data-active-overlay]`).dataset.activeOverlay;
            delete document.querySelector(`${id} .product-img-detail li[data-active-image]`).dataset.activeImage;
            img.dataset.activeOverlay = true;
            pd_img_detail[currentIndex].dataset.activeImage = true;
            pd_img_detail[currentIndex].scrollIntoView(); //Huehuehuehue
        });
    });
}
add_event('#img-detail');
add_event('#active-box');

//Buttons on active box, and main box
const pd_img_detail_button_next_active_box = document.querySelector('#active-box .product-img-detail button[data-button-next]');
const pd_img_detail_button_prev_active_box = document.querySelector('#active-box .product-img-detail button[data-button-prev]');

const pd_img_detail_button_next = document.querySelector('#img-detail .product-img-detail button[data-button-next]');
const pd_img_detail_button_prev = document.querySelector('#img-detail .product-img-detail button[data-button-prev]');

function scroll_img_carousel(id, step) {
   const active_img = document.querySelector(`${id} .product-img-detail li[data-active-image]`);
   const pd_img_detail = document.querySelectorAll(`${id} .product-img-detail li`);
   const pd_img_variation = document.querySelectorAll(`${id} .product-img-variation li`);
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

   delete document.querySelector(`${id} .product-img-detail li[data-active-image]`).dataset.activeImage;
   delete document.querySelector(`${id} .product-img-variation li[data-active-overlay]`).dataset.activeOverlay;
   pd_img_variation[nextIndex].dataset.activeOverlay = true;
   pd_img_detail[nextIndex].dataset.activeImage = true;
   pd_img_detail[nextIndex].scrollIntoView();
}
pd_img_detail_button_next_active_box.addEventListener('click', () => {scroll_img_carousel('#active-box', 1);});
pd_img_detail_button_prev_active_box.addEventListener('click', () => {scroll_img_carousel('#active-box', -1);});

pd_img_detail_button_next.addEventListener('click', () => {scroll_img_carousel('#img-detail', 1);});
pd_img_detail_button_prev.addEventListener('click', () => {scroll_img_carousel('#img-detail', -1);});

//Left and right arrow for both zoomed and normal state, and escape button for zoomed state.
window.addEventListener('keyup', event => {
    const state = document.querySelector('.body-dark-overlay').hasAttribute('data-active');
    if(state){
        switch(event.key) {
            case 'ArrowRight':
                scroll_img_carousel('#active-box', 1);
                break;
            case 'ArrowLeft':
                scroll_img_carousel('#active-box', -1);
                break;
            case 'Escape':
                active_box_close_btn.dispatchEvent(new Event('click'));
                break;
        }
    }
    else{
        switch(event.key) {
            case 'ArrowRight':
                scroll_img_carousel('#img-detail', 1);
                break;
            case 'ArrowLeft':
                scroll_img_carousel('#img-detail', -1);
                break;
        }
    }
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
    if (val > 1)
    cart_input.value = parseInt(Number(cart_input.value) - 1);
});

//Add to cart functionality
const add_to_cart_btn = document.querySelector('.product-detail-sale-addtocart button');

//Since this is an html element to add to, this usually can be done with
//a backend language. But this will do I guess.
add_to_cart_btn.addEventListener('click', () => {
    

    //Dynamically create the item. I'm damn sure,
    //That this will be easier with some sort of system
    //than manually create using javascript like this.
    //Maybe HTML templating system perhaps.
    const item = document.createElement('div');
    item.setAttribute('id', 'type1');
    item.classList.add('item');

    const img = document.createElement('img');
    img.setAttribute('src',"./images/image-product-1.jpg");
    img.setAttribute('alt',"sneaker picture");
    item.appendChild(img);

    const p = document.createElement('p');
    const item_price = document.createElement('span');
    item_price.setAttribute('id', 'item-price');
    item_price.textContent = 125;
    const item_quantity = document.createElement('span');
    item_quantity.setAttribute('id', 'item-quantity');
    item_quantity.textContent = cart_input.value;
    const item_total_price = document.createElement('span');
    item_total_price.setAttribute('id', 'item-total-price');
    item_total_price.textContent = (Number(item_price.textContent)*Number(item_quantity.textContent)).toString();
 
    p.appendChild(document.createTextNode('Fall Limited Edition Sneakers '));
    p.appendChild(item_price);
    p.appendChild(document.createTextNode('$'));
    p.appendChild(document.createTextNode(' x '));
    p.appendChild(item_quantity);
    p.appendChild(document.createTextNode(' '));
    p.appendChild(item_total_price);
    p.appendChild(document.createTextNode('$'));
    item.appendChild(p);

    //Remove item, or the trash can icon
    const i = document.createElement('i');
    i.setAttribute('id', 'remove-item');
    i.setAttribute('style','display: block');
    i.setAttribute('class','fa-solid fa-trash-can');
    item.appendChild(i);
    i.addEventListener('click', () =>{
        i.parentNode.parentNode.removeChild(i.parentNode);
        cart_content_btn_noti.textContent = items.childNodes.length; 
        toggle_empty();
    });

    //Turn on the notification
    //This should work for multiple type of item in the cart or so I thought
    toggle_empty();

    let unique = true;
    items.childNodes.forEach(child => {
        if(child.getAttribute('id') == item.getAttribute('id')){
            if(Number(child.querySelector('#item-quantity').textContent) < 10){
                child.querySelector('#item-quantity').textContent = 
                    (Number(child.querySelector('#item-quantity').textContent) +
                    Number(item.querySelector('#item-quantity').textContent)).toString();
                child.querySelector('#item-total-price').textContent = 
                    (Number(item.querySelector('#item-price').textContent) *
                    Number(child.querySelector('#item-quantity').textContent)).toString();
            }
            unique = false;
        }
    });

    if(unique) {
        items.appendChild(item);
    }
    cart_content_btn_noti.textContent = items.childNodes.length; 
});


//Mobile layout section
//-------------------------
const mobile_menu = document.querySelector('nav ul');
const mb_btn = document.getElementById('mb-btn');
const mb_close_btn = document.getElementById('mb-close-btn');

mb_btn.addEventListener('click', () => {
    document.body.classList.toggle('lock-body');
    mobile_menu.classList.toggle('active');
})

mb_close_btn.addEventListener('click', () => {
    document.body.classList.toggle('lock-body');
    mobile_menu.classList.toggle('active');     
});