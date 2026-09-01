document.addEventListener("DOMContentLoaded", () => {
  const themeRadios = document.querySelectorAll('input[name="themeMode"]');
  const currentTheme = localStorage.getItem("theme") || "light";

  themeRadios.forEach((radio) => {
    radio.checked = radio.value === currentTheme;
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      localStorage.setItem("theme", radio.value);
      if (radio.value === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    });
  });
});
