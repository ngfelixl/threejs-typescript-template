import { PerspectiveCamera, WebGLRenderer } from "three";

function setSize(container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
  // Set the camera's aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);

  // set the pixel ratio (for mobile devices)
  renderer.setPixelRatio(window.devicePixelRatio);

}

export class Resizer {
  constructor(container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    setSize(container, camera, renderer);

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer);
      this.onResize();
    });
  }

  onResize(): void {};
}