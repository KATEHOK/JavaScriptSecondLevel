const cartItem = {
    props: ['item'],
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <img :src="item.img" alt="Some img">
            <div class="product-desc">
                <div class="product-title">{{ item.product_name }}</div>
                <div class="product-quantity">Quantity: {{ item.quantity }}</div>
                <div class="product-single-price">$ {{ item.price }} each</div>
            </div>
        </div>
        <div class="right-block">
            <div class="product-price">\${{item.quantity*item.price}}</div>
            <button class="del-btn" @click="$parent.remove(item)">&times;</button>
        </div>
    </div>
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
        }
    },
    components: { cartItem },
    methods: {
        addProduct(item) {
            this.$root.getJson(`${API}${this.addProductUrl}`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item) {
            this.$root.getJson(`${API}${this.addProductUrl}`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }

                })
        },
    },
    mounted() {
        this.$root.getJson(`${API}${this.$data.cartUrl}`)
            .then(data => {
                // console.dir(data);
                for (let item of data.contents) {
                    // console.log(item);
                    item.img = `img/id_product-${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                    this.$data.cartConnection = true;
                }
            })
            .catch(() => this.$data.cartConnection = false);
    },
    template: `
        <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :item="item">
            </cart-item>
            <connection v-if="!this.$data.cartConnection" :name="'Cart'"></connection>
            <span v-if="this.$data.cartItems.length == 0">Cart is empty</span>
        </div>
    `
};