// index.js

// Load data from localStorage on page load
window.onload = function() {
  // Default values
  const defaultLogo = "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png";
  const defaultFooterNote = "© 2024, Company's name. All rights reserved.";
  const defaultSocialLinks = [
      { text: "Facebook", url: "#" },
      { text: "LinkedIn", url: "#" },
      { text: "GitHub", url: "#" }
  ];

  // Load logo
  const logo = localStorage.getItem("logo") || defaultLogo;
  document.getElementById("logo").src = logo;

  // Load footer note
  const footerNote = localStorage.getItem("footerNote") || defaultFooterNote;
  document.getElementById("footer-note").textContent = footerNote;

  // Load social links
  const socialLinks = JSON.parse(localStorage.getItem("socialLinks")) || defaultSocialLinks;
  const socialLinksContainer = document.getElementById("social-links");
  socialLinksContainer.innerHTML = "";
  socialLinks.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.text;
      socialLinksContainer.appendChild(a);
  });
};