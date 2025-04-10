document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const subTabButtons = document.querySelectorAll(".sub-tab-btn");
    const carItems = document.querySelectorAll(".car-item");

    function filterSubTabs(selectedCategory) {
        subTabButtons.forEach(btn => {
            if (selectedCategory === "BMWM" && btn.dataset.type === "M") {
                btn.classList.remove("un-active");
                btn.classList.add("sub-active");
            } else if (selectedCategory === "BMWi" && btn.dataset.type === "i") {
                btn.classList.remove("un-active");
                btn.classList.add("sub-active");
            } else if (selectedCategory === "BMW") {
                btn.classList.remove("un-active");
                btn.classList.remove("sub-active");
            } else {
                btn.classList.add("un-active");
                btn.classList.remove("sub-active");
            }
        });
    }

    function filterCars() {
        const activeCategory = document.querySelector(".tab-btn.active").dataset.category;
        const activeType = document.querySelector(".sub-tab-btn.sub-active")?.dataset.type;

        carItems.forEach(car => {
            const carCategory = car.dataset.category;
            const carType = car.dataset.type;

            if (activeCategory === "BMWM" && carType === "M") {
                car.style.display = "block";
                car.style.marginLeft = "0";
            } else if (activeCategory === "BMWi" && carType === "i") {
                car.style.display = "block";
                car.style.marginLeft = "2.5rem";
            } else if (activeCategory === carCategory && (!activeType || carType === activeType)) {
                car.style.display = "block";
                car.style.marginLeft = "2.5rem";
            } else {
                car.style.display = "none";
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterSubTabs(this.dataset.category);
            filterCars();
        });
    });

    subTabButtons.forEach(button => {
        button.addEventListener("click", function () {
            subTabButtons.forEach(btn => btn.classList.remove("sub-active"));
            this.classList.add("sub-active");
            filterCars();
        });
    });

    filterCars(); // Gọi lần đầu để hiển thị danh sách mặc định
});