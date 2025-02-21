'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Image1 from '@/public/Assets/model1_img0.jpg';
import Image2 from '@/public/Assets/model2_img0.jpg';
import Image3 from '@/public/Assets/model3_img0.jpg';
import Image4 from '@/public/Assets/model4_img0.jpg';
import Center from '@/components/Center';
import Header from '@/components/Header';

export default function Featured() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const orbitControlsRef = useRef(null);
  const meshRef = useRef(null);
  const [selectedTexture, setSelectedTexture] = useState(Image1);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const init = () => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / 1.5 / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1, 30);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 4 * 3);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const light = new THREE.HemisphereLight(0xffffff, 0x111111, 3);
    scene.add(light);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.autoRotate = true;
    orbitControlsRef.current = orbitControls;

    const loader = new GLTFLoader();
    loader.load('/Assets/model1.glb', (gltf) => {
      const object = gltf.scene;

      object.traverse((child) => {
        if (child.isMesh) {
          meshRef.current = child;
          updateTexture(selectedTexture);
          
          // Set the base color of the material without changing the texture
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.set(selectedColor);
          }
        }
      });
      scene.add(object);
      onWindowResize();
    });

    window.addEventListener('resize', onWindowResize);
  };

  const onWindowResize = () => {
    if (!cameraRef.current || !rendererRef.current) return;
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth / 2, window.innerHeight / 4 * 3);
  };

  const updateTexture = (imagePath) => {
    if (meshRef.current) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(imagePath, (texture) => {
        texture.encoding = THREE.sRGBEncoding;
        texture.flipY = false;
        meshRef.current.material.map = texture; // Set the texture
        meshRef.current.material.needsUpdate = true; // Mark the material for an update
      });
    }
  };

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    requestAnimationFrame(animate);
    orbitControlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  useEffect(() => {
    if (!sceneRef.current) {
      init();
      animate();
    }
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [animate]);

  useEffect(() => {
    updateTexture(selectedTexture);
  }, [selectedTexture]);

  useEffect(() => {
    console.log(meshRef);
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.color.set(selectedColor); // Update only the color
    }
  }, [selectedColor]);

  return (
    <div className='flex justify-center flex-col w-screen items-center'>
      <Header />
      <Center>
        <div className='preview'>
          <div className='controls'>
            <div>
              <p>Texture</p>
              <select value={selectedTexture} onChange={(e) => setSelectedTexture(e.target.value)}>
                <option value={Image1}>Image 1</option>
                <option value={Image2}>Image 2</option>
                <option value={Image3}>Image 3</option>
                <option value={Image4}>Image 4</option>
              </select>
            </div>
            <div>
              <p>Color</p>
              <input type='color' value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
            </div>
          </div>
          <div ref={containerRef} />
        </div>
      </Center>
    </div>
  );
}
