gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
  smartphone: true,
  multiplier: 1.3,
  firefoxMultiplier: 200,
  tablet: {
    smooth: true,
  },
  smartphone: {
    smooth: true,
  },
});

gsap.to("body", {
  autoAlpha: 1,
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("main").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

gsap.set(".loaderrighttext span , .loderlefttext span", { y: 50, opacity: 0 });
gsap.set(".counter", { opacity: 0 });
gsap.set(".landingpara", { opacity: 0 });
gsap.set(".cta", { opacity: 0 });
gsap.set(".loaderinner", { width: 0 });
gsap.set(".landingheading h1", { y: 100, opacity: 0 });
gsap.set(".loaderlogoimg", { y: -70 });

var isMobile = window.matchMedia('(max-width: 600px)').matches;

gsap.to(".thescrolltext",{
  y: "100%",
  duration: 2.5,
  ease: "power4.out",
  repeat: -1,
})
var finalloaderanimation = () => {
  var tl01 = gsap.timeline();
  tl01.to(".counter", {
    delay: 0.4,
    opacity: 0,
    duration: 0.3,
    ease: "power4",
  });
  tl01.to(
    ".loaderrighttext",
    {
      x: 200,
      opacity: 0,
      duration: 1.5,
      ease: "power4",
    },
    "a"
  );
  tl01.to(
    ".loderlefttext",
    {
      x: -200,
      opacity: 0,
      duration: 1.5,
      ease: "power4",
    },
    "a"
  );
  tl01.to(
    ".loaderlogoimg",
    {
      y: 0,
      duration: 1,
      ease: "power4.Out",
    },
    "a"
  );
  tl01.to(
    ".loaderlogo",
    {
      opacity: 0,
      duration: 0.8,
      ease: "power4.Out",
    },
    "+=0.6",
    "b"
  );
  tl01.to(
    "#loader",
    {
      y: -1000,
      duration: 0.5,
      ease: "power4.in",
    },
    "b"
  );
  tl01.to(
    ".landingheading h1",
    {
      delay: 0.4,
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power4.out",
    },
    "b"
  );
  tl01.to(
    ".landingpara",
    {
      opacity: 1,
      duration: 0.5,
    },
    "-=0.2"
  );
  tl01.to(
    ".cta",
    {
      opacity: 1,
      duration: 0.5,
    },
    "<"
  );
};

var counterstart = () => {
  var count = 0;
  var counternumber = document.querySelector(".counternumber h1");
  var loaderinner = document.querySelector(".loaderinner");
  var counter = setInterval(() => {
    if (count >= 100) {
      counternumber.textContent = 100 + "%";
      loaderinner.style.width = 100 + "%";
      clearInterval(counter);
      finalloaderanimation();
    } else {
      counternumber.textContent = `${count}%`;
      loaderinner.style.width = `${count}%`;
      count += Math.random().toFixed() * 10;
    }
  }, 50);
};
gsap.to("span", {
  y: 0,
  opacity: 1,
  duration: 1.2,
  stagger: 0.032,
  ease: "power4.out",
  onComplete: function () {
    gsap.to(".counter", {
      opacity: 1,
      duration: 0.6,
      ease: "power4.out",
    });
    counterstart();
  },
});


const container = document.querySelector(".img-container");
const totalFrames = 95;
const imagePath = "./Frames/scene";

for (let i = 1; i <= totalFrames; i++) {
  const img = document.createElement("img");
  img.src = `${imagePath}${String(i).padStart(5, "0")}.png`;  // Adjust the padding to 5
  container.appendChild(img);
}

const frames = document.querySelectorAll(".img-container img");

frames[0].classList.add("active");
gsap.set(".transitionslide", { pointerEvents: "none" });
gsap.to("#page1", {
  scrollTrigger: {
    trigger: "#page1",
    scroller: "main",
    start: "top 0%",
    end: isMobile  ? 'top -760%': `top -2620%`,
    pin: true,
  },
});

gsap.to(".landing-items", {
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".landing-items",
    scroller: "main",
    start: isMobile  ? 'top -10%': "top -180%",
    end: isMobile  ? 'top -20%': `top -240%`,
    scrub: 2,
  },
});

gsap.to(".img-container img", {
  scrollTrigger: {
    trigger: ".img-container img",
    scroller: "main",
    start: "top 0%",
    end: isMobile  ? 'top -200%': `top -1600%`,
    scrub: 0.0000000000001,
    onUpdate: (self) => {
      const frameIndex = Math.floor(self.progress * (totalFrames - 1));
      frames.forEach((frame, index) => {
        frame.classList.toggle("active", index === frameIndex);
      });
    },
  },
});
gsap.to(".toscrolltext", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".toscrolltext",
    scroller: "main",
    start: "top -0%",
    end:  `top -10%`,
    scrub: 2,
  },
});
gsap.to(".transitionimg", {
  opacity: 0.7,
  scrollTrigger: {
    trigger: ".transitionimg",
    scroller: "main",
    start: isMobile  ? 'top -250%': "top -1270%",
    end: isMobile  ? 'top -340%': `top -1400%`,
    scrub: 2,
  },
});

