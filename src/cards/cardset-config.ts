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
    id : "mini",
    aLabel : "Espanol",
    bLabel : "English",
    title : "Mini",
  },
];

export const cardSetConfigById = Object.fromEntries(cardSetConfigs.map(c => [c.id, c]));
