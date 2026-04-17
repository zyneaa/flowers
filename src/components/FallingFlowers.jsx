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
      // Some stay closer to the envelope center, some fly to the edges
      const radius = 10 + Math.random() * 90; 
      
      const endX = 50 + radius * Math.cos(angle); // in vw
      const endY = 50 + radius * Math.sin(angle); // in vh

      const size = 100 + Math.random() * 150; // Keep beautifully large
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
        setFlowers(prev => [...prev.slice(-150), ...Array.from({ length: 15 }).map(createFlower)]);
      }
    }, 300);

    // Stop generating after 3.5 seconds to build up a full screen
    setTimeout(() => {
      generationActive = false;
      clearInterval(interval);
    }, 3500);

    // Begin a beautiful 2.5 second fade out of all flowers at 6 seconds
    setTimeout(() => {
      setFadingOut(true);
    }, 6000);

    // Once fully faded, proceed to the bouquet and postcard reveal
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 8500);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
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
            opacity: 1, // Make them stay fully opaque on screen rather than vanishing
            scale: 1 
          }}
          transition={{ 
            y: { duration: f.duration, delay: f.delay, ease: "easeOut" },
            x: { duration: f.duration, delay: f.delay, ease: "easeOut" },
            scale: { duration: f.duration, delay: f.delay, ease: "easeOut" },
            opacity: { duration: 0.5, delay: f.delay },
            // Adding a continuous rotation effect that spins forever!
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
