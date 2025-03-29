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

            @keyframes borderExpand {
                0% {
                    width: 0;
                }

                100% {
                    width: 100%;
                }
            }

            header {
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

            header:hover ul li a {
                color: black;
            }

            ul {
                display: flex;
                font-family: "Lexend_Deca", sans-serif;
                height: 65px;
                align-items: center;
                margin: 0;
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
            }

            ul li a:hover {
                border-bottom: 2px solid white;
            }

            .scrolled {
                background-color: white !important;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            }

            .scrolled ul li a {
                color: black !important;
            }
        </style>
        <header>
            <ul>
                <li><a href="">Trang chủ</a></li>
                <li><a href="">Mẫu xe</a></li>
                <li><a href="">Đặt hẹn lái xe thử</a></li>
                <li><a href="">Hệ thống phân phối</a></li>
                <li><a href="">Tìm hiểu thêm</a></li>
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
