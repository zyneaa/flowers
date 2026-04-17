import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import flower1 from '../assets/flower1.png';
import flower2 from '../assets/flower2.png';
import flower3 from '../assets/flower3.png';
import flower4 from '../assets/flower4.png';
import flower5 from '../assets/flower5.png';
import flower6 from '../assets/flower6.png';
import flower7 from '../assets/flower7.png';

const flowerImages = [flower1, flower2, flower3, flower4, flower5, flower6, flower7];

export default function FallingFlowers({ onComplete }) {
  const [flowers, setFlowers] = useState([]);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let generationActive = true;
    
    const createFlower = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const img = flowerImages[Math.floor(Math.random() * flowerImages.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 90; 
      
      const endX = 50 + radius * Math.cos(angle); 
      const endY = 50 + radius * Math.sin(angle);

      const size = 100 + Math.random() * 150; 
      const duration = 2 + Math.random() * 2.5; 
      const delay = Math.random() * 0.2;
      const rotation = Math.random() * 360;

      return { id, img, endX, endY, size, duration, delay, rotation };
    };

    // Huge initial burst 
    const initialFlowers = Array.from({ length: 40 }).map(createFlower);
    setFlowers(initialFlowers);

    const interval = setInterval(() => {
      if (generationActive) {
        // Increased the slice limit to keep more flowers on screen at once
        setFlowers(prev => [...prev.slice(-300), ...Array.from({ length: 15 }).map(createFlower)]);
      }
    }, 300);

    setTimeout(() => {
      generationActive = false;
      clearInterval(interval);
    }, 3500);

    // Fade out everything at the same time
    setTimeout(() => {
      setFadingOut(true);
    }, 6000);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 8500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}
    >
      {flowers.map(f => (
        <motion.img
          key={f.id}
          src={f.img}
          initial={{ 
            y: '50vh', 
            x: '50vw', 
            rotate: f.rotation,
            opacity: 0,
            scale: 0.1
          }}
          animate={{ 
            y: `${f.endY}vh`, 
            x: `${f.endX}vw`,
            rotate: f.rotation + 1080,
            opacity: 1, // Stay fully visible
            scale: 1 
          }}
          transition={{ 
            y: { duration: f.duration, delay: f.delay, ease: "easeOut" },
            x: { duration: f.duration, delay: f.delay, ease: "easeOut" },
            scale: { duration: f.duration, delay: f.delay, ease: "easeOut" },
            // Fast fade in for each flower so they don't pop in too harshly
            opacity: { duration: 0.4, delay: f.delay },
            // Infinite spin logic
            rotate: { duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear" }
          }}
          style={{
            position: 'absolute',
            width: f.size,
            height: 'auto',
            marginLeft: `-${f.size / 2}px`, 
            marginTop: `-${f.size / 2}px`
          }}
        />
      ))}
    </motion.div>
  );
}
