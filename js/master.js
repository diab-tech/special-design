// // functions
// Preload Images Function
function preloadedImage(arrayOfImage){
    return arrayOfImage.map(src => {
        const img = new Image();
        img.src = src;

        img.onerror = () => {
            console.log(`Failed To Load Image : ${src}`);
        }
        return img;
    });
};

// local storage function
function setLocalStorage(key, value) {
    window.localStorage.setItem(key, value)
}
function getLocalStorage(key) {
    return window.localStorage.getItem(key)
}

// open setting
const setting = document.querySelector(".setting");
const gear = document.querySelector(".gear");

gear.onclick = function () {
    this.classList.toggle("fa-spin");
    setting.classList.toggle("open");
}

// go to sections function
function goToSection(links) {
    links.forEach(el => {
        el.addEventListener("click", e => {

            e.preventDefault(); // to prevent page from reload when you click on anchor link in ul                Or              you can put # in href of anchor link 

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        })
    })
}

// ==================================================
// change website color by settings

if (getLocalStorage("webColor")) {
    const root = document.querySelector(":root");
    root.style.setProperty("--main-color", getLocalStorage("webColor"));
    

    document.querySelectorAll(".setting-box .colors li").forEach(li => {
        li.classList.remove("active");
        if (li.dataset.color === getLocalStorage("webColor")) {
            li.classList.add("active");
        }
    })
}

// i used one addEventListener on parent rather than use one for each li[ Necessary ,Best practice]
let colorsContainer = document.querySelector(".setting-box .colors");
colorsContainer.addEventListener("click", event=> {
    // dataset تعطيك كائنًا يحتوي على جميع الخصائص التي تبدأ بـ data- في العنصر، بحيث يمكنك الوصول إليها بسهولة

    if (event.target.tagName === "LI") {
        
        let webColor = event.target.dataset.color;

        // set local storage
        setLocalStorage("webColor", webColor);

        const root = document.querySelector(":root");
        root.style.setProperty("--main-color", getLocalStorage("webColor"));
    
        // ممكن بدل م تجيب main-color وتساويه ب dataset.color تساوي الlocalstorage ب ال dataset.color اسهل بس انا بتعلم طرق جديده
        // // احصل على اللون الرئيسي الحالي
        let mainColor = getComputedStyle(root);

        if (event.target.dataset.color === mainColor.getPropertyValue("--main-color")) {
            let lis = document.querySelectorAll(".setting-box .colors li");
            lis.forEach(lielement => {
                lielement.classList.remove("active");
            })
            event.target.classList.add("active");
        }
    }
})

// ==============================================
// change landing background
let images = [
    "https://diab-tech.github.io/special-design/images/milin-john-R8fE5P1FoEE-unsplash.jpg",
    "https://diab-tech.github.io/special-design/images/pexels-bri-schneiter-28802-346529.jpg",
    "https://diab-tech.github.io/special-design/images/pexels-confinedriley-11654779.jpg",
    "https://diab-tech.github.io/special-design/images/pexels-eberhardgross-640809.jpg",
    "https://diab-tech.github.io/special-design/images/pexels-miguel-mallari-3716324-5549660.jpg",
    "https://diab-tech.github.io/special-design/images/pexels-pixabay-41951.jpg",
    "https://diab-tech.github.io/special-design/images/pexels-sebastiaan9977-1097456.jpg",
    "https://diab-tech.github.io/special-design/images/pexels-zhuzichun-229759257-12086414.jpg",
    "https://diab-tech.github.io/special-design/images/subtle-cinematics-KEI-VNDi0_g-unsplash.jpg"
  ];
// Preload Images Function
preloadedImage(images);

let indexOfImg = 0;
let landingBackground = document.querySelector(".landing-sec");

images.forEach(img => {
    let imgDiv = document.createElement("div");
    imgDiv.classList.add("image-fade");
    imgDiv.style.backgroundImage = `url(${img})`;
    landingBackground.appendChild(imgDiv);
});

const allImgDiv = document.querySelectorAll(".image-fade");

let intervalId;
function startRandom() {

    // Remove Default Background If Random Background Starts
    landingBackground.style.backgroundImage = "";
    intervalId = setInterval(() => {
        allImgDiv[indexOfImg].classList.remove("show");
        indexOfImg = (indexOfImg + 1) % images.length;
        allImgDiv[indexOfImg].classList.add("show");
    }, 15000);
    
    // من غيره الصفحه هتفضل ال 15 ثانيه من غير صوره
    allImgDiv[indexOfImg].classList.add("show");
}

function stopRandom() {
    clearInterval(intervalId);

    // default background
    landingBackground.style.backgroundImage = `url(${images[4]})`;

    allImgDiv.forEach(imgDiv => imgDiv.classList.remove("show"));
}

