class profileContainer extends HTMLElement {

    constructor(){

        super();
        this.attachShadow({ mode: "open" });

    }

    static get observedAttributes() {
        return ["pfp", "name", "username"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    render(){
        this.shadowRoot.innerHTML = `
       
        <link rel="stylesheet" href="./src/profileContainer/profileContainer.css">

        <div class="swiper-slide">
            <div class="carousel-card">
                <div class="user-info">
                    <div class="avatar">
                        <img src="${this.pfp}" alt="">
                    </div>
                    <div class="user-details">
                        <h3>${this.name}</h3>
                        <span class="username">${this.username}</span>
                    </div>
                    
                </div>
                <button class="follow-btn">Follow</button>
            </div>
        </div>

        

    `;
    }

}

customElements.define("profile-container", profileContainer)
export default profileContainer