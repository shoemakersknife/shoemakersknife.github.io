window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const heading = document.querySelector("h1");
    heading.classList.remove("hidden");
    heading.classList.add("visible");

    setTimeout(() => {
      const paragraph = document.querySelector("p");
      paragraph.classList.remove("hidden");
      paragraph.classList.add("visible");
    }, 500);
  }, 500);
});
