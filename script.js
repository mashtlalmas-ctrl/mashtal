// 1. Dark Mode Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme, default to dark if not set
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// 2. Expandable FAB Logic
const fabMain = document.getElementById('fab-main');
const fabOptions = document.getElementById('fab-options');
const fabIcon = fabMain.querySelector('i');

fabMain.addEventListener('click', () => {
    fabMain.classList.toggle('active');
    fabOptions.classList.toggle('active');

    if (fabMain.classList.contains('active')) {
        fabIcon.classList.replace('fa-headset', 'fa-times');
    } else {
        fabIcon.classList.replace('fa-times', 'fa-headset');
    }
});

// Close FAB when clicking outside
document.addEventListener('click', (e) => {
    if (!fabMain.contains(e.target) && !fabOptions.contains(e.target)) {
        fabMain.classList.remove('active');
        fabOptions.classList.remove('active');
        fabIcon.classList.replace('fa-times', 'fa-plus');
    }
});

// 3. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 4. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// 5. FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');

        const icon = question.querySelector('i');
        if (item.classList.contains('active')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });
});

// 6. Stats Counter Animation (Simple)
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-item h3');
            counters.forEach(counter => {
                const target = parseInt(counter.innerText.replace('+', '').replace('%', ''));
                let count = 0;
                const updateCount = () => {
                    const increment = target / 50;
                    if (count < target) {
                        count += increment;
                        counter.innerText = (counter.innerText.includes('%') ? '' : '+') + Math.ceil(count) + (counter.innerText.includes('%') ? '%' : '');
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = (counter.innerText.includes('%') ? '' : '+') + target + (counter.innerText.includes('%') ? '%' : '');
                    }
                };
                updateCount();
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// 7. Cookie Banner Logic
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieBanner.classList.add('active');
    }, 2000);
}

acceptBtn.addEventListener('click', () => {
    cookieBanner.classList.remove('active');
    localStorage.setItem('cookiesAccepted', 'true');
});
