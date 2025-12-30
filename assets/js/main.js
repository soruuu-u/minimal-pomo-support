
document.addEventListener('DOMContentLoaded', () => {
    initFooter(); // Inject footer first
    initScrollReveal();
    initBackToTop();
    initEmailProtection();
});

/**
 * Footer Loader
 * Commonizes footer across all pages
 */
function initFooter() {
    const footerContainer = document.getElementById('site-footer');
    if (!footerContainer) return;

    const basePath = footerContainer.getAttribute('data-base-path') || '';

    // Define the footer HTML structure
    const footerHTML = `
    <div class="footer-content">
      <div class="footer-brand">
        <div class="brand-header">
          <span class="brand-name">Minimal Pomo</span>
        </div>
        <p class="footer-desc">
          タスクとポモドーロを最短で回す。<br>
          シンプルさを追求した集中ツール。
        </p>
        <p class="copyright">
          &copy; ${new Date().getFullYear()} Minimal Pomo.<br>
          All rights reserved.
        </p>
      </div>

      <div class="footer-section">
        <h4>Product</h4>
        <ul>
          <li><a href="${basePath}index.html">ホーム</a></li>
          <li><a href="${basePath}index.html#features">機能</a></li>
          <li><a href="${basePath}support/guide/how_to_use.html">使い方ガイド</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Support</h4>
        <ul>
          <li><a href="${basePath}index.html#faq">よくある質問</a></li>
          <li><a href="#" class="protected-email">お問い合わせ</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><a href="${basePath}support/policies/terms.html">利用規約</a></li>
          <li><a href="${basePath}support/policies/privacy.html">プライバシーポリシー</a></li>
        </ul>
      </div>
    </div>
    `;

    footerContainer.innerHTML = footerHTML;
}

/**
 * Scroll Reveal Animation
 * Adds 'active' class to elements when they enter the viewport
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => revealObserver.observe(el));
}

/**
 * Back to Top Button
 * Shows button when scrolled down, scrolls smoothly to top on click
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Show/Hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Email Protection
 * Decodes and inserts email address to prevent scraping
 */
function initEmailProtection() {
    const emailLinks = document.querySelectorAll('.protected-email');
    // "minimalpomo" + "@" + "gmail.com"
    const user = "minimalpomo";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;

    emailLinks.forEach(link => {
        link.href = `mailto:${email}`;
        if (link.textContent.includes('[at]')) {
            link.textContent = email;
        }
    });
}