if (getLocalStorage("random") === "yes") {
    startRandom();
    document.querySelectorAll(".backgrounds button").forEach(btn => {
        if (btn.dataset.background === "yes") {
            btn.classList.add("active")
        }
    })
} else {
    stopRandom()
        document.querySelectorAll(".backgrounds button").forEach(btn => {
        if (btn.dataset.background === "no") {
            btn.classList.add("active")
        }
    })

}
// i used one addEventListener on parent rather than use two for each button[Not Necessary As They Just Two Button But Best practice]
document.querySelector(".backgrounds").addEventListener("click", (btn) => {
    
    if (btn.target.tagName === "BUTTON") {
        
        let random = btn.target.dataset.background;
        
        if (random === "yes") {
            startRandom();
        } else {
            stopRandom()
        }

        btn.target.classList.add("active");

        document.querySelectorAll(".backgrounds ul button").forEach(button => {
            if (button !== btn.target) {
                button.classList.remove("active");
            }
        })
        setLocalStorage("random", random);
    }
    })


// ====================================put active class on fixed-bullets circle==============
// i used one addEventListener on parent rather than use one for each li[ Necessary ,Best practice]

document.querySelector(".fixed-bullets ul").addEventListener("click", event => {
        const li = event.target.closest("li");
    
        document.querySelectorAll(".fixed-bullets ul li").forEach(el => {
            el.classList.toggle("active", el === li);
        });
    
});
// =============== goToSection link========================================================
let headerLinks = document.querySelectorAll(".links a");
let bulletsLinks = document.querySelectorAll(".fixed-bullets li");

goToSection(headerLinks)
goToSection(bulletsLinks)

// =============================================================================================
// bullets control

// after use toggle with condition

const localStorageBullets = getLocalStorage("bullets") === "yes";

// two condition => means that if [yes => add], if [no => remove]
document.querySelector(".fixed-bullets").classList.toggle("active", localStorageBullets);

document.querySelectorAll(".bullets-btn button").forEach(btn => {
    //four conditions => [btn => yes && bullets => yes] => active on btn yes and remove active from btn no
    //                => [btn => no && bullets => no] => active on btn no and remove active from btn yes
    btn.classList.toggle("active", btn.dataset.bullets === (localStorageBullets ? "yes" : "no"));
});

// // ==================================
// before use toggle with condition

// if (getLocalStorage("bullets") === "yes") {
//     document.querySelector(".fixed-bullets").classList.add("active");

//     document.querySelectorAll(".bullets-btn button").forEach(btn => {
//         // remove active class on setting button
//         btn.classList.remove("active");

//         // add active on [yes] button
//         if (btn.dataset.bullets === "yes") {
//             btn.classList.add("active")
//         }
//     })

//     // add active class on setting button [Yes]
// } else {
//     document.querySelector(".fixed-bullets").classList.remove("active");
//     document.querySelectorAll(".bullets-btn button").forEach(btn => {
//         // remove active class on setting button
//         btn.classList.remove("active");

//         // add active class on [no] setting button
//         if (btn.dataset.bullets === "no") {
//             btn.classList.add("active")
//         }
//     })
// }

//=====================================================================================================
// before use toggle with condition

// document.querySelectorAll(".bullets-btn button").forEach(btn => {
//     btn.addEventListener("click", el => {
//         if (el.currentTarget.dataset.bullets === "yes") {
//             document.querySelector(".fixed-bullets").classList.add("active");

//             // remove active class on setting button
//             document.querySelectorAll(".bullets-btn button").forEach(btn => {
//                 btn.classList.remove("active");
//             });

//             // add active class on setting button [Yes]
//             el.currentTarget.classList.add("active");
//         } else {
//             document.querySelector(".fixed-bullets").classList.remove("active");

//             // remove active class on setting button [Yes]
//             el.currentTarget.previousElementSibling.classList.remove("active");
//             // add active class on setting button [No]
//             el.currentTarget.classList.add("active");
//         }
//         setLocalStorage("bullets", el.currentTarget.dataset.bullets);
//     });
// });

// =======showing fixed-bullets=========================
// الكود المحسن باستخدام classList.toggle():

document.querySelectorAll(".bullets-btn button").forEach(btn => {
    btn.addEventListener("click", el => {
        const isYes = el.currentTarget.dataset.bullets === "yes";

        // Toggle the 'active' class on the .fixed-bullets based on the dataset value
        document.querySelector(".fixed-bullets").classList.toggle("active", isYes);

        // Toggle active class on all buttons
        document.querySelectorAll(".bullets-btn button").forEach(button => {
            button.classList.toggle("active", button === el.currentTarget);
        });

        // Set the value in localStorage
        setLocalStorage("bullets", el.currentTarget.dataset.bullets);
    });
});

// ==================================================================================

// ========================================
// reset button

