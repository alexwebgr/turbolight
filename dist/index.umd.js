var TurboLight = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });
  var TurboLight = class {
    constructor(options = {}) {
      this.options = Object.assign({
        imageClass: "turbo-light-image",
        captionClass: "turbo-light-caption",
        counterClass: "turbo-light-counter",
        closeClass: "turbo-light-close",
        prevClass: "turbo-light-prev",
        nextClass: "turbo-light-next",
        activeClass: "turbo-light-active",
        loadingClass: "turbo-light-loading"
      }, options);
      this.galleries = {};
      this.currentGallery = null;
      this.currentIndex = 0;
      this.isOpen = false;
      this.handleClick = this.handleClick.bind(this);
      this.close = this.close.bind(this);
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
      this.boundClose = this.close;
      this.boundPrevious = this.previous;
      this.boundNext = this.next;
      this.boundHandleBackgroundClick = this.handleBackgroundClick;
      this.init();
    }
    /**
     * Initialize the lightbox
     */
    init() {
      this.findLinks();
      this.cleanupExistingElements();
      this.createLightboxElements();
    }
    /**
     * Clean up any existing lightbox elements in the DOM
     */
    cleanupExistingElements() {
      const existingOverlay = document.querySelector(".turbo-light-overlay");
      if (existingOverlay) {
        const closeButton = existingOverlay.querySelector(".turbo-light-close");
        const prevButton = existingOverlay.querySelector(".turbo-light-prev");
        const nextButton = existingOverlay.querySelector(".turbo-light-next");
        if (closeButton)
          closeButton.removeEventListener("click", this.boundClose);
        if (prevButton)
          prevButton.removeEventListener("click", this.boundPrevious);
        if (nextButton)
          nextButton.removeEventListener("click", this.boundNext);
        existingOverlay.removeEventListener("click", this.boundHandleBackgroundClick);
        existingOverlay.remove();
      }
    }
    /**
     * Find all links with data-turbolight attribute and group them by gallery
     */
    findLinks() {
      this.galleries = {};
      const links = document.querySelectorAll("a[data-turbolight]");
      links.forEach((link) => {
        const galleryName = link.dataset.turbolight;
        const title = link.dataset.title || "";
        const href = link.getAttribute("href");
        if (!this.galleries[galleryName]) {
          this.galleries[galleryName] = [];
        }
        this.galleries[galleryName].push({
          href,
          title,
          element: link
        });
        link.removeEventListener("click", this.handleClick);
        link.addEventListener("click", this.handleClick);
      });
    }
    /**
     * Create the lightbox DOM elements
     */
    createLightboxElements() {
      this.overlay = document.createElement("div");
      this.overlay.className = "turbo-light-overlay";
      this.container = document.createElement("div");
      this.container.className = "turbo-light-container";
      this.image = document.createElement("img");
      this.image.className = "turbo-light-image";
      this.caption = document.createElement("div");
      this.caption.className = "turbo-light-caption";
      this.counter = document.createElement("div");
      this.counter.className = "turbo-light-counter";
      this.closeButton = document.createElement("button");
      this.closeButton.className = "turbo-light-close";
      this.closeButton.innerHTML = "&times;";
      this.closeButton.setAttribute("aria-label", "Close lightbox");
      this.prevButton = document.createElement("button");
      this.prevButton.className = "turbo-light-prev";
      this.prevButton.innerHTML = "&#10094;";
      this.prevButton.setAttribute("aria-label", "Previous image");
      this.nextButton = document.createElement("button");
      this.nextButton.className = "turbo-light-next";
      this.nextButton.innerHTML = "&#10095;";
      this.nextButton.setAttribute("aria-label", "Next image");
      this.container.appendChild(this.image);
      this.container.appendChild(this.caption);
      this.overlay.appendChild(this.container);
      this.overlay.appendChild(this.counter);
      this.overlay.appendChild(this.closeButton);
      this.overlay.appendChild(this.prevButton);
      this.overlay.appendChild(this.nextButton);
      this.closeButton.addEventListener("click", this.boundClose);
      this.prevButton.addEventListener("click", this.boundPrevious);
      this.nextButton.addEventListener("click", this.boundNext);
      this.overlay.addEventListener("click", this.boundHandleBackgroundClick);
      document.body.appendChild(this.overlay);
    }
    /**
     * Handle click on lightbox link
     * @param {Event} event - Click event
     */
    handleClick(event) {
      event.preventDefault();
      const link = event.currentTarget;
      const galleryName = link.dataset.turbolight;
      const gallery = this.galleries[galleryName];
      const index = gallery.findIndex((item) => item.element === link);
      this.open(galleryName, index);
    }
    /**
     * Open the lightbox
     * @param {string} galleryName - Gallery name
     * @param {number} index - Index of the image to show
     */
    open(galleryName, index = 0) {
      if (!this.galleries[galleryName]) {
        console.error(`Gallery "${galleryName}" not found`);
        return;
      }
      this.currentGallery = galleryName;
      this.currentIndex = index;
      this.overlay.classList.add("turbo-light-active");
      this.isOpen = true;
      document.addEventListener("keydown", this.handleKeyDown);
      this.showImage(index);
      document.body.style.overflow = "hidden";
    }
    /**
     * Close the lightbox
     */
    close() {
      if (!this.overlay)
        return;
      this.overlay.classList.remove("turbo-light-active");
      this.isOpen = false;
      document.removeEventListener("keydown", this.handleKeyDown);
      document.body.style.overflow = "";
      this.currentGallery = null;
      this.currentIndex = 0;
      if (this.image) {
        this.image.src = "";
      }
      if (this.caption) {
        this.caption.innerHTML = "";
      }
      if (this.counter) {
        this.counter.innerHTML = "";
      }
    }
    /**
     * Show the next image
     */
    next() {
      if (!this.currentGallery)
        return;
      const gallery = this.galleries[this.currentGallery];
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= gallery.length) {
        nextIndex = 0;
      }
      this.showImage(nextIndex);
    }
    /**
     * Show the previous image
     */
    previous() {
      if (!this.currentGallery)
        return;
      const gallery = this.galleries[this.currentGallery];
      let prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = gallery.length - 1;
      }
      this.showImage(prevIndex);
    }
    /**
     * Show an image by index
     * @param {number} index - Index of the image to show
     */
    showImage(index) {
      if (!this.currentGallery)
        return;
      const gallery = this.galleries[this.currentGallery];
      if (index < 0 || index >= gallery.length) {
        console.error(`Invalid index: ${index}`);
        return;
      }
      this.currentIndex = index;
      const imageData = gallery[index];
      this.container.classList.add("turbo-light-loading");
      this.image.src = imageData.href;
      this.image.onload = () => {
        this.container.classList.remove("turbo-light-loading");
      };
      this.caption.innerHTML = imageData.title || "";
      this.updateCounter();
    }
    /**
     * Update the counter display
     */
    updateCounter() {
      if (!this.currentGallery)
        return;
      const gallery = this.galleries[this.currentGallery];
      this.counter.textContent = `${this.currentIndex + 1} / ${gallery.length}`;
    }
    /**
     * Handle keyboard events
     * @param {KeyboardEvent} event
     */
    handleKeyDown(event) {
      if (!this.isOpen)
        return;
      switch (event.key) {
        case "Escape":
          this.close();
          break;
        case "ArrowLeft":
          this.previous();
          break;
        case "ArrowRight":
          this.next();
          break;
      }
    }
    /**
     * Handle click on the background
     * @param {MouseEvent} event
     */
    handleBackgroundClick(event) {
      if (event.target === this.overlay) {
        this.close();
      }
    }
  };
  var src_default = TurboLight;
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=index.umd.js.map
