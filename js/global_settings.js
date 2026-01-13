/**
 * Global Settings Manager
 * Handles Theme (Light/Dark) and Language Preferences
 */

const SettingsManager = {
    init() {
        console.log("Initializing Global Settings...");
        this.applyTheme();
        this.applyLang();
        this.injectControls();
    },

    // --- Theme Logic ---
    toggleTheme() {
        const body = document.body;
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            localStorage.setItem('athar_theme', 'dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('athar_theme', 'light');
        }
        this.updateIcons();
    },

    applyTheme() {
        const theme = localStorage.getItem('athar_theme');
        // Default is Light in the HTML (body.light-theme), but CSS default is Dark.
        // If storage implies dark, we remove the class.
        // If storage is empty, we stick to HTML default (Light).

        if (theme === 'dark') {
            document.body.classList.remove('light-theme');
        } else if (theme === 'light') {
            document.body.classList.add('light-theme');
        }
    },

    // --- Language Logic ---
    toggleLang() {
        // Currently a placeholder for future i18n or redirection
        const current = document.documentElement.lang || 'ar';
        if (current === 'ar') {
            alert("English version coming soon! / النسخة الإنجليزية قادمة قريباً");
            // localStorage.setItem('athar_lang', 'en');
        } else {
            // localStorage.setItem('athar_lang', 'ar');
        }
    },

    applyLang() {
        // const lang = localStorage.getItem('athar_lang');
        // if (lang === 'en') { ... }
    },

    // --- UI Injection ---
    injectControls() {
        const nav = document.querySelector('nav .nav-actions') || document.querySelector('nav');
        if (!nav) return;

        // Check if controls already exist
        if (document.getElementById('themeToggleBtn')) return;

        const container = document.createElement('div');
        container.style.display = 'inline-flex';
        container.style.gap = '10px';
        container.style.marginLeft = '15px';
        container.style.alignItems = 'center';

        // Theme Button
        const themeBtn = document.createElement('button');
        themeBtn.id = 'themeToggleBtn';
        themeBtn.className = 'btn btn-ghost'; // Reuse existing class
        themeBtn.style.padding = '8px 12px';
        themeBtn.style.borderRadius = '50%';
        themeBtn.style.fontSize = '1.2rem';
        themeBtn.onclick = () => this.toggleTheme();

        // Lang Button
        const langBtn = document.createElement('button');
        langBtn.id = 'langToggleBtn';
        langBtn.className = 'btn btn-ghost';
        langBtn.style.padding = '8px 12px';
        langBtn.style.borderRadius = '50%';
        langBtn.style.fontSize = '1.2rem';
        langBtn.innerText = '🌐';
        langBtn.title = "Change Language";
        langBtn.onclick = () => this.toggleLang();

        container.appendChild(themeBtn);
        container.appendChild(langBtn);

        // Insert at the beginning of nav actions or append
        nav.insertBefore(container, nav.firstChild);

        this.updateIcons();
    },

    updateIcons() {
        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;
        const isLight = document.body.classList.contains('light-theme');
        btn.innerText = isLight ? '🌙' : '☀️'; // If Light, show Moon to switch to Dark
        btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }
};

// Auto-run on load
document.addEventListener('DOMContentLoaded', () => SettingsManager.init());
