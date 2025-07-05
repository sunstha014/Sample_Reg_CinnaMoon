document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms["register"];
  const emailField = form.querySelector(".email-field");
  const emailInput = emailField.querySelector(".email");
  const passField = form.querySelector(".create-password");
  const passInput = passField.querySelector(".password");
  const cPassField = form.querySelector(".confirm-password");
  const cPassInput = cPassField.querySelector(".cPassword");

  const toggleVisibility = (input, icon) => {
    input.type = input.type === "password" ? "text" : "password";
    icon.className = `fa-regular fa-eye${input.type === "password" ? "" : "-slash"}`;
  };

  form.querySelectorAll(".eye").forEach(eye => {
    eye.addEventListener("click", () => {
      const input = eye.parentElement.querySelector("input");
      toggleVisibility(input, eye.querySelector("i"));
    });
  });

  const checkEmail = () => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    emailField.classList.toggle("invalid", !pattern.test(emailInput.value));
  };

  const checkPassword = () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    passField.classList.toggle("invalid", !pattern.test(passInput.value));
  };

  const confirmPassword = () => {
    cPassField.classList.toggle("invalid", cPassInput.value !== passInput.value || cPassInput.value === "");
  };

  emailInput.addEventListener("keyup", checkEmail);
  passInput.addEventListener("keyup", checkPassword);
  cPassInput.addEventListener("keyup", confirmPassword);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkEmail();
    checkPassword();
    confirmPassword();

    if (![emailField, passField, cPassField].some(f => f.classList.contains("invalid"))) {
      form.submit(); // or redirect using location.href if desired
    }
  });
});
