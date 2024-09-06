import React, { useEffect, useRef } from 'react';

const FireworksAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  class Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    color: string;

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 200;
      this.size = Math.random() * 3 + 1;
      this.speedY = -Math.random() * 2 - 1;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
      this.y += this.speedY;
    }

    draw(canvasRef: React.RefObject<HTMLCanvasElement>) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];

    function createParticles() {
      if (canvas) {
        for (let i = 0; i < 100; i++) {
          particles.push(new Particle(canvas));
        }
      }
    }
    function animateParticles() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw(canvasRef);
          if (particles[i].y < 0) {
            particles.splice(i, 1);
            i--;
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();

    return () => {
      cancelAnimationFrame(0);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default FireworksAnimation;