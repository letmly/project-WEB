let strtBut = document.getElementById('ove')
let menuBut = document.querySelector('.bi-cloud-haze2-fill')
let menuList = document.querySelector('.menu-list')

strtBut.onclick = function () {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    })
}

menuBut.onclick = function () {
    menuList.classList.toggle('show')
}

document.getElementById("promo-link").addEventListener("click", function (event) {
    linkHandler(event, '.promo')
})
document.getElementById("eat-link").addEventListener("click", function (event) {
    linkHandler(event, '.secondary')
})
document.getElementById("TOP").addEventListener("click", function (event) {
    linkHandler(event, '.TOP')
})

function linkHandler(event, className) {
    event.preventDefault()
    document.querySelector(className).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    })
}

const btnord = document.getElementById('btn-order')

btnord.onclick = function () {
    const form = document.getElementById('form-order')
    const nick = form.nick.value
    const idbunkera = form.idbunkera.value
    const way = form.way.value
    const info = form.info.value
    const laughing = {
        nick: nick,
        idbunkera: idbunkera,
        way, // сокращение синтаксиса (way) == (way: way)
        info
    }
    const laughingJSON = JSON.stringify(laughing)
    fetch('http://localhost:1337').then(function (response) {
        if (response.ok) {
            return response.text()
        }
    }).then(function (text) {
        console.log(text)
    })
}
