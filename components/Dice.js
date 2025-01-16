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
    <div className={styles.effectBox}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={rollDice}>
          <FontAwesomeIcon icon={faDice} size="3x" /> {/* Dice icon as the button */}
        </button>
      </div>
      {diceRoll !== null && (
        <div className={styles.diceResult}>
          <p>{diceRoll}</p> {/* Display the rolled number below the icon */}
        </div>
      )}
    </div>
  );
}
