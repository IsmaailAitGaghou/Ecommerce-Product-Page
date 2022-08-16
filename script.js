// variables

let thumbImagesDivs = Array.from(document.querySelectorAll('.thumb-image'))
let activeImage = document.querySelector('.preview-image')
let toggleMenu = document.querySelector('.toggle-menu')
let mobileNavgation = document.querySelector('.mobile-navigation')
let closeMenu = document.querySelector('.close-menu')
let overlay = document.querySelector('.overlay')
let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')
let lightBoxWrapper = document.querySelector('.lightbox-wrapper')
let lightBoxContent = document.querySelector('.lightbox-content')



let cart = document.querySelector('.cart')
let cartContent = document.querySelector('.cart-content')
let cartList = document.querySelector('.cart-list')
let inCart = document.querySelector('.in-cart')
let addToCartForm = document.querySelector('.add-to-cart-form')
let formValidation = document.querySelector('.form-alert')
let checkOutBtn = document.querySelector('.btn-checkout')
let productQuantity = document.querySelector('.product-num')
let plusBtn = document.querySelector('.plus')
let minusBtn = document.querySelector('.minus')

let currentIndex = 0;

// Functios

function handleThumbsSrc() {
    thumbImagesDivs.forEach(thumb => {
        let thumbImage = thumb.querySelector('img')

        let setOriginaleSrc = thumbImage
        .getAttribute('src').replace('-thumbnail', '');

        thumb.dataset.original = setOriginaleSrc
    } )
}
handleThumbsSrc();


function showThumbsAsActive(thumbnails , previewActive) {
    thumbnails.forEach( thumb => {
        thumb.addEventListener('click' , () => {
            let getOriginalSrc = thumb.dataset.original
            
            previewActive.setAttribute('src', getOriginalSrc)
            
            currentIndex = thumbnails.indexOf(thumb)
            
            removeClass(thumbnails , 'active')
            thumb.classList.add('active')
        })
    })
}
showThumbsAsActive(thumbImagesDivs , activeImage)


function showAsActive() {
    activeImage.src = thumbImagesDivs[currentIndex].dataset.original

    removeClass(thumbImagesDivs , 'active')
    thumbImagesDivs[currentIndex].classList.add('active')
    imageNumber();
}

function nextImage(){
    currentIndex++;
    if(currentIndex >= thumbImagesDivs.length) {
        currentIndex = 0
    }
    showAsActive()
}

function prevImage() {
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = thumbImagesDivs.length - 1
    }
    showAsActive(activeImage);
}

function imageNumber() {
    let currentImage = document.querySelector('.current')
    let totalImage = document.querySelector('.total')

    currentImage.textContent = currentIndex + 1
    totalImage.textContent = thumbImagesDivs.length;
}
imageNumber();

function cloneSlider(){
    lightBoxContent.innerHTML = "";

    let elementToClone = document.querySelector('.product-images-wrapper');
    let clonedElement = elementToClone.cloneNode(true);

    let previewImageWrapper = clonedElement.querySelector('.preview-image-wrapper')

    let arrowsWrapper = clonedElement.querySelector('.arrows')

    let thumbsWrapper = clonedElement.querySelector('.thumb-wrapper')
    arrowsWrapper.classList.remove('hide-for-desktop')

    thumbsWrapper.classList.remove('hide-for-mobile')

    previewImageWrapper.innerHTML += `
    <div class="close-lightBox">
        <svg width="20" height="21" xmlns="http://www.w3.org/2000/svg">
        <title>close</title>
        <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill="#FFF"
        fill-rule="evenodd"
        />
    </div>
    `;

    let closeBtn = previewImageWrapper.querySelector('.close-lightBox')
    lightBoxContent.appendChild(clonedElement)
    closeBtn.addEventListener('click', closeLightBox)
    thumbImagesDivs = Array.from(document.querySelectorAll('.thumb-images'))
    nextBtn = document.querySelector('.next')
    prevBtn = document.querySelector('.prev')
    activeImage = document.querySelector('.preview-image')
    showThumbsAsActive(thumbImagesDivs , activeImage)

    nextBtn.addEventListener('click', nextImage)
    prevBtn.addEventListener('click', prevImage)
}

