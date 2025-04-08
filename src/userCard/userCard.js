class UserCard extends HTMLElement {
    static get observedAttributes() {
      return ["name", "username", "avatar"]
    }
  
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
    }
  
    connectedCallback() {
      this.render()
      this.addEventListeners()
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this[name] = newValue
        this.render()
      }
    }
  
    addEventListeners() {
      const followBtn = this.shadowRoot.querySelector(".follow-btn")
      if (followBtn) {
        followBtn.addEventListener("click", () => {
          if (followBtn.textContent === "Follow") {
            followBtn.textContent = "Following"
            followBtn.style.backgroundColor = "#333"
          } else {
            followBtn.textContent = "Follow"
            followBtn.style.backgroundColor = "#1E1E1E"
          }
        })
      }
    }
  
    render() {
      this.shadowRoot.innerHTML = `
              <style>
                  * {
                      margin: 0;
                      padding: 0;
                      box-sizing: border-box;
                  }
                  
                  .carousel-card {
                      width: 220px;
                      height: 174px;
                      background-color: #4361EE;
                      border-radius: 15px;
                      padding: 15px;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                  }
                  
                  .user-info {
                      display: flex;
                      align-items: center;
                      margin-bottom: 15px;
                  }
                  
                  .avatar {
                      width: 72px;
                      height: 72px;                      
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background-color: #121212;
                      border-radius: 50%;
                  }
                  
                  .avatar img {
                      width: 50px;
                      height: 50px;
                  }
                  
                  .user-details {
                      margin-left: 8px;
                  }
                  
                  .user-details h3 {
                      font-size: 24px;
                      margin-bottom: 2px;
                      color: white;
                  }
                  
                  .username {
                      font-size: 14px;
                      color: rgba(255, 255, 255, 0.7);
                  }
                  
                  .follow-btn {
                      background-color: #1E1E1E;
                      color: white;
                      border: none;
                      border-radius: 11px;
                      padding: 8px 0;
                      font-size: 16px;
                      font-weight: 500;
                      cursor: pointer;
                      width: 140px;
                      height: 39px;
                      align-self: center;
                      margin-bottom: 10px;
                      transition: background-color 0.3s ease;
                  }
                  
                  .follow-btn:hover {
                      background-color: #333;
                  }
              </style>
              
              <div class="carousel-card">
                  <div class="user-info">
                      <div class="avatar">
                          <img src="${this.avatar || ""}" alt="${this.name || "User"}">
                      </div>
                      <div class="user-details">
                          <h3>${this.name || "User"}</h3>
                          <span class="username">${this.username || "@username"}</span>
                      </div>
                  </div>
                  <button class="follow-btn">Follow</button>
              </div>
          `
    }
  }
  
  customElements.define("user-card", UserCard)
  export default UserCard
  