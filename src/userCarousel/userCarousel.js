class UserCarousel extends HTMLElement {
    static get observedAttributes() {
      return ["title"]
    }
  
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.users = []
    }
  
    connectedCallback() {
      this.loadUsers()
      this.render()
      this.initSwiper()
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this[name] = newValue
        this.render()
      }
    }
  
    // Default users if none are provided
    loadUsers() {
      // Check if users were already set via setUsers method
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
  
    // Public method to set users from outside
    setUsers(usersArray) {
      this.users = usersArray
      this.render()
      this.initSwiper()
    }
  
    initSwiper() {
      // Verificamos periódicamente si Swiper está cargado
      const checkSwiper = () => {
          if (window.Swiper) {
              const swiperContainer = this.shadowRoot.querySelector(".mySwiper");
              if (swiperContainer) {
                  // Asegurarnos que el contenedor tenga el ancho correcto
                  swiperContainer.style.width = '100%';
                  swiperContainer.style.overflow = 'hidden';
                  
                  new window.Swiper(swiperContainer, {
                      slidesPerView: 3, // Cambiado a 'auto' para mejor adaptación
                      spaceBetween: 30,
                      loop: true,
                      loopFillGroupWithBlank: true,
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
                          1024: {
                              slidesPerView: 4,
                              spaceBetween: 30,
                          }
                      },
                      grabCursor: true,
                  });
              }
          } else {
              setTimeout(checkSwiper, 100);
          }
      };
      
      checkSwiper();
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
                  border: 1px solid #4361EE;
                  box-shadow: 0 4px 20px rgba(67, 97, 238, 0.15);
                  color: white;
                  width: 100%;
              }
              
              h2 {
                  margin-bottom: 20px;
                  font-size: 24px;
                  font-weight: 600;
              }
              
              /* Swiper Styles */
              .swiper {
                  width: 100%;
                  height: 100%;
                  position: relative;
                  overflow: visible !important;
              }
              
              .swiper-wrapper {
                  display: flex;
                  align-items: stretch;
              }
              
              .swiper-slide {
                  width: auto !important;
                  height: auto !important;
                  display: flex;
                  justify-content: center;
              }
              
              /* Swiper Navigation Buttons */
              .swiper-button-prev,
              .swiper-button-next {
                  color: white;
                  background-color: rgba(255, 255, 255, 0.2);
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  z-index: 10;
                  cursor: pointer;
              }
              
              .swiper-button-prev {
                  left: 0;
              }
              
              .swiper-button-next {
                  right: 0;
              }
              
              .swiper-button-prev:after,
              .swiper-button-next:after {
                  font-size: 18px;
                  font-weight: bold;
                  font-family: swiper-icons;
              }
              
              .swiper-button-prev:hover,
              .swiper-button-next:hover {
                  background-color: rgba(255, 255, 255, 0.3);
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
                  
                  .swiper-button-prev:after,
                  .swiper-button-next:after {
                      font-size: 14px;
                  }
              }
          </style>
          
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
          
          <div class="carousel-container">
              <h2>${this.title || "You may know..."}</h2>
              
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
                  
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
              </div>
          </div>
          
          <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
      `;
  }
}

customElements.define("user-carousel", UserCarousel);
export default UserCarousel;