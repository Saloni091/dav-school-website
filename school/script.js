// ==========================
// Navbar Toggle
// ==========================

function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");
}


// ==========================
// Admission Form Submission
// ==========================

async function submitAdmission() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const course = document.getElementById("course").value;
  const address = document.getElementById("address").value;

  const data = {
    name,
    email,
    phone,
    course,
    address
  };

  try {

    const response = await fetch("/api/admission/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    alert(result.message);

  } catch (error) {

    console.error("Error:", error);
    alert("Admission failed");

  }

}


// ==========================
// Login Function
// ==========================

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
          alert("Login Successful");
        } else {
          alert(result.message || "Login Failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Server not connected");
      }
    });
  }
});

// ===============================
// Admission Form Backend Connect
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("admissionForm");

  if (form) {

    form.addEventListener("submit", async function (event) {

      event.preventDefault(); // stop page reload

      const data = {
        name: document.getElementById("studentName").value,
        dob: document.getElementById("dob").value,
        parentName: document.getElementById("parentName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("contact").value,
        address: document.getElementById("address").value,
        course: document.getElementById("class").value
      };

      try {

        const response = await fetch("/api/admission/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.message);

        form.reset();

      } catch (error) {

        console.error(error);
        alert("Admission Failed");

      }

    });

  }

});
