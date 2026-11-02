const yearTarget = document.querySelector("[data-year]");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const activitiesTarget = document.querySelector("[data-activities]");

function createGallery(galleryData) {
  const gallery = document.createElement("div");
  gallery.className = `news-gallery ${galleryData.galleryClass || "one-photo"}`;
  galleryData.images.forEach((image) => {
    const element = document.createElement("img");
    element.src = image.src;
    element.alt = image.alt;
    element.loading = "lazy";
    if (image.className) element.className = image.className;
    gallery.append(element);
  });
  return gallery;
}

function renderActivities(activities) {
  activitiesTarget.replaceChildren();

  activities.forEach((activity) => {
    const article = document.createElement("article");
    article.className = "news-block";

    const date = document.createElement("time");
    date.dateTime = activity.datetime;
    date.textContent = activity.date;
    article.append(date);

    const list = document.createElement("ul");
    activity.items.forEach((item) => {
      const listItem = document.createElement("li");
      item.parts.forEach((part) => {
        if (part.href) {
          const link = document.createElement("a");
          link.href = part.href;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = part.text;
          listItem.append(link);
        } else {
          listItem.append(document.createTextNode(part.text));
        }
      });
      list.append(listItem);
      item.galleries?.forEach((galleryData) => {
        listItem.append(createGallery(galleryData));
      });
    });
    article.append(list);

    if (activity.galleries?.length) {
      activity.galleries.forEach((galleryData) => {
        article.append(createGallery(galleryData));
      });
    }

    activitiesTarget.append(article);
  });
}

if (activitiesTarget) {
  fetch("data/activities.json")
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load activities (${response.status})`);
      return response.json();
    })
    .then(renderActivities)
    .catch((error) => {
      console.error(error);
      activitiesTarget.replaceChildren();
      const message = document.createElement("p");
      message.className = "activities-status";
      message.textContent = "Activities could not be loaded. Please try again later.";
      activitiesTarget.append(message);
    });
}

const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-24% 0px -58% 0px",
    threshold: [0.18, 0.32, 0.5],
  },
);

sections.forEach((section) => observer.observe(section));
