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
        overlayClass: "turbo-light-overlay",
        containerClass: "turbo-light-container",
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
      this.createLightboxElements();
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
      this.overlay.className = this.options.overlayClass;
      this.container = document.createElement("div");
      this.container.className = this.options.containerClass;
      this.image = document.createElement("img");
      this.image.className = this.options.imageClass;
      this.caption = document.createElement("div");
      this.caption.className = this.options.captionClass;
      this.counter = document.createElement("div");
      this.counter.className = this.options.counterClass;
      this.closeButton = document.createElement("button");
      this.closeButton.className = this.options.closeClass;
      this.closeButton.innerHTML = "&times;";
      this.closeButton.setAttribute("aria-label", "Close lightbox");
      this.prevButton = document.createElement("button");
      this.prevButton.className = this.options.prevClass;
      this.prevButton.innerHTML = "&#10094;";
      this.prevButton.setAttribute("aria-label", "Previous image");
      this.nextButton = document.createElement("button");
      this.nextButton.className = this.options.nextClass;
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
      this.open(link);
    }
    /**
     * Open the lightbox with the specified link
     * @param {HTMLElement} link - The link element that was clicked
     */
    open(link) {
      if (!this.overlay) {
        this.createLightboxElements();
      }
      const galleryName = link.dataset.turbolight;
      this.currentGallery = galleryName;
      const gallery = this.galleries[galleryName];
      const index = gallery.findIndex((item) => item.element === link);
      this.overlay.classList.add(this.options.activeClass);
      this.isOpen = true;
      document.body.style.overflow = "hidden";
      this.showImage(index);
      document.addEventListener("keydown", this.handleKeyDown);
    }
    /**
     * Close the lightbox and remove elements from DOM
     */
    close() {
      if (!this.overlay)
        return;
      this.overlay.remove();
      document.removeEventListener("keydown", this.handleKeyDown);
      document.body.style.overflow = "";
      this.isOpen = false;
      this.currentGallery = null;
      this.currentIndex = 0;
      this.overlay = null;
      this.container = null;
      this.image = null;
      this.caption = null;
      this.counter = null;
      this.closeButton = null;
      this.prevButton = null;
      this.nextButton = null;
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
      this.container.classList.add(this.options.loadingClass);
      this.image.src = imageData.href;
      this.image.onload = () => {
        this.container.classList.remove(this.options.loadingClass);
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
