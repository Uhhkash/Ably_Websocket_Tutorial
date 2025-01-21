import React, { useState } from 'react';
import { useChannel } from 'ably/react';
import styles from '../styles/Home.module.css';

export default function PersonalEffect() {
  const [personalEffects, setPersonalEffect] = useState(null);

  // Subscribe to the `personal-effects` channel
  const { ably } = useChannel('personal-effects', (message) => {
    // Update the personal effect when a message is received
    setPersonalEffect(message.data.text);
  });

  const fetchPersonalEffect = async () => {
    try {
      // Fetch a random personal effect from the API
      const response = await fetch('/api/random-personal', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        const randomPersonalText = data.text;

        // Publish the personal effect to the `personal-effects` channel
        const channel = ably.channels.get('personal-effects');
        await channel.publish('new-personal-effect', { text: randomPersonalText });

        setPersonalEffect(randomPersonalText); // Update the local state
      } else {
        console.error('Failed to fetch random personal effect:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching random personal effect:', error);
    }
  };

  const clearPersonalEffect = async () => {
    try {
      // Send a clear request to the API
      const response = await fetch('/api/random-personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' }),
      });

      if (response.ok) {
        // Publish the cleared state to the `personal-effects` channel
        const channel = ably.channels.get('personal-effects');
        await channel.publish('clear-personal-effect', { text: '' });

        setPersonalEffect(null); // Clear the local state
      } else {
        console.error('Failed to clear personal effect:', await response.text());
      }
    } catch (error) {
      console.error('Error clearing personal effect:', error);
    }
  };

  return (
    <div className={styles.effectBox}>
      <h3>Personal Effect</h3>
      <div className={styles.personalText}>
        {personalEffects ? personalEffects : null} {/* Placeholder when empty */}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={fetchPersonalEffect}>
          Add Personal Effect
        </button>
        <button className={styles.button} onClick={clearPersonalEffect}>
          Clear Personal Effect
        </button>
      </div>
    </div>
  );
  
}