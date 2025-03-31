class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isLoggedIn = false; // Trạng thái đăng nhập
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            /* Các style hiện tại của header */
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

            ul li:not(.dropdown) a::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0.5rem;
                width: 0;
                height: 0.125rem;
                background: #3878d6;
                transition: width 0.3s ease-in-out;
            }

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

            .dropdown {
                position: relative;
            }

            .dropdown-content {
                display: none;
                position: absolute;
                top: calc(100% + 0.125rem);
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

            /* Style cho modal */
            .modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background-color: white;
                margin: 10% auto;
                padding: 2rem;
                border-radius: 8px;
                width: 400px;
                max-width: 90%;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                animation: modalopen 0.3s;
                position: relative;
            }
            
            @keyframes modalopen {
                from {opacity: 0; transform: translateY(-50px);}
                to {opacity: 1; transform: translateY(0);}
            }
            
            .close {
                color: #aaa;
                position: absolute;
                right: 1.5rem;
                top: 1.5rem;
                font-size: 1.5rem;
                font-weight: bold;
                cursor: pointer;
                transition: color 0.2s;
            }
            
            .close:hover {
                color: #333;
            }
            
            .modal-header {
                margin-bottom: 1.5rem;
                text-align: center;
            }
            
            .modal-header h2 {
                margin: 0;
                color: #3878d6;
                font-size: 1.5rem;
            }
            
            .modal-body {
                margin-bottom: 1.5rem;
            }
            
            .form-group {
                margin-bottom: 1.25rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: #555;
            }
            
            .form-group input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 1rem;
                transition: border-color 0.3s;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: #3878d6;
                box-shadow: 0 0 0 2px rgba(56, 120, 214, 0.2);
            }
            
            .modal-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 1rem;
            }
            
            .btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1rem;
                transition: all 0.3s;
            }
            
            .btn-primary {
                background-color: #3878d6;
                color: white;
            }
            
            .btn-primary:hover {
                background-color: #2c62b5;
            }
            
            .btn-secondary {
                background-color: #f1f1f1;
                color: #333;
            }
            
            .btn-secondary:hover {
                background-color: #e0e0e0;
            }
            
            .forgot-password {
                text-align: right;
                margin-top: 0.5rem;
            }
            
            .forgot-password a {
                color: #3878d6;
                text-decoration: none;
                font-size: 0.875rem;
            }
            
            .forgot-password a:hover {
                text-decoration: underline;
            }
            
            .error-message {
                color: #e74c3c;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: none;
            }
            
            .account-dropdown {
                display: none; /* Ẩn ban đầu */
                position: absolute;
                right: 0;
                top: 100%;
                background-color: white;
                min-width: 200px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                z-index: 100;
                padding: 0.5rem 0;
            }
            
            .account-wrapper:hover .account-dropdown {
                display: block; /* Hiển thị khi hover */
            }
            
            .account-dropdown a {
                color: #333 !important;
                padding: 0.75rem 1rem;
                display: block;
                text-decoration: none;
                transition: background-color 0.2s;
            }
            
            .account-dropdown a:hover {
                background-color: #f5f5f5;
                color: #3878d6 !important;
            }
            
            .account-wrapper {
                position: relative;
            }
        </style>

        <header id="navbar">
            <img style="width: 3.125rem; height: 3.125rem; margin-left: 1.25rem; margin-top: 0.625rem;"
                src="../assets/images/logo/logo.png" alt="">
            <ul style="margin-left: 0.625rem; position: relative;">
                <li><a href="../index.html">Trang chủ</a></li>
                <li><a href="">Mẫu xe</a></li>
                <li><a href="/pages/test-drive.html">Đặt hẹn lái xe thử</a></li>
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
                <li style="position: absolute; right: 6.25rem;" class="account-wrapper">
                    <a href="#" id="loginLink">Đăng nhập</a>
                    <div class="account-dropdown" id="accountDropdown">
                        <a href="#" id="profileLink">Hồ sơ của tôi</a>
                        <a href="#" id="ordersLink">Đơn hàng</a>
                        <a href="#" id="testDrivesLink">Lái thử đã đặt</a>
                        <a href="#" id="logoutLink">Đăng xuất</a>
                    </div>
                </li>
                <li style="position: absolute; right: 1.875rem;">
                    <a href="https://www.google.com/maps/search/bmw/@9.7803663,105.1242079,9z/data=!3m1!4b1?hl=vi-VN&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">
                        <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512">
                            <path
                                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                        </svg>
                    </a>
                </li>
            </ul>
        </header>
        
        <!-- Login Modal -->
        <div id="loginModal" class="modal">
            <div class="modal-content">
                <span class="close">×</span>
                <div class="modal-header">
                    <h2>Đăng nhập</h2>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="username">Email hoặc số điện thoại</label>
                        <input type="text" id="username" placeholder="Nhập email hoặc số điện thoại">
                        <div class="error-message" id="usernameError">Vui lòng nhập email hoặc số điện thoại</div>
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <input type="password" id="password" placeholder="Nhập mật khẩu">
                        <div class="error-message" id="passwordError">Vui lòng nhập mật khẩu</div>
                    </div>
                    <div class="forgot-password">
                        <a href="#" id="forgotPassword">Quên mật khẩu?</a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="closeModal">Đóng</button>
                    <button class="btn btn-primary" id="loginBtn">Đăng nhập</button>
                </div>
            </div>
        </div>
        `;
    }

    setupEventListeners() {
        // Xử lý scroll
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener("scroll", this.handleScroll);

        // Lấy các phần tử DOM cần thiết
        const loginLink = this.shadowRoot.getElementById('loginLink');
        const modal = this.shadowRoot.getElementById('loginModal');
        const closeBtn = this.shadowRoot.querySelector('.close');
        const closeModalBtn = this.shadowRoot.getElementById('closeModal');
        const loginBtn = this.shadowRoot.getElementById('loginBtn');
        const forgotPassword = this.shadowRoot.getElementById('forgotPassword');
        const usernameInput = this.shadowRoot.getElementById('username');
        const passwordInput = this.shadowRoot.getElementById('password');
        const usernameError = this.shadowRoot.getElementById('usernameError');
        const passwordError = this.shadowRoot.getElementById('passwordError');
        const logoutLink = this.shadowRoot.getElementById('logoutLink');

        // Mở modal khi click đăng nhập
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });

        // Đóng modal
        const closeModal = () => {
            modal.style.display = 'none';
            // Reset form
            usernameInput.value = '';
            passwordInput.value = '';
            usernameError.style.display = 'none';
            passwordError.style.display = 'none';
        };

        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);

        // Đóng modal khi click bên ngoài
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Xử lý đăng nhập
        loginBtn.addEventListener('click', () => {
            let isValid = true;
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Validate
            if (!username) {
                usernameError.style.display = 'block';
                isValid = false;
            } else {
                usernameError.style.display = 'none';
            }

            if (!password) {
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }

            if (isValid) {
                // Giả lập đăng nhập thành công
                this.handleLoginSuccess(username);
                closeModal();
            }
        });

        // Xử lý quên mật khẩu
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Chức năng quên mật khẩu sẽ được gửi đến email của bạn!');
        });

        // Xử lý đăng xuất
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });

        // Cho phép submit form bằng phím Enter
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });
    }

    handleLoginSuccess(username) {
        this.isLoggedIn = true;
        const loginLink = this.shadowRoot.getElementById('loginLink');
        loginLink.textContent = username; // Hoặc có thể hiển thị "Tài khoản"

        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // Cập nhật giao diện
        this.updateLoginState(true);
    }

    handleLogout() {
        this.isLoggedIn = false;
        const loginLink = this.shadowRoot.getElementById('loginLink');
        loginLink.textContent = 'Đăng nhập';

        // Xóa trạng thái đăng nhập từ localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');

        // Cập nhật giao diện
        this.updateLoginState(false);
    }

    updateLoginState(isLoggedIn) {
        const loginLink = this.shadowRoot.getElementById('loginLink');

        if (isLoggedIn) {
            const username = localStorage.getItem('username') || 'Tài khoản';
            loginLink.textContent = username;
        } else {
            loginLink.textContent = 'Đăng nhập';
        }
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