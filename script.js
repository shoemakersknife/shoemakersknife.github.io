window.addEventListener("DOMContentLoaded", () => {
  console.log("page loaded1");
  setTimeout(() => {
    const heading = document.querySelector("h1");
    heading.style.display = "block";
  }, 1000); // 1000 milliseconds = 1 second
});
