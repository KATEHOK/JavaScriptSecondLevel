const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(data => data.json())
            .catch(() => console.error('JSON-file of goods LOST'))
    }
    getSumPricesOfItems() {
        return this.goods.reduce((sum, item) => sum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }
    getProductById(id) {
        let result = null;
        this.goods.forEach(item => {
            if (id == item.id_product) {
                result = item;
            }
        });
        return result;
    }
}
class ProductItem {
    constructor(product, img = `img/default.png`) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;

    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" class="product-img" alt="Some img">
                <h3 class="product-name">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="buy-btn" data-id="${this.id}">В корзину</button>
            </div>`
    }
}
class Cart {
    constructor(container = '.cart-wrapper') {
        this.container = container;
        this._getProducts()
            .then(data => {
                this.goods = [...data.contents];
                this.render();
            });
    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(data => data.json())
            .catch(() => console.error('JSON-file of cart LOST'))
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new CartItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
        document.querySelector('#cart-price').textContent = this.getSumPricesOfItems();
    }
    getSumPricesOfItems() {
        return this.goods.reduce((sum, item) => sum += item.price * item.quantity, 0);
    }
    getProductById(id) {
        let result = null;
        this.goods.forEach(item => {
            if (id == item.id_product) {
                result = item;
            }
        });
        return result;
    }
    getProductHTMLbyId(id) {
        return document.querySelector(`.cart-item[data-id="${id}"]`);
    }
    getCountHTMLbyId(id) {
        return document.querySelector(`.cart-item-count[data-id="${id}"]`);
    }
    addProduct(productListProduct, cartProduct, cartHTML, cartWrapperHTML, cartPriceHTML) {
        if (cartProduct) {
            cartProduct.quantity++;
            this.getCountHTMLbyId(cartProduct.id_product).textContent = cartProduct.quantity;
            if (cartProduct.quantity == 1) {
                this.getProductHTMLbyId(cartProduct.id_product).classList.remove('hide');
            }
        }
        cartPriceHTML.textContent = this.getSumPricesOfItems();
    }
    removeProduct(cartProduct, cartPriceHTML) {
        cartProduct.quantity--;
        this.getCountHTMLbyId(cartProduct.id_product).textContent = cartProduct.quantity;
        if (cartProduct.quantity == 0) {
            this.getProductHTMLbyId(cartProduct.id_product).classList.add('hide');
        }
        cartPriceHTML.textContent = this.getSumPricesOfItems();
    }
    show() {
        const cartClassList = document.querySelector('#cart').classList;
        if (cartClassList.contains('hide')) {
            cartClassList.remove('hide');
        }
    }
    hide() {
        const cartClassList = document.querySelector('#cart').classList;
        if (!cartClassList.contains('hide')) {
            cartClassList.add('hide');
        }
    }

    clear = () => { };
}
class CartItem {
    constructor(product, img = `img/default.png`) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                <img src="${this.img}" class="cart-item-img" alt="Some img">
                <h3 class="cart-item-name">${this.title}</h3>
                <p class="cart-item-price">${this.price} руб.</p>
                <div class="cart-item-wrapper">
                <button class="cart-item-btn" data-value="dec" data-id="${this.id}">-</button>
                <span class="cart-item-count" data-id="${this.id}">${this.quantity}</span>
                <button class="cart-item-btn" data-value="inc" data-id="${this.id}">+</button>
                </div>
            </div>`
    };
}
function main() {
    const showCartBtn = document.querySelector('#cart-show');
    const cartEl = document.querySelector('#cart');
    const hideCartBtn = document.querySelector('#cart-hide');
    const cartItemBtns = document.querySelectorAll('.cart-item-btn');
    const cartPrice = document.querySelector('#cart-price');
    const productBuyBtns = document.querySelectorAll('.buy-btn');
    const cartWrapperEl = document.querySelector('#cart-wrapper');

    showCartBtn.addEventListener('click', event => { eventClickHandler(event) });
    hideCartBtn.addEventListener('click', event => { eventClickHandler(event) });
    cartItemBtns.forEach(item => item.addEventListener('click', event => { eventClickHandler(event) }));
    productBuyBtns.forEach(btn => btn.addEventListener('click', event => { eventClickHandler(event) }));

    function eventClickHandler(event) {
        const currentButton = event.target;
        const currentButtonId = +currentButton.dataset.id;
        const currentCartProduct = cart.getProductById(currentButtonId);
        const currentProductListProduct = list.getProductById(currentButtonId);

        if (currentButton.classList.contains("buy-btn")) {
            cart.addProduct(currentProductListProduct, currentCartProduct, cartEl, cartWrapperEl, cartPrice);
            // Реализовать добавление товара в корзину, если аналогичных товаров в ней ещё нет
        } else if (currentButton.classList.contains("cart-item-btn")) {
            if (currentButton.dataset.value == 'inc') {
                cart.addProduct(currentProductListProduct, currentCartProduct, cartEl, cartWrapperEl, cartPrice);
            } else if (currentButton.dataset.value == 'dec') {
                cart.removeProduct(currentCartProduct, cartPrice);
            }
        } else if (currentButton.classList.contains("cart-show")) {
            cart.show();
        } else if (currentButton.classList.contains("cart-hide")) {
            cart.hide();
        }
    }
}

let list = new ProductsList();
let cart = new Cart();
setTimeout(main, 100); // чтобы все объекты успели проинициализироваться
