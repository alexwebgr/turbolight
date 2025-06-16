/**
 * TurboLight options interface
 */
export interface TurboLightOptions {
  /**
   * CSS class for the lightbox image
   * @default 'turbo-light-image'
   */
  imageClass?: string;
  
  /**
   * CSS class for the caption element
   * @default 'turbo-light-caption'
   */
  captionClass?: string;
  
  /**
   * CSS class for the counter element
   * @default 'turbo-light-counter'
   */
  counterClass?: string;
  
  /**
   * CSS class for the close button
   * @default 'turbo-light-close'
   */
  closeClass?: string;
  
  /**
   * CSS class for the previous button
   * @default 'turbo-light-prev'
   */
  prevClass?: string;
  
  /**
   * CSS class for the next button
   * @default 'turbo-light-next'
   */
  nextClass?: string;
  
  /**
   * CSS class applied when the lightbox is active
   * @default 'turbo-light-active'
   */
  activeClass?: string;
  
  /**
   * CSS class applied during image loading
   * @default 'turbo-light-loading'
   */
  loadingClass?: string;
}

/**
 * TurboLight - A lightweight, vanilla JavaScript lightbox that works with Turbo Streams
 */
export default class TurboLight {
  /**
   * Create a new TurboLight instance
   * @param options - Configuration options
   */
  constructor(options?: TurboLightOptions);
  
  /**
   * Initialize the lightbox
   */
  init(): void;
  
  /**
   * Clean up any existing lightbox elements in the DOM
   */
  cleanupExistingElements(): void;
  
  /**
   * Find all links with data-turbolight attribute and group them by gallery
   */
  findLinks(): void;
  
  /**
   * Create the lightbox DOM elements
   */
  createLightboxElements(): void;
  
  /**
   * Handle click on lightbox link
   * @param event - Click event
   */
  handleClick(event: MouseEvent): void;
  
  /**
   * Open the lightbox
   * @param galleryName - Gallery name
   * @param index - Index of the image to show
   */
  open(galleryName: string, index?: number): void;
  
  /**
   * Close the lightbox
   */
  close(): void;
  
  /**
   * Show the next image
   */
  next(): void;
  
  /**
   * Show the previous image
   */
  previous(): void;
  
  /**
   * Show an image by index
   * @param index - Index of the image to show
   */
  showImage(index: number): void;
  
  /**
   * Update the counter display
   */
  updateCounter(): void;
  
  /**
   * Handle keyboard events
   * @param event - Keyboard event
   */
  handleKeyDown(event: KeyboardEvent): void;
  
  /**
   * Handle click on the background
   * @param event - Mouse event
   */
  handleBackgroundClick(event: MouseEvent): void;
}
