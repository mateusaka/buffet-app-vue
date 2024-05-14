const app = Vue.createApp({
    data() {
        return {
            appName: 'Cade Buffet?',
            buffets: [],
            currentBuffet: {},
            events: [],
            searchQuery: '',
            searchResult: []
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
        },

        async showEvents(buffet) {
            this.currentBuffet = buffet

            try {
                const response = await fetch(`http://127.0.0.1:3000/api/v1/events/${buffet.id}`)
                const data = await response.json()
                this.events = data
            } catch (error) {
                console.log(error)
            }
        },

        async search(query) {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/v1/buffets/search?name=${query}`)
                const data = await response.json()
                this.searchResult = data
            } catch (error) {
                console.log(error)
            }
        }
    }
})

app.mount('#app')