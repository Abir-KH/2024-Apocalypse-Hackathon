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
  'https://i.im.ge/2024/05/19/KrOD68.sam.jpeg',
  'https://i.im.ge/2024/05/19/KrOqCK.IMG-4868.png',
  'https://i.im.ge/2024/05/19/KrOsv9.IMG-4866.png',
  'https://i.im.ge/2024/05/19/KrO2e6.IMG-4865.jpeg',
  'https://i.im.ge/2024/05/19/KrOdDF.IMG-4862.png',
  'https://i.im.ge/2024/05/19/KrOFly.IMG-4860.jpeg',
  'https://i.im.ge/2024/05/19/KrOl6a.IMG-4870.png',
  'https://i.im.ge/2024/05/19/KrOX2x.IMG-4871.png',
  'https://i.im.ge/2024/05/19/KrOTpG.IMG-4869.png'
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
function openlink () {
  alert("You are successfully signed in!");
  window.location.href = "index.html"; // Redirect to index.html
  return true; 
}

function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 5],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
      console.log("like");
      ranNum = Math.floor(Math.random() * 10);
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