var tl = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -280%': `top -1400%`,
    end: isMobile  ? 'top -350%': `top -1650%`,
    scrub: 2,
  },
});
var antl = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -370%': `top -1450%`,
    end: isMobile  ? 'top -400%': `top -1500%`,
    scrub: 2,
  },
});
antl.to(
  ".mainlogo",
  {
    fill: "#0b0b0b",
  },
  "a"
);
antl.to(
  ".logocontainer",
  {
    backgroundColor: "#00ff00",
  },
  "a"
);
antl.to(
  ".navlink i",
  {
    color: "#0b0b0b",
  },
  "a"
);
gsap.to(".transitionslide", {
  backgroundColor: "#f3fcf0",
  scrollTrigger: {
    trigger: ".transitionslide",
    scroller: "main",
    start: isMobile  ? 'top -260%': `top -1300%`,
    end: isMobile  ? 'top -290%': `top -1340%`,
    scrub: 2,
  },
});
gsap.to(".screen", {
  backgroundColor: "#0b0b0b",
  scrollTrigger: {
    trigger: ".screen",
    scroller: "main",
    start: isMobile  ? 'top -260%': `top -1300%`,
    end: isMobile  ? 'top -290%':`top -1340%`,
    scrub: 2,
  },
});
tl.to(
  ".transitionimg",
  {
    scaleX: isMobile  ? 0.1: 0.08,
    scaleY: isMobile  ? 0.05 : 0.2,
    opacity: 0,
    ease: "power4",
  },
  "a"
);
tl.to(
  ".screen",
  {
    scale: 1,
    ease: "power4",
  },
  "a"
);

var tl2 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -316%': `top -1500%`,
    end: isMobile  ? 'top -330%': `top -1800%`,
    scrub: 2,
  },
});
tl2.to(".screen", {
  backgroundColor: "#fff",
  ease: "power4",
});

var tl3 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -310%': `top -1520%`,
    end:  isMobile  ? 'top -340%': `top -1620%`,
    scrub: 2,
  },
});

tl3.to(
  ".transitionimgsecond",
  {
    opacity: 1,
    ease: "power4",
  },
  "f"
);
gsap.set(".transitionslideuppertext h1", { y: 50, opacity: 0 });
gsap.set(".transitionslidelowertext h1", { y: 50, opacity: 0 });
var tl4 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -320%':`top -1570%`,
    end: isMobile  ? 'top -340%':`top -1770%`,
    scrub: 2,
  },
});
tl4.to(
  ".imgsecondtext",
  {
    opacity: 1,
    ease: "power4",
  },
  "e"
);
tl4.to(
  ".ipadscreen",
  {
    opacity: 1,
    ease: "power4",
  },
  "e"
);
tl4.to(
  ".transitionslideuppertext h1",
  {
    y: 0,
    opacity: 1,
    ease: "power4",
  },
  "e"
);
tl4.to(
  ".transitionslidelowertext h1",
  {
    y: 0,
    opacity: 1,
    ease: "power4",
  },
  "e"
);
tl4.to(
  ".transitionslide",
  {
    pointerEvents: "visible",
  },
  "e"
);

var ipadscreen = {
  transitionscreen: document.querySelector(".transitionslide"),
};
var movescreen = (elem) => {
  var x = (elem.clientX / window.innerWidth - 0.5) * 2;
  var y = (elem.clientY / window.innerHeight - 0.5) * 2;

  gsap.to(".screen", {
    rotationY: x,
    rotationX: -y,
    duration: 0.8,
  });
  gsap.to(".mobscreen", {
    rotationY: x * 1.3,
    rotationX: -y * 1.3,
    duration: 0.8,
  });
};
ipadscreen.transitionscreen.addEventListener("mousemove", (elem) =>
  movescreen(elem)
);

var tl5 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -370%': `top -1760%`,
    end: isMobile  ? 'top -440%': `top -1970%`,
    scrub: 2,
  },
});

