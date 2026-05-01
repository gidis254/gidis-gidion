import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  // Main categories
  { name: "Cookware", slug: "cookware" },
  { name: "Bakeware", slug: "bakeware" },
  { name: "Utensils", slug: "utensils" },
  { name: "Storage", slug: "storage" },
  { name: "Drinkware", slug: "drinkware" },
  { name: "Dinnerware", slug: "dinnerware" },
  { name: "Cutlery", slug: "cutlery" },
  { name: "Appliances", slug: "appliances" },
  { name: "Glassware", slug: "glassware" },
  { name: "Crockery", slug: "crockery" },

  // Cookware subcategories
  { name: "Cookware Sets", slug: "cookware-sets", parentSlug: "cookware" },
  { name: "Pots & Pans", slug: "pots-pans", parentSlug: "cookware" },
  { name: "Hotpots", slug: "hotpots", parentSlug: "cookware" },
  { name: "Lids", slug: "lids", parentSlug: "cookware" },
  { name: "Pot Racks", slug: "pot-racks", parentSlug: "cookware" },
  { name: "Pressure Cookers", slug: "pressure-cookers", parentSlug: "cookware" },
  { name: "Specialty Cookware", slug: "specialty-cookware", parentSlug: "cookware" },
  { name: "Toaster Oven Cookware", slug: "toaster-oven-cookware", parentSlug: "cookware" },
  { name: "Cookware Accessories", slug: "cookware-accessories", parentSlug: "cookware" },

  // Bakeware subcategories
  { name: "Bakers & Casseroles", slug: "bakers-casseroles", parentSlug: "bakeware" },
  { name: "Bakeware Sets", slug: "bakeware-sets", parentSlug: "bakeware" },
  { name: "Baking & Cookie Sheets", slug: "baking-cookie-sheets", parentSlug: "bakeware" },
  { name: "Baking & Pastry Utensils", slug: "baking-pastry-utensils", parentSlug: "bakeware" },
  { name: "Baking Cups", slug: "baking-cups", parentSlug: "bakeware" },
  { name: "Baking Mats", slug: "baking-mats", parentSlug: "bakeware" },
  { name: "Cake Rings", slug: "cake-rings", parentSlug: "bakeware" },
  { name: "Cookie Cutters", slug: "cookie-cutters", parentSlug: "bakeware" },
  { name: "Cookie Presses", slug: "cookie-presses", parentSlug: "bakeware" },
  { name: "Cooking Torches", slug: "cooking-torches", parentSlug: "bakeware" },
  { name: "Cooling Racks", slug: "cooling-racks", parentSlug: "bakeware" },
  { name: "Mixing Bowls", slug: "mixing-bowls", parentSlug: "bakeware" },
  { name: "Parchment", slug: "parchment", parentSlug: "bakeware" },
  { name: "Rolling Pins", slug: "rolling-pins", parentSlug: "bakeware" },
  { name: "Sifters", slug: "sifters", parentSlug: "bakeware" },
  { name: "Baking Tools Sets", slug: "baking-tools-sets", parentSlug: "bakeware" },
  { name: "Bread & Loaf Pans", slug: "bread-loaf-pans", parentSlug: "bakeware" },
  { name: "Cake Pans", slug: "cake-pans", parentSlug: "bakeware" },
  { name: "Candy Making Accessories", slug: "candy-making-accessories", parentSlug: "bakeware" },
  { name: "Decorating Tools", slug: "decorating-tools", parentSlug: "bakeware" },
  { name: "Jelly-Roll Pans", slug: "jelly-roll-pans", parentSlug: "bakeware" },
  { name: "Muffin & Cupcake Pans", slug: "muffin-cupcake-pans", parentSlug: "bakeware" },
  { name: "Pastry & Baking Molds", slug: "pastry-baking-molds", parentSlug: "bakeware" },
  { name: "Pie, Tart & Quiche Pans", slug: "pie-tart-quiche-pans", parentSlug: "bakeware" },
  { name: "Pizza Pans & Stones", slug: "pizza-pans-stones", parentSlug: "bakeware" },
  { name: "Popover Pans", slug: "popover-pans", parentSlug: "bakeware" },
  { name: "Ramekins & Souffle Dishes", slug: "ramekins-souffle-dishes", parentSlug: "bakeware" },
  { name: "Roasting Pans", slug: "roasting-pans", parentSlug: "bakeware" },

  // Drinkware subcategories
  { name: "Cups", slug: "cups", parentSlug: "drinkware" },
  { name: "Vacuum Flasks", slug: "vacuum-flasks", parentSlug: "drinkware" },
  { name: "Carafes & Pitchers", slug: "carafes-pitchers", parentSlug: "drinkware" },
  { name: "Stovetop Tea Kettles", slug: "stovetop-tea-kettles", parentSlug: "drinkware" },
  { name: "Stovetop Espresso & Moka Pots", slug: "stovetop-espresso-moka-pots", parentSlug: "drinkware" },
  { name: "Tea Accessories", slug: "tea-accessories", parentSlug: "drinkware" },
  { name: "Coffee Scoops", slug: "coffee-scoops", parentSlug: "drinkware" },
  { name: "Drink Stirrers", slug: "drink-stirrers", parentSlug: "drinkware" },

  // Glassware subcategories (drinks & beverages)
  {
    name: "Wine & Alcoholic Drink Glasses",
    slug: "glassware-wine-alcoholic",
    parentSlug: "glassware",
  },
  {
    name: "Soft Drink & Water Glasses",
    slug: "glassware-soft-water",
    parentSlug: "glassware",
  },
  {
    name: "Hot Drink Glassware",
    slug: "glassware-hot-drinks",
    parentSlug: "glassware",
  },

  // Dinnerware subcategories
  { name: "Plates", slug: "plates", parentSlug: "dinnerware" },

  // Crockery subcategories (plates, bowls, serving ware)
  { name: "Crockery Plates", slug: "crockery-plates", parentSlug: "crockery" },
  { name: "Crockery Bowls", slug: "crockery-bowls", parentSlug: "crockery" },
  { name: "Serving Crockery", slug: "crockery-serving", parentSlug: "crockery" },

  // Utensils subcategories
  { name: "Kitchen Utensils", slug: "kitchen-utensils", parentSlug: "utensils" },
  { name: "Knife Accessories", slug: "knife-accessories", parentSlug: "utensils" },

  // Cutlery subcategories
  { name: "Boning Knives", slug: "boning-knives", parentSlug: "cutlery" },
  { name: "Bread Knives", slug: "bread-knives", parentSlug: "cutlery" },
  { name: "Cleavers", slug: "cleavers", parentSlug: "cutlery" },
  { name: "Cutting Boards", slug: "cutting-boards", parentSlug: "cutlery" },
  { name: "Electric Knives", slug: "electric-knives", parentSlug: "cutlery" },
  { name: "Eating Cutlery", slug: "cutlery-eating", parentSlug: "cutlery" },
  { name: "Serving Cutlery", slug: "cutlery-serving", parentSlug: "cutlery" },

  // Storage subcategories
  { name: "Kitchen Storage", slug: "kitchen-storage", parentSlug: "storage" },
  { name: "Canning", slug: "canning", parentSlug: "storage" },
];

