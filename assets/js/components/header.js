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
            position: relative;
        }

        ul li a {
            padding: 1.25rem 0.625rem;
            text-decoration: none;
            height: 4.0625rem;
            color: white;
            transition: color 0.3s ease;
            position: relative;
            display: flex;
            align-items: center;
        }

        /* Sửa phần border bottom */
        ul li:not(.dropdown) a::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0.5rem;
            /* Thay đổi từ bottom: 0 thành bottom: 0.5rem để nâng border lên */
            width: 0;
            height: 0.125rem;
            background: #3878d6;
            transition: width 0.3s ease-in-out;
        }

        /* Riêng cho dropdown thì không có border bottom */
        ul li.dropdown a::after {
            display: none;
        }

        ul li a:hover {
            color: #3878d6;
        }

        ul li:not(.dropdown) a:hover::after {
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

        /* Dropdown styles */
        .dropdown {
            position: relative;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            top: calc(100% + 0.125rem);
            /* Thêm khoảng cách bằng chiều cao border */
            left: 0;
            background-color: white;
            min-width: 250px;
            max-height: 60vh;
            overflow-y: auto;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
            padding: 1rem;
            border-radius: 0.5rem;
            scrollbar-width: thin;
            scrollbar-color: #3878d6 #f1f1f1;
        }

        .dropdown-content::-webkit-scrollbar {
            width: 6px;
        }

        .dropdown-content::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        .dropdown-content::-webkit-scrollbar-thumb {
            background-color: #3878d6;
            border-radius: 6px;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-content a {
            color: black !important;
            padding: 0.5rem 1rem;
            text-decoration: none;
            display: block;
            height: auto;
            white-space: nowrap;
            font-size: 0.85rem;
        }

        .dropdown-content a:hover {
            color: #3878d6 !important;
            background-color: #f8f9fa;
        }

        .dropdown-section {
            margin-bottom: 0.8rem;
        }

        .dropdown-section h4 {
            margin: 0 0 0.3rem 0;
            padding: 0 1rem;
            color: #333;
            font-size: 0.8rem;
            font-weight: bold;
        }

        .dropdown-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.3rem;
        }

        #navbar ul li a {
            padding-top: 0.625rem;
            padding-bottom: 0;
        }
    </style>

    <header id="navbar">
        <img style="width: 3.125rem; height: 3.125rem; margin-left: 1.25rem; margin-top: 0.625rem;"
            src="../assets/images/logo/logo.png" alt="">
        <ul style="margin-left: 0.625rem; position: relative;">
            <li><a href="../index.html">Trang chủ</a></li>
            <li><a href="">Mẫu xe</a></li>
            <li><a href="">Đặt hẹn lái xe thử</a></li>
            <li><a href="">Hệ thống phân phối</a></li>
            <li class="dropdown">
                <a href="">Tìm hiểu thêm</a>
                <div class="dropdown-content">
                    <div class="dropdown-section">
                        <h4>ƯU ĐÃI ĐẶC BIỆT CHO KHÁCH HÀNG</h4>
                        <div class="dropdown-grid">
                            <a href="">Hỗ trợ tài chính 0% lãi suất BMW 3 Series</a>
                            <a href="">Cơ hội trúng chuyển du lịch Châu Âu</a>
                            <a href="">Ưu đãi mừng xuân Át Tự</a>
                            <a href="">Ưu đãi đặc biệt cho khách hàng thân thiết</a>
                        </div>
                    </div>
                    <div class="dropdown-section">
                        <h4>DỊCH VỤ DIGITAL VÀ ỨNG DỤNG</h4>
                        <div class="dropdown-grid">
                            <a href="">BMW IDrive</a>
                            <a href="">BMW ConnectedDrive</a>
                            <a href="">Chia khoá số BMW Digital Key</a>
                            <a href="">Kết nối Apple CarPlay®</a>
                            <a href="">Kết nối Android Auto™</a>
                            <a href="">Bản đồ BMW</a>
                            <a href="">BMW Teleservices</a>
                            <a href="">Ứng dụng My BMW</a>
                            <a href="">Trợ lý ảo cá nhân BMW</a>
                        </div>
                    </div>
                    <div class="dropdown-section">
                        <h4>DỊCH VỤ VÀ SỬA CHỮA</h4>
                        <a href="">Ưu đãi 18% giá phụ tùng chính hãng</a>
                        <a href="">Khám phá Dịch vụ BMW</a>
                        <a href="">Chăm sóc chủ động Proactive Care</a>
                        <a href="">Bảo dưỡng trọn gói BSI</a>
                        <a href="">Dịch vụ sửa chữa đồng sơn BMW</a>
                        <a href="">Hỗ trợ sự cố Roadside Assistance</a>
                    </div>
                </div>
            </li>
            <li style="position: absolute; right: 6.25rem;">
                <a href="../pages/login.html">Đăng nhập</a>
            </li>
            <li style="position: absolute; right: 1.875rem;">
                <a href="">
                    <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path
                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
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