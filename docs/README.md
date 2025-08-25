# Documentation and Demo Site

This directory contains the documentation and demo website for Smart Environment Detector.

## 🌐 Live Demo

Visit the live documentation and demo at: **[Your GitHub Pages URL]**

## 📁 Structure

```
docs/
├── index.html          # Main documentation page
├── css/
│   ├── main.css       # Main styles
│   └── demo.css       # Demo-specific styles
├── js/
│   └── main.js        # Interactive functionality
├── assets/
│   └── favicon.ico    # Site favicon
└── README.md          # This file
```

## 🚀 Features

### Documentation
- **Installation Guide** - Multiple package managers supported
- **Quick Start** - Get up and running in minutes
- **API Reference** - Complete API documentation with examples
- **Code Examples** - Real-world usage patterns

### Interactive Demo
- **Live Environment Detection** - See your current environment
- **Capability Testing** - Test 15+ web capabilities
- **Experimental Features** - Toggle cutting-edge API detection
- **Real-time Results** - Interactive result display with collapsible sections

### User Experience
- **Responsive Design** - Works on all devices
- **Dark Mode Support** - Automatic dark/light theme
- **Accessibility First** - Screen reader friendly, keyboard navigation
- **Fast Loading** - Optimized assets, minimal dependencies

## 🛠️ Local Development

To run the documentation site locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/smart-env-detector.git
   cd smart-env-detector
   ```

2. **Serve the docs directory:**
   ```bash
   # Using Python
   cd docs
   python -m http.server 8000
   
   # Using Node.js (with serve package)
   npx serve docs
   
   # Using PHP
   cd docs
   php -S localhost:8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder
   - Click "Save"

2. **Your site will be available at:**
   ```
   https://yourusername.github.io/smart-env-detector/
   ```

### Netlify

1. **Connect repository to Netlify**
2. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `docs`
3. **Deploy**

### Vercel

1. **Connect repository to Vercel**
2. **Build settings:**
   - Framework: Other
   - Root directory: `docs`
   - Build command: (leave empty)
   - Output directory: (leave empty)
3. **Deploy**

### Custom Server

Upload the contents of the `docs` folder to your web server.

## 📝 Customization

### Updating Content

1. **Edit HTML content** in `index.html`
2. **Modify styles** in `css/main.css` or `css/demo.css`
3. **Update functionality** in `js/main.js`

### Branding

Update the following:
- Replace `yourusername` with your actual GitHub username
- Update social links in the footer
- Add your own favicon to `assets/favicon.ico`
- Customize colors in CSS variables (`:root` section)

### Adding Examples

Add new code examples in the Examples section:

```html
<div class="example-section">
    <h4>Your Example Title</h4>
    <p>Description of the example</p>
    <div class="code-block">
        <pre><code class="language-javascript">
// Your code example here
        </code></pre>
    </div>
</div>
```

## 🎨 Styling

The site uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #64748b;
    --background: #ffffff;
    --text-primary: #1e293b;
    /* ... more variables */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🔧 Dependencies

### External Libraries
- **Prism.js** - Syntax highlighting
- **Font Awesome** - Icons
- **Google Fonts** - Inter and Fira Code fonts
- **Smart Environment Detector** - The main library (loaded via CDN)

### No Build Process Required
The site is built with vanilla HTML, CSS, and JavaScript - no build process needed!

## 🐛 Troubleshooting

### Demo Not Working

1. **Check console for errors**
2. **Ensure library is loaded:**
   ```javascript
   console.log(typeof SmartEnvironmentDetector);
   // Should not be 'undefined'
   ```
3. **Verify CDN links** in index.html

### Styling Issues

1. **Check CSS file paths** in index.html
2. **Verify CSS custom properties** are supported
3. **Test in different browsers**

### Mobile Issues

1. **Test responsive design** at different viewport sizes
2. **Check touch interactions** work properly
3. **Verify text is readable** at small sizes

## 📄 License

This documentation site is part of the Smart Environment Detector project and is licensed under the MIT License.
