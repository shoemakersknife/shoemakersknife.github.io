window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const heading = document.querySelector("h1");
    heading.classList.remove("hidden");
    heading.classList.add("visible");

    setTimeout(() => {
      const paragraphs = document.querySelectorAll("p");
      paragraphs.forEach(p => {
        p.classList.remove("hidden");
        p.classList.add("visible");
      });
    }, 500);
  }, 500);
});