document.querySelector(".setting-box #reset").addEventListener("click", btn => {
    // ===========reset color==============

    // change value of webColor in local storage
    setLocalStorage("webColor", "orange");
    
    // apply changes
    if (getLocalStorage("webColor")) {
        const root = document.querySelector(":root");
        root.style.setProperty("--main-color", getLocalStorage("webColor"));
        
        // Use toggle for class "active"
        document.querySelectorAll(".setting-box .colors li").forEach(li => {
            // Toggle active class based on dataset color
            li.classList.toggle("active", li.dataset.color === getLocalStorage("webColor"));
        });
    }
    
    // ===========reset backgrounds==============

    // change value of random in local storage
    setLocalStorage("random", "yes");

    // apply changes
    if (getLocalStorage("random") === "yes") {
        startRandom();
    } else {
        stopRandom()
    }

    document.querySelectorAll(".backgrounds button").forEach(btn => {
        btn.classList.toggle("active",btn.dataset.background === "yes")
    })

    // ===========reset bullets==============

    // change value of bullets in local storage
    setLocalStorage("bullets", "yes");

    // apply changes
    // لا حاجة إلى إعادة تعريفه مرة أخرى في أي مكان طالما أنه لا يتم تغييره. ولكن إذا كانت حالة localStorage قد تتغير بين الحدث الذي تريده (مثل حدث الضغط على زر "إعادة التعيين")، فقد تحتاج إلى إعادة حساب القيمة من localStorage لضمان أنك تعمل مع أحدث قيمة تم تخزينها.
    let localStorageBullets = getLocalStorage("bullets") === "yes";

    document.querySelector(".fixed-bullets").classList.toggle("active",localStorageBullets);
    document.querySelectorAll(".bullets-btn button").forEach(btn => {
        // remove active class on setting button
        btn.classList.toggle("active", btn.dataset.bullets === (localStorageBullets ? "yes" : "no"))
    
    });

    // ===========close sitting window==============
    let closeSetting = function () {
        gear.classList.remove("fa-spin");
        setting.classList.remove("open");
    }
    closeSetting();
});

// ===================================
// open toggle-menu

document.querySelector(".landing-header .toggle-menu").addEventListener("click", menu => {
    document.querySelector(".landing-header ul").classList.toggle("appear");

    // document.querySelectorAll(".landing-sec li a").forEach(a => {
    //     a.classList.remove("active");
    // })

    // document.querySelectorAll(".landing-header ul li").forEach(el => {
    //     el.classList.add("active");
    // })

})

// ========================================================================================
// appear skill progress on onscroll

let skills = document.querySelector(".skills");
window.onscroll = function () {
    //  الحصول على إزاحة عنصر المهارات من أعلى الصفحة:
    let offsetTop = skills.offsetTop;

    // الحصول على ارتفاعskills
    let skillsHeight = skills.offsetHeight;

    // الحصول على ارتفاع النافذة: (screen)
    let windowHeight = this.innerHeight;

    // الحصول على المسافة التي تم تمريرها من أعلى الصفحة:
    let windowScroll = this.scrollY;

    if (windowScroll > (offsetTop + skillsHeight/ 1.3 - windowHeight)) {
        let allSkills = document.querySelectorAll(".skills .body > div .skill-progress span")
        allSkills.forEach(span => {
            span.style.width = span.dataset.progress;
        })
        // Remove the scroll event listener after triggering the animation
        window.onscroll = null;
    }
}

// ========================================================================================
// popup imgs

let galleryImgs = document.querySelectorAll(".gallery img");
galleryImgs.forEach(img => {
    img.addEventListener("click", () => {

        // crete overlay
        let overlay = document.createElement("div");
        // add class
        overlay.className = ("popup-overlay");
        //append overlay
        document.body.appendChild(overlay);

        // create popup
        let popupImg = document.createElement("div");
        // add class
        popupImg.className = ('popup-img');

        //add alternate text to popupImg
        if (img.alt !== "") {
            // crete h3
            let imgTxt = document.createElement("h3");
            // get alt from img
            let imageAlt = document.createTextNode(img.alt);
            // add img alt to h3
            imgTxt.appendChild(imageAlt)
            //append h3 to popupImg
                popupImg.appendChild(imgTxt)
        }

        // create img
        let image = document.createElement("img");
        // add src of img
        image.src = img.src;
        // append image to popupImg
        popupImg.appendChild(image);
        // append popupImg to body
        document.body.appendChild(popupImg)

        // add close button
        let closeImg = document.createElement("span");
        closeImg.className = ("close-img");
        let xMark = document.createTextNode("X");
        closeImg.appendChild(xMark);
        popupImg.appendChild(closeImg);

        // add eventListener On close button
        closeImg.addEventListener("click", x => {
            overlay.remove();
            x.target.parentNode.remove();
        })




    })
})
// ===========================================================================================
// footer year

let currentYear = new Date().getFullYear();
let year = document.querySelector(".footer .year");
let yearValue = document.createTextNode(currentYear);
year.appendChild(yearValue);
