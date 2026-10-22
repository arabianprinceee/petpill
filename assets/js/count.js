// Visit counting for the PetPill website: PostHog, cookieless, nothing stored in the browser.
// What this collects is section 2.7 of the privacy policy (privacy.html in petpill-support,
// PRIVACY_POLICY.md in the app repo). Collect something new only after both say so.
(function () {
  if (location.hostname.replace(/^www\./, '') !== 'petpillapp.com') return; // local previews count nothing

  var TOKEN = 'phc_A5wqSjbENBmYyQxgZ8YpGshUmfqH5sUHiwyFaKuNoRBH'; // the project's public write-only key

  var script = document.createElement('script');
  script.src = 'https://eu-assets.i.posthog.com/static/array.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.onload = function () {
    window.posthog.init(TOKEN, {
      api_host: 'https://eu.i.posthog.com',
      cookieless_mode: 'always',
      capture_pageview: true,
      capture_pageleave: false,
      autocapture: false,
      capture_heatmaps: false,
      capture_dead_clicks: false,
      capture_exceptions: false,
      capture_performance: false,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_flags: true,
      disable_external_dependency_loading: true
    });
  };
  document.head.appendChild(script);

  // App Store button taps. Which button, never anything about the person.
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href*="apps.apple.com"]');
    var posthog = window.posthog;
    if (!link || !posthog || !posthog.__loaded) return;
    posthog.capture('app_store_tapped', { placement: link.className || 'link' }, { transport: 'sendBeacon' });
  });
})();
