// =============================
// SUPABASE CONNECTION
// =============================

const supabaseUrl = "PUT-YOUR-SUPABASE-URL";
const supabaseKey = "PUT-YOUR-ANON-KEY";

const supabase = window.supabase.createClient(
supabaseUrl,
supabaseKey
);


// =============================
// Image Modal
// =============================

const profileImage = document.getElementById("profileImage");
const imageModal = document.getElementById("imageModal");
const closeBtn = document.getElementById("closeBtn");

if(profileImage){
profileImage.onclick = () => imageModal.style.display = "flex";
}

if(closeBtn){
closeBtn.onclick = () => imageModal.style.display = "none";
}

if(imageModal){
imageModal.onclick = (e) => {
if (e.target === imageModal) {
imageModal.style.display = "none";
}
};
}


// =============================
// Dark / Light Mode
// =============================

const toggleBtn = document.getElementById("themeToggle");

if(toggleBtn){

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

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark");
toggleBtn.innerHTML = "☀️";
}else{
toggleBtn.innerHTML = "🌙";
}

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
if(langBtn) langBtn.classList.add("ar");
}else{
document.documentElement.dir="ltr";
document.documentElement.lang="en";
if(langBtn) langBtn.classList.remove("ar");
}

localStorage.setItem("lang",lang);

}

if(langBtn){

langBtn.onclick=()=>{

const currentLang = localStorage.getItem("lang") || "en";

if(currentLang==="en"){
setLanguage("ar");
}else{
setLanguage("en");
}

};

}

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);


// =============================
// CONTACT FORM
// =============================

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

// Anti Spam
const website = document.getElementById("website");
if(website && website.value !== ""){
return;
}

const { error } = await supabase
.from("messages")
.insert([
{
name:name,
email:email,
message:message
}
]);

if(error){

alert("❌ Failed to send message");

}else{

alert("✅ Message sent successfully");

form.reset();

}

});

}


// =============================
// VISITOR TRACKING
// =============================

async function trackVisitor(){

await supabase
.from("visitors")
.insert([
{
page: window.location.pathname
}
]);

}

trackVisitor();
