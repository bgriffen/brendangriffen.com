// Global error capture
window.addEventListener('error', function (event) {
    if (typeof posthog !== 'undefined') {
        posthog.captureException(event.error || new Error(event.message), {
            url: window.location.href,
            source: event.filename,
            lineno: event.lineno,
        });
    }
});

window.addEventListener('unhandledrejection', function (event) {
    if (typeof posthog !== 'undefined') {
        posthog.captureException(event.reason, {
            url: window.location.href,
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (typeof posthog === 'undefined') return;

    // Social icon clicks
    document.querySelectorAll('.social-icons a').forEach(function (link) {
        link.addEventListener('click', function () {
            posthog.capture('social_link_clicked', {
                platform: link.getAttribute('aria-label') || link.title || link.href,
                url: link.href,
            });
        });
    });

    // Navigation menu item clicks
    document.querySelectorAll('#menu a, nav a').forEach(function (link) {
        link.addEventListener('click', function () {
            posthog.capture('nav_item_clicked', {
                label: link.textContent.trim(),
                url: link.href,
            });
        });
    });

    // Project card clicks
    document.querySelectorAll('.card-entry-link, .project-cards a').forEach(function (card) {
        card.addEventListener('click', function () {
            var titleEl = card.querySelector('h2');
            posthog.capture('project_card_clicked', {
                project_title: titleEl ? titleEl.textContent.trim() : '',
                url: card.href || '',
            });
        });
    });

    // External link clicks (content area)
    document.querySelectorAll('.post-content a[href^="http"], .entry-content a[href^="http"]').forEach(function (link) {
        if (link.hostname !== window.location.hostname) {
            link.addEventListener('click', function () {
                posthog.capture('external_link_clicked', {
                    url: link.href,
                    text: link.textContent.trim(),
                    page: window.location.pathname,
                });
            });
        }
    });

    // Code copy button clicks
    document.querySelectorAll('.copy-code').forEach(function (btn) {
        btn.addEventListener('click', function () {
            posthog.capture('copy_code_clicked', {
                page: window.location.pathname,
            });
        });
    });
});
