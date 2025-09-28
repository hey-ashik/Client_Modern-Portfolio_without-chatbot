# Sagor Sarker - Modern Portfolio with AI Chatbot

[![GitHub](https://img.shields.io/github/license/hey-ashik/Client_Modern-Portfolio_with_AI-chatbot?color=orange)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-Modern-blue)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-purple)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PHP](https://img.shields.io/badge/PHP-Visitor%20Counter-white)](https://www.php.net/)

## 🚀 Overview

Welcome to **Sagor Sarker's Portfolio**! This is a sleek, modern personal portfolio website showcasing Sagor's professional journey, skills, social connections, photo gallery, and creative works. Built with cutting-edge web technologies, it features immersive animations, a responsive design, and an integrated AI chatbot for interactive user engagement.

The site highlights Sagor's role at Daffodil International University's BLC office, his passions like biking and photography, and provides easy ways to connect via social media or contact form. A visitor counter tracks site popularity, and the AI assistant (powered by Hugging Face) offers personalized support.

This project extends the base "Client_Modern-Portfolio_without-chatbot" by adding a sophisticated AI chatbot with Moodle-inspired theming for enhanced user experience.

## ✨ Features

- **Animated Header**: Aurora-inspired background with moving stars and mouse trail effects for an engaging first impression.
- **Responsive Navigation**: Desktop slide-tab menu with indicator; mobile hamburger menu with smooth animations.
- **About Section**: Personal bio, skills/tags, and profile image with glassmorphism cards.
- **Social Links**: Interactive cards for Facebook, WhatsApp, Instagram, TikTok, and Email.
- **Inspirational Quotes**: Velocity-scrolling text sections with dynamic skew effects based on scroll speed.
- **Photo Gallery**: Grid layout with hover overlays, lightbox zoom, and lazy loading.
- **Creative Showcase**: Parallax scrolling with sticky background and floating images for visual storytelling.
- **Contact Form**: Validation, async submission (ready for Formspree/EmailJS integration), and success notifications.
- **Visitor Counter**: PHP-based backend to track and display unique visits.
- **AI Chatbot**: Floating toggle button opens a responsive iframe chat interface (Hugging Face Spaces). Features loading states, error handling, keyboard shortcuts (Alt+A), and full mobile optimization with visual viewport support.
- **Performance Optimizations**: Intersection Observer for animations, requestAnimationFrame for smooth effects, and debounced resizes.
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support, and high-contrast modes.

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3 (Glassmorphism, CSS Animations, Grid/Flexbox), Vanilla JavaScript (ES6+)
- **Backend**: PHP for visitor counter
- **Animations**: Custom JS for parallax, velocity text, mouse trails, flip titles
- **Fonts/Icons**: Font Awesome 6, Google Fonts (Arial fallback)
- **Images**: Local assets in `/asset/` (about, gallery, showcase); Picsum for placeholders
- **Deployment**: Static hosting (Netlify/Vercel) + PHP server (for counter)
- **Tools**: Responsive design (media queries), Lazy loading, Smooth scrolling

## 📱 Screenshots

### Desktop View
- Hero: Aurora animation with "Hello, Everyone I AM Sagor Sarker" title.
- Navigation: Pill-shaped links with sliding indicator.
- Gallery: 2x3 grid of photos with overlays (e.g., "DIU Campus", "Bike Squad").

### Mobile View
- Hamburger menu expands full-screen.
- Chatbot toggle at bottom-right; window adapts to screen size/keyboard.


(For live demo: Clone and open `index.html` in browser; serve via PHP for full functionality.)

## 🚀 Quick Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hey-ashik/Client_Modern-Portfolio_with_AI-chatbot.git
   cd Client_Modern-Portfolio_with_AI-chatbot
   ```

2. **Local Development** (for static assets):
   - Open `index.html` in a browser for basic preview.
   - Visitor counter requires PHP: Use XAMPP/MAMP or `php -S localhost:8000`.

3. **Full Setup with PHP**:
   - Ensure PHP is installed (`php --version`).
   - Run: `php -S localhost:8000`
   - Visit `http://localhost:8000` – counter will increment on each load.

4. **Contact Form Integration**:
   - Sign up at [Formspree](https://formspree.io/) for free.
   - Replace `action="https://formspree.io/f/YOUR_FORM_ID"` in `index.html`.
   - Set recipient to `sagor@example.com` (or update email).

5. **AI Chatbot**:
   - Already integrated; no setup needed (uses external HF Space).
   - Customize iframe src in `script.js` if desired.

6. **Assets**:
   - Images in `/asset/gallery/` and `/asset/about/` are local.
   - External references (e.g., `https://sagor.ashikone.com/asset/...`) can be replaced with local paths.

## 🔧 Customization

- **Colors/Theme**: Edit CSS variables in `styles.css` (e.g., `--aurora-color-1`).
- **Animations**: Toggle via `prefers-reduced-motion` or modify JS durations.
- **Chatbot**: Update iframe src in `script.js`; adjust CSS variables for Moodle theming.
- **Gallery**: Add images to `/asset/gallery/` and update `index.html`.

## 📂 Project Structure

```
Client_Modern-Portfolio_with_AI-chatbot/
├── index.html          # Main HTML structure
├── styles.css          # Styles, animations, chatbot UI
├── script.js           # JS logic, interactions, chatbot integration
├── counter.php         # PHP visitor counter
├── visit_count.txt     # Counter data (auto-created)
└── asset/              # Images
    ├── about/
    │   └── about.jpg
    └── gallery/
        ├── 1.jpg ... 6.jpg
```

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add amazing feature'`).
4. Push (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Feedback welcome! Report issues via GitHub.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

- **Sagor Sarker** - Portfolio Owner
- **Ashikul Islam** - Developer ([GitHub](https://github.com/hey-ashik))

---

⭐ Star this repo if you find it useful! Connect with Sagor via the site's social links.

*Built with ❤️ for modern web experiences.*
