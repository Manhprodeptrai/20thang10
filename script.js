document.addEventListener("DOMContentLoaded", function () {
  const card = document.getElementById("card");
  const closeBtn = document.getElementById("closeBtn");
  const flowerContainer = document.querySelector(".falling-flowers");
  const bgMusic = document.getElementById("bgMusic");
  const numberOfFlowers = 30; // Số lượng hoa rơi

  // Sự kiện click để mở thiệp
  card.addEventListener("click", function () {
    card.classList.toggle("open");
    if (card.classList.contains("open")) {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
  });

  // Sự kiện click nút đóng
  closeBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Ngăn sự kiện lan truyền
    card.classList.remove("open");
    bgMusic.pause();
  });

  // Sự kiện click nút restart hoa
  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    // Xóa tất cả hoa hiện tại
    const flowers = document.querySelectorAll(".flower");
    flowers.forEach(flower => flower.remove());
    // Tạo lại hoa
    for (let i = 0; i < numberOfFlowers; i++) {
      createFlower();
    }
  });

  // Hàm tạo hoa rơi
  function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    // Vị trí và kích thước ngẫu nhiên
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.width = Math.random() * 10 + 20 + "px";
    flower.style.height = flower.style.width;

    // Tốc độ rơi và độ trễ ngẫu nhiên
    const fallDuration = Math.random() * 5 + 8; // từ 8 đến 13 giây
    const fallDelay = Math.random() * 5; // trễ tối đa 5 giây
    flower.style.animationDuration = fallDuration + "s";
    flower.style.animationDelay = fallDelay + "s";

    // Thay đổi màu sắc hoa ngẫu nhiên
    const colors = ["#ff8da1", "#ffc0cb", "#f8bbd0", "#fce4ec"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${randomColor}"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>`;
    flower.style.backgroundImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(
      svgIcon
    )}')`;

    flowerContainer.appendChild(flower);

    // Xóa bông hoa khỏi DOM sau khi rơi xong để tối ưu hiệu năng
    setTimeout(() => {
      flower.remove();
    }, (fallDuration + fallDelay) * 1000);
  }

  // Tạo nhiều bông hoa cùng lúc
  for (let i = 0; i < numberOfFlowers; i++) {
    createFlower();
  }

  // Liên tục tạo hoa mới
  setInterval(createFlower, 800);
});