tl5.to(
  ".screen",
  {
    x: isMobile  ? '-105%': "-35%",
    ease: "power4",
  },
  "s"
);
tl5.to(
  ".mobscreen",
  {
    x: isMobile  ? '-120%': "-280%",
    ease: "power4",
  },
  "s"
);
tl5.to(
  ".transitionslideuppertext",
  {
    transform: "translateY(-100%)",
    ease: "power4",
  },
  "s"
);
tl5.to(
  ".transitionslidelowertext",
  {
    transform: "translateY(-100%)",
    ease: "power4",
  },
  "s"
);

var tl6 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -420%': `top -1890%`,
    end: isMobile  ? 'top -440%': `top -1950%`,
    scrub: 2,
  },
});

tl6.to(
  ".notification",
  {
    transform: "translateY(0%)",
    ease: "power4",
  },
  "a"
);
tl6.to(
  ".iphoneuppertext h2 ",
  {
    opacity: 1,
    ease: "power4",
  },
  "a"
);
tl6.to(
  ".iphonebatteryitem",
  {
    opacity: 1,
    ease: "power4",
  },
  "a"
);

var tl7 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -450%': `top -2000%`,
    end: isMobile  ? 'top -530%': `top -2150%`,
    scrub: 2,
  },
});

tl7.to(
  ".notification",
  {
    transform: "translateY(-170%)",
    ease: "power4",
  },
  "s"
);
tl7.to(
  ".featurepicture",
  {
    opacity: 1,
    ease: "power4",
  },
  "s"
);
tl7.to(
  ".ipadimage",
  {
    opacity: 0,
    ease: "power4",
  },
  "s"
);
tl7.to(
  ".screen",
  {
    x: isMobile  ? '-50%': "0%",
    ease: "power4",
  },
  "s"
);
tl7.to(
  ".mobscreen",
  {
    x: "0%",
    ease: "power4",
  },
  "s"
);

var tl8 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -540%': `top -2190%`,
    end: isMobile  ? 'top -620%': `top -2300%`,
    scrub: 2,
  },
});

tl8.to(
  ".screen",
  {
    x: isMobile  ? '3%': "35%",
    ease: "power4",
  },
  "s"
);

tl8.to(
  ".featurepicture",
  {
    x: isMobile  ? '-110%': "-140%",
    scaleX: 1.7,
    scaleY: 1.7,
    ease: "power4",
  },
  "s"
);
tl8.to(
  ".transitionslideuppertext",
  {
    transform: "translateY(-200%)",
    ease: "power4",
  },
  "s"
);
tl8.to(
  ".transitionslidelowertext",
  {
    transform: "translateY(-200%)",
    ease: "power4",
  },
  "s"
);

var tl9 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -630%': `top -2320%`,
    end: isMobile  ? 'top -660%': `top -2420%`,
    scrub: 2,
  },
});

tl9.to(
  ".screen",
  {
    x: isMobile  ? '-50%': "0%",
    ease: "power4",
  },
  "s"
);

tl9.to(
  ".featurepicture",
  {
    x: isMobile  ? '0%': "8%",
    scaleX: 1,
    scaleY: 1,
    ease: "power4",
  },
  "s"
);
var tl10 = gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    start: isMobile  ? 'top -670%': `top -2450%`,
    end: isMobile  ? 'top -750%': `top -2600%`,
    scrub: 2,
  },
});
tl10.to(
  ".featurepicture",
  {
    opacity: 0,
    ease: "power4",
  },
  "a"
);
tl10.to(
  ".ipadimage",
  {
    opacity: 1,
    ease: "power4",
  },
  "a"
);
tl10.to(
  ".transitionslideuppertext",
  {
    transform: "translateY(-300%)",
    ease: "power4",
  },
  "a"
);
tl10.to(
  ".transitionslidelowertext",
  {
    transform: "translateY(-300%)",
    ease: "power4",
  },
  "a"
);

var productsectionanimation = () => {
  var product = document.querySelectorAll(".product");

  var showgallery = (elem) => {
    var mainproductimg = elem.querySelectorAll(".mainproductimg img");
    var productgalleryimg = elem.querySelectorAll(".productgalleryimg");
    var tl12 = gsap.timeline({ paused: true, reversed: true });

    tl12.to(
      mainproductimg,
      {
        duration: 1.2,
        scale: 1.1,
        ease: "power4.inOut",
      },
      "a"
    );
    tl12.to(
      productgalleryimg,
      {
        duration: 1.2,
        transform:  isMobile  ? "translateY(120%)": "translateY(0%)",
        ease: "power4.inOut",
        stagger: 0.04,
      },
      "a"
    );

    elem.addEventListener("mouseenter", function () {
      tl12.play();
    });
    elem.addEventListener("mouseleave", function () {
      tl12.reverse();
    });

    changeimage(elem);
  };

  var changeimage = (elem) => {
    var mainproductimg = elem.querySelectorAll(".mainproductimg img");
    var productgalleryimg = elem.querySelectorAll(".productgalleryimg");

    productgalleryimg.forEach((elem) => {
      elem.addEventListener("click", (elem) => {
        const imgsrc = elem.target.src;
        var tl13 = gsap.timeline();
        tl13.to(mainproductimg, {
          duration: 0.48,
          autoAlpha: 0,
          ease: "power4.Out",
        });
        tl13.set(mainproductimg, { attr: { src: imgsrc } });
        tl13.to(mainproductimg, {
          duration: 0.48,
          autoAlpha: 1,
          ease: "power4.Out",
        });
      });
    });
  };
  window.onload = () => product.forEach((elem) => showgallery(elem));
};

