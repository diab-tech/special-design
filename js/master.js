//
function preloadedImage(arrayOfImage) {
  return arrayOfImage.map((src) => {
    const img = new Image();
    img.src = src;

    img.onerror = () => {
      console.log(`Failed To Load Image : ${src}`);
    };
    return img;
  });
}

//
function setLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
}
function getLocalStorage(key) {
  return window.localStorage.getItem(key);
}

//
const setting = document.querySelector(".setting");
const gear = document.querySelector(".gear");

gear.onclick = function () {
  this.classList.toggle("fa-spin");
  setting.classList.toggle("open");
};

//
function goToSection(links) {
  links.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

//
if (getLocalStorage("webColor")) {
  const root = document.querySelector(":root");
  root.style.setProperty("--main-color", getLocalStorage("webColor"));

  document.querySelectorAll(".setting-box .colors li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === getLocalStorage("webColor")) {
      li.classList.add("active");
    }
  });
}

let colorsContainer = document.querySelector(".setting-box .colors");
colorsContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    let webColor = event.target.dataset.color;

    setLocalStorage("webColor", webColor);

    const root = document.querySelector(":root");
    root.style.setProperty("--main-color", getLocalStorage("webColor"));

    let mainColor = getComputedStyle(root);

    if (
      event.target.dataset.color === mainColor.getPropertyValue("--main-color")
    ) {
      let lis = document.querySelectorAll(".setting-box .colors li");
      lis.forEach((lielement) => {
        lielement.classList.remove("active");
      });
      event.target.classList.add("active");
    }
  }
});
//
let images = [
  "../images/milin-john-R8fE5P1FoEE-unsplash.jpg",
  "../images/pexels-bri-schneiter-28802-346529.jpg",
  "../images/pexels-confinedriley-11654779.jpg",
  "../images/pexels-eberhardgross-640809.jpg",
  "../images/pexels-miguel-mallari-3716324-5549660.jpg",
  "../images/pexels-pixabay-41951.jpg",
  "../images/pexels-sebastiaan9977-1097456.jpg",
  "../images/pexels-zhuzichun-229759257-12086414.jpg",
  "../images/subtle-cinematics-KEI-VNDi0_g-unsplash.jpg",
];

//
preloadedImage(images);

let indexOfImg = 0;
let landingBackground = document.querySelector(".landing-sec");

images.forEach((img) => {
  let imgDiv = document.createElement("div");
  imgDiv.classList.add("image-fade");
  imgDiv.style.backgroundImage = `url(${img})`;
  landingBackground.appendChild(imgDiv);
});

const allImgDiv = document.querySelectorAll(".image-fade");

let intervalId;
function startRandom() {
  landingBackground.style.backgroundImage = "";
  intervalId = setInterval(() => {
    allImgDiv[indexOfImg].classList.remove("show");
    indexOfImg = (indexOfImg + 1) % images.length;
    allImgDiv[indexOfImg].classList.add("show");
  }, 15000);

  allImgDiv[indexOfImg].classList.add("show");
}

function stopRandom() {
  clearInterval(intervalId);

  landingBackground.style.backgroundImage = `url(${images[4]})`;

  allImgDiv.forEach((imgDiv) => imgDiv.classList.remove("show"));
}

window.addEventListener("load", () => {
  if (getLocalStorage("random") === "yes") {
    startRandom();
    document.querySelectorAll(".backgrounds button").forEach((btn) => {
      if (btn.dataset.background === "yes") {
        btn.classList.add("active");
      }
    });
  } else {
    stopRandom();
    document.querySelectorAll(".backgrounds button").forEach((btn) => {
      if (btn.dataset.background === "no") {
        btn.classList.add("active");
      }
    });
  }
  document.querySelector(".backgrounds").addEventListener("click", (btn) => {
    if (btn.target.tagName === "BUTTON") {
      let random = btn.target.dataset.background;

      if (random === "yes") {
        startRandom();
      } else {
        stopRandom();
      }

      btn.target.classList.add("active");

      document.querySelectorAll(".backgrounds ul button").forEach((button) => {
        if (button !== btn.target) {
          button.classList.remove("active");
        }
      });
      setLocalStorage("random", random);
    }
  });
});

//
document
  .querySelector(".fixed-bullets ul")
  .addEventListener("click", (event) => {
    const li = event.target.closest("li");

    document.querySelectorAll(".fixed-bullets ul li").forEach((el) => {
      el.classList.toggle("active", el === li);
    });
  });
