import './style.css';
import { World } from './world/world';

function main() {
  const container: HTMLElement | null = document.querySelector('#scene-container');
  if (!container) {
    throw new Error('No container element found');
  }
  const world = new World(container);

  world.render();
  world.start();
}

main();
