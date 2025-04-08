import * as components from "./src/indexPadre.js"

class AppContainer extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
    }
  
    connectedCallback() {
      this.render()
      this.setupCarousel()
    }
  
    setupCarousel() {
      
      const carousel = this.shadowRoot.querySelector("user-carousel")
      
    }
  
    render() {
      this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="style.css" />
                 
              <user-carousel></user-carousel>
          `
    }
  }
  
  customElements.define("app-container", AppContainer)
  