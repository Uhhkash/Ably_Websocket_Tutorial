import React, { useState, useEffect } from 'react';
import { useChannel } from 'ably/react';
import styles from '../styles/Home.module.css';

export default function CombatEffect() {
  const [combatEffects, setCombatEffect] = useState(null);

  // Subscribe to the `combat-effects` channel
  const { ably } = useChannel('combat-effects', (message) => {
    // Update the combat effect when a message is received
    setCombatEffect(message.data.text);
  });

  const fetchCombatEffect = async () => {
    try {
      // Fetch a random combat effect from the API
      const response = await fetch('/api/random-combat', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        const randomCombatText = data.text;

        // Publish the combat effect to the `combat-effects` channel
        const channel = ably.channels.get('combat-effects');
        await channel.publish('new-combat-effect', { text: randomCombatText });

        setCombatEffect(randomCombatText); // Update the local state
      } else {
        console.error('Failed to fetch random combat:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching random combat:', error);
    }
  };

  return (
    <div className={styles.effectBox}>
      <h3>Combat Effect</h3>
      {combatEffects && <p>{combatEffects}</p>}
      <button className={styles.button} onClick={fetchCombatEffect}>
        Add Combat Effect
      </button>
    </div>
  );
}