//
let headerLinks = document.querySelectorAll(".links a");
let bulletsLinks = document.querySelectorAll(".fixed-bullets li");

goToSection(headerLinks);
goToSection(bulletsLinks);

//
window.addEventListener("load", () => {
  const localStorageBullets = getLocalStorage("bullets") === "yes";

  document
    .querySelector(".fixed-bullets")
    .classList.toggle("active", localStorageBullets);

  document.querySelectorAll(".bullets-btn button").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.dataset.bullets === (localStorageBullets ? "yes" : "no")
    );
  });
});

//
window.addEventListener("load", () => {
  document.querySelectorAll(".bullets-btn button").forEach((btn) => {
    btn.addEventListener("click", (el) => {
      const isYes = el.currentTarget.dataset.bullets === "yes";

      document
        .querySelector(".fixed-bullets")
        .classList.toggle("active", isYes);

      document.querySelectorAll(".bullets-btn button").forEach((button) => {
        button.classList.toggle("active", button === el.currentTarget);
      });

      setLocalStorage("bullets", el.currentTarget.dataset.bullets);
    });
  });
});

//
window.addEventListener("load", () => {
  document
    .querySelector(".setting-box #reset")
    .addEventListener("click", (btn) => {
      setLocalStorage("webColor", "orange");

      if (getLocalStorage("webColor")) {
        const root = document.querySelector(":root");
        root.style.setProperty("--main-color", getLocalStorage("webColor"));

        document.querySelectorAll(".setting-box .colors li").forEach((li) => {
          li.classList.toggle(
            "active",
            li.dataset.color === getLocalStorage("webColor")
          );
        });
      }
      setLocalStorage("random", "yes");

      if (getLocalStorage("random") === "yes") {
        startRandom();
      } else {
        stopRandom();
      }

      document.querySelectorAll(".backgrounds button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.background === "yes");
      });

      setLocalStorage("bullets", "yes");

      let localStorageBullets = getLocalStorage("bullets") === "yes";

      document
        .querySelector(".fixed-bullets")
        .classList.toggle("active", localStorageBullets);
      document.querySelectorAll(".bullets-btn button").forEach((btn) => {
        btn.classList.toggle(
          "active",
          btn.dataset.bullets === (localStorageBullets ? "yes" : "no")
        );
      });

      let closeSetting = function () {
        gear.classList.remove("fa-spin");
        setting.classList.remove("open");
      };
      closeSetting();
    });

  document
    .querySelector(".landing-header .toggle-menu")
    .addEventListener("click", (menu) => {
      document.querySelector(".landing-header ul").classList.toggle("appear");
    });
});

//
window.addEventListener("load", () => {
  let skills = document.querySelector(".skills");
  window.onscroll = function () {
    let offsetTop = skills.offsetTop;

    let skillsHeight = skills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScroll = this.scrollY;

    if (windowScroll > offsetTop + skillsHeight / 1.3 - windowHeight) {
      let allSkills = document.querySelectorAll(
        ".skills .body > div .skill-progress span"
      );
      allSkills.forEach((span) => {
        span.style.width = span.dataset.progress;
      });
      window.onscroll = null;
    }
  };
});

//
window.addEventListener("load", () => {
  let galleryImgs = document.querySelectorAll(".gallery img");
  galleryImgs.forEach((img) => {
    img.addEventListener("click", () => {
      let overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      document.body.appendChild(overlay);

      let popupImg = document.createElement("div");
      popupImg.className = "popup-img";

      if (img.alt !== "") {
        let imgTxt = document.createElement("h3");
        let imageAlt = document.createTextNode(img.alt);
        imgTxt.appendChild(imageAlt);
        popupImg.appendChild(imgTxt);
      }

      let image = document.createElement("img");
      image.src = img.src;
      popupImg.appendChild(image);
      document.body.appendChild(popupImg);

      let closeImg = document.createElement("span");
      closeImg.className = "close-img";
      let xMark = document.createTextNode("X");
      closeImg.appendChild(xMark);
      popupImg.appendChild(closeImg);

      closeImg.addEventListener("click", (x) => {
        overlay.remove();
        x.target.parentNode.remove();
      });
    });
  });
});

//
window.addEventListener("load", () => {
  let currentYear = new Date().getFullYear();
  let year = document.querySelector(".footer .year");
  let yearValue = document.createTextNode(currentYear);
  year.appendChild(yearValue);
});
