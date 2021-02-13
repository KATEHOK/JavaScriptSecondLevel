const filt = {
    data() {
        return {
            userSearch: '',
        }
    },
    methods: {
        filter() {
            let regexp = new RegExp(this.$data.userSearch, 'i');
            this.$root.$refs.products.$data.filtered = this.$root.$refs.products.$data.products.filter(el => regexp.test(el.product_name));
            // console.dir(this.$root.$refs.products.$data.filtered)
        }
    },
    template: `
                <form action="#" class="search-form" @submit.prevent="$root.$refs.filt.filter">
                    <input type="text" class="search-field" v-model="userSearch">
                    <button type="submit" class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                `
};