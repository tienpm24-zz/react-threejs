import './App.css';

import React, { useEffect, useRef, useState } from 'react';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
// import { useSpring, a } from 'react-spring/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

extend({ OrbitControls });

const SpaceShip = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/scene.gltf', setModel);
  }, []);

  return model ? <primitive object={model.scene} /> : null;
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      // maxPolarAngle={Math.PI / 3}
      // minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

// const Plane = () => (
//   <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
//     <planeBufferGeometry attach='geometry' args={[100, 100]} />
//     <meshPhysicalMaterial attach='material' color='white' />
//   </mesh>
// );

// const Box = () => {
//   const [hovered, setHovered] = useState(false);
//   const [active, setActive] = useState(false);

//   const props = useSpring({
//     scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
//     color: hovered ? 'hotpink' : 'gray',
//   });

//   return (
//     <a.mesh
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       onClick={() => setActive(!active)}
//       scale={props.scale}
//       castShadow
//     >
//       <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
//       <a.meshPhysicalMaterial attach='material' color={props.color} />
//     </a.mesh>
//   );
// };

function App() {
  return (
    <div className='App'>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
        <Controls />
        <SpaceShip />
      </Canvas>
    </div>
  );
}

export default App;
