const app = Vue.createApp({
    data() {
        return {
            appName: 'Cade Buffet?',
            buffets: [],
            currentBuffet: {},
            events: [],
            searchQuery: '',
            searchResult: [],
            availQuantity: 0,
            availDate: null
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
            if (query == '') return

            try {
                const response = await fetch(`http://127.0.0.1:3000/api/v1/buffets/search?name=${query}`)
                const data = await response.json()
                this.searchResult = data
            } catch (error) {
                console.log(error)
            }
        },

        async availability(id, date, quantity) {
            const element = document.getElementById(`custom-alert-${id}`)
            element.classList.remove("alert-success", "alert-danger")            

            try {
                const response = await fetch(`http://127.0.0.1:3000/api/v1/events/availability?id=${id}&date=${date}&quantity=${quantity}`)
                const data = await response.json()

                if (data.error) {
                    element.classList.add("alert-danger")
                    element.innerHTML = `<strong>Erro</strong> ${data.error}`
                }
                else {
                    element.classList.add("alert-success")
                    element.innerHTML = `<strong>Sucesso</strong> Evento disponível! Valor: $ ${data.value}`
                }

                element.classList.remove("d-none")
            } catch (error) {
                console.log(error)
            }
        },

        closeAlert(id) {
            const element = document.getElementById(`custom-alert-${id}`)
            element.classList.add("d-none")
        }
    }
})

app.mount('#app')