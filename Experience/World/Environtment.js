import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environtment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    this.sunLight.position.set(-2.5, 3, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      console.log(this.sunLight);
      GSAP.to(this.sunLight.color, {
        b: 0.4666666666666667,
        g: 0.21568627450980393,
        r: 0.23137254901960785,
      });
      GSAP.to(this.ambientLight.color, {
        b: 0.4666666666666667,
        g: 0.21568627450980393,
        r: 0.23137254901960785,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 1,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }

  resize() {}

  update() {}
}
