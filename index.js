// index.js
let articles = JSON.parse(localStorage.getItem("articles")) || [
  {
    title: "A title for your first article",
    content: "Lorem ipsum dolor sit amet...",
    image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56",
  },
  {
    title: "A title for your first article",
    content: "Lorem ipsum dolor sit amet...",
    image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56",
  },
];

let socialLinks = JSON.parse(localStorage.getItem("socialLinks")) || [
  { text: "Facebook", url: "#" },
  { text: "LinkedIn", url: "#" },
  { text: "GitHub", url: "#" },
];

renderSocialLinks();
renderArticles();

function renderSocialLinks() {
  const socialLinksContainer = document.getElementById("social-links");
  socialLinksContainer.innerHTML = "";
  socialLinks.forEach((link, index) => {
    const div = document.createElement("div");
    div.className = "social-link-item";
    div.innerHTML = `<a href="${link.url}">${link.text}</a>`;
    socialLinksContainer.appendChild(div);
  });
}

function renderArticles() {
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
}