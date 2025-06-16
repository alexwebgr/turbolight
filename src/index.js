/**
 * TurboLight - A lightweight, vanilla JavaScript lightbox that works with Turbo Streams
 *
 * Features:
 * - Gallery support with navigation
 * - Keyboard navigation
 * - Caption support
 * - Counter display
 * - Multiple closing options
 * - Turbo compatibility
 */
class TurboLight {
  constructor(options = {}) {
    // Default options
    this.options = Object.assign({
      imageClass: 'turbo-light-image',
      captionClass: 'turbo-light-caption',
      counterClass: 'turbo-light-counter',
      closeClass: 'turbo-light-close',
      prevClass: 'turbo-light-prev',
      nextClass: 'turbo-light-next',
      activeClass: 'turbo-light-active',
      loadingClass: 'turbo-light-loading'
    }, options);

    // Initialize properties
    this.galleries = {};
    this.currentGallery = null;
    this.currentIndex = 0;
    this.isOpen = false;

    // Bind methods to maintain 'this' context
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);

    // Store bound versions for event listener management
    this.boundClose = this.close;
    this.boundPrevious = this.previous;
    this.boundNext = this.next;
    this.boundHandleBackgroundClick = this.handleBackgroundClick;

    // Initialize
    this.init();
  }

  /**
   * Initialize the lightbox
   */
  init() {
    // Find all lightbox links and group them by gallery
    this.findLinks();

    // Remove any existing lightbox elements to prevent duplicates
    this.cleanupExistingElements();

    // Create new lightbox elements
    this.createLightboxElements();
  }

  /**
   * Clean up any existing lightbox elements in the DOM
   */
  cleanupExistingElements() {
    const existingOverlay = document.querySelector('.turbo-light-overlay');
    if (existingOverlay) {
      // Remove event listeners to prevent memory leaks
      const closeButton = existingOverlay.querySelector('.turbo-light-close');
      const prevButton = existingOverlay.querySelector('.turbo-light-prev');
      const nextButton = existingOverlay.querySelector('.turbo-light-next');

      // Use bound event handlers if they exist, otherwise use direct methods
      if (closeButton) closeButton.removeEventListener('click', this.boundClose);
      if (prevButton) prevButton.removeEventListener('click', this.boundPrevious);
      if (nextButton) nextButton.removeEventListener('click', this.boundNext);
      existingOverlay.removeEventListener('click', this.boundHandleBackgroundClick);

      // Remove the element from the DOM
      existingOverlay.remove();
    }
  }

  /**
   * Find all links with data-turbolight attribute and group them by gallery
   */
  findLinks() {
    // Reset galleries
    this.galleries = {};

    // Find all links with data-turbolight attribute
    const links = document.querySelectorAll('a[data-turbolight]');

    // Group links by gallery
    links.forEach(link => {
      const galleryName = link.dataset.turbolight;
      const title = link.dataset.title || '';
      const href = link.getAttribute('href');

      if (!this.galleries[galleryName]) {
        this.galleries[galleryName] = [];
      }

      this.galleries[galleryName].push({
        href,
        title,
        element: link
      });

      // Add click event listener
      link.removeEventListener('click', this.handleClick);
      link.addEventListener('click', this.handleClick);
    });
  }

  /**
   * Create the lightbox DOM elements
   */
  createLightboxElements() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'turbo-light-overlay';

    // Create container for the image
    this.container = document.createElement('div');
    this.container.className = 'turbo-light-container';

    // Create image element
    this.image = document.createElement('img');
    this.image.className = 'turbo-light-image';

    // Create caption
    this.caption = document.createElement('div');
    this.caption.className = 'turbo-light-caption';

    // Create counter
    this.counter = document.createElement('div');
    this.counter.className = 'turbo-light-counter';

    // Create close button
    this.closeButton = document.createElement('button');
    this.closeButton.className = 'turbo-light-close';
    this.closeButton.innerHTML = '&times;';
    this.closeButton.setAttribute('aria-label', 'Close lightbox');

    // Create navigation buttons
    this.prevButton = document.createElement('button');
    this.prevButton.className = 'turbo-light-prev';
    this.prevButton.innerHTML = '&#10094;';
    this.prevButton.setAttribute('aria-label', 'Previous image');

    this.nextButton = document.createElement('button');
    this.nextButton.className = 'turbo-light-next';
    this.nextButton.innerHTML = '&#10095;';
    this.nextButton.setAttribute('aria-label', 'Next image');

    // Assemble the elements
    this.container.appendChild(this.image);
    this.container.appendChild(this.caption);
    this.overlay.appendChild(this.container);
    this.overlay.appendChild(this.counter);
    this.overlay.appendChild(this.closeButton);
    this.overlay.appendChild(this.prevButton);
    this.overlay.appendChild(this.nextButton);

    // Add event listeners with properly bound context
    this.closeButton.addEventListener('click', this.boundClose);
    this.prevButton.addEventListener('click', this.boundPrevious);
    this.nextButton.addEventListener('click', this.boundNext);
    this.overlay.addEventListener('click', this.boundHandleBackgroundClick);

    // Add to document
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

    // Find the index of the clicked link in the gallery
    const gallery = this.galleries[galleryName];
    const index = gallery.findIndex(item => item.element === link);

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

    // Set current gallery and index
    this.currentGallery = galleryName;
    this.currentIndex = index;

    // Show the lightbox
    this.overlay.classList.add('turbo-light-active');
    this.isOpen = true;

    // Add keyboard event listener
    document.addEventListener('keydown', this.handleKeyDown);

    // Show the image
    this.showImage(index);

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the lightbox
   */
  close() {
    if (!this.overlay) return;

    // Hide the lightbox
    this.overlay.classList.remove('turbo-light-active');
    this.isOpen = false;

    // Remove keyboard event listener
    document.removeEventListener('keydown', this.handleKeyDown);

    // Restore body scrolling
    document.body.style.overflow = '';

    // Reset current state
    this.currentGallery = null;
    this.currentIndex = 0;

    // Clear content to prevent memory leaks and stale content
    if (this.image) {
      this.image.src = '';
    }
    
    if (this.caption) {
      this.caption.innerHTML = '';
    }
    
    if (this.counter) {
      this.counter.innerHTML = '';
    }
  }

  /**
   * Show the next image
   */
  next() {
    if (!this.currentGallery) return;

    const gallery = this.galleries[this.currentGallery];
    let nextIndex = this.currentIndex + 1;

    // Loop back to the beginning if at the end
    if (nextIndex >= gallery.length) {
      nextIndex = 0;
    }

    this.showImage(nextIndex);
  }

  /**
   * Show the previous image
   */
  previous() {
    if (!this.currentGallery) return;

    const gallery = this.galleries[this.currentGallery];
    let prevIndex = this.currentIndex - 1;

    // Loop to the end if at the beginning
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
    if (!this.currentGallery) return;

    const gallery = this.galleries[this.currentGallery];
    if (index < 0 || index >= gallery.length) {
      console.error(`Invalid index: ${index}`);
      return;
    }

    // Update current index
    this.currentIndex = index;

    // Get the image data
    const imageData = gallery[index];

    // Show loading state
    this.container.classList.add('turbo-light-loading');

    // Update the image
    this.image.src = imageData.href;
    this.image.onload = () => {
      this.container.classList.remove('turbo-light-loading');
    };

    // Update the caption
    this.caption.innerHTML = imageData.title || '';

    // Update the counter
    this.updateCounter();
  }

  /**
   * Update the counter display
   */
  updateCounter() {
    if (!this.currentGallery) return;

    const gallery = this.galleries[this.currentGallery];
    this.counter.textContent = `${this.currentIndex + 1} / ${gallery.length}`;
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} event
   */
  handleKeyDown(event) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.previous();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }

  /**
   * Handle click on the background
   * @param {MouseEvent} event
   */
  handleBackgroundClick(event) {
    // Close only if clicking directly on the overlay, not its children
    if (event.target === this.overlay) {
      this.close();
    }
  }
}

// Export for module usage
export default TurboLight;
