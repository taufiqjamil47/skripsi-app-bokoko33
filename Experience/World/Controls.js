import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });
    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;
    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    // First Section ------------------------------------------
    this.firstMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".first-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    this.firstMoveTimeline.to(this.room.position, {
      x: () => {
        return this.sizes.width * 0.003;
      },
    });

    // Second Section ------------------------------------------
    this.secondMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".second-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })
      .to(
        this.room.position,
        {
          x: () => {
            return -this.sizes.width * 0.002;
          },
          z: () => {
            return this.sizes.height * 0.002;
          },
        },
        "same"
      )
      .to(
        this.room.scale,
        {
          x: 0.3,
          y: 0.3,
          z: 0.3,
        },
        "same"
      )
      .to(
        this.rectLight,
        {
          width: 0.5 * 4,
          heigth: 0.2 * 4,
        },
        "same"
      );

    // Third Section ------------------------------------------
    this.thirdMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".third-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    }).to(this.camera.orthographicCamera.position, {
      y: 0,
      x: -4.5,
    });

    this.sections = document.querySelectorAll(".section");
    this.sections.forEach((section) => {
      if (section.classList.contains("right")) {
        GSAP.to(section, {
          borderTopLeftRadius: 10,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 0.6,
          },
        });
        GSAP.to(section, {
          borderBottomLeftRadius: 700,
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      } else {
        GSAP.to(section, {
          borderTopRightRadius: 10,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 0.6,
          },
        });
        GSAP.to(section, {
          borderBottomRightRadius: 700,
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    });

    /* Circle Animations */
    /*First Circle */
    this.firstMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".first-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    }).to(this.circleFirst.scale, {
      x: 5,
      y: 5,
      z: 5,
    });

    // Second Circle ------------------------------------------
    this.secondMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".second-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })
      .to(this.circleSecond.scale, {
        x: 5,
        y: 5,
        z: 5,
      })
      .to(
        this.room.position,
        {
          y: 0.3,
        },
        "same"
      );

    // Third Circle ------------------------------------------
    this.thirdMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".third-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    }).to(this.circleThird.scale, {
      x: 5,
      y: 5,
      z: 5,
    });
  }

  resize() {}

  update() {}
}
