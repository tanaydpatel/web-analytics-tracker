// Load the Analytics package from CDN
(function () {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/analytics/dist/analytics.min.js";
  script.defer = true;

  function getUserIdFromUrl() {
    const scripts = document.getElementsByTagName("script");
    console.log(scripts);
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.src.includes("the-tracking-script")) {
        const src = script.src;
        const params = new URLSearchParams(src.split("?")[1]);
        return params.get("id");
      }
    }
    return null;
  }

  const accountId = getUserIdFromUrl();
  console.log(accountId);
  script.onload = function () {
    if (typeof _analytics !== "undefined") {
      // Initialize analytics once the script is loaded
      const Analytics = _analytics.init({
        app: "the-super-tracking-app-by-tanay-patel",
        version: 1,
        plugins: [],
      });
      // create unique identifier for each user
      const userId =
        Analytics.storage.getItem("userId") || `${accountId}-${Date.now()}`;
      Analytics.storage.setItem("userId", userId);
      Analytics.identify(userId);
      // Track a page view event
      Analytics.page({
        title: document.title,
        url: window.location.href,
      });
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
