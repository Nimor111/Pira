function collapseList(id) {
  const collapsible = document.querySelector(`.collapsible-${id}`);
  collapsible.addEventListener("click", () => {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
