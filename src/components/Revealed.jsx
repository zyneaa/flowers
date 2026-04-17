import { motion } from 'framer-motion';
import bouquetImg from '../assets/bouquet.png';
import postcardImg from '../assets/postcard.png';

export default function Revealed() {
  return (
    <div style={{ 
      width: '100%',
      minHeight: '200vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 5,
    }}>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img
          src={bouquetImg}
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 50 }}
          style={{ width: '90%', maxWidth: '500px' }}
        />
      </div>
      
      <div style={{ height: '200vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '10vh' }}>
        <motion.img
          src={postcardImg}
          initial={{ y: 50, opacity: 0, rotate: -5 }}
          whileInView={{ y: 0, opacity: 1, rotate: 2 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', damping: 15, stiffness: 50 }}
          style={{ width: '85%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        />
      </div>
    </div>
  );
}
