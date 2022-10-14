import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export type Updatable<T = unknown> = T & { tick?: (delta: number) => void };

export class Loop {
  updatables: Updatable[] = [];
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private clock = new Clock();

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = this.clock.elapsedTime;
    // Code to update animations will go here
    for (const object of this.updatables) {
      object.tick?.(delta);
    }
  }
}