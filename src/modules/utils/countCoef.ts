/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export type Properties = 'price' | 'easiness' | 'technology' | 'accuracy';

export type PropertyWeights = Partial<Record<Properties, number>>;

export type Matrix = Array<Array<number>>;

const initialMatrix: Matrix = [
  [0, 0, 0],
  [1, 0, 1],
  [1, 0, 0]
];

const initialPropertyWeights: PropertyWeights = {
  accuracy: 0.6,
  easiness: 0.3,
  price: 0.2,
  technology: 0.1
};

export function countCoef(
  property: Properties,
  matrix: Matrix = initialMatrix,
  propertyWeights: PropertyWeights = initialPropertyWeights
) {
  const schemesLength = matrix.length;
  const schemeWeights: number[] = [];

  const schemesCombs = (schemesLength * (schemesLength - 1)) / 2;

  const countCurrentCoef = (currentCount: number) => {
    let resultCoef = 0;

    if (propertyWeights[property]) {
      resultCoef = currentCount * (propertyWeights[property] ?? 0);
    }

    return resultCoef / schemesCombs;
  };

  for (const i in matrix) {
    let currentCount = 0;

    for (const j in matrix[i]) {
      currentCount += matrix[i][j];
    }

    schemeWeights.push(countCurrentCoef(currentCount));
  }

  return schemeWeights;
}