productsectionanimation();

var reviewanimation = () => {
  var reviews = [
    {
      name: "Navdeep",
      review:
        "Mivi Earbuds Exceed Expectations! Exceptional Sound Clarity, Snug Fit For Active Use, And Impressive Battery Life. A Must-Have For Music Lovers On The Go!",
    },
    {
      name: "Aravindo",
      review:
        "Mivi Soundbars Elevate Home Audio With Cinematic Sound, Sleek Design, And Powerful Bass. Transform Your Home Space Into An Entertainment Hub!",
    },
    {
      name: "Ananya",
      review:
        "Mivi Speakers Redefine Audio Excellence With Crystal-Clear Sound, Stylish Design, And Effortless Portability. Elevate Your Listening Experience To New Heights.",
    },
  ];

  var currentIndex = 0;

  var reviewcycle = () => {
    var tl14 = gsap.timeline({});

    tl14.to(
      ".borderbox",
      {
        width: "0",
        duration: 1,
        ease: "power4",
      },
      "a"
    );
    tl14.to(
      ".reviewnote",
      {
        opacity: 0,
        duration: 1,
        ease: "power4",
      },
      "a"
    );
    tl14.to(
      ".reviewnumber",
      {
        opacity: 0,
        duration: 0.7,
        ease: "power4",
      },
      "a"
    );
    tl14.to(
      ".reviewperson",
      {
        opacity: 0,
        duration: 0.5,
        ease: "power4",
      },
      "a"
    );
    tl14.to(
      ".borderbox",
      {
        width:  isMobile  ? '50vw': "28vw",
        duration: 1.6,
        ease: "power4.out",
        onStart: function () {
          updateReview();
        },
      },
      "b"
    );
    tl14.to(
      ".reviewperson",
      {
        opacity: 1,
        duration: 1,
        ease: "power4",
      },
      "b"
    );
    tl14.to(
      ".reviewnumber",
      {
        opacity: 1,
        duration: 1,
        ease: "power4",
      },
      "b"
    );
    tl14.to(
      ".reviewnote",
      {
        opacity: 1,
        duration: 2.6,
        ease: "power4",
      },
      "b"
    );

    var updateReview = () => {
      var reviewnote = document.querySelector(".reviewnote");
      var reviewpersonname = document.querySelector(".reviewpersonname");
      var square = document.querySelectorAll(".square");

      reviewnote.innerHTML = `<h1>${reviews[currentIndex].review}</h1>`;
      reviewpersonname.innerHTML = `<h1>${reviews[currentIndex].name}</h1>`;
      square.forEach((elem) => {
        elem.style.backgroundColor = "transparent";
      });

      square[currentIndex].style.backgroundColor = "#00ff00";

      currentIndex = (currentIndex + 1) % reviews.length;
    };
  };

  setInterval(reviewcycle, 5000);
};

reviewanimation();

