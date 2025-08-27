// card news
const slide = document.querySelector('.slide');

const clone = slide.cloneNode(true);
slide.parentNode.appendChild(clone);

const wrapper = document.createElement('div');
wrapper.style.display = 'flex';
wrapper.style.willChange = 'transform';
wrapper.appendChild(slide);
wrapper.appendChild(clone);
document.querySelector('.card').appendChild(wrapper);


let offset = 0;
const speed = 4;
const setWidth = slide.offsetWidth;
let rafId = null;

function animate() {
  offset -= speed;
  if (Math.abs(offset) >= setWidth) offset = 0;
  wrapper.style.transform = `translateX(${offset}px)`;
  rafId = requestAnimationFrame(animate);
}

function start() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(animate);
}

function stop() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}


start();

const cards = wrapper.querySelectorAll('.news');
let hoverCount = 0;

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    hoverCount++;
    stop();
  });
  card.addEventListener('mouseleave', () => {
    hoverCount = Math.max(0, hoverCount - 1);
    if (hoverCount === 0) start();
  });
});




const animationMove = function (selector) {
  const targetEl = document.querySelector(selector)
  const bsy = window.scrollY
  const tsy = targetEl.getBoundingClientRect().top + bsy
  window.scrollTo({
    top: tsy,
    behavior: 'smooth'
  })
}


const scrollMove = document.querySelectorAll('[data-animation-scroll="true"]')
for (let i = 0; i < scrollMove.length; i++) {
  scrollMove[i].addEventListener('click', function () {
    const target = this.dataset.target
    animationMove(target)
  })
}


$(function () {
  $('.stick').click(function (e) {
    e.preventDefault()
    $('html,body').stop().animate({
      scrollTop: 0
    }, 800)
  })

})

const btnEl = document.querySelector('header .mail')
const imgEl = document.querySelector('header .mail > img')

btnEl.addEventListener('mouseenter', function () {
  imgEl.setAttribute('src', 'images/right-arrow_white.png')
})
btnEl.addEventListener('mouseleave', function () {
  imgEl.setAttribute('src', 'images/right-arrow.png')
})



// t스크롤러
var s = null;

function initSkrollr() {
  if (window.innerWidth > 1024) { // 데스크탑 기준
    if (!s) {
      s = skrollr.init({
        smoothScrolling: true,
        forceHeight: false
      });
    }
  } else {
    if (s) {
      s.destroy(); // 모바일에서는 skrollr 제거
      s = null;
    }
  }
}

window.addEventListener("resize", initSkrollr);
window.addEventListener("load", initSkrollr);

function updateSkrollrData() {
  var winH = window.innerHeight;

  // 예: 1000px 지점 → 화면 높이의 2배로 자동 조정
  document.querySelectorAll("[data-1000]").forEach(el => {
    el.setAttribute("data-" + winH * 2, el.getAttribute("data-1000"));
    el.removeAttribute("data-1000");
  });

  if (s) s.refresh();
}

var s = skrollr.init({
  smoothScrolling: true,
  forceHeight: false,
  mobileCheck: function () { return false; }
});

window.addEventListener("resize", updateSkrollrData);
window.addEventListener("load", updateSkrollrData);


// contact
$(function(){
  $('header .mailing').hide()
  $('.closewrap img').click(function(e){
    e.preventDefault()
    $('header .mailing').fadeToggle()
  })
  $('.header .mail').click(function(e){
    e.preventDefault()
    $('header .mailing').fadeToggle()
  })
})
