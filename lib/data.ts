/**
 * AURÉLIA — editorial content.
 * Keeping copy + data here keeps components presentational and easy to restyle.
 */

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  accent: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Le Manteau Sculpté",
    category: "Outerwear",
    price: "$1,480",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
    accent: "#B4623F",
  },
  {
    id: "p2",
    name: "Robe de Soie Nocturne",
    category: "Evening",
    price: "$2,150",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
    accent: "#5B2333",
  },
  {
    id: "p3",
    name: "Le Trench Atelier",
    category: "Tailoring",
    price: "$1,720",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=80",
    accent: "#C9A96A",
  },
  {
    id: "p4",
    name: "Cashmere Tonal Knit",
    category: "Essentials",
    price: "$690",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    accent: "#8E8878",
  },
];

export type Chapter = {
  index: string;
  title: string;
  body: string;
  image: string;
};

export const chapters: Chapter[] = [
  {
    index: "01",
    title: "Regenerative Fibres",
    body: "Every thread begins in soil we can trace. We source organic wool, peace silk and regenerative cotton from twelve family farms across Europe.",
    image:
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "02",
    title: "Hand-Finished",
    body: "In our Paris atelier, a single coat passes through forty-two pairs of hands. Not one seam is rushed, not one detail left to chance.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "03",
    title: "Made to Endure",
    body: "We design for decades, not seasons. Reinforced construction and timeless silhouettes mean your AURÉLIA piece outlives every trend.",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "04",
    title: "Circular by Design",
    body: "Return any garment at the end of its life. We repair, re-dye or re-weave it — closing the loop that fast fashion left open.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  },
];

export const marqueeWords = [
  "Regenerative Fabrics",
  "Atelier Made",
  "Limited Edition",
  "Carbon Neutral",
  "Made to Endure",
  "Paris · Milano · Kyoto",
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The coat is a piece of architecture. Three winters in and it still looks like the day it arrived.",
    author: "Isabelle Moreau",
    role: "Creative Director, Maison LvB",
  },
  {
    quote:
      "AURÉLIA is the only label I trust to be both quietly luxurious and genuinely responsible.",
    author: "Dr. Amara Osei",
    role: "Sustainable Fashion Researcher",
  },
  {
    quote:
      "You feel the forty hands behind every seam. Nothing else in my wardrobe comes close.",
    author: "Kenji Tanaka",
    role: "Architect, Studio KT",
  },
];

export const stats = [
  { value: 42, suffix: "", label: "Hands per garment" },
  { value: 12, suffix: "", label: "Regenerative farms" },
  { value: 98, suffix: "%", label: "Traceable fibres" },
  { value: 30, suffix: "yr", label: "Designed lifespan" },
];