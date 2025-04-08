import Swiper from 'swiper';

class carouselContainer extends HTMLElement {

    constructor(){

        super();
        this.attachShadow({ mode: "open" });

    }

    static get observedAttributes() {
        return ["profiles"];
    }

    connectedCallback() {
        this.render();
        this.initSwiper();
    }
    
    initSwiper() {
        const swiper = new Swiper(this.shadowRoot.querySelector(".mySwiper"), {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: this.shadowRoot.querySelector('.swiper-button-next'),
                prevEl: this.shadowRoot.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                480: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 }
            },
            grabCursor: true,
        });
    }
    

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }
    

    render(){
        this.shadowRoot.innerHTML = `
       
        <link rel="stylesheet" href="./src/carouselContainer/carouselContainer.css">

        <div class="container">
            <div class="carousel-container">
                <h2>You may know...</h2>
                
                <div class="swiper mySwiper">
                    <div class="swiper-wrapper">
                    ${this.profiles}
                    </div>
                        
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </div>

        `;

    }

}

customElements.define("carousel-container", carouselContainer)
export default carouselContainer

