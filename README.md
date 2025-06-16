# TurboLight

Frustrated by the lack of support from existing lightbox plugins and disappointed I cannot use the original lightbox from [lokesh](https://github.com/lokesh/lightbox2) 
I created a new and shiny plugin with all the features and none of the dependencies!
It is lightweight, vanilla Javascript that works seamlessly with Turbo Streams and Rails but also as a standalone.

## Features

- 🖼️ Gallery support with navigation
- ⌨️ Keyboard navigation (arrow keys, escape)
- 📝 Caption support
- 🔢 Counter display
- ❌ Multiple closing options (close button, background click, ESC key)
- 🚀 Turbo compatibility
- 🪶 Lightweight with zero dependencies
- 📱 Responsive design

## Demo
Check out the live [demo](https://alexwebgr.github.io/turbolight/)

## Installation

### For Rails Applications

Add to your `package.json` dependencies:

```json
{
  "dependencies": {
    "turbolight": "^1.0.0"
  }
}
```

Then run:

```bash
yarn install
# or
npm install
```

### Other Installation Methods

### 1. Import the module
#### In Rails with importmap-rails

In your `config/importmap.rb`:

```ruby
pin "turbolight", to: "turbolight/dist/index.esm.js"
```

In your JavaScript file:

```javascript
import TurboLight from "turbolight";

// Or CommonJS require
const TurboLight = require('turbolight');
```

### 2. Add CSS
#### In Rails with asset pipeline

In your `app/assets/stylesheets/application.scss`:

```scss
@import "turbolight/dist/turbolight";
```

Or in your `app/assets/stylesheets/application.css`:

```css
/*
 *= require turbolight/dist/turbolight
 */
```

### 2. Add your HTML markup

```html
<!-- Single image -->
<%= link_to "path/to/image.jpg", data: { turbolight: "gallery1", title: "The caption" } do %>
    <%= faw_icon 'regular', 'expand-arrows-alt' %>
<% end %>

<!-- Multiple images in a gallery -->
<%= link_to "path/to/image.jpg", data: { turbolight: "gallery2", title: "The caption" } do %>
    <%= faw_icon 'regular', 'expand-arrows-alt' %>
<% end %>
<%= link_to "path/to/image.jpg", data: { turbolight: "gallery2", title: "The caption" } do %>
    <%= faw_icon 'regular', 'expand-arrows-alt' %>
<% end %>
```

What is [faw_icon](https://github.com/alexwebgr/faw_icon) you ask? It is a gem I have built around fontawesome icons.

### 3. Initialize TurboLight

```javascript
// Initialize with default options
const lightbox = new TurboLight();

// Or with custom options
const lightbox = new TurboLight({
  imageClass: 'custom-image-class',
  captionClass: 'custom-caption-class',
  // ... more options
});
```
##### Using with Stimulus

Create a Stimulus controller for TurboLight. If you are going to be using the controller then you don't really to import in application.js as well. 

```javascript
// app/javascript/controllers/turbo_light_controller.js
import { Controller } from "@hotwired/stimulus"
import TurboLight from "turbolight";

// Connects to data-controller="turbo-light"
export default class extends Controller {
  connect() {
    this.turboLight = new TurboLight();
  }

  disconnect() {
    if (this.turboLight && this.turboLight.isOpen) {
      this.turboLight.close();
    }
  }
}
```

Then register it in your controllers index:

```javascript
// app/javascript/controllers/index.js
import { application } from "./application"
import TurboLightController from "./turbo_light_controller"
application.register("turbo-light", TurboLightController)
```

#### Other methods

Add the CSS to your page for styling the lightbox:

```html
<link rel="stylesheet" href="node_modules/turbolight/dist/turbolight.css">
```

Or import it in your CSS/SCSS file:

```css
@import 'turbolight/dist/turbolight.css';
```

## API Documentation

### Constructor Options

```javascript
const lightbox = new TurboLight({
  // CSS class names for customization
  imageClass: 'turbo-light-image',
  captionClass: 'turbo-light-caption',
  counterClass: 'turbo-light-counter',
  closeClass: 'turbo-light-close',
  prevClass: 'turbo-light-prev',
  nextClass: 'turbo-light-next',
  activeClass: 'turbo-light-active',
  loadingClass: 'turbo-light-loading'
});
```

### Methods

#### `init()`

Initializes the lightbox by finding all links with `data-turbolight` attribute and setting up event listeners.

```javascript
lightbox.init();
```

#### `open(galleryName, index = 0)`

Opens the lightbox for a specific gallery at the specified index.

```javascript
// Open the first image in "gallery1"
lightbox.open('gallery1', 0);
```

#### `close()`

Closes the currently open lightbox.

```javascript
lightbox.close();
```

#### `next()`

Shows the next image in the current gallery.

```javascript
lightbox.next();
```

#### `previous()`

Shows the previous image in the current gallery.

```javascript
lightbox.previous();
```

#### `showImage(index)`

Shows a specific image by index in the current gallery.

```javascript
// Show the third image (index 2) in the current gallery
lightbox.showImage(2);
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
