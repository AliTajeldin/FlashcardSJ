interface cardSetConfigT {
  id : string;
  title : string;
  aLabel : string;
  bLabel: string;
};

export const cardSetConfigs : cardSetConfigT[] = [
  {
    id: "sp-en",
    aLabel : "Espanol",
    bLabel : "English",
    title : "Spanish - English",
  },
  {
    id : "th-en",
    aLabel : "Thai",
    bLabel : "English",
    title : "Thai - English",
  },
  {
    id : "states",
    aLabel : "State",
    bLabel : "Capital",
    title : "State Capitals",
  },
  {
    id : "country",
    aLabel : "Country",
    bLabel : "Capital",
    title : "Country Capitals",
  },
  {
    id : "mini",
    aLabel : "Espanol",
    bLabel : "English",
    title : "Mini",
  },
];

export const cardSetConfigById = Object.fromEntries(cardSetConfigs.map(c => [c.id, c]));

export const loadCards = (cardSetId: string) => {
  // note: must explicitly specify the name of csv files here so that vite can bundle the transformed files.

  // @ts-ignore
  if (cardSetId === "sp-en") return import('@/assets/sp-en.csv');

  // @ts-ignore
  if (cardSetId === "th-en") return import('@/assets/th-en.csv');

  // @ts-ignore
  if (cardSetId === "states") return import('@/assets/states.csv');

  // @ts-ignore
  if (cardSetId === "country") return import('@/assets/country.csv');

  // @ts-ignore
  if (cardSetId === "mini") return import('@/assets/mini.csv');

  throw new Error(`unknown carset id to load: ${cardSetId}`);
}