/** Prices are whole Kenyan shillings (KES). */
const products = [
  {
    slug: "double-door-refrigerator-320l",
    name: "Double Door Refrigerator 320L",
    description:
      "Energy-saving fridge/freezer combo for home and small commercial kitchens. Sample market pricing referenced from Jumia Kenya listings.",
    price: 98499,
    image:
      "https://images.unsplash.com/photo-1722603929403-de9e80c46a9a?w=1200&q=80",
    categorySlug: "appliances",
    stock: 7,
  },
  {
    slug: "gas-cooking-range-5-burner",
    name: "Gas Cooking Range 5-Burner + Oven",
    description:
      "Freestanding range with large oven cavity and enamel pan supports. Sample price benchmarked from Carrefour and Hotpoint appliance listings.",
    price: 126000,
    image:
      "https://images.unsplash.com/photo-1574801439983-71705fb11bc9?w=1200&q=80",
    categorySlug: "appliances",
    stock: 6,
  },
  {
    slug: "dishwasher-12-place-settings",
    name: "Dishwasher 12 Place Settings",
    description:
      "Freestanding dishwasher with eco mode, rapid wash and sanitize cycle. Sample market range from online appliance stores in Kenya.",
    price: 112500,
    image:
      "https://images.unsplash.com/photo-1758631130778-42d518bf13aa?w=1200&q=80",
    categorySlug: "appliances",
    stock: 5,
  },
  {
    slug: "microwave-oven-30l",
    name: "Microwave Oven 30L",
    description:
      "Digital microwave with grill function and child lock. Sample pricing based on Kilimall and Jumia electronics listings.",
    price: 23500,
    image:
      "https://images.unsplash.com/photo-1578845426296-1e17e27272e8?w=1200&q=80",
    categorySlug: "appliances",
    stock: 12,
  },
  {
    slug: "food-processor-3l",
    name: "Food Processor 3L",
    description:
      "Multi-function processor for slicing, shredding and blending. Sample prices compared across Amazon and Jumia.",
    price: 28400,
    image:
      "https://images.unsplash.com/photo-1512203864638-f6cbb3cca374?w=1200&q=80",
    categorySlug: "appliances",
    stock: 15,
  },
  {
    slug: "stand-mixer-5l",
    name: "Stand Mixer 5L",
    description:
      "Planetary mixer with dough hook and whisk for bakery prep. Sample prices referenced from online bakery supply stores.",
    price: 46900,
    image:
      "https://images.unsplash.com/photo-1587560555774-4063ddc3fe25?w=1200&q=80",
    categorySlug: "appliances",
    stock: 9,
  },
  {
    slug: "air-fryer-toaster-oven-12l",
    name: "Air Fryer Toaster Oven 12L",
    description:
      "Countertop oven for roasting, toasting and air frying. Market reference sourced from Noon and Amazon listings.",
    price: 32200,
    image:
      "https://images.unsplash.com/photo-1655354440512-d98e9053d709?w=1200&q=80",
    categorySlug: "appliances",
    stock: 11,
  },
  {
    slug: "stock-pot-12l-stainless",
    name: "Stock Pot 12L Stainless",
    description:
      "Heavy-gauge stock pot for stews, stocks and batch cooking. Sample market prices from Jumia cookware sellers.",
    price: 9600,
    image:
      "https://images.unsplash.com/photo-1719461387654-130a0202668e?w=1200&q=80",
    categorySlug: "pots-pans",
    stock: 25,
  },
  {
    slug: "frying-pan-skillet-30cm",
    name: "Frying Pan Skillet 30cm",
    description:
      "Non-stick skillet with induction base and stay-cool handle. Pricing benchmarked from Carrefour cookware listings.",
    price: 5800,
    image:
      "https://images.unsplash.com/photo-1592156328697-079f6ee0cfa5?w=1200&q=80",
    categorySlug: "pots-pans",
    stock: 34,
  },
  {
    slug: "serving-platter-oval-40cm",
    name: "Serving Platter Oval 40cm",
    description:
      "Large porcelain platter for family-style serving. Sample pricing references from homeware ecommerce stores.",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1650218385764-ce069ab3e4da?w=1200&q=80",
    categorySlug: "plates",
    stock: 40,
  },
  {
    slug: "dinner-plate-set-6pc",
    name: "Dinner Plate Set (6pc)",
    description:
      "Full-size ceramic dinner plates for daily meals. Sample market rates sourced from Jumia and Naivas online catalogs.",
    price: 7400,
    image:
      "https://images.unsplash.com/photo-1611757947339-7aadab3fff93?w=1200&q=80",
    categorySlug: "plates",
    stock: 28,
  },
  {
    slug: "soup-and-cereal-bowl-set",
    name: "Soup & Cereal Bowl Set (8pc)",
    description:
      "Deep ceramic bowls suitable for soups, cereals and snacks. Price range benchmarked from online dinnerware shops.",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1711936432802-6ca24117c4a2?w=1200&q=80",
    categorySlug: "plates", // or bowls, but since not specified, plates
    stock: 33,
  },
  {
    slug: "ramekin-set-6pc",
    name: "Ramekin Set (6pc)",
    description:
      "Small ceramic ramekins for sauces, dips and desserts. Sample prices sourced from Amazon kitchen listings.",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1584990347449-fd98bc063110?w=1200&q=80",
    categorySlug: "ramekins-souffle-dishes",
    stock: 50,
  },
  {
    slug: "glass-pitcher-1-8l",
    name: "Glass Pitcher 1.8L",
    description:
      "Large jug for water, juice and cold brew service. Price sampled from online supermarket stores.",
    price: 2700,
    image:
      "https://images.unsplash.com/photo-1656870936057-451a9ec969a0?w=1200&q=80",
    categorySlug: "carafes-pitchers",
    stock: 42,
  },
  {
    slug: "highball-tumbler-set-12pc",
    name: "Highball & Tumbler Set (12pc)",
    description:
      "Mixed tall and short glasses for home entertaining. Pricing benchmarked from Jumia home section.",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1695425761643-7362b6291fce?w=1200&q=80",
    categorySlug: "cups", // glasses as cups
    stock: 36,
  },
  {
    slug: "wine-glass-set-red-white-8pc",
    name: "Red & White Wine Glass Set (8pc)",
    description:
      "Balanced stems with two bowl profiles for red and white wines. Sample market rates sourced from online barware shops.",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1776174186211-2ca2a77b1311?w=1200&q=80",
    categorySlug: "cups",
    stock: 21,
  },
  {
    slug: "champagne-flute-shot-set",
    name: "Champagne Flute + Shot Glass Combo",
    description:
      "Celebration set containing flutes and mini shot glasses. Pricing reference from ecommerce giftware listings.",
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1652904490133-2a42a3a2ee61?w=1200&q=80",
    categorySlug: "cups",
    stock: 29,
  },
  {
    slug: "chef-knife-8in",
    name: "Chef Knife 8 inch",
    description:
      "Multi-purpose forged knife for chopping and slicing. Sample online pricing from Jumia kitchen knife vendors.",
    price: 3100,
    image:
      "https://images.unsplash.com/photo-1593618523725-c22aa27d353d?w=1200&q=80",
    categorySlug: "bread-knives", // chef knife as bread knife category
    stock: 64,
  },
  {
    slug: "ladle-tongs-whisk-set",
    name: "Ladle, Tongs & Whisk Set",
    description:
      "Core hand tools for serving and prep with stainless finish. Price references from online cooking tools stores.",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1581259987154-a680e36f0e5f?w=1200&q=80",
    categorySlug: "kitchen-utensils",
    stock: 52,
  },
  {
    slug: "dinner-cutlery-set-24pc",
    name: "Dinner Cutlery Set (24pc)",
    description:
      "Includes dinner knives, forks, soup spoons and teaspoons for six people. Sample rates pulled from leading online marketplaces.",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1760594308330-404765c714b4?w=1200&q=80",
    categorySlug: "bread-knives", // cutlery as knives
    stock: 31,
  },
  {
    slug: "dessert-spoon-fork-set-12pc",
    name: "Dessert Spoon & Fork Set (12pc)",
    description:
      "Mid-sized dessert utensils with mirror polish finish. Sample pricing inspired by Amazon tabletop listings.",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1697729638448-6afee6a4f395?w=1200&q=80",
    categorySlug: "kitchen-utensils",
    stock: 46,
  },
  {
    slug: "paring-knife-3-5in",
    name: "Paring Knife 3.5 inch",
    description:
      "Compact peeling and trimming knife with ergonomic grip. Pricing benchmarked from online kitchen stores.",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1617790787311-6bdca44dac77?w=1200&q=80",
    categorySlug: "boning-knives",
    stock: 70,
  },
  {
    slug: "cutting-board-xl",
    name: "Cutting Board XL",
    description:
      "Large prep board with groove channel for clean slicing. Sample prices drawn from Jumia and Carrefour home sections.",
    price: 2300,
    image:
      "https://images.unsplash.com/photo-1609210885628-4c6a41a8caf7?w=1200&q=80",
    categorySlug: "cutting-boards",
    stock: 58,
  },
  {
    slug: "colander-stainless-28cm",
    name: "Colander Stainless 28cm",
    description:
      "Deep bowl-style strainer for pasta, vegetables and washing produce. Sample pricing from online cookware sellers.",
    price: 2600,
    image:
      "https://images.unsplash.com/photo-1723748141066-79e295073f03?w=1200&q=80",
    categorySlug: "kitchen-utensils",
    stock: 44,
  },
  {
    slug: "rolling-pin-solid-wood",
    name: "Rolling Pin Solid Wood",
    description:
      "Heavy-duty rolling pin for pastry, chapati and pizza dough. Price references sourced from ecommerce baking shops.",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1723934603737-46005a51c7f9?w=1200&q=80",
    categorySlug: "rolling-pins",
    stock: 39,
  },
  {
    slug: "measuring-jug-1l",
    name: "Measuring Jug 1L",
    description:
      "Clear volume-marked jug for liquids and mixing prep. Sample prices based on online household stores.",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1719244394388-1ec3fc0de69c?w=1200&q=80",
    categorySlug: "kitchen-utensils",
    stock: 66,
  },
  {
    slug: "box-grater-opener-set",
    name: "Box Grater + Bottle Opener Set",
    description:
      "Two essential compact tools for prep and serving. Pricing benchmarked from online multipurpose utensil listings.",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1571115637435-26e423673f7b?w=1200&q=80",
    categorySlug: "kitchen-utensils",
    stock: 48,
  },
  // Additional Cookware
  {
    slug: "non-stick-pan-set-3pc",
    name: "Non-Stick Pan Set (3pc)",
    description:
      "Complete cookware set with frying pan, saucepan and stockpot. Durable PTFE coating with cool handle design.",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1498579992117-24d6ebc00a19?w=1200&q=80",
    categorySlug: "cookware",
    stock: 18,
  },
  {
    slug: "stainless-steel-pot-5l",
    name: "Stainless Steel Pot 5L",
    description:
      "Premium polished stainless steel cooking pot with lid. Induction compatible for all cooktops.",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1586969593928-1c87c1f9c2ef?w=1200&q=80",
    categorySlug: "cookware",
    stock: 22,
  },
  {
    slug: "cast-iron-dutch-oven-5-5l",
    name: "Cast Iron Dutch Oven 5.5L",
    description:
      "Enameled cast iron for braising, baking and slow cooking. Distributes heat evenly for perfect results.",
    price: 18900,
    image:
      "https://images.unsplash.com/photo-1677274207889-8466cc7e2198?w=1200&q=80",
    categorySlug: "cookware",
    stock: 14,
  },
  {
    slug: "wok-carbon-steel-14in",
    name: "Wok Carbon Steel 14 inch",
    description:
      "Traditional carbon steel wok for stir-frying. Pre-seasoned and ready to use immediately.",
    price: 8800,
    image:
      "https://images.unsplash.com/photo-1583778176607-7af2b4fe1bad?w=1200&q=80",
    categorySlug: "cookware",
    stock: 16,
  },
  {
    slug: "pressure-cooker-instant-6l",
    name: "Pressure Cooker Instant Pot 6L",
    description:
      "Electric multi-cooker with 14 smart programs. Makes meals up to 70% faster than traditional methods.",
    price: 22400,
    image:
      "https://images.unsplash.com/photo-1603959160031-5aff42c6ff5b?w=1200&q=80",
    categorySlug: "cookware",
    stock: 11,
  },
  {
    slug: "saucepan-lid-1-5l",
    name: "Saucepan with Lid 1.5L",
    description:
      "Compact sauce and milk pot with tempered glass lid. Perfect for heating and simmering.",
    price: 3400,
    image:
      "https://images.unsplash.com/photo-1592156553560-860205d3427b?w=1200&q=80",
    categorySlug: "cookware",
    stock: 27,
  },
  // Additional Bakeware
  {
    slug: "baking-tray-set-2pc",
    name: "Baking Tray Set (2pc)",
    description:
      "Non-stick commercial baking trays for cookies and pastries. Heavy-duty with reinforced edges.",
    price: 4900,
    image:
      "https://images.unsplash.com/photo-1603379422471-65bd450a380a?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 31,
  },
  {
    slug: "round-cake-pan-9in",
    name: "Round Cake Pan 9 inch",
    description:
      "Non-stick round pan for layered cakes. Produces even browning with professional results.",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1677784982586-333b12148e26?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 35,
  },
  {
    slug: "rectangle-cake-pan-9x13",
    name: "Rectangle Cake Pan 9x13 inch",
    description:
      "Standard rectangular baking pan for sheet cakes and brownies. Sloped sides for easy removal.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1603379421571-f110a830382a?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 40,
  },
  {
    slug: "muffin-tin-12cup",
    name: "Muffin Tin 12 Cup",
    description:
      "Non-stick muffin pan for cupcakes and muffins. Silicone-reinforced for durability.",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1611329695518-1763319f3551?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 33,
  },
  {
    slug: "cooling-rack-stainless",
    name: "Cooling Rack Stainless",
    description:
      "Wire cooling rack for cookies and baked goods. Allows air circulation from all sides.",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1657073893406-b817ba12ef34?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 44,
  },
  {
    slug: "mixing-bowl-set-3pc",
    name: "Mixing Bowl Set (3pc)",
    description:
      "Stainless steel mixing bowls in graduated sizes. Ideal for baking and food prep.",
    price: 3600,
    image:
      "https://images.unsplash.com/photo-1571115636932-367b6cf94418?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 38,
  },
  {
    slug: "pie-pan-9in",
    name: "Pie Pan 9 inch",
    description:
      "Non-stick pie pan with deep sloped sides. Perfect for fruit and cream pies.",
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1565958000476-349d3ba48bb4?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 28,
  },
  {
    slug: "pizza-stone-12in",
    name: "Pizza Stone 12 inch",
    description:
      "Ceramic pizza stone for crispy homemade pizzas. Distributes heat evenly throughout.",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1696919499685-5b9fb44227c5?w=1200&q=80",
    categorySlug: "bakeware",
    stock: 20,
  },
  // Additional Drinkware
  {
    slug: "tea-kettle-stainless-2l",
    name: "Tea Kettle Stainless 2L",
    description:
      "Whistling stovetop kettle with stay-cool handle. Fits all cooktop types including induction.",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1637217632015-d1d00b77f327?w=1200&q=80",
    categorySlug: "drinkware",
    stock: 24,
  },
  {
    slug: "coffee-mug-set-6pc",
    name: "Coffee Mug Set (6pc)",
    description:
      "Large ceramic mugs perfect for morning coffee. Microwave and dishwasher safe.",
    price: 4400,
    image:
      "https://images.unsplash.com/photo-1616480120474-5743ef6f18a8?w=1200&q=80",
    categorySlug: "drinkware",
    stock: 42,
  },
  {
    slug: "thermos-flask-1-2l",
    name: "Thermos Flask 1.2L",
    description:
      "Double-wall vacuum insulated flask keeps drinks hot for 12 hours. Durable stainless steel.",
    price: 5900,
    image:
      "https://images.unsplash.com/photo-1666355704191-d3fc5d3afb89?w=1200&q=80",
    categorySlug: "drinkware",
    stock: 18,
  },
  {
    slug: "juice-carafe-1l",
    name: "Juice Carafe 1L",
    description:
      "Glass pitcher with built-in strainer. Perfect for fresh juices and cold beverages.",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1695634239015-5f060b1f52d4?w=1200&q=80",
    categorySlug: "drinkware",
    stock: 35,
  },
  {
    slug: "espresso-moka-pot-3cup",
    name: "Espresso Moka Pot 3 Cup",
    description:
      "Stovetop espresso maker for rich coffee brewing. Makes 3 cups of espresso per cycle.",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1565151456409-6acf77f4255e?w=1200&q=80",
    categorySlug: "drinkware",
    stock: 29,
  },
  // Additional Dinnerware
  {
    slug: "salad-plate-set-6pc",
    name: "Salad Plate Set (6pc)",
    description:
      "Smaller ceramic plates ideal for appetizers and salads. Elegant design complements any table.",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1705312435272-2778395ce362?w=1200&q=80",
    categorySlug: "dinnerware",
    stock: 31,
  },
  {
    slug: "pasta-bowl-set-6pc",
    name: "Pasta Bowl Set (6pc)",
    description:
      "Deep ceramic bowls perfect for pasta, soup and stew. Wide rim prevents spills.",
    price: 6100,
    image:
      "https://images.unsplash.com/photo-1651828818680-b0e2364d989d?w=1200&q=80",
    categorySlug: "dinnerware",
    stock: 26,
  },
  {
    slug: "dessert-plate-set-6pc",
    name: "Dessert Plate Set (6pc)",
    description:
      "Small elegant plates for serving desserts and pastries. Premium ceramic finish.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1675809550018-5f3fc4b8fdf8?w=1200&q=80",
    categorySlug: "dinnerware",
    stock: 32,
  },
  // Additional Utensils
  {
    slug: "rubber-spatula-set-3pc",
    name: "Rubber Spatula Set (3pc)",
    description:
      "Heat-resistant silicone spatulas in various sizes. Perfect for mixing, folding and scraping.",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1547483370-bdd86d60c667?w=1200&q=80",
    categorySlug: "utensils",
    stock: 56,
    
  },
  {
    slug: "wooden-spoon-set-5pc",
    name: "Wooden Spoon Set (5pc)",
    description:
      "Natural wood spoons in assorted sizes. Gentle on cookware and traditional cooking.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1723879683051-d926c556a190?w=1200&q=80",
    categorySlug: "utensils",
    stock: 62,
  },
  {
    slug: "slotted-turner-spatula",
    name: "Slotted Turner Spatula",
    description:
      "Stainless steel turner for flipping pancakes and eggs. Perforated design drains liquids.",
    price: 1400,
    image:
      "https://images.unsplash.com/photo-1765979576273-0e313277ee65?w=1200&q=80",
    categorySlug: "utensils",
    stock: 68,
  },
  {
    slug: "pasta-server-spoon",
    name: "Pasta Server Spoon",
    description:
      "Slotted spoon designed for serving pasta and noodles. Large capacity with long handle.",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1677750261537-d336b377cdba?w=1200&q=80",
    categorySlug: "utensils",
    stock: 55,
  },
  {
    slug: "tongs-locking-12in",
    name: "Locking Tongs 12 inch",
    description:
      "Stainless steel locking tongs for grilling and cooking. Easy-lock mechanism with safety.",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1769374071445-aaed84187a75?w=1200&q=80",
    categorySlug: "utensils",
    stock: 48,
  },
  // Additional Cutlery
  {
    slug: "bread-knife-8in",
    name: "Bread Knife 8 inch",
    description:
      "Serrated blade for cutting bread and pastries. Stays sharp longer with specialized edge.",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1708544024819-3f7e673c31a4?w=1200&q=80",
    categorySlug: "cutlery",
    stock: 35,
  },
  {
    slug: "utility-knife-5in",
    name: "Utility Knife 5 inch",
    description:
      "Mid-sized knife for general prep work. Versatile for slicing and chopping.",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1596633609591-e4e1e9e06b7f?w=1200&q=80",
    categorySlug: "cutlery",
    stock: 52,
  },
  {
    slug: "serrated-steak-knife-set-4pc",
    name: "Serrated Steak Knife Set (4pc)",
    description:
      "Premium serrated knives for cutting cooked meats. Easy cutting without crushing.",
    price: 4700,
    image:
      "https://images.unsplash.com/photo-1759990639089-e80026aeb6fe?w=1200&q=80",
    categorySlug: "cutlery",
    stock: 25,
  },
  {
    slug: "cleaver-knife-7in",
    name: "Cleaver Knife 7 inch",
    description:
      "Heavy-duty blade for chopping bones and tough vegetables. Professional chef quality.",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1590234275421-e19db506a4f9?w=1200&q=80",
    categorySlug: "cutlery",
    stock: 18,
  },
  {
    slug: "bamboo-cutting-board-xl",
    name: "Bamboo Cutting Board XL",
    description:
      "Eco-friendly bamboo board with juice groove. Naturally antimicrobial and durable.",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1662490881538-dc9419784bc3?w=1200&q=80",
    categorySlug: "cutlery",
    stock: 40,
  },
  {
    slug: "plastic-cutting-board-set-3pc",
    name: "Plastic Cutting Board Set (3pc)",
    description:
      "Color-coded boards for different foods. Prevents cross-contamination during prep.",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1584818110608-f4343ab2c75b?w=1200&q=80",
    categorySlug: "cutlery",
    stock: 58,
  },
  {
    slug: "marble-cutting-board-large",
    name: "Marble Cutting Board Large",
    description:
      "Elegant marble board for serving and prep. Natural stone with beautiful grain pattern.",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1700955113228-01095fb09a9e?w=1200&q=80",
    categorySlug: "cutlery",
    stock: 16,
  },
  // Additional Storage
  {
    slug: "glass-storage-container-set-5pc",
    name: "Glass Storage Container Set (5pc)",
    description:
      "Airtight glass containers with locking lids. Microwave and dishwasher safe.",
    price: 5600,
    image:
      "https://images.unsplash.com/photo-1760270049613-4b670a965673?w=1200&q=80",
    categorySlug: "storage",
    stock: 32,
  },
  {
    slug: "plastic-storage-container-set-8pc",
    name: "Plastic Storage Container Set (8pc)",
    description:
      "Budget-friendly stackable containers. Ideal for leftovers and meal prep.",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1665667111473-fcca0e8ea4f0?w=1200&q=80",
    categorySlug: "storage",
    stock: 48,
  },
  {
    slug: "vacuum-sealer-bags-50pc",
    name: "Vacuum Sealer Bags (50pc)",
    description:
      "Food storage bags for freezing and long-term storage. Prevents freezer burn.",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1642236613229-c5314ea9002f?w=1200&q=80",
    categorySlug: "storage",
    stock: 65,
  },
  {
    slug: "pantry-organizer-shelf-rack",
    name: "Pantry Organizer Shelf Rack",
    description:
      "Expandable shelf rack for kitchen cupboards. Doubles storage space efficiently.",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1702599860848-6e34f849b649?w=1200&q=80",
    categorySlug: "storage",
    stock: 28,
  },
  {
    slug: "glass-jar-set-6pc-with-lids",
    name: "Glass Jar Set (6pc with Lids)",
    description:
      "Mason-style jars for storing dry goods and pantry items. Authentic canning jars.",
    price: 4300,
    image:
      "https://images.unsplash.com/photo-1636602032556-48bab7e0e895?w=1200&q=80",
    categorySlug: "storage",
    stock: 35,
  },
  {
    slug: "aluminum-foil-roll-75m",
    name: "Aluminum Foil Roll 75m",
    description:
      "Heavy-duty kitchen foil for wrapping and baking. Professional commercial grade.",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1644116713079-db356beeedfb?w=1200&q=80",
    categorySlug: "storage",
    stock: 120,
  },

  // —— Glassware (hot & cold beverages) ——
  {
    slug: "stem-red-wine-glass-set-4pc",
    name: "Red Wine Glass (Set of 4)",
    description:
      "Bowl-shaped stemware that lets red wine breathe. For serving full-bodied wines at the table. Used for hot and cold drink service in formal and casual dining.",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
    categorySlug: "glassware-wine-alcoholic",
    stock: 36,
  },
  {
    slug: "stem-white-wine-glass-set-4pc",
    name: "White Wine Glass (Set of 4)",
    description:
      "U-shaped bowl preserves aroma for lighter whites and rosés. Ideal for chilled pours at brunch or dinner.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&q=80",
    categorySlug: "glassware-wine-alcoholic",
    stock: 34,
  },
  {
    slug: "champagne-flute-glass-set-6pc",
    name: "Champagne Flute (Set of 6)",
    description:
      "Tall narrow bowl keeps bubbles and temperature stable. For sparkling wine, prosecco, and toasts.",
    price: 6400,
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80",
    categorySlug: "glassware-wine-alcoholic",
    stock: 28,
  },
  {
    slug: "martini-cocktail-glass-set-4pc",
    name: "Cocktail Glass / Martini Glass (Set of 4)",
    description:
      "Iconic conical bowl for martinis, gimlets, and shaken cocktails. Stable stem for bar and home entertaining.",
    price: 4100,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?w=1200&q=80",
    categorySlug: "glassware-wine-alcoholic",
    stock: 30,
  },
  {
    slug: "beer-glass-mug-set-4pc",
    name: "Beer Glass / Mug (Set of 4)",
    description:
      "Classic shapes for draught and bottled beer — pint, pilsner, or handled mug styles. Chills well in the fridge before serving.",
    price: 3600,
    image:
      "https://images.unsplash.com/photo-1571615739179-f03f486eff95?w=1200&q=80",
    categorySlug: "glassware-wine-alcoholic",
    stock: 42,
  },
  {
    slug: "shot-glass-set-6pc",
    name: "Shot Glass (Set of 6)",
    description:
      "Heavy-base shooters for spirits and liqueurs. Easy to store and stack behind the bar.",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80",
    categorySlug: "glassware-wine-alcoholic",
    stock: 55,
  },
  {
    slug: "tumbler-lowball-old-fashioned-set-6pc",
    name: "Tumbler / Lowball / Old Fashioned Glass (Set of 6)",
    description:
      "Short sturdy glasses for spirits on the rocks, soft drinks, and cocktails. Stackable for everyday use.",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80",
    categorySlug: "glassware-soft-water",
    stock: 48,
  },
  {
    slug: "highball-glass-tall-set-6pc",
    name: "Highball Glass (Set of 6)",
    description:
      "Tall slim glass for mixed drinks, iced tea, and sparkling sodas with plenty of ice.",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1695425761643-7362b6291fce?w=1200&q=80",
    categorySlug: "glassware-soft-water",
    stock: 44,
  },
  {
    slug: "water-goblet-set-6pc",
    name: "Water Goblet (Set of 6)",
    description:
      "Generous bowl on a stem — elegant water service alongside wine at plated dinners.",
    price: 5900,
    image:
      "https://images.unsplash.com/photo-1761095596849-608b6a337c36?w=1200&q=80",
    categorySlug: "glassware-soft-water",
    stock: 32,
  },
  {
    slug: "juice-glass-small-set-8pc",
    name: "Juice Glass (Set of 8)",
    description:
      "Compact glasses for morning juice, smoothies, and kids’ portions. Dishwasher friendly.",
    price: 3100,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1200&q=80",
    categorySlug: "glassware-soft-water",
    stock: 52,
  },
  {
    slug: "mason-jar-drinking-glasses-set-6pc",
    name: "Mason Jar Drinking Glasses (Set of 6)",
    description:
      "Modern casual style with handles or sip lids optional — perfect for iced drinks and barbecues.",
    price: 3400,
    image:
      "https://images.unsplash.com/photo-1566804770469-95e9eac51f14?w=1200&q=80",
    categorySlug: "glassware-soft-water",
    stock: 40,
  },
  {
    slug: "coffee-latte-glass-set-4pc",
    name: "Coffee Glass / Latte Glass (Set of 4)",
    description:
      "Double-walled or tall walls show latte layers. Common in cafés for hot milk coffees.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1495474476913-86f588c022c4?w=1200&q=80",
    categorySlug: "glassware-hot-drinks",
    stock: 38,
  },
  {
    slug: "irish-coffee-glass-set-4pc",
    name: "Irish Coffee Glass (Set of 4)",
    description:
      "Footed glass holds hot coffee, whiskey float, and whipped cream without cracking from heat.",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1200&q=80",
    categorySlug: "glassware-hot-drinks",
    stock: 26,
  },
  {
    slug: "tea-glass-cafe-set-6pc",
    name: "Tea Glass (Set of 6)",
    description:
      "Light curved glass for brewed tea — popular in modern cafés for showcasing colour and clarity.",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1675689165314-b5e2dfb1df62?w=1200&q=80",
    categorySlug: "glassware-hot-drinks",
    stock: 45,
  },

  // —— Crockery (plates, bowls, serving ware) ——
  {
    slug: "crockery-dinner-plate-large-6pc",
    name: "Dinner Plate — Large Main Course (Set of 6)",
    description:
      "Full-size plate for mains and shared meals. Core piece for everyday and guest dining.",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1611757947339-7aadab3fff93?w=1200&q=80",
    categorySlug: "crockery-plates",
    stock: 30,
  },
  {
    slug: "crockery-side-salad-plate-6pc",
    name: "Side Plate / Salad Plate (Set of 6)",
    description:
      "Smaller rim for salads, bread, or starters — keeps place settings proportioned.",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1705312435272-2778395ce362?w=1200&q=80",
    categorySlug: "crockery-plates",
    stock: 33,
  },
  {
    slug: "crockery-dessert-plate-6pc",
    name: "Dessert Plate (Set of 6)",
    description:
      "Petite plate for cakes, pastries, and cheese after the main course.",
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1675809550018-5f3fc4b8fdf8?w=1200&q=80",
    categorySlug: "crockery-plates",
    stock: 28,
  },
  {
    slug: "crockery-bread-butter-plate-6pc",
    name: "Bread & Butter Plate (Set of 6)",
    description:
      "Compact plate at the top-left of the setting for rolls and butter service.",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=1200&q=80",
    categorySlug: "crockery-plates",
    stock: 35,
  },
  {
    slug: "crockery-charger-plate-decorative-4pc",
    name: "Charger Plate — Decorative Base (Set of 4)",
    description:
      "Large underplate for fine dining presentation; catches crumbs and frames dinnerware.",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    categorySlug: "crockery-plates",
    stock: 18,
  },
  {
    slug: "crockery-soup-bowl-rim-6pc",
    name: "Soup Bowl (Set of 6)",
    description:
      "Deep bowl with room for broths and stews; pairs with saucer or charger.",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1711936432802-6ca24117c4a2?w=1200&q=80",
    categorySlug: "crockery-bowls",
    stock: 29,
  },
  {
    slug: "crockery-cereal-bowl-6pc",
    name: "Cereal Bowl (Set of 6)",
    description:
      "Morning staple for cereal, granola, and yoghurt with a comfortable hold.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1591623657169-a09670423dea?w=1200&q=80",
    categorySlug: "crockery-bowls",
    stock: 41,
  },
  {
    slug: "crockery-salad-bowl-large-1pc",
    name: "Salad Bowl (Large)",
    description:
      "Wide bowl for tossing and sharing greens at the centre of the table.",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80",
    categorySlug: "crockery-bowls",
    stock: 22,
  },
  {
    slug: "crockery-rice-bowl-set-6pc",
    name: "Rice Bowl (Set of 6)",
    description:
      "Sized for steamed rice, grain bowls, and small Asian-style servings.",
    price: 5100,
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=1200&q=80",
    categorySlug: "crockery-bowls",
    stock: 36,
  },
  {
    slug: "crockery-pasta-bowl-wide-6pc",
    name: "Pasta Bowl — Shallow Wide (Set of 6)",
    description:
      "Low wide rim perfect for saucy pasta, risotto, and Buddha bowls.",
    price: 7100,
    image:
      "https://images.unsplash.com/photo-1651828818680-b0e2364d989d?w=1200&q=80",
    categorySlug: "crockery-bowls",
    stock: 24,
  },
  {
    slug: "crockery-serving-platter-oval",
    name: "Serving Platter (Oval)",
    description:
      "Large platter for roasts, antipasti, and family-style sides.",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1650218385764-ce069ab3e4da?w=1200&q=80",
    categorySlug: "crockery-serving",
    stock: 26,
  },
  {
    slug: "crockery-serving-bowl-deep",
    name: "Serving Bowl (Deep)",
    description:
      "Centre-table bowl for salads, pasta passes, and fruit displays.",
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1571115636932-367b6cf94418?w=1200&q=80",
    categorySlug: "crockery-serving",
    stock: 31,
  },
  {
    slug: "crockery-gravy-boat-porcelain",
    name: "Gravy Boat",
    description:
      "Pouring vessel for sauces and jus — pairs with platters and roast dinners.",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1565958000476-349d3ba48bb4?w=1200&q=80",
    categorySlug: "crockery-serving",
    stock: 27,
  },
  {
    slug: "crockery-casserole-dish-lidded",
    name: "Casserole Dish (Lidded)",
    description:
      "Oven-to-table baking dish with lid for bakes, gratins, and hot holds.",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1677274207889-8466cc7e2198?w=1200&q=80",
    categorySlug: "crockery-serving",
    stock: 19,
  },
  {
    slug: "crockery-soup-tureen-lidded",
    name: "Soup Tureen",
    description:
      "Lidded bowl for serving soup or stew at the head of the table with ladle.",
    price: 9200,
    image:
      "https://images.unsplash.com/photo-1657073893406-b817ba12ef34?w=1200&q=80",
    categorySlug: "crockery-serving",
    stock: 14,
  },

  // —— Cutlery (eating & serving utensils) ——
  {
    slug: "cutlery-dinner-fork-6pc",
    name: "Dinner Fork (Set of 6)",
    description:
      "Standard table fork for mains — balanced weight for everyday dining sets.",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1760594308330-404765c714b4?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 58,
  },
  {
    slug: "cutlery-salad-fork-6pc",
    name: "Salad Fork (Set of 6)",
    description:
      "Slightly smaller tines for starter salads and left-hand placement in formal settings.",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 44,
  },
  {
    slug: "cutlery-dessert-fork-6pc",
    name: "Dessert Fork (Set of 6)",
    description:
      "Compact fork for pastry and fruit courses — often brought with the dessert plate.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1697729638448-6afee6a4f395?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 40,
  },
  {
    slug: "cutlery-dinner-knife-6pc",
    name: "Dinner Knife (Set of 6)",
    description:
      "Table knife with rounded tip for cutting cooked food at the place setting.",
    price: 2600,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 52,
  },
  {
    slug: "cutlery-steak-knife-serrated-6pc",
    name: "Steak Knife (Serrated, Set of 6)",
    description:
      "Sharp serrated edge for cooked meats without tearing fibres.",
    price: 5100,
    image:
      "https://images.unsplash.com/photo-1759990639089-e80026aeb6fe?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 33,
  },
  {
    slug: "cutlery-butter-knife-6pc",
    name: "Butter Knife (Set of 6)",
    description:
      "Blunt blade for spreading butter and soft spreads on bread.",
    price: 1400,
    image:
      "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 62,
  },
  {
    slug: "cutlery-soup-spoon-6pc",
    name: "Soup Spoon (Set of 6)",
    description:
      "Round deep bowl for broths and creams — sits right of the knife.",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1676953662999-bbfe0affb7ed?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 47,
  },
  {
    slug: "cutlery-dessert-spoon-6pc",
    name: "Dessert Spoon (Set of 6)",
    description:
      "Mid-sized spoon for sweet courses and puddings.",
    price: 1700,
    image:
      "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 50,
  },
  {
    slug: "cutlery-tea-coffee-spoon-8pc",
    name: "Tea Spoon / Coffee Spoon (Set of 8)",
    description:
      "Small spoons for stirring tea, espresso, and demitasse cups.",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1589829085419-cafbf69db06f?w=1200&q=80",
    categorySlug: "cutlery-eating",
    stock: 66,
  },
  {
    slug: "cutlery-serving-spoon-slotted",
    name: "Serving Spoon",
    description:
      "Large spoon for vegetables, rice, and sides — often paired with serving fork.",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1581259987154-a680e36f0e5f?w=1200&q=80",
    categorySlug: "cutlery-serving",
    stock: 48,
  },
  {
    slug: "cutlery-serving-fork-meat",
    name: "Serving Fork",
    description:
      "Long tines for holding roasts and salads while carving or tossing.",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
    categorySlug: "cutlery-serving",
    stock: 42,
  },
  {
    slug: "cutlery-soup-sauce-ladle",
    name: "Ladle (Soup & Sauces)",
    description:
      "Deep bowl and long handle for portioning soup, stew, and gravy.",
    price: 1350,
    image:
      "https://images.unsplash.com/photo-1677750261537-d336b377cdba?w=1200&q=80",
    categorySlug: "cutlery-serving",
    stock: 55,
  },
  {
    slug: "cutlery-cake-server-serrated",
    name: "Cake Server",
    description:
      "Triangular blade with wedge lift for clean cake and tart slices.",
    price: 1550,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80",
    categorySlug: "cutlery-serving",
    stock: 37,
  },
  {
    slug: "cutlery-serving-tongs-salad",
    name: "Tongs (Salad, Bread & Pastries)",
    description:
      "Locking or sprung tongs for hygienic serving at buffets and bread baskets.",
    price: 1850,
    image:
      "https://images.unsplash.com/photo-1769374071445-aaed84187a75?w=1200&q=80",
    categorySlug: "cutlery-serving",
    stock: 44,
  },
];

async function main() {
  // Create categories
  const categoryMap = new Map();
  // First, create main categories (no parent)
  for (const cat of categories.filter(c => !c.parentSlug)) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      create: {
        name: cat.name,
        slug: cat.slug,
      },
      update: {
        name: cat.name,
      },
    });
    categoryMap.set(cat.slug, created.id);
  }
  // Then create subcategories
  for (const cat of categories.filter(c => c.parentSlug)) {
    const parentId = categoryMap.get(cat.parentSlug);
    if (!parentId) {
      console.error(`Parent category not found for ${cat.parentSlug}`);
      continue;
    }
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      create: {
        name: cat.name,
        slug: cat.slug,
        parentId: parentId,
      },
      update: {
        name: cat.name,
        parentId: parentId,
      },
    });
    categoryMap.set(cat.slug, created.id);
  }

  // Create products
  for (const p of products) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) {
      console.error(`Category not found for ${p.categorySlug}`);
      continue;
    }
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        categoryId: categoryId,
        stock: p.stock,
      },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        categoryId: categoryId,
        stock: p.stock,
      },
    });
  }
  console.log(`Seeded ${categories.length} categories and ${products.length} products (KES)`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
