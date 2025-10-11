window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const heading = document.querySelector("h1");
    heading.classList.remove("hidden");
    heading.classList.add("visible");

    setTimeout(() => {
      const paragraphs = document.querySelectorAll("p");
      paragraphs[0].classList.remove("hidden");
      paragraphs[0].classList.add("visible");
      paragraphs[1].classList.remove("hidden");
      paragraphs[1].classList.add("visible");
    }, 500);
  }, 500);
});
