document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const subTabButtons = document.querySelectorAll(".sub-tab-btn");
    const carItems = document.querySelectorAll(".car-item");

    function filterSubTabs(selectedCategory) {
        subTabButtons.forEach(btn => {
            if (btn.dataset.type === "M") {
                btn.classList.add("un-active");
            }
            else if (btn.dataset.type === "i") {
                btn.classList.add("un-active");
            }
            else {
                btn.classList.remove("un-active")
            }
        });
        if (selectedCategory === "BMWM") {
            subTabButtons.forEach(btn => {
                if (btn.dataset.type === "M") {
                    btn.classList.remove("un-active");
                    btn.classList.add("sub-active")
                }
                else {
                    btn.classList.add("un-active")
                }
            });
        }
        else if (selectedCategory === "BMWi") {
            subTabButtons.forEach(btn => {
                if (btn.dataset.type === "i") {
                    btn.classList.remove("un-active");
                    btn.classList.add("sub-active")
                }
                else {
                    btn.classList.add("un-active")
                }
            });
        }
    }
    function filterCars() {
        const activeCategory = document.querySelector(".tab-btn.active").dataset.category;
        const activeType = document.querySelector(".sub-tab-btn.sub-active").dataset.type;
        const subTabButtonM = document.querySelectorAll(".tab-btn[M]");
        if (activeCategory === "BMWM") {
            carItems.forEach(car => {
                if (car.dataset.type === "M") {
                    car.style.display = "block";
                } else {
                    car.style.display = "none";
                    car.style.marginLeft = "0";
                }
            });
        }
        else if (activeCategory === "BMWi") {
            carItems.forEach(car => {
                if (car.dataset.type === "i") {
                    car.style.marginLeft = "2.5rem";
                    car.style.display = "block";
                } else {

                    car.style.display = "none";
                }
            });
        }
        else {
            carItems.forEach(car => {
                const carCategory = car.dataset.category;
                const carType = car.dataset.type;

                if (carCategory === activeCategory && carType === activeType) {
                    car.style.marginLeft = "2.5rem";
                    car.style.display = "block";
                } else {
                    car.style.display = "none";
                }
            });
        }

    }

    tabButtons.forEach(a => {
        a.addEventListener("click", function () {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterSubTabs(this.dataset.category)
            filterCars();
        });
    });
    subTabButtons.forEach(a => {
        a.addEventListener("click", function () {
            subTabButtons.forEach(btn => btn.classList.remove("sub-active"));
            this.classList.add("sub-active");
            filterCars();
        });
    });

    filterCars(); // Gọi lần đầu để hiển thị danh sách mặc định
});