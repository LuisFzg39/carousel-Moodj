class UserCarousel extends HTMLElement {
  static get observedAttributes() {
    return ["title"]
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.users = []
    this.swiper = null
  }

  connectedCallback() {
    this.loadUsers()
    this.render()
    this.loadSwiperAndInit()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue
      this.render()
    }
  }

  
  loadUsers() {
    
    if (this.users.length === 0) {
      this.users = [
        { name: "Eli", username: "@elipinipon", avatar: "public/Pfp_icon1.png" },
        { name: "Santiago", username: "@santiti", avatar: "public/Pfp_icon2.png" },
        { name: "Luis F", username: "@terricola", avatar: "public/Pfp_icon3.png" },
        { name: "Leider", username: "@leiderr.js", avatar: "public/Pfp_icon4.png" },
        { name: "Isa", username: "@itsabella", avatar: "public/Pfp_icon5.png" },
        { name: "Terry", username: "@not.terrypriv", avatar: "public/Pfp_icon6.png" },
      ]
    }
  }

  
  setUsers(usersArray) {
    this.users = usersArray
    this.render()
    if (this.swiper) {
      this.swiper.destroy()
      this.swiper = null
    }
    this.loadSwiperAndInit()
  }

  loadSwiperAndInit() {
    
    if (!window.Swiper) {
      
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"
      script.async = true

     
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"

      
      document.head.appendChild(link)
      document.head.appendChild(script)

      
      script.onload = () => {
        this.initSwiperInstance()
      }
    } else {
      
      this.initSwiperInstance()
    }
  }

  initSwiperInstance() {
    
    setTimeout(() => {
      const swiperEl = this.shadowRoot.querySelector(".mySwiper")
      if (!swiperEl) return

      
      if (this.swiper) {
        this.swiper.destroy()
        this.swiper = null
      }

      
      if (window.Swiper) {
        this.swiper = new window.Swiper(swiperEl, {
          direction: "horizontal",
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true, 
          speed: 600,
          navigation: {
            nextEl: this.shadowRoot.querySelector(".swiper-button-next"),
            prevEl: this.shadowRoot.querySelector(".swiper-button-prev"),
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
          grabCursor: true,
        })
      }
    }, 300)
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    
      :host {
        display: block;
        width: 100%;
        font-family: "Inter", sans-serif;
      }
    
      .carousel-container {
        background-color: #1E1E1E;
        border-radius: 20px;
        padding: 25px;
        border: 3px solid #4361EE;
        box-shadow: 0 4px 20px rgba(67, 97, 238, 0.15);
        color: white;
        width: 100%;
        width: 800px;
        height: 300px;
      }
    
      h2 {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 600;
      }
    
    
      .swiper {
        
        height: 220px;
        position: relative;
        overflow: hidden;
        
      }
    
      .swiper-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 1;
        position: relative;
        transition-property: transform;
        box-sizing: content-box;
      }
    
      .swiper-slide {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
        transition-property: transform;
        display: flex;
        justify-content: center;
      }
    
    /* Swiper Navigation Buttons */
      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        top: 45%;
        width: 40px;
        height: 40px;
        margin-top: -20px;
        z-index: 10;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border-radius: 50%;
      }

      .swiper-button-prev {
        left: -6px;
      }

      .swiper-button-next {
        right: -6px;
      }

    /* Remove the text arrow content */
      .swiper-button-prev:after,
      .swiper-button-next:after {
        content: "";
      }

    /* Responsive */
      @media (max-width: 768px) {
          .swiper {
            padding: 0 20px;
          }
      }

      @media (max-width: 480px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 30px;
            height: 30px;
          }
      }
      </style>
            
            <div class="carousel-container">
                <h2>You may know...</h2>
                
                <div class="swiper mySwiper">
                    <div class="swiper-wrapper">
                        ${this.users
                          .map(
                            (user) => `
                            <div class="swiper-slide">
                                <user-card 
                                    name="${user.name}" 
                                    username="${user.username}" 
                                    avatar="${user.avatar}">
                                </user-card>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                    
                    <div class="swiper-button-prev">
                        <img src="/public/Left-arrow.svg" width="37" height="48" alt="Previous" />
                    </div>
                    <div class="swiper-button-next">
                        <img src="/public/Right-arrow.svg" width="36" height="49" alt="Next" />
                    </div>
                </div>
            </div>
        `

    
    requestAnimationFrame(() => {
      this.loadSwiperAndInit()
    })
  }
}

customElements.define("user-carousel", UserCarousel)
export default UserCarousel
