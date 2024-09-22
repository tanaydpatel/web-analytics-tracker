const EVENTS = {
  INIT: "init",
  PAGE: "page",
  CLICKED: "click",
  TRACK: "track",
  EMAIL: "email",
  FORM: "form",
};

// Function to send API POST requests
function postLogs(payload) {
  fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API response for tracking:", data);
    })
    .catch((error) => {
      console.error("Error sending API payload:", error);
    });
}

function getUserIdFromUrl() {
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    if (script?.src?.includes("the-tracking-script")) {
      const src = script.src;
      const params = new URLSearchParams(src.split("?")[1]);
      return params.get("id");
    }
  }
  throw new Error("Account ID not found in the URL.");
}

function getBrowserDetails() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const vendor = navigator.vendor;
  const language = navigator.language;

  return {
    userAgent,
    platform,
    vendor,
    language,
  };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

(function () {
  try {
    // Load the Analytics package from CDN
    const script = document.createElement("script");
    script.src = "https://unpkg.com/analytics/dist/analytics.min.js";
    script.defer = true;

    // trackingId is the unique identifier for the website owner
    const trackingId = getUserIdFromUrl();
    script.onload = function () {
      if (typeof _analytics !== "undefined") {
        // Initialize analytics once the script is loaded
        const Analytics = _analytics.init({
          app: "the-super-tracking-app-by-tanay-patel",
          version: "1.0.0",
        });

        postLogs({
          type: EVENTS.INIT,
          trackingId,
          timestamp: Date.now(),
        });

        // create unique identifier for each user if not present already
        const userData = Analytics.user();
        let userId = null;
        if (userData && userData.userId) {
          userId = userData.userId;
        } else {
          userId = `${trackingId}-${Date.now()}`;
          Analytics.identify(userId);
        }

        // Track a page view event
        Analytics.page({
          title: document.title,
          url: window.location.href,
          browser: getBrowserDetails(),
        });

        // We have two options here:
        // To track all clicks on the page
        // Or to track clicks on specific elements
        // Due to lack in clarity, I am going to track all clicks on the page
        document.addEventListener("click", function (event) {
          const clickedElement = event.target;
          Analytics.track(EVENTS.CLICKED, {
            element: clickedElement.tagName.toLowerCase(),
            id: clickedElement.id,
            text: clickedElement.innerText,
            class: clickedElement.className,
          });
        });

        // email entered by user in email input
        const emailInput = document.querySelector("input[type='email']");
        if (emailInput) {
          emailInput.addEventListener("change", function (event) {
            const email = event.target.value;
            if (isValidEmail(email)) {
              Analytics.track(EVENTS.EMAIL, { email });
            }
          });
        }

        // Track all form submissions
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
          form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
              formObject[key] = value;
            });
            Analytics.track(EVENTS.FORM, { formData: formObject });
          });
        });

        Analytics.on("track", ({ payload }) => {
          postLogs({
            type: payload.event,
            userId: payload.userId,
            timestamp: payload.meta.ts,
            data: payload.properties,
            trackingId,
          });
        });
        Analytics.on("page", ({ payload }) => {
          console.log("Page event:", payload);
          postLogs({
            type: EVENTS.PAGE,
            userId: payload.userId,
            timestamp: payload.meta.ts,
            data: payload.properties,
            trackingId,
          });
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
  } catch (error) {
    console.error("Error loading the tracking script:", error);
  }
})();
