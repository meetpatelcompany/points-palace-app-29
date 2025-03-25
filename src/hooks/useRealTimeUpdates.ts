
import { useState, useEffect } from "react";

// This interface represents a card from the loyalty cards data
interface LoyaltyCard {
  id: number;
  name: string;
  image: string;
  category: string;
  points: number;
  redemptionThreshold: number;
}

// This is a simulated real-time updates hook
export const useRealTimeUpdates = (initialCards: LoyaltyCard[]) => {
  const [cards, setCards] = useState<LoyaltyCard[]>(initialCards);
  const [updatedCardId, setUpdatedCardId] = useState<number | null>(null);

  // Simulate occasional real-time updates
  useEffect(() => {
    // Create an interval that will occasionally update a random card's points
    const interval = setInterval(() => {
      // Only update with 30% probability to make it feel more natural
      if (Math.random() > 0.7 && cards.length > 0) {
        // Select a random card to update
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex];
        
        // Generate a small random point change (between 10-50 points)
        const pointChange = Math.floor(Math.random() * 40) + 10;
        
        // Create a new array with the updated card
        const updatedCards = [...cards];
        updatedCards[randomIndex] = {
          ...randomCard,
          points: Math.min(randomCard.points + pointChange, randomCard.redemptionThreshold)
        };
        
        // Update the state
        setCards(updatedCards);
        setUpdatedCardId(randomCard.id);
        
        // Reset the updated card id after the animation completes
        setTimeout(() => {
          setUpdatedCardId(null);
        }, 2000);
      }
    }, 8000); // Check every 8 seconds

    return () => clearInterval(interval);
  }, [cards]);

  return { cards, updatedCardId };
};
