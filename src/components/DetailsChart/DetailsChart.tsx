/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable spaced-comment */
import { BarElement, CategoryScale, ChartData, ChartDataset, Chart as ChartJS, Legend, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

type PropertyName = 'Точность' | 'Устойчивость' | 'Стоимость' | 'Простота';

export type ChartDataProperty = {
  name: PropertyName;
  value: number;
};
export type SchemeDataSingle = {
  schemeName: string;
  schemeCoefficient: number;
};

export type SchemeDataStacked = {
  schemeName: string;
  schemeCoefficient: ChartDataProperty[];
};

const initialChartDataSingleValues: SchemeDataSingle[] = [
  {
    schemeName: '1',
    schemeCoefficient: 0.6
  },
  {
    schemeName: '2',
    schemeCoefficient: 0.2
  },
  {
    schemeName: '3',
    schemeCoefficient: 0.3
  }
];

const initialChartDataStackedValues: SchemeDataStacked[] = [
  {
    schemeName: '1',
    schemeCoefficient: [
      { name: 'Точность', value: 0.2 },
      { name: 'Устойчивость', value: 0.4 },
      { name: 'Стоимость', value: 0.6 },
      { name: 'Простота', value: 0.5 }
    ]
  },
  {
    schemeName: '2',
    schemeCoefficient: [
      { name: 'Точность', value: 0.1 },
      { name: 'Устойчивость', value: 0.6 },
      { name: 'Стоимость', value: 0.4 },
      { name: 'Простота', value: 0.8 }
    ]
  },
  {
    schemeName: '3',
    schemeCoefficient: [
      { name: 'Точность', value: 0.3 },
      { name: 'Устойчивость', value: 0.4 },
      { name: 'Стоимость', value: 0.7 },
      { name: 'Простота', value: 0.9 }
    ]
  }
];

enum DATA_COLORS {
  'Точность' = '#094f02',
  'Устойчивость' = '#9e8400',
  'Стоимость' = '#00359e',
  'Простота' = '#9e0010'
}

type DataAccumulator = {
  [key in PropertyName]?: number[];
};

const isSingleDataProperty = (data: SchemeDataStacked[] | SchemeDataSingle[]): data is SchemeDataSingle[] =>
  typeof data[0].schemeCoefficient === 'number';

export function DetailsChart({
  data = initialChartDataStackedValues,
  propertyName = '2131'
}: {
  data: SchemeDataStacked[] | SchemeDataSingle[];
  propertyName?: string;
}) {
  const generateDataSets = (
    data: SchemeDataStacked[] | SchemeDataSingle[]
  ): ChartData<'bar', (number | [number, number] | null)[], unknown> => {
    const labels = data.map((item) => item.schemeName);

    if (isSingleDataProperty(data)) {
      const dataSet: ChartDataset<'bar', (number | [number, number] | null)[]> = {
        label: propertyName || '',
        data: data.map((item) => item.schemeCoefficient),
        backgroundColor: Array.from<string>({ length: data.length }).fill('rgb(255, 159, 64)')
      };

      return {
        labels,
        datasets: [dataSet]
      };
    }
    const coefsArray = data.reduce((acc: DataAccumulator, current) => {
      current.schemeCoefficient.forEach((cef) => {
        if (acc) {
          if (cef.name in acc) {
            acc[cef.name]?.push(cef.value);
          } else {
            acc[cef.name] = [cef.value];
          }
        }
      });

      return acc;
    }, {});

    const dataSets: ChartDataset<'bar', (number | [number, number] | null)[]>[] = Object.entries(coefsArray).map(
      ([name, data]) => ({
        label: name,
        data,
        backgroundColor: Array.from<string>({ length: data.length }).fill(DATA_COLORS[name as PropertyName])
      })
    );

    return {
      labels,
      datasets: dataSets
    };
  };

  const dataSess = generateDataSets(data);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Legend);

  return (
    <div>
      <Bar
        data={dataSess}
        options={{
          scales: {
            y: {
              stacked: true
            },
            x: {
              stacked: true
            }
          }
        }}
      />
    </div>
  );
}
