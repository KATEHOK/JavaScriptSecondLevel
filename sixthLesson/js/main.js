//Отправляйте свои данные с помощью $emit в верхний компонент, а вниз с помощью props
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    components: { cart, products, filt },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(() => console.error('lost server'))
        },
    },
    mounted() {
        // console.log('worked')
    }
});