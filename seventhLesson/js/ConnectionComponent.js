Vue.component("connection", {
    props: ["name"],
    template: `<div>We lost connection with {{name}} server...</div>`
})