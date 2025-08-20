# Lenawei Safaris - World-Class Safari Website

Welcome to Lenawei Safaris! This is an ultra-detailed, visually stunning, fully responsive, and accessible single-page website for a luxury safari and travel experience.

---

## 🦒 Project Structure

```
/
├── index.html            # Main HTML file (Home section, hero image, all content)
├── images/
│   └── hero-giraffes.jpg # Hero image for home section (giraffes in savannah)
├── style.css             # Ultra-detailed, modern CSS (luxury, accessibility, animations)
├── scripts.js            # Rich interactive JS (navigation, gallery, forms, accessibility)
├── README.md             # This documentation
```

---

## ✨ Features

- **Hero/Home Section:**  
  - Displays a full-width, high-impact hero image (`images/hero-giraffes.jpg`).
  - Image showcases Lenawei’s safari experience: giraffes on the savannah and a safari vehicle.
  - Overlaid gradient and content area for branding, call-to-action, and navigation.

- **Responsive Design:**  
  - Mobile-first, works on all devices.
  - CSS grid/flexbox layouts adapt to screen size.
  - Navigation collapses for mobile.

- **Luxury Visuals:**  
  - Gold-accented colors, deep shadows, soft gradients.
  - Elegant typography using Merriweather and Montserrat.

- **Accessibility:**  
  - Full keyboard navigation and skip links.
  - High contrast, focus styles, ARIA labels.

- **Interactive JavaScript:**  
  - Smooth scroll, active section highlight.
  - Gallery lightbox, testimonials slider, FAQ accordion.
  - Cookie consent bar, dynamic footer year, social share buttons.

---

## 🚀 Getting Started

1. **Clone the repository or download the files.**
2. **Place your hero image (`hero-giraffes.jpg`) in the `/images` folder.**
3. **Open `index.html` in your browser.**  
   - You should see the giraffe image as the hero background in the Home section.
4. **Customize your hero content:**  
   - Edit the `<div class="hero-content">` for your branding, tagline, and CTA buttons.

---

## 🖼️ How the Hero Image Works

- The hero image is rendered using:
  ```html
  <img src="images/hero-giraffes.jpg" alt="Giraffes in Savannah - Lenawei Safaris" class="hero-img" />
  ```
- CSS ensures the image stretches full width and height:
  ```css
  .hero-img {
    display: block;
    width: 100vw;
    max-width: 100%;
    height: 86vh;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 1;
  }
  ```
- A `.hero-bg-overlay` gradient sits on top for text readability and luxury feel.
- Content and buttons are layered above using `.hero-content` (`z-index: 3`).

---

## 💡 Customization Tips

- Replace the hero image by updating `src="images/hero-giraffes.jpg"` to your preferred file.
- Edit `.hero-content` in HTML for your headline, CTAs, or branding.
- Tweak colors, overlays, or layout in `style.css` for your brand.
- Add more sections (gallery, about, team, testimonials, etc.) as needed.

---

## 📋 Accessibility & UX

- All interactive elements are keyboard accessible.
- Skip links and focus outlines are enabled.
- Responsive and mobile-friendly layouts.
- Cookie bar and footer year update automatically.

---

## 🛠️ Technologies Used

- **HTML5** (semantic, accessible)
- **CSS3** (modern, luxury, responsive)
- **JavaScript (ES6+)** (interactivity, accessibility)

---

## 📁 File Overview

- `index.html`  
  > Main page, with `<section id="home" class="hero">` and all other sections.

- `images/hero-giraffes.jpg`  
  > The hero image (giraffes in the savannah), visible at the home section.

- `style.css`  
  > All styles for layout, typography, hero image, overlays, grids, cards, buttons, modals, and more.

- `scripts.js`  
  > Handles navigation, gallery, lightbox, sliders, forms, accessibility, animations, and UI logic.

---

## 🦁 Credits

- Safari image:  
  - [`images/hero-giraffes.jpg`](images/hero-giraffes.jpg)  
  - Credit: Delbars / iStock (for demonstration, replace with your own licensed image if needed).

---

## 📞 Support & Questions

For help customizing or expanding your Lenawei Safaris site, feel free to contact the author or open an issue.

---

## 🔒 License

This project is for demonstration purposes.  
Use your own images and content for production deployment.

---

## 📝 Example Section (from your code)

```html
<section id="home" class="hero">
  <img src="images/hero-giraffes.jpg" alt="Giraffes in Savannah - Lenawei Safaris" class="hero-img" />
  <div class="hero-bg-overlay"></div>
  <div class="hero-content">
    <!-- your hero content here -->
  </div>
</section>
```

---

## 🌟 Enjoy a World-Class Safari Experience Online with Lenawei Safaris!
