class Modal {
  constructor(id, openBtn, closeBtn) {
    this.modal = document.getElementById(id);
    this.openBtn = document.getElementById(openBtn);
    this.closeBtn = document.getElementById(closeBtn);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);

    this.closeBtn.addEventListener("click", this.closeModal);
  }

  addEventListeners(listeners) {
    listeners.forEach(listener => {
      this.openBtn.addEventListener("click", listener);
    });
    window.addEventListener("click", this.clickOutside);
  }

  openModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  clickOutside(event) {
    if (event.target === this.modal) {
      this.modal.style.display = "none";
    }
  }
}
