const product = {
    props: ['product', 'img'],
    template: `
            <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
};

const products = {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150',
            catalogConnection: true,
        }
    },
    components: { product },
    methods: {},
    template: `<div class="products">
                <connection v-if="!this.catalogConnection" :name="'Catalog'"></connection>
                <product v-for="item of this.$data.filtered" 
                :key="item.id_product" 
                :img="imgProduct"
                :product="item"></product>
               </div>`,
    mounted() {
        this.$root.getJson(`${API}${this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                    this.$data.catalogConnection = true;
                    // console.log(item);
                }
            })
            .catch(() => this.$data.catalogConnection = false);
    }
};