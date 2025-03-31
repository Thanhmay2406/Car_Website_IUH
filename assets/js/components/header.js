class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            @font-face {
                font-family: "Lexend_Deca";
                src: url(../../fonts/Lexend_Deca/LexendDeca-VariableFont_wght.ttf);
                font-weight: normal;
            }

            #navbar {
                display: flex;
            }

            header {
                z-index: 1000;
                padding: 0;
                margin: 0;
                position: fixed;
                width: 100%;
                top: 0;
                left: 0;
                height: 4.0625rem;
                background-color: rgba(0, 0, 0, 0);
                transition: background 0.3s ease, box-shadow 0.3s ease;
            }

            header:hover {
                background-color: white;
                color: black;
            }

            header:hover a {
                color: black;
            }

            ul {
                display: flex;
                font-family: "Lexend_Deca", sans-serif;
                height: 4.0625rem;
                align-items: center;
                margin: 0;
                padding: 0;
                width: 100%;
            }

            ul li {
                list-style-type: none;
                margin-left: 0.625rem;
            }

            ul li a {
                padding: 1.25rem 0.625rem;
                text-decoration: none;
                height: 4.0625rem;
                color: white;
                transition: color 0.3s ease, border-bottom 0.3s ease;
                position: relative;
            }

            ul li a::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -0.125rem;
                width: 0;
                height: 0.125rem;
                background: #3878d6;
                transition: width 0.3s ease-in-out;
            }

            ul li a:hover {
                color: #3878d6;
            }

            ul li a:hover::after {
                width: 100%;
            }

            .scrolled {
                background-color: white !important;
                box-shadow: 0px 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
            }

            .scrolled a {
                color: black !important;
            }

            .scrolled a:hover {
                color: #3878d6 !important;
            }

            .scrolled a:hover::after {
                background: #3878d6 !important;
            }
        </style>

        <header id="navbar">
            <img style="width: 3.125rem; height: 3.125rem; margin-left: 1.25rem; margin-top: 0.625rem;" src="../assets/images/logo/logo.png" alt="">
            <ul style="margin-left: 0.625rem; position: relative;">
                <li><a href="../index.html">Trang chủ</a></li>
                <li><a href="">Mẫu xe</a></li>
                <li><a href="">Đặt hẹn lái xe thử</a></li>
                <li><a href="">Hệ thống phân phối</a></li>
                <li><a href="">Tìm hiểu thêm</a></li>
                <li style="position: absolute; right: 6.25rem;">
                    <a href="../pages/login.html">Đăng nhập</a>
                </li>
                <li style="position: absolute; right: 1.875rem;">
                    <a href="">
                        <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                    </a>
                </li>
            </ul>
        </header>
        `;

        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const header = this.shadowRoot.querySelector("header");

        if (window.scrollY > 18.75 * 16) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    disconnectedCallback() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}

customElements.define("header-component", HeaderComponent);