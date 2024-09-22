// Load the Analytics package from CDN
(function () {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/analytics/dist/analytics.min.js";
  script.defer = true;

  script.onload = function () {
    if (typeof _analytics !== "undefined") {
      // Initialize analytics once the script is loaded
      const Analytics = _analytics.init({
        app: "the-super-tracking-app-by-tanay-patel",
        version: 100,
        plugins: [],
      });

      // Track a page view event
      Analytics.page();

      // Optional: Initialize any default custom tracking
      console.log("Analytics initialized");
    } else {
      console.error("Analytics library not found.");
    }
  };

  script.onerror = function () {
    console.error("Failed to load the Analytics script.");
  };

  // Add the script to the document
  document.head.appendChild(script);
})();
