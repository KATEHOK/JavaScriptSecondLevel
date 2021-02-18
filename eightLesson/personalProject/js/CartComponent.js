const cartItem = {
    props: ['item'],
    template: `
    <div class="cart-items"></div>
    `
};

const cart = {
    data() {
        return {
            addProductUrl: '/addToBasket.json',
            cartUrl: '/getBasket.json',
            cartItems: [],
            cartConnection: true,
            showCart: false,
            totalCoast: 0,
            totalItems: 0,
        }
    },
    // components: { cartItem },
    methods: {
        //     addProduct(item) {
        //         this.$root.getJson(`${API}${this.addProductUrl}`)
        //             .then(data => {
        //                 if (data.result === 1) {
        //                     let find = this.cartItems.find(el => el.id_product === item.id_product);
        //                     if (find) {
        //                         find.quantity++;
        //                     } else {
        //                         const prod = Object.assign({ quantity: 1 }, item);
        //                         this.cartItems.push(prod)
        //                     }
        //                 }
        //             })
        //     },
        //     remove(item) {
        //         this.$root.getJson(`${API}${this.addProductUrl}`)
        //             .then(data => {
        //                 if (data.result === 1) {
        //                     if (item.quantity > 1) {
        //                         item.quantity--;
        //                     } else {
        //                         this.cartItems.splice(this.cartItems.indexOf(item), 1);
        //                     }
        //                 }

        //             })
        //     },
        // },
        // mounted() {
        //     this.$root.getJson(`${API}${this.$data.cartUrl}`)
        //         .then(data => {
        //             // console.dir(data);
        //             for (let item of data.contents) {
        //                 // console.log(item);
        //                 item.img = `img/id_product-${item.id_product}.png`;
        //                 this.$data.cartItems.push(item);
        //                 this.$data.cartConnection = true;
        //             }
        //         })
        //         .catch(() => this.$data.cartConnection = false);
    },
    template: `
        <div class="cart" v-show="$data.showCart">
            <div class="cart-controlers">
                <span class="cart-controlers-sum cart-controlers-item">Total coast:&nbsp;\${{ $data.totalCoast }}</span>
                <span class="cart-controlers-quantity cart-controlers-item">Total items:&nbsp;{{ $data.totalItems }}</span>
                <button class="cart-controlers-pay-btn cart-controlers-item">Pay</button>
                <button class="cart-controlers-close-btn cart-controlers-item" @click="$data.showCart = !$data.showCart">&times;</button>
            </div>
            <div class="cart-items">
                <div class="cart-items-item">
                    <img class="cart-items-item-img" src="img/id_product-123.png">
                    <div class="cart-items-item-controlers">
                        <span class="cart-items-item-controlers-item">{{ 'Netebook' }}</span>
                        <span class="cart-items-item-controlers-item">Single:&nbsp;\${{ 999 }}</span>
                        <div class="cart-items-item-controlers-item cart-items-item-controlers-wrapper">
                            <button class="cart-items-item-controlers-wrapper-btn">-</button>
                            <span class="cart-items-item-controlers-wrapper-quantity">{{ 2 }}</span>
                            <button class="cart-items-item-controlers-wrapper-btn">+</button>
                        </div>
                        <span class="cart-items-item-controlers-item">Total:&nbsp;\${{ 1998 }}</span>
                    </div>
                </div>
            </div>        
        </div>
    `
    // <connection v-if="!this.$data.cartConnection" :name="'Cart'"></connection>
    // <cart-item v-for="item of cartItems" :key="item.id_product" :item="item"></cart-item>
};