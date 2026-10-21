// Photo carousel: native scroll-snap does the work, buttons just scroll one slide.
document.querySelectorAll("[data-slider]").forEach((root) => {
  const track = root.querySelector(".slides");
  const step = (dir) => track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" });
  root.querySelector("[data-prev]").addEventListener("click", () => step(-1));
  root.querySelector("[data-next]").addEventListener("click", () => step(1));
});
