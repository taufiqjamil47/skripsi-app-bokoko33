import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDisvToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }
  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".second-sub"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.to("preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });
      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.box.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.roomChildren.box.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      }
      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: -100,
          stagger: 0.07,
          ease: "back.out(1.7)",
          onComplete: resolve,
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "same"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      if (this.device === "desktop") {
        this.secondTimeline
          .to(".intro-text .animatedis", {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          })
          .to(
            ".arrow-svg-wrapper",
            {
              opacity: 0,
            },
            "fadeout"
          )
          .to(
            this.room.position,
            {
              x: 0,
              y: 0,
              z: 0,
              ease: "power1.out",
            },
            "same"
          )
          .to(
            this.roomChildren.box.rotation,
            {
              y: 2 * Math.PI + Math.PI / 4,
            },
            "same"
          )
          .to(this.roomChildren.box.scale, {
            x: 5,
            y: 5,
            z: 5,
          })
          .to(
            ".hero-main-title .animatedis",
            {
              yPercent: -100,
              stagger: 0.07,
              ease: "back.out(1.7)",
            },
            "same"
          )
          .to(
            ".hero-main-description .animatedis",
            {
              yPercent: -100,
              stagger: 0.07,
              ease: "back.out(1.7)",
            },
            "same"
          )
          .to(
            ".hero-second-subheading .animatedis",
            {
              yPercent: -100,
              stagger: 0.07,
              ease: "back.out(1.7)",
            },
            "same"
          )
          .to(
            ".second-sub .animatedis",
            {
              yPercent: -100,
              stagger: 0.07,
              ease: "back.out(1.7)",
            },
            "same"
          )
          .to(this.camera.orthographicCamera.position, { y: 0.5 })
          .to(
            this.roomChildren.box.position,
            {
              x: 0.6387,
              y: 5,
              z: 1.3243,
            },
            "same"
          )
          .set(this.roomChildren.box.position, {
            y: 0.8,
            ease: "back.out",
          })
          .to(this.roomChildren.box.scale, {
            x: 0,
            y: 0,
            z: 0,
            ease: "back.out",
          })
          .to(this.roomChildren.gedunga.scale, {
            x: 6,
            y: 1,
            z: 2,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.gedunga1.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.gedunga2.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.gedunga3.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.gedunga4.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.rg.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.rks.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.tu.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.uks.scale, {
            x: 2,
            y: 1,
            z: 2,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.warung.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          });
      } else {
        this.secondTimeline.to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power1.out",
        });
      }
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      console.log("addedEvent");
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      console.log("swipe UPs");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(0.2, 0.2, 0.2);
    } else {
      this.room.scale.set(0.07, 0.07, 0.07);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }
    if (this.scaleFlag) {
      this.scale();
    }
  }
}
