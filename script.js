const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

let num = 0;

function openNav() {
  document.getElementById("mySidenav").style.width = "50vh";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function openMenu() {
  document.getElementById("myNav").style.height = "100%";
}

function closeMenu() {
  document.getElementById("myNav").style.height = "0%";
}

// constants
const urls = [
  'https://i.im.ge/2024/05/19/KlZn6M.image1.jpeg',
  'https://source.unsplash.com/random/1000x1000/?landscape',
  'https://source.unsplash.com/random/1000x1000/?ocean',
  'https://source.unsplash.com/random/1000x1000/?moutain',
  'https://source.unsplash.com/random/1000x1000/?forest'
];

// variables
let cardCount = 0;


// functions
function color() {
  if (num == 0) {
    document.getElementById("demo").innerHTML = ("It's a  MATCH");
    document.getElementById("demo").style.opacity = "0";
    document.getElementById("color").style.backgroundColor = "black";
    document.getElementById("demo").style.transition = "all 2s";
    document.getElementById("demo").style.opacity = "2";
    document.getElementById("color").style.transition = "all 2s";
    document.getElementById("swiper").style.transition = "all 2s";
    num = 1;
  } else if (num == 1) {
    document.getElementById("color").style.backgroundColor = "white";
    document.getElementById("swiper").style.opacity = "1";
    document.getElementById("demo").style.opacity = "0";
    document.getElementById("demo").style.transition = "all 2s";
    document.getElementById("color").style.transition = "all 2s";
    document.getElementById("swiper").style.transition = "all 2s";
    num = 0;
  }
}
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 5],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
      console.log("like");
      ranNum = Math.floor(Math.random() * 5);
      console.log(ranNum);
      if (ranNum == 1) {
        setTimeout(color, 200);
        setTimeout(color, 2000);
      }
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
      console.log("dislike");
    }
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

// first 5 cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}