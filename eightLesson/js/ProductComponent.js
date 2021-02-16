const product = {
    props: ['item'],
    template: `
            <div class="product-item">
                <div class="desc">
                    <img :src="item.img" alt="Some img" class="product-item-img">
                    <h3>{{item.product_name}}</h3>
                    <p>\${{item.price}}</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
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
            catalogConnection: true,
        }
    },
    components: { product },
    methods: {},
    template: `<div class="products">
                <connection v-if="!this.catalogConnection" :name="'Catalog'"></connection>
                <product v-for="item of this.$data.filtered" 
                :key="item.id_product"
                :item="item"></product>
               </div>`,
    mounted() {
        this.$root.getJson(`${API}${this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    item.img = `img/id_product-${item.id_product}.png`;
                    console.dir(item);
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                    this.$data.catalogConnection = true;
                    // console.log(item);
                }
            })
            .catch(() => this.$data.catalogConnection = false);
    }
};