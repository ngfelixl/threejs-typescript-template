import { AxesHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createBackground } from "./components/background";
import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./lights";
import { createCube } from "./objects/cube";
import { createControls } from "./systems/controls";
import { Loop, Updatable } from "./systems/loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/resizer";

export class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: Updatable<OrbitControls>;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new Error("No container element found");
    }
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);
  
    this.controls = createControls(this.camera, container);
    this.loop.updatables.push(this.controls);

    this.scene.background = createBackground();

    const axesHelper = new AxesHelper(1);
    const lights = createLights();
    const cube = createCube();

    this.scene.add(lights, axesHelper, cube);

    new Resizer(container, this.camera, this.renderer);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();

    // Render data on changes (e.g. when the user moves the camera, or also possible on user input)
    // this.controls.addEventListener('change', () => {
    //   this.render();
    // })
  }

  stop() {
    this.loop.stop();
  }
}
