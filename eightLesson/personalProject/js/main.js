const API = 'https://raw.githubusercontent.com/KATEHOK/JavaScriptSecondLevel/main/eightLesson/personalProject/json/';

const app = new Vue({
    el: '#app',
    components: { cart, products, filt },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(() => console.error(`lost server (${url})`))
        },
    },
    mounted() {
        console.log('Working:)')
    }
});