function showAlert(message , status){
    formValidation.textContent = message
    formValidation.classList.add(status)
    addToCartForm.classList.add('alert')

    setTimeout( () => {
        addToCartForm.classList.remove('alert')
    } , 4000);
}


function closeLightBox() {
    lightBoxWrapper.classList.remove('open')
}


function removeClass(array , className) {
    array.forEach( element => {
        element.classList.remove(className)
    })
}

function closeMobileMenu(){
    mobileNavgation.classList.remove("open");
}

function openMobileMenu() {
    mobileNavgation.classList.add("open");
}

function openOverlay() {
    overlay.classList.add("open");
}

function closeOverlay() {
    overlay.classList.remove("open");
}


// events 

overlay.addEventListener("click" , (e) => {
    if( e.currentTarget == e.target ) {
        closeOverlay() 
        closeMobileMenu()
    }
})

lightBoxWrapper.addEventListener("click" , (e) => {
    if( e.currentTarget == e.target ) {
        closeLightBox() 
    }
})

window.addEventListener('resize' , () => {
    if( window.innerWidth < 640 ) {
        closeLightBox();
    }
})

closeMenu.addEventListener('click' , function(){
    closeMobileMenu();
    closeOverlay();
})


cart.addEventListener('click' , () => {
    cart.classList.toggle('open')
}) 


toggleMenu.addEventListener('click' , function(){
    openMobileMenu();
    openOverlay();
})

window.addEventListener('resize', function(){
    if(window.innerWidth > 1024) {
        closeMobileMenu();
        closeOverlay();
    }
})

activeImage.addEventListener('click', function() {
    if(window.innerWidth >= 640) {
        openLightBox();
        cloneSlider();
    } else {
        return false;
    }
})

function openLightBox() {
    lightBoxWrapper.classList.add("open");
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

function addToCart() {
    addToCartForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let getProductQuantity = productQuantity.textContent;

        if ( getProductQuantity != 0) {
            let productTitle = document.querySelector('.product-details-wrapper .product-title').textContent;


            let productThumb = thumbImagesDivs[0].querySelector('img').getAttribute('src')

            let productPrice = document.querySelector('.product-details-wrapper .new-price').textContent.replace('$' , '')

            let totalPrice = "$" + parseInt(getProductQuantity * productPrice);

            if(cartList.childElementCount == 0){
                checkOutBtn.style.display = 'block';
                cartList.innerHTML = ""
            }

            cartList.innerHTML += `
            <div class= "cart-item">
                <div class="item-image">
                    <img src=${productThumb} alt="Product Image">
                </div>

                <div class="item-info">
                    <h4 class="item-title"> ${productTitle}</h4>
                    <p class="item-price-wrapper">
                        <span class="item-price">${productPrice}</span>
                        <span class="item-count"> x${getProductQuantity}</span>
                        <span class="total-price"><h3> ${totalPrice} </h3></span>
                    </p>
                </div>

                <div class="item-delete">
                    <img src="/images/icon-delete.svg" alt=" Delete Icon">
                </div>
            </div>
            `;
            deleteFromCart();
            inCartCount();
            showAlert(`Product has Been Added to your cart successfully`, 'success');

        } else {
            showAlert(`Can't add negative value` , 'fail')
        }
    })
}

addToCart();

function inCartCount() {
    let productsCount = cartList.childElementCount;
    
    inCart.textContent = productsCount

    if (productsCount == 0) {
        cart.classList.remove('show-count');
        cart.classList.add('empty')
        checkOutBtn.style.display = 'none'
        cartList.innerHTML = "Your cart is empty";
    } else {
        cart.classList.add('show-count')
        cart.classList.remove('empty')
    }
}

inCartCount();

function deleteFromCart() {
    cartContent.querySelectorAll('.cart-delete').forEach( (product) => {
        product.addEventListener('click', (e) => {
            if(!e.target.closest('.item-delete')) return;
            product.remove();
            inCartCount();
        })
    })
}

plusBtn.addEventListener('click', () => {    
    productQuantity.textContent++;
})

minusBtn.addEventListener('click', () => {
    if( productQuantity.textContent != 0 ) productQuantity.textContent--;
})