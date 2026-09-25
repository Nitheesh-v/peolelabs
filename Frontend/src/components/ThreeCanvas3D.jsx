import React, { useEffect, useRef } from 'react';

export default function ThreeCanvas3D({ mode = 'hero', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resize listener
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = x / (rect.width / 2);
      mouseY = y / (rect.height / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Particles
    const particleCount = mode === 'intro' ? 90 : 60;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        radius: Math.random() * 2.5 + 1.2,
        color: i % 2 === 0 ? '#388E3C' : '#0EA5E9',
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      });
    }

    // Orbiting 3D Nodes
    const nodes = [
      { name: 'FSCM', color: '#388E3C', angle: 0, speed: 0.012, radius: 140 },
      { name: 'HCM', color: '#0EA5E9', angle: (Math.PI * 2) / 6, speed: 0.01, radius: 140 },
      { name: 'Campus', color: '#388E3C', angle: (Math.PI * 4) / 6, speed: 0.014, radius: 140 },
      { name: 'Cloud', color: '#0EA5E9', angle: (Math.PI * 6) / 6, speed: 0.011, radius: 140 },
      { name: 'Reporting', color: '#388E3C', angle: (Math.PI * 8) / 6, speed: 0.013, radius: 140 },
      { name: 'Managed', color: '#0EA5E9', angle: (Math.PI * 10) / 6, speed: 0.009, radius: 140 }
    ];

    let cubeRotation = 0;

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const centerX = width / 2 + targetX * 25;
      const centerY = height / 2 + targetY * 25;

      if (!prefersReducedMotion) {
        cubeRotation += 0.01;
      }

      // 1. Draw 3D Connecting Wireframe Geometry Background
      ctx.save();
      ctx.translate(centerX, centerY);

      // Draw Orbiting 3D Node Signals
      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.angle += node.speed;
        }

        const nx = Math.cos(node.angle) * node.radius;
        const ny = Math.sin(node.angle) * (node.radius * 0.45);

        // Line to center
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Node Circle
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.85;
        ctx.fill();

        // Node Glow
        ctx.beginPath();
        ctx.arc(nx, ny, 12, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.15;
        ctx.fill();
      });

      // Draw Center 3D Isometric Cube Wireframe
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = '#0F2942';
      ctx.lineWidth = 1.5;

      const side = 45;
      const cosR = Math.cos(cubeRotation);
      const sinR = Math.sin(cubeRotation);

      const vertices = [
        { x: -side, y: -side, z: -side },
        { x: side, y: -side, z: -side },
        { x: side, y: side, z: -side },
        { x: -side, y: side, z: -side },
        { x: -side, y: -side, z: side },
        { x: side, y: -side, z: side },
        { x: side, y: side, z: side },
        { x: -side, y: side, z: side }
      ];

      // Rotate Vertices
      const projected = vertices.map((v) => {
        const x1 = v.x * cosR - v.z * sinR;
        const z1 = v.z * cosR + v.x * sinR;
        const y1 = v.y * cosR - z1 * sinR * 0.3;

        const scale = 250 / (250 + z1);
        return {
          x: x1 * scale,
          y: y1 * scale
        };
      });

      // Connect Cube Edges
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      edges.forEach(([p1, p2]) => {
        ctx.beginPath();
        ctx.moveTo(projected[p1].x, projected[p1].y);
        ctx.lineTo(projected[p2].x, projected[p2].y);
        ctx.stroke();
      });

      ctx.restore();

      // 2. Draw 3D Background Floating Particle Field
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -width / 2) p.x = width / 2;
          if (p.x > width / 2) p.x = -width / 2;
          if (p.y < -height / 2) p.y = height / 2;
          if (p.y > height / 2) p.y = -height / 2;
        }

        const px = centerX + p.x;
        const py = centerY + p.y;

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.45;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mode]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block w-full h-full min-h-[300px] select-none pointer-events-none ${className}`}
    />
  );
}
