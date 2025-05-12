// admin.js

let socialLinks = JSON.parse(localStorage.getItem("socialLinks")) || [
  { text: "Facebook", url: "#" },
  { text: "LinkedIn", url: "#" },
  { text: "GitHub", url: "#" }
];

// Load initial values
window.onload = function() {
  // Load logo
  const logo = localStorage.getItem("logo") || "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png";
  document.getElementById("logo-url").value = logo;

  // Load footer note
  const footerNote = localStorage.getItem("footerNote") || "© 2024, Company's name. All rights reserved.";
  document.getElementById("footer-note").value = footerNote;

  // Load social links
  renderSocialLinks();
};

// Save logo
function saveLogo() {
  const logoUrl = document.getElementById("logo-url").value;
  if (logoUrl) {
      localStorage.setItem("logo", logoUrl);
      alert("Logo updated successfully!");
  } else {
      alert("Please enter a valid URL.");
  }
}

// Save footer note
function saveFooterNote() {
  const footerNote = document.getElementById("footer-note").value;
  if (footerNote) {
      localStorage.setItem("footerNote", footerNote);
      alert("Footer note updated successfully!");
  } else {
      alert("Please enter a footer note.");
  }
}

// Render social links
function renderSocialLinks() {
  const socialLinksList = document.getElementById("social-links-list");
  socialLinksList.innerHTML = "";
  socialLinks.forEach((link, index) => {
      const div = document.createElement("div");
      div.className = "social-link-item";
      div.innerHTML = `
          <span>${link.text}: ${link.url}</span>
          <button onclick="editSocialLink(${index})">Edit</button>
          <button onclick="removeSocialLink(${index})">Remove</button>
      `;
      socialLinksList.appendChild(div);
  });
}

// Add or update social link
function addOrUpdateSocialLink() {
  const text = document.getElementById("social-text").value;
  const url = document.getElementById("social-url").value;
  const editIndex = document.getElementById("edit-index").value;

  if (!text || !url) {
      alert("Please enter both display text and URL.");
      return;
  }

  if (editIndex !== "") {
      // Update existing link
      socialLinks[parseInt(editIndex)] = { text, url };
  } else {
      // Add new link
      socialLinks.push({ text, url });
  }

  localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
  renderSocialLinks();
  clearSocialLinkForm();
  alert("Social link saved successfully!");
}

// Edit social link
function editSocialLink(index) {
  const link = socialLinks[index];
  document.getElementById("social-text").value = link.text;
  document.getElementById("social-url").value = link.url;
  document.getElementById("edit-index").value = index;
}

// Remove social link with confirmation
function removeSocialLink(index) {
  if (confirm("Are you sure you want to remove this link?")) {
      socialLinks.splice(index, 1);
      localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
      renderSocialLinks();
      alert("Social link removed successfully!");
  }
}

// Clear social link form
function clearSocialLinkForm() {
  document.getElementById("social-text").value = "";
  document.getElementById("social-url").value = "";
  document.getElementById("edit-index").value = "";
}