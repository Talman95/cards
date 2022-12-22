import { CardType } from '../api/cardsAPI';

const VALUE = 6;

export const getCard = (cards: CardType[] | null): CardType | null => {
  if (!cards) return null;

  const sum = cards.reduce(
    (acc, card) => acc + (VALUE - card.grade) * (VALUE - card.grade),
    0,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (VALUE - card.grade) * (VALUE - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};
