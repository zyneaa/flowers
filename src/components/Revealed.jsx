import { motion } from 'framer-motion';
import bouquetImg from '../assets/bouquet.png';
import postcardImg from '../assets/postcard.png';

export default function Revealed() {
  return (
    <div style={{ 
      width: '100%',
      minHeight: '130vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '10vh 1rem 10vh 1rem',
      gap: '10vh', /* Much smaller gap for a mobile-first scroll */
      zIndex: 5,
    }}>
      <motion.img
        src={bouquetImg}
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 50 }}
        style={{ width: '90%', maxWidth: '400px' }}
      />
      
      <motion.img
        src={postcardImg}
        initial={{ y: 50, opacity: 0, rotate: -5 }}
        whileInView={{ y: 0, opacity: 1, rotate: 2 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: 'spring', damping: 15, stiffness: 50 }}
        style={{ width: '85%', maxWidth: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      />
    </div>
  );
}
