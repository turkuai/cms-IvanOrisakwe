


window.onload = function() {

  const defaultLogo = "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png";
  const defaultFooterNote = "© 2024, Company's name. All rights reserved.";
  const defaultSocialLinks = [
      { text: "Facebook", url: "#" },
      { text: "LinkedIn", url: "#" },
      { text: "GitHub", url: "#" }
  ];
  const defaultArticles = [
      {
          title: "A title for your first article",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56" 
      },
      {
          title: "A title for your first article",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56"
      }
  ];


  const logo = localStorage.getItem("logo") || defaultLogo;
  document.getElementById("logo").src = logo;

  const footerNote = localStorage.getItem("footerNote") || defaultFooterNote;
  document.getElementById("footer-note").textContent = footerNote;


  const socialLinks = JSON.parse(localStorage.getItem("socialLinks")) || defaultSocialLinks;
  const socialLinksContainer = document.getElementById("social-links");
  socialLinksContainer.innerHTML = "";
  socialLinks.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.text;
      socialLinksContainer.appendChild(a);
  });

  const articles = JSON.parse(localStorage.getItem("articles")) || defaultArticles;
  const contentDiv = document.querySelector(".content");
  contentDiv.innerHTML = "";
  articles.forEach((article, index) => {
      const articleDiv = document.createElement("div");
      articleDiv.className = "article";
      articleDiv.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.content}</p>
          <img src="${article.image}" alt="Article Image">
      `;
      contentDiv.appendChild(articleDiv);
  });
};

function resetAll() {
  if (confirm("Are you sure you want to reset all content to default? This will clear all changes.")) {
      localStorage.removeItem("logo");
      localStorage.removeItem("footerNote");
      localStorage.removeItem("socialLinks");
      localStorage.removeItem("articles");
      location.reload(); 
  }
}