// =============================
// Image Modal
// =============================

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


// =============================
// Dark / Light Mode
// =============================

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.onclick = () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        toggleBtn.innerHTML = "☀️";
        localStorage.setItem("theme", "dark");
    }else{
        toggleBtn.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
    }

};



// تحميل الثيم المحفوظ
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    toggleBtn.innerHTML = "☀️";
}else{
    toggleBtn.innerHTML = "🌙";
}



// =============================
// Language Switch (EN / AR)
// =============================

const langBtn = document.getElementById("langToggle");

function setLanguage(lang){

const elements = document.querySelectorAll("[data-en]");

elements.forEach(el=>{
if(lang === "ar"){
el.innerText = el.getAttribute("data-ar");
}else{
el.innerText = el.getAttribute("data-en");
}
});

if(lang === "ar"){
document.documentElement.dir="rtl";
document.documentElement.lang="ar";
langBtn.classList.add("ar");
}else{
document.documentElement.dir="ltr";
document.documentElement.lang="en";
langBtn.classList.remove("ar");
}

localStorage.setItem("lang",lang);
}

langBtn.onclick=()=>{

const currentLang = localStorage.getItem("lang") || "en";

if(currentLang==="en"){
setLanguage("ar");
}else{
setLanguage("en");
}

};

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);
