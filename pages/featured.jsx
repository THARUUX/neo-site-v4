'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Image1 from '@/public/Assets/finel artwork-1 [Recovered]-01.webp';
import Image2 from '@/public/Assets/finel artwork-1 [Recovered]-02.webp';
import Image3 from '@/public/Assets/finel artwork-1 [Recovered]-03.webp';
import Image4 from '@/public/Assets/finel artwork-1 [Recovered]-04.webp';
import Image5 from '@/public/Assets/finel artwork-1 [Recovered]-05.webp';
import Image6 from '@/public/Assets/finel artwork-1 [Recovered]-06.webp';
import Image7 from '@/public/Assets/finel artwork-1 [Recovered]-07.webp';
import Image8 from '@/public/Assets/finel artwork-1 [Recovered]-08.webp';
import Image9 from '@/public/Assets/finel artwork-1 [Recovered]-09.webp';
import Image10 from '@/public/Assets/finel artwork-1 [Recovered]-10.webp';
import Image11 from '@/public/Assets/finel artwork-1 [Recovered]-11.webp';
import Image12 from '@/public/Assets/finel artwork-1 [Recovered]-12.webp';
import Image13 from '@/public/Assets/finel artwork-1 [Recovered]-13.webp';
import Image14 from '@/public/Assets/finel artwork-1 [Recovered]-14.webp';
import Image15 from '@/public/Assets/finel artwork-1 [Recovered]-15.webp';
import Image16 from '@/public/Assets/finel artwork-1 [Recovered]-16.webp';
import Image17 from '@/public/Assets/finel artwork-1 [Recovered]-17.webp';
import Image18 from '@/public/Assets/finel artwork-1 [Recovered]-18.webp';
import Image19 from '@/public/Assets/finel artwork-1 [Recovered]-19.webp';
import Image20 from '@/public/Assets/finel artwork-1 [Recovered]-20.webp';
import Image21 from '@/public/Assets/finel artwork-1 [Recovered]-21.webp';
import Image22 from '@/public/Assets/finel artwork-1 [Recovered]-22.webp';
import Image23 from '@/public/Assets/finel artwork-1 [Recovered]-23.webp';
import Image24 from '@/public/Assets/finel artwork-1 [Recovered]-24.webp';
import Image25 from '@/public/Assets/finel artwork-1 [Recovered]-25.webp';
import Image26 from '@/public/Assets/finel artwork-1 [Recovered]-26.webp';
import Image27 from '@/public/Assets/finel artwork-1 [Recovered]-27.webp';
import Image28 from '@/public/Assets/finel artwork-1 [Recovered]-28.webp';
import Image29 from '@/public/Assets/finel artwork-1 [Recovered]-29.webp';
import Image30 from '@/public/Assets/finel artwork-1 [Recovered]-30.webp';
import Image31 from '@/public/Assets/finel artwork-1 [Recovered]-31.webp';
import Image32 from '@/public/Assets/finel artwork-1 [Recovered]-32.webp';
import Image33 from '@/public/Assets/finel artwork-1 [Recovered]-33.webp';
import Image34 from '@/public/Assets/finel artwork-1 [Recovered]-34.webp';
import Image35 from '@/public/Assets/finel artwork-1 [Recovered]-35.webp';
import Image36 from '@/public/Assets/finel artwork-1 [Recovered]-36.webp';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Image from 'next/image';
import {  Modal , FileInput, Label, Select, Table } from "flowbite-react";
import { Dock , DockIcon } from '@/components/magicui/dock';

import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/magicui/dot-pattern';
import Footer from '@/components/Footer';
import { AnimatePresence } from 'framer-motion';
import * as motion from "motion/react-client"
import { FormInput } from 'lucide-react';

