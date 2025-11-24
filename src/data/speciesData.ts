export interface Species {
  id: number;
  name: string;
  scientificName: string;
  category: "flora" | "fauna" | "fungi";
  status: "Common" | "Protected" | "Monitored" | "Recovered" | "Seasonal" | "Migratory" | "Uncommon";
  description: string;
  habitat: string;
  conservation: "Stable" | "Protected" | "Monitored" | "Recovered";
  audioText: string;
  lastSighted?: string;
  region?: string;
  image: string;
}

export const speciesData: Species[] = [
  {
    id: 1,
    name: "Yellow Birch",
    scientificName: "Betula alleghaniensis",
    category: "flora",
    status: "Common",
    description:
      "Distinctive tree with golden-bronze peeling bark, native to eastern North America. Known for its longevity, with some specimens living over 300 years. The bark was historically used by Indigenous peoples for making canoes and containers.",
    habitat: "Well-drained soils, mixed forests",
    conservation: "Stable",
    audioText:
      "Yellow Birch, scientific name Betula alleghaniensis. A distinctive tree with golden-bronze peeling bark, native to eastern North America. Can live over 300 years. Found in well-drained soils and mixed forests. Conservation status is stable.",
    lastSighted: "October 15, 2025",
    region: "Northeast Trail",
    image: "/1.1.png",
  },
  {
    id: 2,
    name: "Red Squirrel",
    scientificName: "Tamiasciurus hudsonicus",
    category: "fauna",
    status: "Common",
    description:
      "Small, energetic squirrel with reddish-brown fur and a white underbelly. These territorial creatures are known for their distinctive chattering calls and play a crucial role in seed dispersal for coniferous trees.",
    habitat: "Coniferous and mixed forests",
    conservation: "Stable",
    audioText:
      "Red Squirrel, scientific name Tamiasciurus hudsonicus. Small, energetic squirrel with reddish-brown fur. Important seed disperser for coniferous trees. Found in coniferous and mixed forests. Conservation status is stable.",
    lastSighted: "October 28, 2025",
    region: "Pine Ridge Area",
    image: "/1.2.png",
  },
  {
    id: 3,
    name: "Wild Ginger",
    scientificName: "Asarum canadense",
    category: "flora",
    status: "Uncommon",
    description:
      "A low-growing woodland plant with distinctive heart-shaped leaves and unusual burgundy flowers that grow at ground level. The plant has a ginger-like aroma when crushed and was used by Indigenous peoples for medicinal purposes.",
    habitat: "Rich, moist woodland floors",
    conservation: "Monitored",
    audioText:
      "Wild Ginger, scientific name Asarum canadense. Low-growing woodland plant with heart-shaped leaves and hidden burgundy flowers. Found in rich, moist woodland floors. Conservation status is monitored.",
    lastSighted: "May 5, 2025",
    region: "Maple Grove",
    image: "/1.3.png",
  },
  {
    id: 4,
    name: "Oyster Mushroom",
    scientificName: "Pleurotus ostreatus",
    category: "fungi",
    status: "Seasonal",
    description:
      "An edible bracket fungus with a distinctive fan or oyster-shaped cap. These important decomposers grow in shelf-like clusters on dead or dying hardwood trees, playing a vital role in nutrient cycling within the forest ecosystem.",
    habitat: "Dead or dying hardwood trees",
    conservation: "Stable",
    audioText:
      "Oyster Mushroom, scientific name Pleurotus ostreatus. Edible bracket fungus that grows on deciduous trees, helping decompose dead wood. Found on dead or dying hardwood trees. Conservation status is stable.",
    lastSighted: "September 22, 2025",
    region: "Oak Valley",
    image: "/1.4.png",
  },
  {
    id: 5,
    name: "Wood Duck",
    scientificName: "Aix sponsa",
    category: "fauna",
    status: "Migratory",
    description:
      "One of the most colorful North American waterfowl, known for its striking plumage. Males have iridescent green and purple heads with distinctive white markings, while females have subtle gray-brown plumage. They nest in tree cavities near water.",
    habitat: "Wooded wetlands, ponds",
    conservation: "Recovered",
    audioText:
      "Wood Duck, scientific name Aix sponsa. Colorful waterfowl that nests in tree cavities near wetlands. Males have distinctive iridescent plumage. Found in wooded wetlands and ponds. Conservation status is recovered.",
    lastSighted: "October 10, 2025",
    region: "Marshlands",
    image: "/1.5.png",
  },
  {
    id: 6,
    name: "Trillium",
    scientificName: "Trillium grandiflorum",
    category: "flora",
    status: "Protected",
    description:
      "The provincial flower of Ontario, this perennial wildflower is known for its three-petaled white flowers that gradually turn pink with age. It takes up to 17 years to mature and produce flowers, making it particularly vulnerable to disturbance.",
    habitat: "Rich, deciduous forests",
    conservation: "Protected",
    audioText:
      "Trillium, scientific name Trillium grandiflorum. Iconic spring wildflower with three white petals that turn pink with age. Symbol of Ontario. Found in rich, deciduous forests. Conservation status is protected. Please do not pick or disturb this protected species.",
    lastSighted: "May 15, 2025",
    region: "Conservation Area",
    image: "/1.6.png",
  },
];
