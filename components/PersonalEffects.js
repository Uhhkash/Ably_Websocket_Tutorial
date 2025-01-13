import React, { useState } from 'react';
import { useChannel } from 'ably/react';
import styles from '../styles/Home.module.css';

export default function PersonalEffect({ history }) {
  const [personalEffect, setPersonalEffect] = useState(history[0] || null);

  // Listen to the "personal-effects" channel for new messages
  useChannel('personal-effects', (message) => {
    setPersonalEffect(message.data.text);
  });

  return (
    <div className={styles.effectBox}>
      <h3>Personal Effect</h3>
      {personalEffect && <p>{personalEffect}</p>}
    </div>
  );
}
