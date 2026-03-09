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

    if (lang === "ar") {
      el.innerText = el.getAttribute("data-ar");
    } else {
      el.innerText = el.getAttribute("data-en");
    }

  });

  if (lang === "ar") {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
    if (langBtn) langBtn.classList.add("ar");
  } else {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
    if (langBtn) langBtn.classList.remove("ar");
  }

  localStorage.setItem("lang", lang);

}

if (langBtn) {

  langBtn.onclick = () => {

    const currentLang = localStorage.getItem("lang") || "en";

    if (currentLang === "en") {
      setLanguage("ar");
    } else {
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

if (form) {

form.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();

const website = document.getElementById("website");
if (website && website.value !== "") return;

if (!name || !email || !message) {
  alert("Please fill all fields");
  return;
}

const { error } = await supabase
.from("messages")
.insert([{ name, email, message }]);

if (error) {
  console.error(error);
  alert("❌ Failed to send message");
  return;
}

alert("✅ Message sent successfully");
form.reset();

});

}


// =============================
// VISITOR TRACKING
// =============================

async function trackVisitor() {

  try {

    await supabase
      .from("visitors")
      .insert([
        {
          page: window.location.pathname
        }
      ]);

  } catch (error) {
    console.log("Visitor tracking error", error);
  }

}

trackVisitor();

});
