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
 * Gallery image data interface
 */
export interface GalleryImageData {
  /**
   * URL of the image
   */
  href: string;
  
  /**
   * Optional caption for the image
   */
  title?: string;
  
  /**
   * Reference to the DOM element that triggered the lightbox
   */
  element: HTMLAnchorElement;
}

/**
 * TurboLight class - A lightweight, vanilla JavaScript lightbox that works with Turbo Streams
 */
export default class TurboLight {
  /**
   * Create a new TurboLight instance
   * @param options - Configuration options
   */
  constructor(options?: TurboLightOptions);
  
  /**
   * Options for this TurboLight instance
   */
  options: TurboLightOptions;
  
  /**
   * Object containing all galleries indexed by gallery name
   */
  galleries: Record<string, GalleryImageData[]>;
  
  /**
   * Name of the currently active gallery
   */
  currentGallery: string | null;
  
  /**
   * Index of the currently displayed image in the gallery
   */
  currentIndex: number;
  
  /**
   * Whether the lightbox is currently open
   */
  isOpen: boolean;
  
  /**
   * DOM element for the lightbox overlay
   */
  overlay: HTMLDivElement;
  
  /**
   * DOM element for the lightbox container
   */
  container: HTMLDivElement;
  
  /**
   * DOM element for the lightbox image
   */
  image: HTMLImageElement;
  
  /**
   * DOM element for the caption
   */
  caption: HTMLDivElement;
  
  /**
   * DOM element for the counter
   */
  counter: HTMLDivElement;
  
  /**
   * DOM element for the close button
   */
  closeButton: HTMLButtonElement;
  
  /**
   * DOM element for the previous button
   */
  prevButton: HTMLButtonElement;
  
  /**
   * DOM element for the next button
   */
  nextButton: HTMLButtonElement;
  
  /**
   * Initialize the lightbox
   */
  init(): void;
  
  /**
   * Clean up any existing lightbox elements
   */
  cleanupExistingElements(): void;
  
  /**
   * Find all links with data-turbolight attribute
   */
  findLinks(): void;
  
  /**
   * Create the lightbox DOM elements
   */
  createLightboxElements(): void;
  
  /**
   * Handle click events on gallery links
   * @param event - Click event
   */
  handleClick(event: MouseEvent): void;
  
  /**
   * Open the lightbox with the specified gallery and index
   * @param galleryName - Name of the gallery to open
   * @param index - Index of the image to show (defaults to 0)
   */
  open(galleryName: string, index?: number): void;
  
  /**
   * Close the lightbox
   */
  close(): void;
  
  /**
   * Show the next image in the gallery
   */
  next(): void;
  
  /**
   * Show the previous image in the gallery
   */
  previous(): void;
  
  /**
   * Show the image at the specified index
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
