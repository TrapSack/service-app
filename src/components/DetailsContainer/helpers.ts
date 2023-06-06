/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-plusplus */
export interface Scheme {
  id: string;
  name: string;
  price: number;
  accuracy: number;
  simplicity: number;
  tech: number;
}

type DominanceIndex = {
  [key: string]: string;
};

const schemes: Scheme[] = [
  { id: 'scheme1', name: 'Схема 1', price: 1, accuracy: 0, simplicity: 1, tech: 0 },
  { id: 'scheme2', name: 'Схема 2', price: 0, accuracy: 1, simplicity: 0, tech: 1 },
  { id: 'scheme3', name: 'Схема 3', price: 1, accuracy: 1, simplicity: 0, tech: 1 }
];

export const calculateDominanceResult = (schemes: Scheme[]) => {
  function calculateDominanceIndex(schemes: Scheme[], property: keyof Scheme) {
    const dominanceIndexes: DominanceIndex = {};

    for (let i = 0; i < schemes.length; i++) {
      let count = 0;

      for (let j = 0; j < schemes.length; j++) {
        if (schemes[i][property] > schemes[j][property]) {
          count++;
        }
      }

      const dominanceIndex = count / (schemes.length - 1);
      dominanceIndexes[`${schemes[i].id}`] = dominanceIndex;
    }

    return dominanceIndexes;
  }

  const properties: (keyof Scheme)[] = ['price', 'accuracy', 'simplicity', 'tech'];

  // Рассчитываем индексы превалирования для каждого свойства
  const dominanceIndexes = {
    id: {},
    name: {},
    price: {},
    accuracy: {},
    simplicity: {},
    tech: {}
  };

  properties.forEach((property) => {
    dominanceIndexes[property] = calculateDominanceIndex(schemes, property);
  });

  const results = dominanceIndexes;

  return results;
};
