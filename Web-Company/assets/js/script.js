$(document).on('contextmenu', 'img', function () {
  return false
})

$(document).ready(function () {
  $('.slider').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<img class="slick-next" src="assets/svg/arrow-right.svg" />',
    prevArrow: '<img class="slick-prev" src="assets/svg/arrow-left.svg" />',
  })

  $('.slider-testi').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<img class="slick-next" src="assets/svg/arrow-right.svg" />',
    prevArrow: '<img class="slick-prev" src="assets/svg/arrow-left.svg" />',
  })
})

$('.counter').each(function () {
  $(this)
    .prop('Counter', 0)
    .animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now))
        },
      }
    )
})

// Animate
const myHeading = document.getElementById('myHeading')
const mySlide = document.getElementById('mySlide')

const myKaryawan = document.getElementById('myKaryawan')
const myProduk = document.getElementById('myProduk')
const myLayanan = document.getElementById('myLayanan')

const titleProduk = document.getElementById('titleProductsSection')
const buttonProduk = document.getElementById('btnAllProducts')
const myProduk1 = document.getElementById('myProduk1')
const myProduk2 = document.getElementById('myProduk2')
const myProduk3 = document.getElementById('myProduk3')

const titleLayanan = document.getElementById('titleServicesSection')
const buttonLayanan = document.getElementById('btnAllServices')
const myService1 = document.getElementById('myService1')
const myService2 = document.getElementById('myService2')
const myService3 = document.getElementById('myService3')

const myTesti = document.getElementById('myTesti')

$(document).ready(function () {
  $(window).scroll(function () {
    const positionTop = $(document).scrollTop()
    // console.log(positionTop)

    if (positionTop > 200) {
      myHeading.classList.add('animate__fadeInUp')
      myHeading.classList.remove('invisible')
    }

    if (positionTop > 420) {
      mySlide.classList.add('animate__fadeInUp')
      mySlide.classList.remove('invisible')
    }

    if (positionTop > 876) {
      myKaryawan.classList.add('animate__fadeInUp')
      myKaryawan.classList.remove('d-none')

      myProduk.classList.add('animate__fadeInUp')
      myProduk.classList.remove('d-none')

      myLayanan.classList.add('animate__fadeInUp')
      myLayanan.classList.remove('d-none')
    }

    if (positionTop > 1209) {
      titleProduk.classList.add('animate__fadeIn')
      titleProduk.classList.remove('invisible')
      setTimeout(function () {
        myProduk1.classList.add('animate__backInLeft')
        myProduk1.classList.remove('invisible')
      }, 0)
      setTimeout(function () {
        myProduk2.classList.add('animate__backInLeft')
        myProduk2.classList.remove('invisible')
      }, 200)
      setTimeout(function () {
        myProduk3.classList.add('animate__backInLeft')
        myProduk3.classList.remove('invisible')
      }, 400)
      setTimeout(function () {
        buttonProduk.classList.add('animate__fadeIn')
        buttonProduk.classList.remove('invisible')
      }, 1300)
    }

    if (positionTop > 1744) {
      titleLayanan.classList.add('animate__fadeIn')
      titleLayanan.classList.remove('invisible')
      setTimeout(function () {
        myService1.classList.add('animate__backInRight')
        myService1.classList.remove('invisible')
      }, 0)
      setTimeout(function () {
        myService2.classList.add('animate__backInRight')
        myService2.classList.remove('invisible')
      }, 200)
      setTimeout(function () {
        myService3.classList.add('animate__backInRight')
        myService3.classList.remove('invisible')
      }, 400)
      setTimeout(function () {
        buttonLayanan.classList.add('animate__fadeIn')
        buttonLayanan.classList.remove('invisible')
      }, 1300)
    }

    if (positionTop > 2290) {
      myTesti.classList.add('animate__fadeInUp')
      myTesti.classList.remove('invisible')
    }
  })
})

// Back to top
const mybutton = document.getElementById('btnTop')

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.classList.add('show')
  } else {
    mybutton.classList.remove('show')
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
