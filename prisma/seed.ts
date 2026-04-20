import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Prices are whole Kenyan shillings (KES). */
const products = [
  {
    slug: "double-door-refrigerator-320l",
    name: "Double Door Refrigerator 320L",
    description:
      "Energy-saving fridge/freezer combo for home and small commercial kitchens. Sample market pricing referenced from Jumia Kenya listings.",
    price: 98499,
    image:
      "https://images.unsplash.com/photo-1571172964276-91b96f88f329?w=1200&q=80",
    category: "Major Equipment",
    stock: 7,
  },
  {
    slug: "gas-cooking-range-5-burner",
    name: "Gas Cooking Range 5-Burner + Oven",
    description:
      "Freestanding range with large oven cavity and enamel pan supports. Sample price benchmarked from Carrefour and Hotpoint appliance listings.",
    price: 126000,
    image:
      "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=1200&q=80",
    category: "Major Equipment",
    stock: 6,
  },
  {
    slug: "dishwasher-12-place-settings",
    name: "Dishwasher 12 Place Settings",
    description:
      "Freestanding dishwasher with eco mode, rapid wash and sanitize cycle. Sample market range from online appliance stores in Kenya.",
    price: 112500,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31b?w=1200&q=80",
    category: "Major Equipment",
    stock: 5,
  },
  {
    slug: "microwave-oven-30l",
    name: "Microwave Oven 30L",
    description:
      "Digital microwave with grill function and child lock. Sample pricing based on Kilimall and Jumia electronics listings.",
    price: 23500,
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=1200&q=80",
    category: "Major Equipment",
    stock: 12,
  },
  {
    slug: "food-processor-3l",
    name: "Food Processor 3L",
    description:
      "Multi-function processor for slicing, shredding and blending. Sample prices compared across Amazon and Jumia.",
    price: 28400,
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1f45d9b1?w=1200&q=80",
    category: "Major Equipment",
    stock: 15,
  },
  {
    slug: "stand-mixer-5l",
    name: "Stand Mixer 5L",
    description:
      "Planetary mixer with dough hook and whisk for bakery prep. Sample prices referenced from online bakery supply stores.",
    price: 46900,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80",
    category: "Major Equipment",
    stock: 9,
  },
  {
    slug: "air-fryer-toaster-oven-12l",
    name: "Air Fryer Toaster Oven 12L",
    description:
      "Countertop oven for roasting, toasting and air frying. Market reference sourced from Noon and Amazon listings.",
    price: 32200,
    image:
      "https://images.unsplash.com/photo-1585515320310-814814257c27?w=1200&q=80",
    category: "Major Equipment",
    stock: 11,
  },
  {
    slug: "stock-pot-12l-stainless",
    name: "Stock Pot 12L Stainless",
    description:
      "Heavy-gauge stock pot for stews, stocks and batch cooking. Sample market prices from Jumia cookware sellers.",
    price: 9600,
    image:
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1200&q=80",
    category: "Major Equipment",
    stock: 25,
  },
  {
    slug: "frying-pan-skillet-30cm",
    name: "Frying Pan Skillet 30cm",
    description:
      "Non-stick skillet with induction base and stay-cool handle. Pricing benchmarked from Carrefour cookware listings.",
    price: 5800,
    image:
      "https://images.unsplash.com/photo-1584990344519-242f33b4560c?w=1200&q=80",
    category: "Major Equipment",
    stock: 34,
  },
  {
    slug: "serving-platter-oval-40cm",
    name: "Serving Platter Oval 40cm",
    description:
      "Large porcelain platter for family-style serving. Sample pricing references from homeware ecommerce stores.",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    category: "Crockery (Dinnerware)",
    stock: 40,
  },
  {
    slug: "dinner-plate-set-6pc",
    name: "Dinner Plate Set (6pc)",
    description:
      "Full-size ceramic dinner plates for daily meals. Sample market rates sourced from Jumia and Naivas online catalogs.",
    price: 7400,
    image:
      "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=1200&q=80",
    category: "Crockery (Dinnerware)",
    stock: 28,
  },
  {
    slug: "soup-and-cereal-bowl-set",
    name: "Soup & Cereal Bowl Set (8pc)",
    description:
      "Deep ceramic bowls suitable for soups, cereals and snacks. Price range benchmarked from online dinnerware shops.",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
    category: "Crockery (Dinnerware)",
    stock: 33,
  },
  {
    slug: "ramekin-set-6pc",
    name: "Ramekin Set (6pc)",
    description:
      "Small ceramic ramekins for sauces, dips and desserts. Sample prices sourced from Amazon kitchen listings.",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&q=80",
    category: "Crockery (Dinnerware)",
    stock: 50,
  },
  {
    slug: "glass-pitcher-1-8l",
    name: "Glass Pitcher 1.8L",
    description:
      "Large jug for water, juice and cold brew service. Price sampled from online supermarket stores.",
    price: 2700,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1200&q=80",
    category: "Glassware",
    stock: 42,
  },
  {
    slug: "highball-tumbler-set-12pc",
    name: "Highball & Tumbler Set (12pc)",
    description:
      "Mixed tall and short glasses for home entertaining. Pricing benchmarked from Jumia home section.",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80",
    category: "Glassware",
    stock: 36,
  },
  {
    slug: "wine-glass-set-red-white-8pc",
    name: "Red & White Wine Glass Set (8pc)",
    description:
      "Balanced stems with two bowl profiles for red and white wines. Sample market rates sourced from online barware shops.",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
    category: "Glassware",
    stock: 21,
  },
  {
    slug: "champagne-flute-shot-set",
    name: "Champagne Flute + Shot Glass Combo",
    description:
      "Celebration set containing flutes and mini shot glasses. Pricing reference from ecommerce giftware listings.",
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80",
    category: "Glassware",
    stock: 29,
  },
  {
    slug: "chef-knife-8in",
    name: "Chef Knife 8 inch",
    description:
      "Multi-purpose forged knife for chopping and slicing. Sample online pricing from Jumia kitchen knife vendors.",
    price: 3100,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=1200&q=80",
    category: "Cutlery & Hand Utensils",
    stock: 64,
  },
  {
    slug: "ladle-tongs-whisk-set",
    name: "Ladle, Tongs & Whisk Set",
    description:
      "Core hand tools for serving and prep with stainless finish. Price references from online cooking tools stores.",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
    category: "Cutlery & Hand Utensils",
    stock: 52,
  },
  {
    slug: "dinner-cutlery-set-24pc",
    name: "Dinner Cutlery Set (24pc)",
    description:
      "Includes dinner knives, forks, soup spoons and teaspoons for six people. Sample rates pulled from leading online marketplaces.",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=1200&q=80",
    category: "Cutlery & Hand Utensils",
    stock: 31,
  },
  {
    slug: "dessert-spoon-fork-set-12pc",
    name: "Dessert Spoon & Fork Set (12pc)",
    description:
      "Mid-sized dessert utensils with mirror polish finish. Sample pricing inspired by Amazon tabletop listings.",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=1200&q=80",
    category: "Cutlery & Hand Utensils",
    stock: 46,
  },
  {
    slug: "paring-knife-3-5in",
    name: "Paring Knife 3.5 inch",
    description:
      "Compact peeling and trimming knife with ergonomic grip. Pricing benchmarked from online kitchen stores.",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    category: "Cutlery & Hand Utensils",
    stock: 70,
  },
  {
    slug: "cutting-board-xl",
    name: "Cutting Board XL",
    description:
      "Large prep board with groove channel for clean slicing. Sample prices drawn from Jumia and Carrefour home sections.",
    price: 2300,
    image:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1200&q=80",
    category: "Inclusive Tools",
    stock: 58,
  },
  {
    slug: "colander-stainless-28cm",
    name: "Colander Stainless 28cm",
    description:
      "Deep bowl-style strainer for pasta, vegetables and washing produce. Sample pricing from online cookware sellers.",
    price: 2600,
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=1200&q=80",
    category: "Inclusive Tools",
    stock: 44,
  },
  {
    slug: "rolling-pin-solid-wood",
    name: "Rolling Pin Solid Wood",
    description:
      "Heavy-duty rolling pin for pastry, chapati and pizza dough. Price references sourced from ecommerce baking shops.",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=1200&q=80",
    category: "Inclusive Tools",
    stock: 39,
  },
  {
    slug: "measuring-jug-1l",
    name: "Measuring Jug 1L",
    description:
      "Clear volume-marked jug for liquids and mixing prep. Sample prices based on online household stores.",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1556909212-d5bd604bbda7?w=1200&q=80",
    category: "Inclusive Tools",
    stock: 66,
  },
  {
    slug: "box-grater-opener-set",
    name: "Box Grater + Bottle Opener Set",
    description:
      "Two essential compact tools for prep and serving. Pricing benchmarked from online multipurpose utensil listings.",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1589739901678-4d92f6d7f5d9?w=1200&q=80",
    category: "Inclusive Tools",
    stock: 48,
  },
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: p,
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category,
        stock: p.stock,
      },
    });
  }
  console.log(`Seeded ${products.length} products (KES)`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
