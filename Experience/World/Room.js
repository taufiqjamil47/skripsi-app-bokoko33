import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
    // this.setAnimation();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }

      if (child.name === "Glass1") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughtness = 0;
        child.material.color.set(0x279fdd);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }

      if (child.name === "Cube046") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.windows,
        });
      }

      child.scale.set(0, 0, 0);
      if (child.name === "Box") {
        // child.scale.set(1, 1, 1);
        child.position.set(0, 0, 0);
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    const width = 2.5;
    const height = 0.2;
    const intensity = 1;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(-10.6235, 0.3, 8.06713);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 3.31;
    this.actualRoom.add(rectLight);

    this.roomChildren["reclight"] = rectLight;

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.2, 0.2, 0.2);
    this.actualRoom.rotateY = 3;
  }

  // setAnimation() {
  //   this.mixer = new THREE.AnimationMixer(this.actualRoom);
  //   this.swin = this.mixer.clipAction(this.room.animations[0]);
  //   this.swin.play();
  // }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.02;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
