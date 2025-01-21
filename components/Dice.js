import React, { useState } from 'react';
import { useChannel } from 'ably/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';

export default function RealTimeDice() {
  const [diceRoll, setDiceRoll] = useState(null);

  // Subscribe to the `dice-roll` channel
  const { ably } = useChannel('dice-roll', (message) => {
    // Update the dice roll when a message is received
    setDiceRoll(message.data.roll);
  });

  const rollDice = async () => {
    const randomRoll = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6

    // Publish the roll to the `dice-roll` channel
    const channel = ably.channels.get('dice-roll');
    await channel.publish('new-roll', { roll: randomRoll });

    setDiceRoll(randomRoll); // Update the local state with the rolled number
  };

  return (
    <div>
      <button onClick={rollDice} style={{ background: 'none', border: 'none' }}>
        <FontAwesomeIcon icon={faDice} size="3x" style={{ color: 'white' }} /> {/* Dice icon as the button */}
      </button>
      {diceRoll !== null && (
        <p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {diceRoll}
        </p>
      )}
    </div>
  );
}