export default function Featured() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const orbitControlsRef = useRef(null);
  const [textureRef, setTextureRef] = useState('Image1'); // Set initial texture reference
  const [mesh, setMesh] = useState(null); // State to store the mesh
  const [color, setColor] = useState('#ffffff')
  const [openModal, setOpenModal] = useState(false);
  const [mugType, setMugType] = useState('White Mug');
  const [flipped, setFlipped] = useState(false);

  const images = {
    Image1,
    Image2,
    Image3,
    Image3 ,
    Image4 ,
    Image5 ,
    Image6 ,
    Image7 ,
    Image8 ,
    Image9 ,
    Image10,
    Image11,
    Image12,
    Image13,
    Image14,
    Image15,
    Image16,
    Image17,
    Image18,
    Image19,
    Image20,
    Image21,
    Image22,
    Image23,
    Image24,
    Image25,
    Image26,
    Image27,
    Image28,
    Image29,
    Image30,
    Image31,
    Image32,
    Image33,
    Image34,
    Image35,
    Image36,
  };

  const product1Price = 750;
  const product1Weight = 350;

  const product2Price = 900;
  const product2Weight = 300;

  const deliveryFee = 400;

  const init = () => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(70, containerRef.current.clientWidth /  containerRef.current.clientWidth, 1, 100);
    camera.position.set(1, 7, 15);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const canvasWidth = containerRef.current.clientWidth; 
    const canvasHeight = containerRef.current.clientWidth; 
    renderer.setSize(canvasWidth, canvasHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 4);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load('Assets/model1.glb', (gltf) => {
      const object = gltf.scene;
      object.scale.set(1, 1, 1.05);
      object.position.x -= 2.1;
      scene.add(object);

      object.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.name === "Mug_Porcelain_PBR001_0") {
          const material = obj.material;
          setMesh(obj);
          material.map = convertImageToTexture(images[textureRef]); 
          material.needsUpdate = true;
        } else if (obj instanceof THREE.Mesh && obj.name === "Mug_Porcelain_PBR002_0"){
          const material = obj.material;

          material.color.set(color);
        }
      });
    });

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.25;
    orbitControlsRef.current = orbitControls;

    const animate = () => {
      requestAnimationFrame(animate);
      orbitControls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  const convertImageToTexture = (imagePath) => {
    console.log("Loading texture from:", imagePath); // Log the image path
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      imagePath.src,
      (tex) => {
        //console.log("Texture loaded:", tex);
      },
      undefined,
      (err) => {
        //console.error("Error loading texture:", err); // Log any loading error
      }
    );
  
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = true;
    return texture;
  };

  useEffect(() => {
    init();
    return () => {
      const renderer = rendererRef.current;
      if (renderer) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (mesh) {
      const material = mesh.material; // Ensure `mesh` is accessible here
  
      if (material) {
        // Clean up the previous texture if necessary
        if (material.map) {
          material.map.dispose(); // Dispose of the previous texture
        }
  
        // Load the new texture and handle any errors
        const newTexture = convertImageToTexture(images[textureRef]);
        if (newTexture) {
          material.map = newTexture;
          material.needsUpdate = true; // Ensure the material updates
        } else {
          console.error("Failed to load the texture:", textureRef);
        }
      }
    }
  }, [textureRef, mesh]);
  
  useEffect(() => {
    if (mesh) {
      const material = mesh.material;
      if (material) {
        // Update color for the second mesh
        const secondMesh = sceneRef.current.getObjectByName("Mug_Porcelain_PBR002_0");
        if (secondMesh) {
          secondMesh.material.color.set(color);
          secondMesh.material.needsUpdate = true;
        }
      }
    }
  }, [color, mesh]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("Loading texture from:", imageUrl); // Log the image path
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(
        imageUrl,
        (tex) => {
          if (mesh) {
            const material = mesh.material; // Ensure `mesh` is accessible here
        
            if (material) {
              if (material.map) {
                material.map.dispose(); 
              }
                material.map = texture;
                material.needsUpdate = true; 
            }
          }
        },
        undefined,
        (err) => {
          //console.error("Error loading texture:", err); // Log any loading error
        }
      );
    }
  };

  return (
    <div className='flex justify-center flex-col w-screen items-center'>
      <Header />
      <Center>
        <div className='w-full py-16'>
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] z-[-1]",
            )}
          />
          <div className='text-2xl text-main-dark' data-aos="fade-right">Custom Mugs</div>
          <div className='py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores dolorum perferendis nam earum aliquid vitae perspiciatis mollitia? Perferendis magni quo atque vero ex necessitatibus repellat voluptate ratione voluptas iste.</div>
          <div className='w-full flex flex-col sm:flex-row my-5'>
            <div className='sm:w-1/2 w-full drop-shadow-2xl' ref={containerRef} />

            {/* CARD */}
            <div className='sm:w-1/2 w-full bg-white rounded-lg p-5'>
              <AnimatePresence mode="wait">
                {flipped === false && (
                  <motion.div
                    key="customize"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className='text-xl'>Customize your mug</p>
                      <div className='flex gap-5 my-5'>
                        <button onClick={() => setOpenModal(true)} className='bg-gray-200 w-1/2 py-3 px-2 hover:bg-lime-400 text-center duration-300 hover:shadow-md cursor-pointer rounded-md'>
                          Select An Available Design
                        </button>
                        <Select value={mugType} onChange={(e) => setMugType(e.target.value)} className='w-1/2 focus:outline-none'>
                          <option value="White Mug">White Mug</option>
                          <option value="Magic Mug">Magic Mug</option>
                          <option value="Inner & Handle Coloured Mug">Inner & Handle Coloured Mug</option>
                          <option value="Inner Coloured Mug">Inner Coloured Mug</option>
                        </Select>
                      </div>

                      <Modal size={'6xl'} dismissible show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Select a design</Modal.Header>
                        <Modal.Body>
                          <div className='flex flex-wrap gap-5 justify-center'>
                            {Object.entries(images).map(([key, src]) => (
                              <Image
                                key={key}
                                onClick={() => {
                                  setTextureRef(key);
                                  setOpenModal(false);
                                }}
                                className={`${
                                  textureRef === key ? "brightness-150 scale-90" : ""
                                } w-1/5 rounded-sm duration-300 hover:scale-105 cursor-pointer hover:shadow-md`}
                                src={src}
                                width={0}
                                height={0}
                                alt="Design"
                              />
                            ))}
                          </div>
                        </Modal.Body>
                      </Modal>

                      <div>
                        <div className="flex w-full items-center justify-center">
                          <Label
                            htmlFor="dropzone-file"
                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                            </div>
                            <FileInput id="dropzone-file" accept="image/*" onChange={handleFileChange} className="hidden" />
                          </Label>
                        </div>
                      </div>

                      <div className='mb-3'>
                        <Dock className="w-full" iconMagnification={50} iconDistance={10}>
                          <DockIcon onClick={() => setColor("#ffffff")} className="border-2 bg-white"></DockIcon>
                          <div className='d-flex hidden'>
                            <DockIcon onClick={() => setColor("#ff0000")} className="border-2 bg-red-600"></DockIcon>
                            <DockIcon onClick={() => setColor("#00ff00")} className="border-2 bg-green-600"></DockIcon>
                            <DockIcon onClick={() => setColor("#0000ff")} className="border-2 bg-blue-600"></DockIcon>
                          </div>
                        </Dock>
                      </div>
                  </motion.div>
                )}

                {flipped === true && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className='text-xl'>Fill Your Details</p>
                    <hr />
                    <form class="w-full mx-auto mt-4">
                      <div class="relative z-0 w-full mb-5 group">
                          <input type="email" name="Name" id="Name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          <label for="Name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                      </div>
                      <div class="relative z-0 w-full mb-5 group">
                          <input type="text" name="Address" id="Address" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          <label for="Address" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                      </div>
                      <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="City" id="City" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="City" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="District" id="District" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="District" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">District</label>
                        </div>
                      </div>
                      <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (07# 123 4567)</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (07# 123 4567)</label>
                        </div>
                      </div>
                    </form>

                  </motion.div>
                )}
              </AnimatePresence>

              <hr />
              <div className='mt-3'>
                <div className='text-main-dark text-sm px-6 py-3'>Weight: {product1Weight}g</div>
                <Table hoverable className='w-full'>
                  <Table.Head>
                    <Table.HeadCell className='text-wrap'>Product name</Table.HeadCell>
                    <Table.HeadCell className='hidden md:block text-wrap'>Quantity</Table.HeadCell>
                    <Table.HeadCell className='text-wrap'>Price</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {'Customized Mug'}
                      </Table.Cell>
                      <Table.Cell className='hidden md:block text-wrap'>1</Table.Cell>
                      <Table.Cell className='text-wrap'>{(mugType === "White Mug") ? `Rs.${product1Price}/-` : `Rs.${product2Price}/-`}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Delivery fee
                      </Table.Cell>
                      <Table.Cell className='hidden md:block text-wrap'></Table.Cell>
                      <Table.Cell className='text-wrap'>Rs.{deliveryFee}/-</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap text-gray-900 font-bold ">Total</Table.Cell>
                      <Table.Cell className='hidden md:block text-wrap'></Table.Cell>
                      <Table.Cell className='text-wrap'>Rs.{product1Price + deliveryFee}/-</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              <hr />
              <div className='w-full my-5'>
                <div onClick={() => setFlipped(!flipped)} className={`${flipped ? "bg-slate-900" : "bg-main"} py-3 tracking-widest text-center rounded-lg text-white cursor-pointer duration-300 hover:brightness-105 shadow-md`}>
                  {flipped ? "BACK" : "ORDER NOW"}
                </div>
                <AnimatePresence>
                  {flipped ? (
                      <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          key="box"
                      >
                        <div className='bg-main py-3 mt-3 tracking-widest text-center rounded-lg text-white cursor-pointer duration-300 hover:brightness-105 shadow-md'>
                          PLACE ORDER
                        </div>
                      </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <hr />

          
        </div>
      </Center>
      <Footer />
    </div>
  );
}
