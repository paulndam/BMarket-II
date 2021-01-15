/** @format */
import bcrypt from "bcryptjs";

// BACKEND DATA

const data = {
  Users: [
    {
      firstname: "Rico",
      lastname: "Cassanova",
      email: "BigBossMan@gmail.com",
      password: bcrypt.hashSync("123456789", 8),
      isAdmin: true,
      isSeller:true,
      seller:{
        name:'DiorMan',
        logo:'/Images/P2.jpeg',
        description:'Sells the best of the best in market',
        rating:3.7,
        reviews:50
      },
    },

    {
      firstname: "Tico",
      lastname: "User",
      email: "titoUser5@gmail.com",
      password: bcrypt.hashSync("12345", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Predator Mutator",
      category: "Soccer Cleats",
      image: "/Images/Predator1.jpg",
      instock: 25,
      description: "Controll the ball own the game",
      rating: 4.9,
      price: 275,
      reviews: 25,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Ozweego",
      category: "Sneakers",
      image: "/Images/OZWEEGO1.jpg",
      instock: 20,
      description: "feel your style, ignight your look and design",
      rating: 3.9,
      price: 175,
      reviews: 15,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Ultra",
      category: "Running",
      image: "/Images/Ultra1.jpg",
      instock: 15,
      description: "Its all about running, run mate",
      rating: 3.5,
      price: 220,
      reviews: 20,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Women's Rhyton sneaker with mouth print",
      category: "Women LifeStyle Shoe",
      image: "/Images/Gucci1.jpg",
      instock: 35,
      description:
        "For Cruise 2019, Gucci staged a rave among the ancient graves of Alyscamps' Roman necropolis, in Arles. In the decadent setting, models walked a runway divided by flames, playing rock stars with looks that brought back ‘80s glam mainstays: thick makeup, spikes, laced-up leather, narrow denim and daring animal prints. The sneaker speaks to an era of metal in a distinctly Gucci way, with a rock band inspired print. Designed with a thick sole and chunky construction in distressed leather",
      rating: 4.5,
      price: 890,
      reviews: 10,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Long sleeve shirt",
      category: "Style",
      image: "/Images/longshirt1.webp",
      instock: 15,
      description: "sensational",
      rating: 2.5,
      price: 40,
      reviews: 15,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "T-shirt",
      category: "Style",
      image: "/Images/shirt1.webp",
      instock: 20,
      description: "sensational",
      rating: 2.5,
      price: 25,
      reviews: 7,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Back pack",
      category: "Style",
      image: "/Images/back1.webp",
      instock: 75,
      description: "closer to you",
      rating: 3.5,
      price: 25,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Mountain Back pack",
      category: "Style",
      image: "/Images/back4.webp",
      instock: 10,
      description: "Follows you and closer to you in all destinations",
      rating: 6.5,
      price: 55,
      reviews: 19,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Ladies coat",
      category: "Style",
      image: "/Images/coat4.webp",
      instock: 25,
      description: "Its all yours",
      rating: 3.5,
      price: 125,
      reviews: 29,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Watch X",
      category: "Watch",
      image: "/Images/watch1.webp",
      instock: 5,
      description: "Feel your wrist",
      rating: 5.5,
      price: 425,
      reviews: 20,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Nike Air max",
      category: "Style",
      image: "/Images/nike2.jpg",
      instock: 45,
      description: "Navigate your closet",
      rating: 3.5,
      price: 75,
      reviews: 51,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Boot",
      category: "Style",
      image: "/Images/boot1.webp",
      instock: 35,
      description: "Majesty is yours",
      rating: 5.5,
      price: 225,
      reviews: 30,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Watch B",
      category: "Watch",
      image: "/Images/watch3.webp",
      instock: 10,
      description: "Elegance",
      rating: 5.5,
      price: 325,
      reviews: 29,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Polo Shirt",
      category: "Style",
      image: "/Images/polo1.webp",
      instock: 9,
      description: "closer to you",
      rating: 3.5,
      price: 25,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Sweart Pants",
      category: "Style",
      image: "/Images/Pants1.jpg",
      instock: 55,
      description: "Sporty",
      rating: 2.2,
      price: 29,
      reviews: 8,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Black coat",
      category: "Style",
      image: "/Images/coat1.webp",
      instock: 25,
      description: "closer to you",
      rating: 3.5,
      price: 25,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Women's Gucci Tennis 1977 high top sneaker",
      category: "Women LifeStyle Shoe",
      image: "/Images/Gucci2.jpg",
      instock: 25,
      description:
        "The Gucci Tennis 1977 is introduced in sparkling gold sequins. Logo details such as the monogram motif at the sole, the dedicated logo and the green and red Web stripe enrich the hightop sneaker's connection to the House. The hightop sneaker is completed by an embroidery of the number 1977, a nod to the name of the line.",
      rating: 3.5,
      price: 1025.99,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Women's Gucci Tennis 1977 sneaker",
      category: "Women LifeStyle Shoe",
      image: "/Images/Gucci3.jpg",
      instock: 25,
      description:
        "The Gucci Tennis 1977 is introduced in sparkling gold sequins. Logo details such as the monogram motif at the sole, the dedicated logo and the green and red Web stripe enrich the hightop sneaker's connection to the House. The hightop sneaker is completed by an embroidery of the number 1977, a nod to the name of the line.",
      rating: 3.5,
      price: 1002.5,
      reviews: 7,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "PETITE MALLE SOUPLE",
      category: "Women Handbag",
      image: "/Images/LV1.jpeg",
      instock: 25,
      description:
        "The distinctive Petite Malle Souple is a soft handbag steeped in the House history. The Monogram canvas, riveted leather corners, and leather name tag all evoke Louis Vuitton’s legacy as a trunk maker. A gold-color nautical chain and wide removable strap, with Louis Vuitton Malletier embroidered on it, bring up-to-the-minute style.",
      rating: 3.5,
      price: 2250.5,
      reviews: 6,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "NEVERFULL MM",
      category: "Women Handbag",
      image: "/Images/LV2.jpeg",
      instock: 25,
      description:
        "The Neverfull MM tote unites timeless design with heritage details. Made from supple Monogram canvas with natural cowhide trim, it is roomy yet not bulky, with side laces that cinch for a sleek allure or loosen for a casual look. Slim, comfortable handles slip easily over the shoulder or arm. Lined in colorful textile, it features a removable pouch which can be used as a clutch or an extra pocket.",
      rating: 3.5,
      price: 1000.5,
      reviews: 15,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },
  ],

  // LATEST PRODUCT

  latestProducts: [
    {
      nameX: "Nike Air Force 1 Crater",
      category: "Women's Shoe",
      image1: "/Images/nike3.jpg",
      instock: 10,
      description:
        "The sneakers that helped define street style are reimagined with Crater Foam, weighing in with at least 20% recycled materials. The supersoft Crater Foam midsole is made from a spacey mix of approximately 11% Nike Grind rubber and foam materials. With a speckled outsole made from 15% Nike Grind rubber, each pair of the Nike Air Force 1 Crater is unique and durable. Shown: Black/Photon Dust/Dark Smoke Grey/Black ",
      rating: 4.5,
      price: 55,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      nameX: "Nike Air Vapormax 2020 FK",
      category: "Women's shoe",
      image1: "/Images/nike4.jpg",
      instock: 9,
      description:
        "Designed for running but adopted by the streets, the Nike VaporMax 2020 FK gives your look an edge. Its revolutionary, low-profile Air unit—made from at least 75% recycled material—delivers lasting comfort in a sleek silhouette. The airy, stretch woven upper keeps it lightweight and sporty. If that’s not enough, the rest of the shoe is made from at least 50% recycled content by weight. By utilizing leftover materials, recycled polyester and recycled foam throughout the shoe we know we’ve made something spectacular even better.",
      rating: 3.5,
      price: 75,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      nameX: "Nike Air Max 90",
      category: "Women shoe",
      image1: "/Images/nike5.jpg",
      instock: 10,
      description:
        "The Nike Air Max 90 stays true to its OG running roots with its iconic Waffle outsole, stitched overlays and classic, color-accented TPU plates. Retro colors celebrate the first generation while Max Air cushioning adds comfort to your journey.",
      rating: 5.5,
      price: 120,
      reviews: 19,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      nameX: "Nike Sportswear Club",
      category: "Women's Fleece Dress",
      image1: "/Images/nikeT1.jpg",
      instock: 55,
      description:
        "Made with soft fleece, the Nike Sportswear Club Dress offers carefree comfort ready for everyday wear. Its tall, ribbed collar provides a cozy, chic look while its 1/2-zip closure lets you style it your way. Shown: Fireberry/Heather/White",
      rating: 4.5,
      price: 55,
      reviews: 17,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      nameX: "Nike Sportswear Tech Fleece",
      category: "Women's Skirt",
      image1: "/Images/nikeT2.jpg",
      instock: 5,
      description:
        "The Nike Tech Fleece Skirt updates a chic silhouette with our popular Tech Fleece fabric. Contrast details provide a signature look while vertical lines provide a modern look and a more flattering fit. Shown: Dark Grey Heather/Black",
      rating: 3.5,
      price: 70,
      reviews: 12,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      nameX: "Nike Sportswear Essential",
      category: "Women's Fleece Dress",
      image1: "/Images/nikeT3.jpg",
      instock: 8,
      description:
        "The Nike Sportswear Fleece Dress invigorates your favorite hoodie with a long, loose design for a familiar-but-fresh look and comfortable fleece coverage from day to night. ",
      rating: 4.5,
      price: 69,
      reviews: 16,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      nameX: "LIMITLESS CONTOUR COLLECTION BODYSUIT",
      category: "Women Dress",
      image1: "/Images/zara1.webp",
      instock: 24,
      description:
        "Bodysuit made of fabric that adapts to your body’s contour. V-neck and short sleeves. Bottom snap button closure. This fiber is made from waste reclaimed from other productions of polyamide. Transforming this waste into a new resource, we reduce the production of virgin raw material and water, energy, and natural resource consumption.",
      rating: 4.5,
      price: 55,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      nameX: "OVERSIZED HOODED DRESS",
      category: "Women Dress",
      image1: "/Images/zara2.webp",
      instock: 21,
      description:
        "Roomy knit dress with hooded collar and long sleeves. Rib trim.",
      rating: 3.0,
      price: 40,
      reviews: 15,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },
  ],

  // RELATED PRODUCTS

  relatedProducts: [
    {
      name: "UA HOVR™ Havoc 3 Basketball Shoes",
      category: "Basketball Shoe",
      image2: "/Images/UA1.webp",
      instock: 17,
      description:
        "The Nike Legend Essential 2 comes equipped with a flat, stable heel, flexibility under the toes and side-to-side support. With tons of grip, you’re ready to lift, HIIT, conquer a class or get stronger at the machines. Shown: Black/Pure Platinum/White, ",
      rating: 4.5,
      price: 159,
      reviews: 19,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "X GHOSTED.1 FIRM GROUND SOCCER CLEATS",
      category: "Men's Soccer Shoe",
      image2: "/Images/SC1.jpg",
      instock: 20,
      description:
        "See these? Your rivals won't. Fast used to be fast enough. But you're about to leave all that behind. Gear up and ghost everyone in these adidas X Ghosted.1 firm ground soccer cleats. Get the perfect push-off thanks to a sprint spike-style raised forefoot and a springy carbon-fiber insert in the outsole. Low-profile and lightweight, the upper locks you in while leaving your ankles free to shift up the gears.",
      rating: 4.5,
      price: 205.99,
      reviews: 10,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Nike Air Force 1 '07 WB",
      category: "  Men's Shoe",
      image2: "/Images/nike6.jpg",
      instock: 29,
      description:
        "The legend lives on in the Nike Air Force 1 '07 WB, a low-cut take on the iconic AF1 that offers classic court style and premium cushioning.Shown: Flax/Gum Light Brown/Black/Wheat",
      rating: 2.5,
      price: 237,
      reviews: 17,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "PG 4",
      category: "  Basketball Shoe",
      image2: "/Images/nike7.jpg",
      instock: 49,
      description:
        "Paul George is the rare high-percentage shooter who's also a coach's dream on D. Designed for his unrivaled 2-way game, the PG 4 unveils a new cushioning system that's lightweight, articulated and responsive, ideal for players like PG who go hard every play.Shown: Crimson/Green Apple/Volt/White ",
      rating: 3.5,
      price: 200,
      reviews: 17,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Aurellane",
      category: " Women Shoe",
      image2: "/Images/Aldo1.jpg",
      instock: 49,
      description:
        "The object of our winter wardrobe obsession, sexy high heel ankle boots inspire us to style outfits from the ground up. These pointy toe renditions offer a contoured ankle fit, zip closure and trend-right slab heel. ",
      rating: 2.5,
      price: 49.55,
      reviews: 17,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Musimon",
      category: " Women Shoe",
      image2: "/Images/Aldo2.jpg",
      instock: 49,
      description:
        "Fall season calls for warmer, but fashionable shoes. These cute ankle booties featuring a square toe and block heel are undeniably stylish and will pair up nicely with your oversized wool sweater and skinny jeans. ",
      rating: 3.5,
      price: 140,
      reviews: 17,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Deludith",
      category: " Women Shoe",
      image2: "/Images/Aldo3.jpg",
      instock: 19,
      description:
        "With its pointy toe and stiletto heel, this of-the-moment sock bootie delivers the perfect streamlined fit while also keeping waste out of landfills. Crafted with recycled knit, Deludith is your new favourite bootie with a positive footprint. Each pair is made out of the equivalent of 16 recycled plastic bottles.",
      rating: 4.5,
      price: 100.98,
      reviews: 17,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },

    {
      name: "Loafer",
      category: " Men Shoe",
      image2: "/Images/Loafers1.jpg",
      instock: 19,
      description:
        "An homage to mid-eighties minimalism, these slip-on loafers are a dapper addition to your warm-weather wardrobe. ",
      rating: 4.5,
      price: 59.98,
      reviews: 17,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    },
  ],
};

export default data;
