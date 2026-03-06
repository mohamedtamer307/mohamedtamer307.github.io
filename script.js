// Image Modal
const profileImage = document.getElementById("profileImage");
const imageModal = document.getElementById("imageModal");
const closeBtn = document.getElementById("closeBtn");

profileImage.onclick = () => imageModal.style.display = "flex";
closeBtn.onclick = () => imageModal.style.display = "none";
imageModal.onclick = (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = "none";
    }
};

// Dark / Light Mode
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        toggleBtn.innerHTML = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
    }
};

window.onload = () => {
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");
        toggleBtn.innerHTML = "☀️";
    }
};