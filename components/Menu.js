import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const PopupButton = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      {/* Gear Icon Button */}
      <button
        onClick={togglePopup}
        style={{
          padding: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        <FontAwesomeIcon icon={faGear} size="2x" />
      </button>

      {/* Popup */}
      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)', // Dimmed background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '50',
          }}
        >
          <div
            style={{
              background: 'gray',
              borderRadius: '8px',
              padding: '20px',
              width: '300px',
              maxHeight: '70vh', // Restrict popup height
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflowY: 'auto', // Enable scrolling for content
            }}
          >
            {/* Close Button */}
            <button
              onClick={togglePopup}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '30px',
                cursor: 'pointer',
                color: 'black',
              }}
            >
              &times;
            </button>

            {/* Popup Content */}
            <div>
            <p>I. General Rules</p>
        <p>A. Players have a six-sided die (1d6) and roll it at the appropriate time which may or may not result in a Chaos Effect.</p>
        <p>B. The World/Personal Chaos roll takes place at the start of each player’s turn, before anything else happens on their turn.</p>
        <p>C. The Combat Chaos rolls take place after attackers and blockers are declared, before the damage step.</p>
        <p>D. A Chaos roll is not optional. If a player forgets to roll, unless it involves SIGNIFICANT issues, play is backed up to the point where the player should have rolled, and the Effect (if any) is resolved.</p>
        <p>E. Chaos Effects are not “spells” or “abilities”. Thus, they can affect creatures with shroud or hexproof.</p>
        <p>F. Chaos Effects have no color even if colored mana is spent to activate the Effect.</p>
        <p>G. If a Chaos Effect specifies a number and there are not as many as it specifies, it will affect as many as it can. Example: “Remove 3 counters of any type you control from the game.” If you have a +1/+1 counter and a Time Counter in play, but no others, both counters are removed.</p>
        <p>II. World Chaos</p>
        <p>A. At the start of a game, after all players have drawn their cards and resolved mulligan’s, the first World Chaos Effect is added to the game.</p>
        <p>B. The player who is going first in the game then makes the first Chaos roll.</p>
        <p>C. On a roll of 1, an additional World Chaos Effect is added to the game.</p>
        <p>D. On a roll of 6, all World Chaos Effects are removed from the game and a new World Chaos Effect is added to the game.</p>
        <p>E. The result of a World Chaos roll MAY NOT be responded to. However, the activation of a World Chaos Effect MAY be responded to unless the Effect indicates otherwise.</p>
        <p>F. World Chaos Effects end when the Effect is removed from the game unless the Effect indicates otherwise.</p>
        <p>III. Personal Chaos</p>
        <p>A. On a roll of 3 or 4, a Personal Chaos Effect occurs.</p>
        <p>B. Personal Chaos Effects MAY be responded to UNLESS the Effect indicates otherwise.</p>
        <p>C. Personal Chaos Effects resolve immediately and are permanent unless the Effect indicates otherwise.</p>
        <p>IV. Combat Chaos</p>
        <p>A. All players roll for Combat Chaos after attackers and blockers are declared, before the damage step.</p>
        <p>B. On a roll of 2 or 5, a Combat Chaos Effect occurs.</p>
        <p>C. Combat Chaos Effects MAY be responded to UNLESS the Effect indicates otherwise.</p>
        <p>D. If the Combat Chaos Effect affects the eligibility of a creature in or out of combat to attack or block, attackers and blockers involved are reassigned. Attackers and blockers not involved in such a change are not eligible for reassignment.</p>
        <p>Example 1: If a new creature comes into play for a defending player, he or she may assign that creature as a blocker. The attacker does not have the option to change.</p>
        <p>Example 2: If an attacking creature gains a “lure” effect, all blockers are removed from combat, and then all eligible creatures controlled by the defending player are declared as blockers.</p>
        <p>E. Combat Chaos Effects resolve immediately and are permanent unless the Effect indicates otherwise.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupButton;
