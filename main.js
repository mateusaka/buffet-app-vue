const app = Vue.createApp({
    data() {
        return {
            appName: 'Cade Buffet',
            buffets: []
        }
    },

    methods: {
        async listBuffets() {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/v1/buffets")
                const data = await response.json()
                this.buffets = data
            } catch (error) {
                console.log(error)
            }
        }
    }
})

app.mount('#app')