/*
  Lenawei Safaris - Ultra-Detailed, Extended JavaScript
  Author: Lenawei Safaris
  Description: Rich, accessible, and interactive JS for a world-class safari website. 
  Includes navigation, accessibility, gallery, animation, advanced UI/UX, and more.
*/

/* ========== NAVIGATION, SMOOTH SCROLL & ACTIVE SECTION ========== */
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileNav();
      }
    });
  });

  // ScrollSpy: highlight nav links
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener('scroll', function() {
    let scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.nav-link[href="#'+sec.id+'"]').forEach(link => link.classList.add('active'));
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  function closeMobileNav() {
    document.querySelector('.nav-links')?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
  if(navToggle) {
    navToggle.addEventListener('click', function() {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('open');
      this.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }
  document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    if(navLinks && navLinks.classList.contains('open')) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) closeMobileNav();
    }
  });

  // Keyboard navigation for nav links
  document.querySelectorAll('.nav-links a').forEach(link=>{
    link.addEventListener('keydown', function(e) {
      if(e.key === " " || e.key === "Enter") this.click();
    });
  });

  /* ========== SCROLL TO TOP BUTTON ========== */
  const scrollBtn = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', function() {
    if(window.scrollY > 400) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
  });
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  /* ========== HERO SECTION: ANIMATION & VIDEO ========== */
  // Animate hero text on load
  const heroText = document.querySelector('.hero-text h1');
  if(heroText) {
    heroText.style.opacity = 0;
    setTimeout(()=>{ heroText.style.opacity = 1; heroText.style.transition="opacity 1.8s"; }, 350);
  }
  // Optional: play/pause hero video on scroll into view
  const heroVideo = document.querySelector('.hero-video iframe');
  if(heroVideo && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        heroVideo.contentWindow.postMessage(
          JSON.stringify({
            event: e.isIntersecting ? "play" : "pause",
            func: e.isIntersecting ? "playVideo" : "pauseVideo"
          }), '*'
        );
      });
    }, { threshold: 0.37 });
    obs.observe(heroVideo);
  }

  /* ========== GALLERY LIGHTBOX ========== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-modal');
  const modalImg = modal?.querySelector('.modal-img');
  const modalCap = modal?.querySelector('.modal-caption');
  let currentImgIdx = 0;
  let galleryArray = Array.from(galleryItems);

  function openModal(idx) {
    if (!modal) return;
    currentImgIdx = idx;
    const item = galleryArray[idx];
    modalImg.src = item.querySelector('img').src;
    modalCap.textContent = item.querySelector('span').textContent;
    modal.classList.add('open');
    modalImg.focus();
  }
  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openModal(idx));
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(idx);
    });
  });
  if(modal) {
    modal.querySelector('.modal-close').onclick = () => modal.classList.remove('open');
    modal.querySelector('.modal-prev').onclick = function() {
      openModal((currentImgIdx-1+galleryArray.length)%galleryArray.length);
    };
    modal.querySelector('.modal-next').onclick = function() {
      openModal((currentImgIdx+1)%galleryArray.length);
    };
    modal.addEventListener('click', function(e) {
      if(e.target === modal) modal.classList.remove('open');
    });
    document.addEventListener('keydown', function(e) {
      if(!modal.classList.contains('open')) return;
      if(e.key === 'ArrowLeft') modal.querySelector('.modal-prev').click();
      if(e.key === 'ArrowRight') modal.querySelector('.modal-next').click();
      if(e.key === 'Escape') modal.classList.remove('open');
    });
  }

  /* ========== GALLERY: LAZY LOAD IMAGES & ANIMATION ========== */
  if('IntersectionObserver' in window) {
    document.querySelectorAll('.gallery-item img').forEach(img=>{
      img.setAttribute('loading','lazy');
      const io = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },{threshold:0.1});
      io.observe(img);
    });
  }

  /* ========== TESTIMONIALS SLIDER (AUTO & BUTTONS) ========== */
  const testimonialSlider = document.querySelector('.testimonials-slider');
  const testimonialBlocks = testimonialSlider ? testimonialSlider.querySelectorAll('.testimonial') : [];
  let testimonialIndex = 0;
  function showTestimonial(idx) {
    if (!testimonialSlider) return;
    testimonialBlocks.forEach((t,i) => t.style.display = (i === idx ? 'block':'none'));
  }
  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonialBlocks.length;
    showTestimonial(testimonialIndex);
  }
  function prevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + testimonialBlocks.length) % testimonialBlocks.length;
    showTestimonial(testimonialIndex);
  }
  if(testimonialSlider && testimonialBlocks.length) {
    showTestimonial(0);
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    if(prevBtn) prevBtn.onclick = prevTestimonial;
    if(nextBtn) nextBtn.onclick = nextTestimonial;
    setInterval(nextTestimonial, 7000);
  }

  /* ========== FAQ ACCORDION, MULTI-OPEN ========== */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const faqItem = btn.closest('.faq-item');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if(!expanded) {
        faqItem.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        faqItem.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ========== NEWSLETTER SIGNUP DEMO ========== */
  const newsletterForm = document.getElementById('newsletter-form');
  if(newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value.trim();
      const msg = document.getElementById('newsletter-msg');
      if(!email.match(/^[\w\.\-]+@[\w\-]+\.[\w\-\.]+$/)) {
        msg.textContent = "Please enter a valid email.";
        msg.style.color = "#b00";
        return;
      }
      msg.textContent = "Thank you for subscribing! Check your inbox for a welcome message.";
      msg.style.color = "#35502a";
      newsletterForm.reset();
      setTimeout(()=>msg.textContent="", 7000);
    });
  }

  /* ========== CONTACT FORM VALIDATION & UX ========== */
  const contactForm = document.getElementById('contact-form');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      let valid = true;
      ['name','email','message'].forEach(id=>{
        const input = document.getElementById(id);
        if(input && !input.value.trim()) {
          input.style.borderColor = "#b00";
          valid = false;
        } else if(input) {
          input.style.borderColor = "#e6b800";
        }
      });
      if(!valid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  }

  /* ========== TRIP PLANNER (Example Steps, Expandable) ========== */
  // Demo only: add advanced planner logic as needed
  const plannerForm = document.getElementById('trip-planner-form');
  if(plannerForm) {
    plannerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Could process planner step-by-step, add more fields, etc
      alert("Thank you! Our travel experts will send you a custom safari proposal soon.");
      plannerForm.reset();
    });
  }

  /* ========== PARTNERS LOGO CAROUSEL (Continuous Scroll) ========== */
  const partners = document.querySelector('.partners-logos');
  if(partners && partners.children.length > 5) {
    let scrollPos = 0;
    setInterval(()=>{
      scrollPos += 1;
      if(scrollPos > partners.scrollWidth-partners.clientWidth)
        scrollPos = 0;
      partners.scrollTo({left: scrollPos, behavior:'smooth'});
    }, 150);
  }

  /* ========== ACCESSIBILITY: TRAP FOCUS IN MODALS ========== */
  function trapFocus(modal) {
    const focusableEls = modal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusableEls[0], last = focusableEls[focusableEls.length-1];
    modal.addEventListener('keydown', function(e) {
      if(e.key === 'Tab') {
        if(e.shiftKey) {
          if(document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if(document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    });
  }
  if(modal) trapFocus(modal);

  // Keyboard skip links for accessibility
  const skipLinks = document.createElement('nav');
  skipLinks.innerHTML = `
    <a href="#home" class="skip-link">Skip to main content</a>
    <a href="#contact" class="skip-link">Skip to contact</a>
  `;
  skipLinks.className = "skip-links";
  document.body.insertBefore(skipLinks, document.body.firstChild);

  /* ========== ANIMATION ON SCROLL (Fade In) ========== */
  function animateOnScroll(className, animation) {
    if(!('IntersectionObserver' in window)) return;
    document.querySelectorAll(className).forEach(el=>{
      el.style.opacity = 0;
      const io = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting) {
            el.classList.add(animation);
            el.style.opacity = 1;
            io.unobserve(el);
          }
        });
      },{threshold:0.15});
      io.observe(el);
    });
  }
  animateOnScroll('.why-card','fade-in');
  animateOnScroll('.destination-card','fade-in');
  animateOnScroll('.tour-card','fade-in');
  animateOnScroll('.blog-card','fade-in');
  animateOnScroll('.team-member','fade-in');
  animateOnScroll('.resource-card','fade-in');
  animateOnScroll('.impact-card','fade-in');
  animateOnScroll('.offer-card','fade-in');

  /* ========== "AS SEEN IN" MEDIA SLIDER (Optional) ========== */
  // You can add a media-logos section and auto-scroll it here

  /* ========== COOKIE CONSENT DEMO ========== */
  if(!localStorage.getItem('cookieConsent')) {
    const cookieBar = document.createElement('div');
    cookieBar.innerHTML = `
      <div style="background:#323525;color:#fff;padding:1em;position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;justify-content:center;align-items:center;gap:1.3em;box-shadow:0 -1px 6px #2228;">
        <span>We use cookies to enhance your experience. By continuing, you agree to our <a href="#privacy" style="color:#ffe082;text-decoration:underline;">Privacy Policy</a>.</span>
        <button id="cookie-accept" style="background:#e6b800;color:#fff;border:none;padding:.5em 1.3em;border-radius:22px;font-weight:600;cursor:pointer;">Accept</button>
      </div>`;
    document.body.appendChild(cookieBar);
    document.getElementById('cookie-accept').onclick = () => {
      cookieBar.remove();
      localStorage.setItem('cookieConsent','accepted');
    };
  }

  /* ========== PAGE LOAD ANIMATION ========== */
  const mainContent = document.querySelector('main, body');
  if(mainContent) {
    mainContent.style.opacity = 0;
    setTimeout(()=>{ mainContent.style.transition="opacity 1.2s"; mainContent.style.opacity = 1; }, 150);
  }

  /* ========== DYNAMIC YEAR IN FOOTER ========== */
  const yearSpan = document.createElement('span');
  yearSpan.textContent = new Date().getFullYear();
  const footer = document.querySelector('footer p');
  if(footer && !footer.textContent.includes(new Date().getFullYear()))
    footer.innerHTML = footer.innerHTML.replace(/202\d{1}/g, yearSpan.textContent);

  /* ========== AUTO-COLLAPSE NAV ON RESIZE ========== */
  window.addEventListener('resize', function() {
    if(window.innerWidth > 950) closeMobileNav();
  });

  /* ========== EXTRA: SOCIAL SHARE BUTTONS ========== */
  // Add share buttons logic if present (for blog, tours, etc)
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if(navigator.share) { // Web Share API
        navigator.share({
          title: document.title,
          url: window.location.href
        });
      } else {
        prompt("Copy this link:", window.location.href);
      }
    });
  });

  /* ========== DUMMY: GOOGLE MAPS INIT (for advanced users) ========== */
  // If you embed a real Google Map, add JS API code here

  /* ========== DUMMY: BOOKING BUTTONS ALERT ========== */
  document.querySelectorAll('a.btn[href="#booking"]').forEach(btn=>{
    btn.addEventListener('click',function(e){
      e.preventDefault();
      alert("Online booking coming soon! Please use the contact form or email us directly.");
    });
  });

  /* ========== RESOURCE ACCORDION (if present) ========== */
  document.querySelectorAll('.resource-card h3').forEach(h=>{
    h.tabIndex = 0;
    h.addEventListener('click',function(){
      this.parentElement.classList.toggle('open');
    });
    h.addEventListener('keydown',function(e){
      if(e.key===' '||e.key==='Enter') this.click();
    });
  });
});

/* ========== GLOBAL UTILITY: FADE-IN ANIMATION ========== */
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn { from { opacity: 0; transform:translateY(40px); } to { opacity: 1; transform:translateY(0); } }
.fade-in { animation: fadeIn 1.1s cubic-bezier(.31,.66,.42,1.01) both; }
`;
document.head.appendChild(style);

/* ========== END OF LENAWEI SAFARIS JS ========== */