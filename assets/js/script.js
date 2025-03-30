document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const subTabButtons = document.querySelectorAll(".sub-tab-btn");
    const carItems = document.querySelectorAll(".car-item");

    function filterCars() {
        const activeCategory = document.querySelector(".tab-btn.active").dataset.category;
        const activeType = document.querySelector(".sub-tab-btn.active").dataset.type;

        carItems.forEach(car => {
            const carCategory = car.dataset.category;
            const carType = car.dataset.type;

            if (carCategory === activeCategory && carType === activeType) {
                car.style.display = "block";
            } else {
                car.style.display = "none";
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterCars();
        });
    });

    subTabButtons.forEach(button => {
        button.addEventListener("click", function () {
            subTabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterCars();
        });
    });

    filterCars(); // Gọi lần đầu để hiển thị danh sách mặc định
});