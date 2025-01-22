import React, { useState } from 'react';
import { useChannel } from 'ably/react';
import styles from '../styles/Home.module.css';

export default function WorldEffect() {
  const [worldEffects, setWorldEffect] = useState(null);

  // Subscribe to the `world-effects` channel
  const { ably } = useChannel('world-effects', (message) => {
    // Update the world effect when a message is received
    setWorldEffect(message.data.text);
  });

  const fetchWorldEffect = async () => {
    try {
      // Fetch a random world effect from the API
      const response = await fetch('/api/random-world', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        const randomWorldText = data.text;

        // Publish the world effect to the `world-effects` channel
        const channel = ably.channels.get('world-effects');
        await channel.publish('new-world-effect', { text: randomWorldText });

        setWorldEffect(randomWorldText); // Update the local state
      } else {
        console.error('Failed to fetch random world effect:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching random world effect:', error);
    }
  };

  const clearWorldEffect = async () => {
    try {
      // Send a clear request to the API
      const response = await fetch('/api/random-world', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' }),
      });

      if (response.ok) {
        // Publish the cleared state to the `world-effects` channel
        const channel = ably.channels.get('world-effects');
        await channel.publish('clear-world-effect', { text: '' });

        setWorldEffect(null); // Clear the local state
      } else {
        console.error('Failed to clear world effect:', await response.text());
      }
    } catch (error) {
      console.error('Error clearing world effect:', error);
    }
  };

  return (
    <div className={styles.worldEffectContainer}>
      <h3>World Effect</h3>
      <div className={styles.worldBox}>
        {worldEffects ? worldEffects : null} {/* Placeholder when empty */}
      </div>
      
      {/* Move buttons below the text box */}
      <div className={styles.effectButtonsContainer}>
        <button className={styles.clearWorldButton} onClick={clearWorldEffect}>
          Clear World Effect
        </button>
        <button className={styles.addWorldButton} onClick={fetchWorldEffect}>
          Add World Effect
        </button>
      </div>
    </div>
  );
}
