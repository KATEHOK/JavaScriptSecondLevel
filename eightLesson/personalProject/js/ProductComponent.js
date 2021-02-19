const product = {
    props: ['item'],
    template: `
            <div class="main-products-item">
                <img :src="item.img" alt="Photo" class="main-products-item-img">
                <span class="main-products-item-name">{{ item.product_name }}</span>
                <span class="main-products-item-price">\${{ item.price }}</span>
                <button class="main-products-item-btn btn" @click="$root.$refs.cart.addProduct(item)">buy</button>
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
    template: `
            <div class="main-products">
                <product v-for="item of this.$data.filtered" :key="item.id_product" :item="item"></product>
            </div>
            `,
    // <div class="products">
    // <connection v-if="!this.catalogConnection" :name="'Catalog'"></connection>

    mounted() {
        this.$root.getJson(`${API}${this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    item.img = `img/id_product-${item.id_product}.png`;
                    // console.dir(item);
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                    this.$data.catalogConnection = true;
                    // console.log(item);
                }
            })
            .catch(() => this.$data.catalogConnection = false);
    }
};