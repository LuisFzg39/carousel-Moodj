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
      // Example of how to set custom users programmatically
      const carousel = this.shadowRoot.querySelector("user-carousel")
      if (carousel) {
        // You can set custom users if needed
        // carousel.setUsers([
        //     { name: "Custom User", username: "@custom", avatar: "path/to/avatar.png" },
        //     // more users...
        // ]);
      }
    }
  
    render() {
      this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="style.css" />
              
              <user-carousel title="You may know..."></user-carousel>
          `
    }
  }
  
  customElements.define("app-container", AppContainer)
  