import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import Revealed from './components/Revealed';
import FallingFlowers from './components/FallingFlowers';

function App() {
  const [stage, setStage] = useState('envelope'); // 'envelope', 'flowers', 'reveal'

  return (
    <main style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <Envelope key="envelope" onOpen={() => setStage('flowers')} />
        )}
      </AnimatePresence>
      
      {stage === 'flowers' && (
        <FallingFlowers key="flowers" onComplete={() => setStage('reveal')} />
      )}

      {stage === 'reveal' && (
        <Revealed key="reveal" />
      )}
    </main>
  );
}

export default App;
