import React, { useState } from 'react';
import { useChannel } from 'ably/react';

export default function WorldEffectsComponent() {
  const [worldEffects, setWorldEffects] = useState([]);

  // Subscribe to the 'world-effects' channel
  useChannel('world-effects', (message) => {
    setWorldEffects((prev) => [...prev, message.data.text]); // Update state with new world effect
  });

  return (
    <div>
      <h3>World Effects</h3>
      {worldEffects.length > 0 ? (
        worldEffects.map((effect, index) => (
          <p key={index}>{effect}</p>
        ))
      ) : (
        <p>No world effects yet. Add one to start!</p>
      )}
    </div>
  );
}

