document.addEventListener("DOMContentLoaded", function () {

// =============================
// SUPABASE CONNECTION
// =============================

const supabaseUrl = "https://dpdhqeokdjispkkidzdl.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZGhxZW9rZGppc3Bra2lkemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDI0OTYsImV4cCI6MjA4ODU3ODQ5Nn0.fLG_QfOz3OScdm_9ZW6qDVT7MnvgkJbxn4Ff0sUekA0";

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

if (profileImage && imageModal) {

  profileImage.onclick = () => {
    imageModal.style.display = "flex";
  };

}

if (closeBtn && imageModal) {

  closeBtn.onclick = () => {
    imageModal.style.display = "none";
  };

}

if (imageModal) {

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

if (toggleBtn) {

  toggleBtn.onclick = () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

      toggleBtn.innerHTML = "☀️";
      localStorage.setItem("theme", "dark");

    } else {

      toggleBtn.innerHTML = "🌙";
      localStorage.setItem("theme", "light");

    }

  };

  if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");
    toggleBtn.innerHTML = "☀️";

  } else {

    toggleBtn.innerHTML = "🌙";

  }

}


// =============================
// Language Switch
// =============================

const langBtn = document.getElementById("langToggle");

function setLanguage(lang) {

  const elements = document.querySelectorAll("[data-en]");

  elements.forEach(el => {

    const isTicker =
      el.id === "tickerMessages" ||
      el.id === "tickerMessagesClone";

    if(isTicker) return;

    if (lang === "ar") {

      el.textContent = el.getAttribute("data-ar");

    } else {

      el.textContent = el.getAttribute("data-en");

    }

  });

  if (lang === "ar") {

    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";

    document.body.classList.add("rtl-mode");

    if (langBtn)
      langBtn.classList.add("ar");

  } else {

    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";

    document.body.classList.remove("rtl-mode");

    if (langBtn)
      langBtn.classList.remove("ar");

  }

  localStorage.setItem("lang", lang);

}

if (langBtn) {

  langBtn.onclick = () => {

    const currentLang =
      localStorage.getItem("lang") || "en";

    if (currentLang === "en") {

      setLanguage("ar");

    } else {

      setLanguage("en");

    }

  };

}

const savedLang =
localStorage.getItem("lang") || "en";

setLanguage(savedLang);


// =============================
// CONTACT FORM
// =============================

const form = document.getElementById("contactForm");

if(form){

let sending = false;

form.addEventListener("submit", async (e)=>{

e.preventDefault();

if(sending) return;

sending = true;

const submitBtn =
form.querySelector("button");

submitBtn.disabled = true;

const name =
document.getElementById("name").value.trim();

const email =
document.getElementById("email").value.trim();

const message =
document.getElementById("message").value.trim();

const website =
document.getElementById("website");

if(website && website.value !== ""){

sending = false;

submitBtn.disabled = false;

return;

}

if(!name || !email || !message){

alert("Please fill all fields");

sending = false;

submitBtn.disabled = false;

return;

}

const { error } = await supabase
.from("messages")
.insert([{
name,
email,
message
}]);

if(error){

console.error(error);

alert("❌ Failed to send message");

}else{

alert("✅ Message sent successfully");

form.reset();

}

sending = false;

submitBtn.disabled = false;

});

}


// =============================
// VISITOR TRACKING
// =============================

async function trackVisitor(){

if(sessionStorage.getItem("visited")){
return;
}

sessionStorage.setItem("visited","true");

try{

const startTime = Date.now();

let ipData = {};

try{

const response =
await fetch("https://ipapi.co/json/");

ipData = await response.json();

}catch(err){

console.log("IP API Failed");

}

function getDeviceType(){

const ua = navigator.userAgent;

if(/mobile/i.test(ua)) return "Mobile";

if(/tablet/i.test(ua)) return "Tablet";

return "Desktop";

}

const visitorData = {

page: window.location.pathname,

ip: ipData.ip || "-",

country: ipData.country_name || "-",

city: ipData.city || "-",

browser: navigator.userAgent,

os: navigator.platform,

language: navigator.language,

screen_size: `${screen.width}x${screen.height}`,

device_type: getDeviceType(),

enter_time: new Date().toISOString(),

duration_seconds: 0

};

const { data, error } = await supabase
.from("visitors")
.insert([visitorData])
.select();

if(error){

console.log(error);
return;

}

const visitId = data[0].id;

window.addEventListener("beforeunload", async ()=>{

const duration =
Math.floor((Date.now() - startTime)/1000);

await supabase
.from("visitors")
.update({

duration_seconds: duration,

exit_time: new Date().toISOString()

})
.eq("id", visitId);

});

}catch(err){

console.log(err);

}

}

trackVisitor();


// =============================
// VISITOR COUNTER
// =============================

async function loadVisitorCount(){

try{

const { count, error } = await supabase
.from("visitors")
.select("*", {
count: "exact",
head: true
});

if(error){

console.log(error);
return;

}

const counter =
document.getElementById("totalVisitors");

if(counter){

counter.innerText = count;

}

}catch(err){

console.log(err);

}

}

loadVisitorCount();


// =============================
// LIVE MESSAGES TICKER
// =============================

async function loadTickerMessages(){

try{

const { data, error } = await supabase
.from("messages")
.select("name,message")
.order("id", { ascending:false })
.limit(10);

if(error){

console.log(error);
return;

}

const ticker =
document.getElementById("tickerMessages");

const tickerClone =
document.getElementById("tickerMessagesClone");

if(!ticker || !tickerClone) return;

if(data.length === 0){

ticker.innerHTML =
"<span>No messages yet</span>";

tickerClone.innerHTML =
"<span>No messages yet</span>";

return;

}

const messages = data.map(msg => `
<span>
<b>${msg.name}:</b>
${msg.message}
</span>
`).join("");

ticker.innerHTML = messages;

/* نسخة ثانية للحركة السلسة */


}catch(err){

console.log(err);

}

}

loadTickerMessages();


// =============================
// CV OPTIONS
// =============================

window.toggleCVOptions = function () {

const box =
document.getElementById("cvOptions");

box.style.display =
(box.style.display === "none")
? "block"
: "none";

};

});