var aboutusanimation = () => {
  var aboutuscontentcontainer = document.querySelectorAll(
    ".aboutuscontentcontainer"
  );
  var active = 0;

  aboutuscontentcontainer.forEach((elem, index) => {
    elem.addEventListener("mouseenter", () => {
      if (elem.classList.contains("active")) {
        return;
      }

      aboutuscontentcontainer.forEach((elem) => {
        elem.classList.remove("active");
      });

      elem.classList.add("active");

      aboutuscontentcontainer.forEach((elem, index) => {
        var tl15 = gsap.timeline();
        tl15.to(
          `.content${index + 1}`,
          {
            flexGrow: 0,
            duration: 0.6,
            ease: "power4.out",
          },
          "a"
        );
        tl15.to(
          `.img${index + 1}`,
          {
            width:  isMobile  ? '50%': "20%",
            duration: 0.6,
            ease: "power4.out",
          },
          "a"
        );
        tl15.to(
          `.content${index + 1} h1`,
          {
            scale: 0.5,
            opacity: 1,
            duration: 0.6,
            ease: "power4.out",
          },
          "a"
        );
      });

      var tl15 = gsap.timeline();
      tl15.to(
        `.content${index + 1}`,
        {
          flexGrow: 1,
          duration: 0.6,
          ease: "power4.out",
        },
        "a"
      );
      tl15.to(
        `.img${index + 1}`,
        {
          width:  isMobile  ? '97%': "50%",
          duration: 0.6,
          ease: "power4.out",
        },
        "a"
      );
      tl15.to(
        `.content${index + 1} h1`,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        },
        "a"
      );
    });
  });

  aboutuscontentcontainer[0].classList.add("active");

  var tl15 = gsap.timeline();
  tl15.to(
    `.content1`,
    {
      flexGrow: 1,
      duration: 0.6,
      ease: "power4.out",
    },
    "a"
  );
  tl15.to(
    `.img1`,
    {
      width:  isMobile  ? '97%': "50%",
      duration: 0.6,
      ease: "power4.out",
    },
    "a"
  );
  tl15.to(
    `.content1 h1`,
    {
      scale: 1,
      duration: 0.6,
      ease: "power4.out",
    },
    "a"
  );
};
if(!isMobile) aboutusanimation();
var menuanimation = () => {
  var menucontainer = document.querySelector(".menu-container");
  var menuflag = false;
  var menu = document.querySelector(".menu");
  var menuclose = document.querySelector(".close");
  const toggle = (action) => {
    !action ? open() : close();
  };

  var tl18 = gsap.timeline({ paused: true, default: { ease: "linear" } });

  const animatemenu = () => {
    gsap.set(".menu-container", { pointerEvents: "none" });

    tl18.from(
      ".menuframe",
      {
        y: "-102%",
        duration: 0.15,
      },
      "a"
    );
    tl18.from(
      ".menulink h4 , .menutitle h4",
      {
        y: "-102%",
        duration: 0.5,
        stagger: 0.012,
      },
      "-0.02"
    );
    tl18.to(
      ".mainlogo",
      {
        attr: {
          fill: "#0b0b0b",
        },
        duration: 0.4,
      },
      "a"
    );
    tl18.to(
      ".navlink",
      {
        display: "none",
        duration: 0.4,
      },
      "a"
    );
    tl18.to(".close", {
      display: "block",
      duration: 0.4,
    });
  };

  const open = () => {
    if (tl18) tl18.play();
    menuflag = true;
    menucontainer.style.pointerEvents = "auto";
  };
  const close = () => {
    if (tl18) tl18.reverse();
    menuflag = false;
    menucontainer.style.pointerEvents = "none";
  };

  menu.addEventListener("click", () => {
    toggle(menuflag);
  });
  menuclose.addEventListener("click", () => {
    toggle(true);
  });

  animatemenu();
};

menuanimation();


var clippath = {
  top: "polygon(0 0, 100% 0, 100% 0, 0 0)",
  full: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" ,
  bottom: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
}

var categorylistitems = document.querySelectorAll(".categorylistitems");
var categorypictures = document.querySelectorAll(".categorypictures");
gsap.set(".categorypictures", {clipPath: clippath.top});

const addEventListener = ()=>{
  categorylistitems.forEach((elem,index)=>{
    const image = categorypictures[index]?.children;
    elem.addEventListener("mouseenter",()=>{
      for(var i=0; i<image.length ; i++){
        var tl20 = gsap.timeline({default:{duration: 0.64, ease: "expo.inOut", overwrite: true}});
        tl20.to(categorypictures[index],{
          clipPath: clippath.full,
        });

        categorylistitems.forEach(otherelem =>{
          otherelem === elem ? otherelem.style.fontWeight = 600 : otherelem.style.opacity = 0.5;
        })
      }
    })
    elem.addEventListener("mouseleave",()=>{
      for(var i=0; i< image.length ; i++){
        var tl20 = gsap.timeline({default:{duration: 0.64, ease: "expo.inOut", overwrite: true}});
        tl20.to(categorypictures[index],{
          clipPath: clippath.bottom,
          onComplete: function(){
            gsap.set(categorypictures[index],{
              clipPath: clippath.top,
            })
          }
        });

        categorylistitems.forEach(otherelem =>{
            otherelem === elem ? otherelem.style.fontWeight = 200 : otherelem.style.opacity = 1;
        })
      }
    })
  })
}

addEventListener();


gsap.from("#page2-wrapper",{
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
  scrollTrigger:{
    trigger: "#page2-wrapper",
    scroller: "main",
    start: "top 80%",
  }
})