import { Component, h, Element } from '@stencil/core';
import * as THREE from 'three';

@Component({
  tag: 'three-component',
  styleUrl: 'three-component.css',
  shadow: true,
})
export class ThreeComponent {
  @Element() hostElement: HTMLElement;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh;

  componentDidLoad() {
    // Set up the scene, camera, and renderer
    const width = this.hostElement.clientWidth;
    const height = this.hostElement.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(width, height);
    this.hostElement.shadowRoot.appendChild(this.renderer.domElement);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
    this.camera.position.z = 5;

    // Start animation
    this.animate();
    console.log(this.hostElement)
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    // Rotate the cube for some animation
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <div></div>; // The renderer will attach a canvas element here
  }
}
