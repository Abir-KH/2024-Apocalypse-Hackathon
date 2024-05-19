document.addEventListener("DOMContentLoaded", function () {
    const swiper = document.getElementById("swiper");
    const like = document.getElementById("like");
    const dislike = document.getElementById("dislike");
    let cardCount = 0;
    
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
  
    function color() {
        // existing color function logic
    }
  
    function openlink() {
        alert("You are successfully signed in!");
        window.location.href = "index.html"; // Redirect to index.html
        return true;
    }
  
    function appendNewCard() {
        const card = new Card({
            imageUrl: urls[cardCount % urls.length],
            onDismiss: () => {
                appendNewCard();
            },
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
  
    // Initialize first set of cards
    for (let i = 0; i < 5; i++) {
        appendNewCard();
    }
  });
  
  class Card {
    constructor({
        imageUrl,
        onDismiss,
        onLike,
        onDislike
    }) {
        this.imageUrl = imageUrl;
        this.onDismiss = onDismiss;
        this.onLike = onLike;
        this.onDislike = onDislike;
        this.#init();
    }
  
    #startPoint;
    #offsetX;
    #offsetY;
  
    #isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }
  
    #init = () => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = this.imageUrl;
        card.append(img);
        this.element = card;
        if (this.#isTouchDevice()) {
            this.#listenToTouchEvents();
        } else {
            this.#listenToMouseEvents();
        }
    }
  
    #listenToTouchEvents = () => {
        this.element.addEventListener('touchstart', (e) => {
            const touch = e.changedTouches[0];
            if (!touch) return;
            const { clientX, clientY } = touch;
            this.#startPoint = { x: clientX, y: clientY }
            document.addEventListener('touchmove', this.#handleTouchMove);
            this.element.style.transition = 'transform 0s';
        });
  
        document.addEventListener('touchend', this.#handleTouchEnd);
        document.addEventListener('cancel', this.#handleTouchEnd);
    }
  
    #listenToMouseEvents = () => {
        this.element.addEventListener('mousedown', (e) => {
            const { clientX, clientY } = e;
            this.#startPoint = { x: clientX, y: clientY }
            document.addEventListener('mousemove', this.#handleMouseMove);
            this.element.style.transition = 'transform 0s';
        });
  
        document.addEventListener('mouseup', this.#handleMoveUp);
  
        // prevent card from being dragged
        this.element.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }
  
    #handleMove = (x, y) => {
        this.#offsetX = x - this.#startPoint.x;
        this.#offsetY = y - this.#startPoint.y;
        const rotate = this.#offsetX * 0.1;
        this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
        // dismiss card
        if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
            this.#dismiss(this.#offsetX > 0 ? 1 : -1);
        }
    }
  
    // mouse event handlers
    #handleMouseMove = (e) => {
        e.preventDefault();
        if (!this.#startPoint) return;
        const { clientX, clientY } = e;
        this.#handleMove(clientX, clientY);
    }
  
    #handleMoveUp = () => {
        this.#startPoint = null;
        document.removeEventListener('mousemove', this.#handleMouseMove);
        this.element.style.transform = '';
    }
  
    // touch event handlers
    #handleTouchMove = (e) => {
        if (!this.#startPoint) return;
        const touch = e.changedTouches[0];
        if (!touch) return;
        const { clientX, clientY } = touch;
        this.#handleMove(clientX, clientY);
    }
  
    #handleTouchEnd = () => {
        this.#startPoint = null;
        document.removeEventListener('touchmove', this.#handleTouchMove);
        this.element.style.transform = '';
    }
  
    #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener('mouseup', this.#handleMoveUp);
        document.removeEventListener('mousemove', this.#handleMouseMove);
        document.removeEventListener('touchend', this.#handleTouchEnd);
        document.removeEventListener('touchmove', this.#handleTouchMove);
        this.element.style.transition = 'transform 1s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
        this.element.classList.add('dismissing');
        setTimeout(() => {
            this.element.remove();
            if (typeof this.onDismiss === 'function') {
                this.onDismiss();
            }
        }, 1000);
  
        if (typeof this.onLike === 'function' && direction === 1) {
            this.onLike();
        }
        if (typeof this.onDislike === 'function' && direction === -1) {
            this.onDislike();
        }
    }
  }