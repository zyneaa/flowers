import { motion } from 'framer-motion';
import envelopeImg from '../assets/envelope.png';

export default function Envelope({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
      }}
      onClick={onOpen}
    >
      <motion.img 
        src={envelopeImg} 
        alt="Envelope" 
        style={{ width: '80%', maxWidth: '500px', dropShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <motion.p
        style={{
          marginTop: '2rem',
          fontSize: '2.5rem',
          color: '#5a4634',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        Tap to open
      </motion.p>
    </motion.div>
  );
}
