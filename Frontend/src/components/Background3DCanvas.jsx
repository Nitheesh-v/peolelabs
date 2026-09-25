import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3DCanvas({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2500);
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Particle Starfield / Constellation
    const particleCount = prefersReducedMotion ? 40 : 130;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorSky = new THREE.Color('#0EA5E9');
    const colorCyan = new THREE.Color('#38BDF8');
    const colorGreen = new THREE.Color('#10B981');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 900;

      const randColor = i % 3 === 0 ? colorGreen : i % 2 === 0 ? colorCyan : colorSky;
      colors[i * 3] = randColor.r;
      colors[i * 3 + 1] = randColor.g;
      colors[i * 3 + 2] = randColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 3. Floating 3D Wireframe Polyhedrons
    const icoGeo = new THREE.IcosahedronGeometry(75, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x0EA5E9,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });

    const icoMesh1 = new THREE.Mesh(icoGeo, icoMat);
    icoMesh1.position.set(-380, 160, -100);
    scene.add(icoMesh1);

    const icoMesh2 = new THREE.Mesh(icoGeo, icoMat);
    icoMesh2.position.set(400, -200, -150);
    scene.add(icoMesh2);

    // 4. Floating 3D Geometric Torus Knot Matrix
    const torusGeo = new THREE.TorusKnotGeometry(50, 12, 64, 8);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      wireframe: true,
      transparent: true,
      opacity: 0.16
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(340, 240, -180);
    scene.add(torusMesh);

    // 5. Connecting Constellation Lines
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0EA5E9,
      transparent: true,
      opacity: 0.08
    });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // Mouse & Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.25;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.25;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse & scroll interpolation
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      camera.position.x = targetMouseX;
      camera.position.y = -targetMouseY - (targetScrollY * 0.12);
      camera.lookAt(0, -targetScrollY * 0.12, 0);

      if (!prefersReducedMotion) {
        particles.rotation.y = elapsedTime * 0.035;
        particles.rotation.x = elapsedTime * 0.015;

        icoMesh1.rotation.x = elapsedTime * 0.15;
        icoMesh1.rotation.y = elapsedTime * 0.2;

        icoMesh2.rotation.x = -elapsedTime * 0.12;
        icoMesh2.rotation.z = elapsedTime * 0.18;

        torusMesh.rotation.x = elapsedTime * 0.18;
        torusMesh.rotation.y = elapsedTime * 0.22;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      pMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
}
