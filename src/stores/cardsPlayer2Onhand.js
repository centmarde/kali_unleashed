// store/cards2.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from "../lib/supabase";

export const useCardStore2 = defineStore('cardStore2', () => {
  const onHandCards = ref([]);

  // Adds a card to onHandCards if there are less than 5 cards in hand
  const addCard = (card) => {
    if (onHandCards.value.length < 5 && !onHandCards.value.some(c => c.id === card.id)) {
      onHandCards.value.push(card);
    }
  };

  // Fetches a single random card from the database
  const fetchNewCard = async () => {
    try {
      const { data, error } = await supabase.from("cards").select("id, name, power, mana_cost, type");
      if (error) {
        throw new Error("Error fetching cards:", error);
      }
      const availableCards = data.filter(card => !onHandCards.value.some(c => c.id === card.id));
      if (availableCards.length) {
        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
        return randomCard;
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  // Removes a card at a specified index and replaces it with a new card
  const removeCardAndAddNew = async (index) => {
    const newCard = await fetchNewCard();
    if (newCard) {
      onHandCards.value.splice(index, 1, newCard);
    }
  };

  return { onHandCards, addCard, removeCardAndAddNew };
});