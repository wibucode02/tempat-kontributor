---
title: "Infinite Scrolling"
author: "Bakunya | medeveloper.me"
description: "Infinite scrolling adalah salah satu cara menampilkan banyak data selain teknik pagination, menggunakan javascript dan juga intersection observer. Ketika pengguna melakukan scroll hingga data terakhir terlihat dalam viewport, data selanjutnya akan ditampilkan secara otomatis sehinga mereka tidak perlu menekan tombol next"
---

Infinite scrolling adalah salah satu cara menampilkan banyak data selain teknik pagination, menggunakan javascript dan juga intersection observer.

Maksud disini adalah Ketika pengguna melakukan scroll hingga data terakhir terlihat dalam viewport, data selanjutnya akan ditampilkan secara otomatis sehinga mereka tidak perlu menekan tombol next. 

Teknik ini diterapkan oleh begitu banyak website besar, contohnya saja Facebook, Twitter dan Instagram.

Karena disini saya menggunakan intersection observer untuk membuat infinite scrolling bekerja, ada baiknya teman-teman memahami terlebih dahulu apa itu [Intersection Observer API](https://medeveloper.me/intersection-observer).

Dalam tutorial javascript kali ini, kita akan mencoba membuat infinite scrolling sederhana.

## HTML
Pertama kali, tentu saja kita harus menuliskan kode html. Meski hanya sebaris, tapi ini adalah kerangka dari infinite scrolling yang akan kita buat.

```html
<main class="container"></main>
```

## CSS
Kemudian kita percantik sedikit menggunakan beberapa baris kode css dasar. Tidak terlalu bagus memang, tapi teman-teman bisa memodifikasinya sedemikian rupa.

```css
body, * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}

body {
    background: #0F3460;
}

h1 {
    text-align: center;
    margin: 10px;
    color:rgb(233, 233, 233);;
}

.container {
    max-width: 800px;
    margin: auto;
    width: 90%;
}

.card {
    margin-top: 30px;
    background: rgb(233, 233, 233);
    padding: 10px;
    border-radius: 10px;
}

.card-title {
    margin-bottom: 15px;
    font-size: 22px;
    text-align: center;
}

.card-body {
    margin: 10px;
}
```

## JavaScript
Akhirnya kita sampai di bagian utama, yaitu javascript. Disini saya menggunakan API pihak ketiga dari [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

Pertama-tama kita tuliskan dahulu kode di bawah ini.

```js
window.addEventListener("load", () => {
    this.container = document.querySelector(".container")
    this.baseURL = "https://jsonplaceholder.typicode.com/posts"
})
```

Menggunakan global this, tentu saja memudahkan kita mengakses variabelnya meski diluar blok kode.

__Quick Tips__
 window.addEventListener('load', callback) adalah event untuk mengetahui seluruh konten dan asset telah dimuat, sehingga kode di dalam callback dapat di eksekusi dengan baik oleh javascript.

Yang kedua adalah kita buat dua Promises function, sebagai function yang menghandle tugas utama dan memanggil API.

```js
async function getStarted() {
    try {
        const dataAPI = await getDataJSONPlaceholder()
        console.log(dataAPI) // Kita lihat dahulu seperti apa data yang akan diterima
    } catch (err) {
        console.log(err.message)
    }
}

async function getDataJSONPlaceholder() {
    try {
        const dataRaw = await fetch(`${window.baseURL}/1`)
        const dataJson = await dataRaw.json()
        return Promise.resolve(dataJson)
    } catch(err) {
        return Promise.reject(err.message)
    }
}
```

Kemudian jangan lupa kode untuk mengkonversi data yang kita terima menjadi element/tag HTML. 

Disini saya menggunakan javascript function constructor untuk lebih readable atau keterbacaan kode, meski menggunakan function biasa pun juga bisa.

```js
function Card(dataAPI) {
    this.build = function() {
        const { id, body, title } = dataAPI
        const cardContainer = this.buildCardContainer(id)
        const cardTitle = this.buildCardTitle(title)
        const cardBody = this.buildCardBody(body)
        cardContainer.append(cardTitle)
        cardContainer.append(cardBody)
        return cardContainer
    }

    this.buildCardContainer = function(id) {
        const card = document.createElement('section')
        card.className = "card"
        card.id = id
        return card
    }

    this.buildCardTitle = function(title) {
        const cardTitle = document.createElement('div')
        cardTitle.className = "card-title"
        const cardTitleText = document.createTextNode(title)
        cardTitle.appendChild(cardTitleText)
        return cardTitle
    }

    this.buildCardBody = function(body) {
        const cardBody = document.createElement('div')
        cardBody.className = "card-body"
        const cardBodyText = document.createTextNode(body)
        cardBody.appendChild(cardBodyText)
        return cardBody
    }
}
```

Tugas utama function ini adalah membangun element card, sebagai 'wadah' untuk data yang telah kita terima.

Yang paling penting dari function constructor ini adalah method build, sebagai method utama kita yang akan di panggil dalam function getStarted(). Sehingga kodenya akan berubah menjadi seperti ini.

```js
async function getStarted() {
    try {
        const dataAPI = await getDataJSONPlaceholder()
        const html = new Card(dataAPI).build()
    } catch (err) {
        console.log(err.message)
    }
}
```

Kemudian kita buat javascript function constructor untuk menghandle infinite scrolling, menggunakan Intersection Observer.

```js
function CardObserver() {
    this.options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }

    this.buildObserver = function() {
        const observer = new IntersectionObserver(this.callback, this.options)
        return observer
    }

    this.callback = async function(entries, observer) {
        const [ entry ] = entries
        if(entry.isIntersecting) {
            console.log("Element terakhir, telah terlihat")
        }
    }
}
```

Untuk sementara kita console terlebih dahulu, sehingga tahu apakah function tersebut telah berjalan.

Lalu kita ubah sedikit kode ada di dalam function utama, dengan menginstansiasi constructor CardObserver() yang telah dibuat. Kemudian panggil method observe dan masukkan element html ke dalamnya. 

Terakhir tinggal kita append element html yang telah ada observer ke dalam container.

```js
async function getStarted() {
    try {
        const dataAPI = await getDataJSONPlaceholder()
        const html = new Card(dataAPI).build()
        const observer = new CardObserver(html).buildObserver()
        observer.observe(html)
        window.container.append(html)
    } catch (err) {
        console.log(err.message)
    }
}
```

Jika semuanya tidak ada error, kita panggil function getStarted di dalam method callback CardObserver(). 

Jangan lupa tambahkan kondisi untuk mencegah bug ketika data dari server telah habis.

Juga inisialiasi variable page untuk mengambil data selanjutnya, kemudian teruskan ke function getStarted

Karena function getStarted merupakan Promise yang rawan error, maka kita buat error handlingnya terlebih dahulu. Dengan memanggil observer.disconnect(), observer akan segera dihentikan terjadi error sehingga meminimalisir terjadinya bug.

```js
this.callback = async function(entries, observer) {
    const [ entry ] = entries
    if(entry.isIntersecting) {
        if(entry.target.id < 100) {
            const page = Number(entry.target.id) + 1
            getStarted(page).catch(() => observer.disconnect(entry.target))
        }
    }
}
```

Kemudian kita update lagi function getStarted dan  getDataJSONPlaceholder, dengan menangkap variable page yang diteruskan dari method callback sebelumnya.

sehingga menjadi seperti di bawah ini.

```js
async function getStarted(page = 1) {
    try {
        const dataAPI = await getDataJSONPlaceholder(page)
        const html = new Card(dataAPI).build()
        const observer = new CardObserver().buildObserver()
        observer.observe(html)
        window.container.append(html)
    } catch (err) {
        console.log(err.message)
    }
}

async function getDataJSONPlaceholder(page = 1) {
    try {
        console.log(page)
        const dataRaw = await fetch(`${window.baseURL}/${page}`)
        const dataJson = await dataRaw.json()
        return Promise.resolve(dataJson)
    } catch(err) {
        return Promise.reject(err.message)
    }
}
```

Yang terakhir, tinggal kita tambahkan observer.unobserve() di dalam method callback, untuk menghentikan observasi element yang telah terlihat dalam viewport.

```js
this.callback = async function(entries, observer) {
    const [ entry ] = entries
    if(entry.isIntersecting) {
        if(entry.target.id < 100) {
            const page = Number(entry.target.id) + 1
            getStarted(page).catch(() => observer.disconnect(entry.target))
        }
        observer.unobserve(entry.target)
    }
}
```

## Full source code

Karena menaruh full source code dari tutorial javascript disini akan memakan banyak space, maka saya akan upload di github milik saya sehingga teman-teman bisa melihatnya dengan jelas.

[Full source code infinite scrolling](https://github.com/bakunya/vanillajs-infinite-scrolling/blob/main/index.html)


## Akhir kata

Nah bagaimana teman-teman tutorial kali ini, apakah kalian menyukainya?

Jangan lupa nantikan tutorial selanjutnya ya ....

Terimakasih telah membaca artikel ini sampai akhir.