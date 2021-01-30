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
                <button class="buy-btn">В корзину</button>
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
    removeProduct(product) {
        this.goods.pop(product);
    };

    clear = () => { };
    addProduct = (product) => { };
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
                <button class="cart-item-btn" value="dec">-</button>
                <span class="cart-item-count">${this.quantity}</span>
                <button class="cart-item-btn" value="inc">+</button>
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

    showCartBtn.addEventListener('click', () => {
        if (cartEl.classList.contains('hide')) {
            cartEl.classList.remove('hide')
        }
    });
    hideCartBtn.addEventListener('click', () => {
        if (!cartEl.classList.contains('hide')) {
            cartEl.classList.add('hide')
        }
    });
    cartItemBtns.forEach(item => item.addEventListener('click', (event) => {
        const parent = event.target.parentNode.parentNode;
        console.dir(cart.goods);
        if (event.target.value == 'inc') {
            parent.querySelector('.cart-item-count').textContent = `${+parent.querySelector('.cart-item-count').textContent + 1}`;
            cart.goods.forEach(item => {
                if (item.id_product == +parent.dataset.id) {
                    item.quantity++;
                }
            });
            cartPrice.textContent = cart.getSumPricesOfItems();
        } else if (event.target.value == 'dec') {
            parent.querySelector('.cart-item-count').textContent = `${+parent.querySelector('.cart-item-count').textContent - 1}`;
            cart.goods.forEach(item => {
                if (item.id_product == +parent.dataset.id) {
                    if (item.quantity == 1) {
                        cart.removeProduct(item);
                        parent.outerHTML = '';
                    } else {
                        item.quantity--;
                    }
                }
            });
            cartPrice.textContent = cart.getSumPricesOfItems();
        }
    }));

    productBuyBtns.forEach(btn => btn.addEventListener('click', event => {
        const product = event.target.parentNode.dataset
        console.log(product.id);
        list.goods.forEach(item => {
            if (item.id_product == +product.id) {
                console.dir(item); // реализовать добавление продукта в корзину
            }
        });
    }));
}

let list = new ProductsList();
let cart = new Cart();
setTimeout(main, 100); // чтобы все объекты успели проинициализироваться
