const buttonElement = document.querySelector('button')
const inputElement = document.querySelector('input')
const ulElement = document.querySelector('ul')

function recuperarLista() {
    const meusInteresses = localStorage.getItem('lista')

    if (meusInteresses) {
        const lista = JSON.parse(meusInteresses)

        ulElement.innerHTML = ""

        lista.forEach(item => {
            const liElement = document.createElement('li')
            liElement.innerHTML = item

            ulElement.appendChild(liElement)
            
        });
    }
}

buttonElement.addEventListener('click', () => {
    const value = inputElement.value

    if (value) {
        const meusInteresses = localStorage.getItem('lista')

        if (meusInteresses) {
            const lista = JSON.parse(meusInteresses)
            lista.push(value)

            localStorage.setItem('lista', JSON.stringify(lista))
        } else {
            const novaLista = [value]
            localStorage.setItem('lista', JSON.stringify(novaLista))
        }
        recuperarLista()
    }

    inputElement.value =  ""
})

const buttonClear = document.getElementById('clear')

buttonClear.addEventListener('click', () => {
    console.log()
    localStorage.removeItem('lista')
    ulElement.innerHTML = ""
})

async function getNews() {
    const resposta = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release')
    const dados = await resposta.json()

    console.log(dados.items[0].titulo)

    const pElement = document.querySelector('.title-news-today')
    pElement.innerHTML = dados.items[0].titulo
}


getNews()

setInterval(recuperarLista, 1000)