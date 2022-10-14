# ThreeJS TypeScript Template

The motivation behind this repository is to provide an idea for a good structure for a threejs application. The structure is oriented on the book [Discover three.js](https://discoverthreejs.com/book) with the key difference that it uses typescript.

I've always struggled to find a sophisticated structure for my threejs apps because I always ended up in a centralized explicit configuration of the scene. If we imagine that the objects in the scene form a tree structure, it would be nice if the components only have knowledge about their direct parents or children.

Another important aspect of this setup is, that it hides the three.js components behind the `World` interface. This makes it compatible to any framework, like Angular or React, and ensures that there is a clear boundary between "Web"- and "Three"-development.

### Setup

This repository uses [vite](https://vitejs.dev/). Install the dependencies as usual with

```
npm install
```

then you can run the app  with

```
npm run dev
```

in development mode.

### Build and deployment

You can build the app with

```
npm run build
```

or run the compiled app in preview mode with

```
npm run preview
```

## Documentation

### World

The world provides an interface for non three developers to interact with the three scene. The world is the *root* scene. Here you can create cameras, the renderer, the loop (if necessary), lights, controls and objects that you want to put on your scene. It exposes three functions `render`, `start` and `stop`.

The render function is used to render the scene. This can happen either in the animationFrame loop or on user input. Use the `start` and `stop` methods if you want to start and stop the loop.

### CSG

There is the possibility to use constructive solid geometry (CSG) with three.js and TypeScript. CSG allows the user to union, intersect or subtract meshes from each. This allows the user to create much more complicated shapes easily. You can use the library [three-csg-ts](https://www.npmjs.com/package/three-csg-ts).

```ts
import { Mesh, BoxGeometry, SphereGeometry } from 'three';
import { CSG } from 'three-csg-ts';

const box = new Mesh(new BoxGeometry(2, 2, 2));
const sphere = new Mesh(new SphereGeometry(1.2, 8, 8));
box.updateMatrix();
sphere.updateMatrix();

const subRes = CSG.subtract(box, sphere);
const uniRes = CSG.union(box, sphere);
const intRes = CSG.intersect(box, sphere);
```
