class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isLoggedIn = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.checkLoginState();
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
             * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: "Lexend_Deca", sans-serif;
            }
            #navbar {
                display: flex;
            }

            header {
                z-index: 1000;
                padding: 0;
                margin: 0;
                position: relative;
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
                color:black;
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
                margin: 5% auto;
                padding: 2rem;
                border-radius: 8px;
                width: 400px;
                max-width: 90%;
                max-height: 80vh;
                overflow-y: auto;
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
                display: none;
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
                display: block;
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
            
            /* Tab styles */
            .tab-container {
                display: flex;
                border-bottom: 1px solid #ddd;
                margin-bottom: 1.5rem;
            }
            
            .tab {
                padding: 0.75rem 1.5rem;
                cursor: pointer;
                font-weight: 500;
                color: #777;
                border-bottom: 2px solid transparent;
                transition: all 0.3s;
            }
            
            .tab.active {
                color: #3878d6;
                border-bottom: 2px solid #3878d6;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
            }
            
            .switch-text {
                text-align: center;
                margin-top: 1rem;
                font-size: 0.875rem;
                color: #666;
            }
            
            .switch-text a {
                color: #3878d6;
                text-decoration: none;
                cursor: pointer;
                font-weight: 500;
            }
            
            .switch-text a:hover {
                text-decoration: underline;
            }
        </style>
        <header id="navbar">
            <img style="width: 3.125rem; height: 3.125rem; margin-left: 1.25rem; margin-top: 0.625rem;"
                src="../../assets/images/logo/logo.png" alt="">
            <ul style="margin-left: 0.625rem; position: relative;">
                <li><a href="../../index.html">Trang chủ</a></li>
                <li><a href="../pages/models.html" id="br">Mẫu xe</a></li>
                <li><a href="/pages/test-drive.html">Đặt hẹn lái xe thử</a></li>
                <li><a href="/pages/find-us.html">Hệ thống phân phối</a></li>
                <li class="dropdown">
                    <a href="">Tìm hiểu thêm</a>
                    <div class="dropdown-content">

                        <div class="dropdown-section">
                            <h4>BẢO HÀNH VÀ BẢO DƯỠNG</h4>
                            <div class="dropdown-grid">
                                <a href="">Chính sách bảo hành BMW</a>
                            </div>
                        </div>

                        <div class="dropdown-section">
                            <h4>XE ĐIỆN</h4>
                            <div class="dropdown-grid">
                                <a href="">Charning</a>
                                <a href="">Plug-in Hybrid</a>
                            </div>
                        </div>

                        <div class="dropdown-section">
                            <h4>CÔNG NGHỆ VÀ ĐỔI MỚI</h4>
                            <div class="dropdown-grid">
                                <a href="/pages/technology-innovation/bmw-vision-m-next.html">BMW Vision M NEXT</a>
                                <a href="">BMW i Vision DEE</a>
                            </div>
                        </div>

                        <div class="dropdown-section">
                            <h4>CHƯƠNG TRÌNH BÁN HÀNG DOANH NGHIỆP</h4>
                            <div class="dropdown-grid">
                                <a href="/pages/corporate-sales-overview.html">Chương trình bán hàng doanh nghiệp 2024</a>
                            </div>
                        </div>

                        <div class="dropdown-section">
                            <h4>THƯƠNG HIỆU BMW</h4>
                            <div class="dropdown-grid">
                                <a href="">Tìm hiểu BMW Asia</a>
                                <a href="">BMW PressClub Asia</a>
                            </div>
                        </div>

                        <div class="dropdown-section">
                            <h4>ƯU ĐÃI ĐẶC BIỆT CHO KHÁCH HÀNG</h4>
                            <div class="dropdown-grid">
                                <a href="">Ưu đãi đặc biệt cho khách hàng thân thiết</a>
                            </div>
                        </div>


                        <div class="dropdown-section">
                            <h4>DỊCH VỤ VÀ SỬA CHỮA</h4>
                            <a href="">Ưu đãi 18% giá phụ tùng chính hãng</a>
                            <a href="">Khám phá Dịch vụ BMW</a>
                            <a href="">Chăm sóc chủ động Proactive Care</a>
                            <a href="/pages/bmw-service-inclusive.html">Bảo dưỡng trọn gói BSI</a>
                            <a href="/pages/bmw-repair-and-care-overview.html">Dịch vụ sửa chữa đồng sơn BMW</a>
                            <a href="/pages/bmw-roadside-assistance.html">Hỗ trợ sự cố Roadside Assistance</a>
                        </div>
                        
                    </div>
                </li>
                <li style="position: absolute; right: 6.25rem;" class="account-wrapper">
                    <a href="#" id="loginLink">Đăng nhập</a>
                </li>
                <li style="position: absolute; right: 1.875rem;">
                    <a
                        href="https://www.google.com/maps/search/bmw/@9.7803663,105.1242079,9z/data=!3m1!4b1?hl=vi-VN&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">
                        <svg style="width: 1.25rem; height: 1.25rem; fill: currentColor;" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512">
                            <path
                                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                        </svg>
                    </a>
                </li>
            </ul>
        </header>
        
        <!-- Auth Modal -->
        <div id="authModal" class="modal">
            <div class="modal-content">
                <span class="close">×</span>
                
                <div class="tab-container">
                    <div class="tab active" id="loginTab">Đăng nhập</div>
                    <div class="tab" id="registerTab">Đăng ký</div>
                </div>
                
                <!-- Login Form -->
                <div class="tab-content active" id="loginForm">
                    <div class="modal-header">
                        <h2>Đăng nhập tài khoản</h2>
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
                    <div class="switch-text">
                        Bạn chưa có tài khoản? <a id="switchToRegister">Đăng ký ngay</a>
                    </div>
                </div>
                
                <!-- Register Form -->
                <div class="tab-content" id="registerForm">
                    <div class="modal-header">
                        <h2>Tạo tài khoản mới</h2>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="regName">Họ và tên</label>
                            <input type="text" id="regName" placeholder="Nhập họ và tên">
                            <div class="error-message" id="nameError">Vui lòng nhập họ và tên</div>
                        </div>
                        <div class="form-group">
                            <label for="regEmail">Email</label>
                            <input type="email" id="regEmail" placeholder="Nhập email">
                            <div class="error-message" id="emailError">Vui lòng nhập email hợp lệ</div>
                        </div>
                        <div class="form-group">
                            <label for="regPhone">Số điện thoại</label>
                            <input type="tel" id="regPhone" placeholder="Nhập số điện thoại">
                            <div class="error-message" id="phoneError">Vui lòng nhập số điện thoại</div>
                        </div>
                        <div class="form-group">
                            <label for="regPassword">Mật khẩu</label>
                            <input type="password" id="regPassword" placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)">
                            <div class="error-message" id="regPasswordError">Mật khẩu phải có ít nhất 6 ký tự</div>
                        </div>
                        <div class="form-group">
                            <label for="regConfirmPassword">Nhập lại mật khẩu</label>
                            <input type="password" id="regConfirmPassword" placeholder="Nhập lại mật khẩu">
                            <div class="error-message" id="confirmPasswordError">Mật khẩu không khớp</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="closeRegisterModal">Đóng</button>
                        <button class="btn btn-primary" id="registerBtn">Đăng ký</button>
                    </div>
                    <div class="switch-text">
                        Bạn đã có tài khoản? <a id="switchToLogin">Đăng nhập ngay</a>
                    </div>
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
        const modal = this.shadowRoot.getElementById('authModal');
        const closeBtn = this.shadowRoot.querySelector('.close');
        const closeModalBtn = this.shadowRoot.getElementById('closeModal');
        const closeRegisterModalBtn = this.shadowRoot.getElementById('closeRegisterModal');
        const loginBtn = this.shadowRoot.getElementById('loginBtn');
        const registerBtn = this.shadowRoot.getElementById('registerBtn');
        const forgotPassword = this.shadowRoot.getElementById('forgotPassword');
        const logoutLink = this.shadowRoot.getElementById('logoutLink');
        const switchToRegister = this.shadowRoot.getElementById('switchToRegister');
        const switchToLogin = this.shadowRoot.getElementById('switchToLogin');
        const loginTab = this.shadowRoot.getElementById('loginTab');
        const registerTab = this.shadowRoot.getElementById('registerTab');
        const loginForm = this.shadowRoot.getElementById('loginForm');
        const registerForm = this.shadowRoot.getElementById('registerForm');

        // Mở modal khi click đăng nhập
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            this.showLoginForm();
        });

        // Đóng modal
        const closeModal = () => {
            modal.style.display = 'none';
            this.resetForms();
        };

        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        closeRegisterModalBtn.addEventListener('click', closeModal);

        // Đóng modal khi click bên ngoài
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Chuyển đổi giữa form đăng nhập và đăng ký
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegisterForm();
        });

        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        loginTab.addEventListener('click', () => {
            this.showLoginForm();
        });

        registerTab.addEventListener('click', () => {
            this.showRegisterForm();
        });

        // Xử lý đăng nhập
        loginBtn.addEventListener('click', () => {
            this.validateLoginForm();
        });

        // Xử lý đăng ký
        registerBtn.addEventListener('click', () => {
            this.validateRegisterForm();
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
        this.shadowRoot.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });

        this.shadowRoot.getElementById('regConfirmPassword').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                registerBtn.click();
            }
        });
    }

    showLoginForm() {
        this.shadowRoot.getElementById('loginForm').classList.add('active');
        this.shadowRoot.getElementById('loginTab').classList.add('active');
        this.shadowRoot.getElementById('registerForm').classList.remove('active');
        this.shadowRoot.getElementById('registerTab').classList.remove('active');
    }

    showRegisterForm() {
        this.shadowRoot.getElementById('registerForm').classList.add('active');
        this.shadowRoot.getElementById('registerTab').classList.add('active');
        this.shadowRoot.getElementById('loginForm').classList.remove('active');
        this.shadowRoot.getElementById('loginTab').classList.remove('active');
    }

    resetForms() {
        // Reset login form
        this.shadowRoot.getElementById('username').value = '';
        this.shadowRoot.getElementById('password').value = '';
        this.shadowRoot.getElementById('usernameError').style.display = 'none';
        this.shadowRoot.getElementById('passwordError').style.display = 'none';
        
        // Reset register form
        this.shadowRoot.getElementById('regName').value = '';
        this.shadowRoot.getElementById('regEmail').value = '';
        this.shadowRoot.getElementById('regPhone').value = '';
        this.shadowRoot.getElementById('regPassword').value = '';
        this.shadowRoot.getElementById('regConfirmPassword').value = '';
        this.shadowRoot.getElementById('nameError').style.display = 'none';
        this.shadowRoot.getElementById('emailError').style.display = 'none';
        this.shadowRoot.getElementById('phoneError').style.display = 'none';
        this.shadowRoot.getElementById('regPasswordError').style.display = 'none';
        this.shadowRoot.getElementById('confirmPasswordError').style.display = 'none';
    }

    validateLoginForm() {
        let isValid = true;
        const username = this.shadowRoot.getElementById('username').value.trim();
        const password = this.shadowRoot.getElementById('password').value.trim();

        // Validate
        if (!username) {
            this.shadowRoot.getElementById('usernameError').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.getElementById('usernameError').style.display = 'none';
        }

        if (!password) {
            this.shadowRoot.getElementById('passwordError').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.getElementById('passwordError').style.display = 'none';
        }

        if (isValid) {
            // Thực hiện xử lý đăng nhập thực tế ở đây
            console.log('Đăng nhập với:', { username, password });
        }

        return isValid;
    }

    validateRegisterForm() {
        let isValid = true;
        const name = this.shadowRoot.getElementById('regName').value.trim();
        const email = this.shadowRoot.getElementById('regEmail').value.trim();
        const phone = this.shadowRoot.getElementById('regPhone').value.trim();
        const password = this.shadowRoot.getElementById('regPassword').value.trim();
        const confirmPassword = this.shadowRoot.getElementById('regConfirmPassword').value.trim();

        // Validate name
        if (!name) {
            this.shadowRoot.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.getElementById('nameError').style.display = 'none';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            this.shadowRoot.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.getElementById('emailError').style.display = 'none';
        }

        // Validate phone
        const phoneRegex = /^\d{10,15}$/;
        if (!phone || !phoneRegex.test(phone)) {
            this.shadowRoot.getElementById('phoneError').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.getElementById('phoneError').style.display = 'none';
        }

        // Validate password
        if (!password || password.length < 6) {
            this.shadowRoot.getElementById('regPasswordError').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.getElementById('regPasswordError').style.display = 'none';
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            this.shadowRoot.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.getElementById('confirmPasswordError').style.display = 'none';
        }

        if (isValid) {
            // Thực hiện xử lý đăng ký thực tế ở đây
            console.log('Đăng ký với:', { name, email, phone, password });
        }

        return isValid;
    }

    checkLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            this.updateLoginState(true);
        }
    }

    handleLoginSuccess(username) {
        this.isLoggedIn = true;
        const loginLink = this.shadowRoot.getElementById('loginLink');
        loginLink.textContent = username.split(' ')[0] || 'Tài khoản';

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
        const accountDropdown = this.shadowRoot.getElementById('accountDropdown');

        if (isLoggedIn) {
            const username = localStorage.getItem('username') || 'Tài khoản';
            loginLink.textContent = username.split(' ')[0] || username;
            accountDropdown.style.display = 'none';
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