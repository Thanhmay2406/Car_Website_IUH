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
                height: 65px;
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
                height: 65px;
                align-items: center;
                margin: 0;
                padding: 0;
                width: 100%;
            }

            ul li {
                list-style-type: none;
                margin-left: 10px;
            }

            ul li a {
                padding: 20px 10px;
                text-decoration: none;
                height: 65px;
                color: white;
                transition: color 0.3s ease, border-bottom 0.3s ease;
                position: relative;
            }

            ul li a::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -2px;
                width: 0;
                height: 2px;
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
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            }

            .scrolled a {
                color: black !important;
            }

            .scrolled a:hover {
                color: #3878d6 !important;
                /* Khi hover vẫn đổi màu giống bình thường */
            }


            .scrolled a:hover::after {
                background: #3878d6 !important;
            }
        </style>

        <header id="navbar">
            <img style="width: 50px; height: 50px; margin-left: 20px; margin-top: 10px;" src="../assets/images/logo/logo.png" alt="">
            <ul style="margin-left: 10px; position: relative;">
                <li><a href="../index.html">Trang chủ</a></li>
                <li><a href="">Mẫu xe</a></li>
                <li><a href="">Đặt hẹn lái xe thử</a></li>
                <li><a href="">Hệ thống phân phối</a></li>
                <li><a href="">Tìm hiểu thêm</a></li>
                <li style="position: absolute; right: 100px;">
                    <a href="../pages/login.html">
                        Đăng nhập
                    </a>
                </li>
                <li style="position: absolute; right: 30px;">
                    <a href="">
                        <svg style="width: 20px; height: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
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

        if (window.scrollY > 300) {
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
