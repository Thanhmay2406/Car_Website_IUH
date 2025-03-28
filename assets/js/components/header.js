class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>

            @font-face {
                font-family: "Lexend_Deca";
                src: url(assets/fonts/Lexend_Deca/LexendDeca-VariableFont_wght.ttf);
                font-weight: normal;
                font-size: nomal;
            }

            ul {
                display: flex;
                font-family: "lexend_Deca", sans-serif;
                background-color: black;
                height: 65px;
                align-items: center;
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
                /* font-size: 24px; */
            }

            ul li a:hover {
                border-bottom: 2px solid white;
            }
        </style>
        <header>
            <ul>
                <li>
                    <a href="">Trang chủ</a>
                </li>
                <li>
                    <a href="">Mẫu xe</a>
                </li>
                <li>
                    <a href="">Đặt hẹn lái xe thử</a>
                </li>
                <li>
                    <a href="">Hệ thống phân phối</a>
                </li>
                <li>
                    <a href="">Tìm hiểu thêm</a>
                </li>
            </ul>
        </header>
        `;
    }
}
customElements.define("header-component", HeaderComponent);