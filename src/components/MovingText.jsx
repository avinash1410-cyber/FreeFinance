import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MovingSection = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%; /* Set the width to 100% */
  height: 100px;
`;

const MovingParagraph = styled.p`
  position: absolute;
  top: 50%;
  left: ${({ position }) => position}px;
  transform: translateY(-50%);
  white-space: nowrap; /* Prevent wrapping */
  animation: moveText 5s linear infinite;
`;

const MovingText = () => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for moving right, -1 for moving left

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition(prevPosition => {
        const nextPosition = prevPosition + direction;
        // If next position exceeds the width, change direction to move in the opposite direction
        if (nextPosition >= window.innerWidth) {
          setDirection(-1); // Change direction to move left
        } else if (nextPosition <= 0) {
          setDirection(1); // Change direction to move right
        }
        return nextPosition;
      });
    }, 50); // Decrease interval duration to increase speed

    return () => clearInterval(intervalId);
  }, [direction]);

  return (
    <MovingSection>
      <MovingParagraph position={position}>
        <p> Gainers</p>
        <p>Losers </p>
      </MovingParagraph>
    </MovingSection>
  );
};

export default MovingText;