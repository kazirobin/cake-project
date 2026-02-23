export const navigateLinks = [
  {
    id: 1,
    label: "Home",
    icon: "🏠",
    path: "/",
  },
  {
    id: 2,
    label: "Bakery Training",
    icon: "👩‍🍳",
    path: "/bakery-training",
  },
  {
    id: 3,
    label: "Sugarless Cakes",
    icon: "🍯",
    path: "/categories/sugarless-cakes",
    categoryId: 9,
    isCategory: true,
  },
  {
    id: 4,
    label: "Eggless Cakes",
    icon: "🥚",
    path: "/categories/eggless-cakes",
    categoryId: 10,
    isCategory: true,
  },
  {
    id: 5,
    label: "Wedding Cakes",
    icon: "💑",
    path: "/categories/wedding-cakes",
    categoryId: 2,
    isCategory: true,
  },
  {
    id: 6,
    label: "Quick Cakes",
    icon: "🎂",
    path: "/categories/quick-cakes",
    categoryId: 11,
    isCategory: true,
  },
  {
    id: 7,
    label: "Gifts",
    icon: "🎁",
    path: "/gifts",
  },
  {
    id: 8,
    label: "Wish Generator",
    icon: "✨",
    path: "/wish-generator",
  },
  {
    id: 9,
    label: "Careers",
    icon: "💼",
    path: "/careers",
  },
];
// Helper function to get category by ID (add this to data.js if not exists)
const categoriesList = [
  { id: 1, name: "Birthday Cakes", slug: "birthday-cakes" },
  { id: 2, name: "Wedding Cakes", slug: "wedding-cakes" },
  { id: 3, name: "Anniversary Cakes", slug: "anniversary-cakes" },
  { id: 4, name: "Kids Cakes", slug: "kids-cakes" },
  { id: 5, name: "Photo Cakes", slug: "photo-cakes" },
  { id: 6, name: "Cupcakes", slug: "cupcakes" },
  { id: 7, name: "Pastries", slug: "pastries" },
  { id: 8, name: "Cookies", slug: "cookies" },
];
// data.js - Complete data file for the e-commerce category system

// ==================== CATEGORIES DATA ====================

export const categories = [
  {
    id: 1,
    name: "Birthday Cakes",
    slug: "birthday-cakes",
    description: "Celebrate with our delicious birthday cakes",
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    productCount: 24,
    type: "Cakes",
    metaTitle: "Birthday Cakes - Custom Designs for Every Age",
    metaDescription: "Find the perfect birthday cake with customizable designs for kids, teens, and adults. Order online with free delivery.",
    heroImage: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Make Their Birthday Special",
    heroDescription: "Customize your cake with photos, messages, and designs",
    filters: {
      customizable: true,
      dietary: ["Eggless", "Gluten-Free", "Vegan"],
      sizes: ["0.5kg", "1kg", "1.5kg", "2kg", "3kg"],
      themes: ["Cartoon", "Elegant", "Photo Cake", "Number Cake", "Character"],
      priceRanges: [
        { min: 0, max: 25, label: "Under $25" },
        { min: 25, max: 50, label: "$25 - $50" },
        { min: 50, max: 100, label: "$50 - $100" },
        { min: 100, max: 500, label: "$100+" }
      ]
    },
    specificComponents: ["BirthdaySpecial"],
    seo: {
      keywords: ["birthday cakes", "happy birthday cake", "custom birthday cake", "kids birthday cake"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 2,
    name: "Wedding Cakes",
    slug: "wedding-cakes",
    description: "Elegant cakes for your special day",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    productCount: 18,
    type: "Cakes",
    metaTitle: "Wedding Cakes - Elegant Designs for Your Wedding",
    metaDescription: "Beautiful wedding cakes designed for your perfect day. Choose from classic, modern, and rustic styles.",
    heroImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Your Dream Wedding Cake",
    heroDescription: "From classic to contemporary designs",
    filters: {
      customizable: true,
      tiers: ["Single", "2-Tier", "3-Tier", "4-Tier", "5-Tier"],
      flavors: ["Vanilla", "Chocolate", "Red Velvet", "Fruit", "Lemon"],
      dietary: ["Eggless", "Gluten-Free"],
      colors: ["White", "Ivory", "Gold", "Rose Gold", "Blush Pink"]
    },
    specificComponents: ["WeddingSpecial"],
    seo: {
      keywords: ["wedding cakes", "bridal cakes", "wedding cake designs", "tiered cakes"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 3,
    name: "Anniversary Cakes",
    slug: "anniversary-cakes",
    description: "Celebrate love with our anniversary specials",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    productCount: 15,
    type: "Cakes",
    metaTitle: "Anniversary Cakes - Celebrate Love",
    metaDescription: "Romantic cakes for your anniversary celebration. Personalized designs for every milestone.",
    heroImage: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Celebrate Your Love Story",
    heroDescription: "Personalized cakes for every anniversary milestone",
    filters: {
      customizable: true,
      themes: ["Romantic", "Elegant", "Modern", "Classic", "Heart-Shaped"],
      years: ["1st", "5th", "10th", "25th", "50th"],
      dietary: ["Eggless", "Vegan"]
    },
    specificComponents: ["AnniversarySpecial"],
    seo: {
      keywords: ["anniversary cakes", "romantic cakes", "love cakes", "milestone cakes"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 4,
    name: "Kids Cakes",
    slug: "kids-cakes",
    description: "Fun and colorful cakes for little ones",
    image: "https://tse4.mm.bing.net/th/id/OIP.tT2QO3csQTo51eqNY-I6lQHaJ_?rs=1&pid=ImgDetMain&o=7&rm=3",
    productCount: 20,
    type: "Cakes",
    metaTitle: "Kids Cakes - Fun Designs for Children",
    metaDescription: "Exciting cakes for kids' birthdays with cartoon characters, superheroes, and fun themes.",
    heroImage: "https://images.unsplash.com/photo-1587668178277-c295520f5d2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Magical Cakes for Little Ones",
    heroDescription: "Bring their favorite characters to life",
    filters: {
      customizable: true,
      characters: ["Superhero", "Princess", "Cartoon", "Animal", "Dinosaur"],
      sizes: ["0.5kg", "1kg", "1.5kg"],
      dietary: ["Eggless"]
    },
    specificComponents: ["KidsSpecial"],
    seo: {
      keywords: ["kids cakes", "children's birthday cakes", "character cakes", "fun cakes"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1587668178277-c295520f5d2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 5,
    name: "Photo Cakes",
    slug: "photo-cakes",
    description: "Edible photo prints on delicious cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    productCount: 12,
    type: "Cakes",
    metaTitle: "Photo Cakes - Personalize with Photos",
    metaDescription: "Create memorable cakes with edible photo prints. Perfect for birthdays, anniversaries, and special occasions.",
    heroImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Your Photos on a Cake",
    heroDescription: "Turn memories into delicious art",
    filters: {
      customizable: true,
      sizes: ["0.5kg", "1kg", "1.5kg", "2kg"],
      shapes: ["Round", "Square", "Heart", "Custom"]
    },
    specificComponents: ["PhotoSpecial"],
    seo: {
      keywords: ["photo cakes", "picture cakes", "custom photo cakes", "edible image cakes"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 6,
    name: "Cupcakes",
    slug: "cupcakes",
    description: "Delicious individual treats for any occasion",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    productCount: 16,
    type: "Desserts",
    metaTitle: "Cupcakes - Perfect Individual Treats",
    metaDescription: "Delicious cupcakes in various flavors. Perfect for parties, events, and gifting.",
    heroImage: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Sweet Treats in Every Bite",
    heroDescription: "Perfect for sharing or indulging yourself",
    filters: {
      customizable: true,
      quantities: ["6 pcs", "12 pcs", "24 pcs", "48 pcs"],
      flavors: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Lemon"],
      dietary: ["Eggless", "Gluten-Free", "Vegan"]
    },
    specificComponents: ["CupcakeSpecial"],
    seo: {
      keywords: ["cupcakes", "mini cakes", "cupcake delivery", "custom cupcakes"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 7,
    name: "Pastries",
    slug: "pastries",
    description: "Delicate and flaky baked delights",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    productCount: 14,
    type: "Desserts",
    metaTitle: "Pastries - Delicate Baked Treats",
    metaDescription: "Freshly baked pastries with creamy fillings and flaky layers.",
    heroImage: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Flaky, Creamy, Delicious",
    heroDescription: "Traditional and modern pastry delights",
    filters: {
      flavors: ["Vanilla", "Chocolate", "Fruit", "Cream", "Caramel"],
      types: ["Puffs", "Tarts", "Éclairs", "Danishes"]
    },
    specificComponents: ["PastrySpecial"],
    seo: {
      keywords: ["pastries", "cream puffs", "éclairs", "tarts", "baked goods"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 8,
    name: "Cookies",
    slug: "cookies",
    description: "Crunchy and chewy cookies made fresh",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    type: "Snacks",
    metaTitle: "Cookies - Fresh Baked Goodness",
    metaDescription: "Delicious cookies in various flavors. Perfect for tea-time or gifting.",
    heroImage: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Fresh Baked Cookies",
    heroDescription: "Crunchy, chewy, and absolutely delicious",
    filters: {
      flavors: ["Chocolate Chip", "Oatmeal", "Butter", "Almond", "Double Chocolate"],
      dietary: ["Eggless", "Gluten-Free", "Vegan"],
      giftPacks: ["Regular", "Festive", "Premium"]
    },
    specificComponents: ["CookieSpecial"],
    seo: {
      keywords: ["cookies", "biscuits", "cookie gifts", "fresh cookies"],
      schema: "Product",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  }
];

// ==================== RELATED CATEGORIES MAPPING ====================

export const CategoriesMap = {
  1: [4, 5, 8], // Birthday Cakes related to Kids Cakes, Photo Cakes, Cookies
  2: [3, 5, 6], // Wedding Cakes related to Anniversary, Photo, Cupcakes
  3: [1, 2, 5], // Anniversary related to Birthday, Wedding, Photo
  4: [1, 5, 8], // Kids related to Birthday, Photo, Cookies
  5: [1, 2, 3], // Photo related to Birthday, Wedding, Anniversary
  6: [7, 8, 1], // Cupcakes related to Pastries, Cookies, Birthday
  7: [6, 8, 1], // Pastries related to Cupcakes, Cookies, Birthday
  8: [6, 7, 1], // Cookies related to Cupcakes, Pastries, Birthday
};

// ==================== PRODUCTS DATA ====================

export const products = [
  {
    "cakeDetails": {
      "title": "Chocolate Cupcakes by UG",
      "id": 1,
      "avatar": "https://media.ugcakes.com/products/large/2199-chocolate-cupcakes-by-ug.jpg",
      "price": 1.79,
      "description": "Chocolate Cupcakes for your special day. Cupcakes make people happy, and these sweet recipes are guaranteed to put a smile on any face. These delicious cupcakes can also be a satisfying dessert of yours. This does not just taste delicious, but also looks eye pleasing. The cake can be delivered online, which is the best online cake delivery service in Kathmandu. All cakes are baked with hygiene and quality in the top of our priority at our own state-of-the-art baking facility and quality checked twice by our expert QC team before delivery. You can send cakes or gifts to your loved ones in Nepal or shop online for yourself in Nepal with UG Bazaar, a pioneer in online shopping in Nepal.",
      "customizable": true,
      "SKU": "SKU: UGC-CC-CHOCOLATE",
      "category": "cupcake",
      "stock": 20,
      "rating": {
        "value": 4.5,
        "count": 128,
        "stars": 5
      },
      "pricing": {
        "original": 14.20,
        "discounted": 11.83,
        "discountPercentage": 20,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Fresh sponge layers",
        "Velvety cream frosting",
        "Hand-arranged strawberries",
        "Premium ingredients",
        "Perfect for celebrations"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "350 kcal" },
        { "label": "Protein", "value": "4g" },
        { "label": "Carbs", "value": "45g" },
        { "label": "Fat", "value": "18g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [2, 3, 4, 5],
    "reviews": [101, 102, 103],
    "faqs": [1, 2, 3]
  },
  {
    "cakeDetails": {
      "title": "Strawberry Topped Cake",
      "id": 2,
      "avatar": "https://media.ugcakes.com/products/large/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
      "price": 11.83,
            "description": "Experience the elegance of our Rose Garden cake, a perfect blend of delicate flavors and stunning design. Fresh, premium ingredients for an unforgettable taste. Beautifully crafted with artistic rose decorations. Perfect for birthdays, anniversaries, and special occasions. Fast and reliable delivery within Kathmandu Valley.y Order now to celebrate your moments with sweetness and style",
      "customizable": true,
      "SKU": "SKU: UGC-B-1115",
      "category": [1,2,3],
      "stock": 15,
      "rating": {
        "value": 4.8,
        "count": 95,
        "stars": 5
      },
      "pricing": {
        "original": 17.99,
        "discounted": 14.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Personalized message",
        "Rich chocolate sponge",
        "Creamy buttercream",
        "Perfect for Father's Day",
        "Customizable design"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "380 kcal" },
        { "label": "Protein", "value": "5g" },
        { "label": "Carbs", "value": "48g" },
        { "label": "Fat", "value": "20g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [1, 3, 6, 7],
    "reviews": [104, 105, 106],
    "faqs": [1, 2, 4]
  },
  {
    "cakeDetails": {
      "title": "Rose Garden",
      "id": 3,
      "avatar": "https://media.ugcakes.com/products/large/rose-garden-887631752131346-U03zjdIwmF.webp",
      "price": 11.83,
      "description": "Experience the elegance of our Rose Garden cake, a perfect blend of delicate flavors and stunning design. Fresh, premium ingredients for an unforgettable taste. Beautifully crafted with artistic rose decorations. Perfect for birthdays, anniversaries, and special occasions. Fast and reliable delivery within Kathmandu Valle.y Order now to celebrate your moments with sweetness and style",
      "customizable": true,
      "SKU": "SKU: UGC-B-1013",
      "category": "Cakes",
      "stock": 18,
      "rating": {
        "value": 4.9,
        "count": 112,
        "stars": 5
      },
      "pricing": {
        "original": 17.99,
        "discounted": 14.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Vanilla sponge",
        "Strawberry filling",
        "Buttercream roses",
        "Personalized message",
        "Mother's Day special"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "340 kcal" },
        { "label": "Protein", "value": "4g" },
        { "label": "Carbs", "value": "44g" },
        { "label": "Fat", "value": "18g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [1, 2, 8, 9],
    "reviews": [107, 108, 109],
    "faqs": [1, 3, 4]
  },
  {
    "cakeDetails": {
      "title": "Red Velvet Cupcakes by UG",
      "id": 4,
      "avatar": "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
      "price": 1.79,
      "description": "Red Velvet Cupcakes for your special day. Cupcakes make people happy, and these sweet recipes are guaranteed to put a smile on any face. These delicious cupcakes can also be a satisfying dessert of yours. This does not just taste delicious, but also looks eye pleasing. The cake can be delivered online, which is the best online cake delivery service in Kathmandu. All cakes are baked with hygiene and quality in the top of our priority at our own state-of-the-art baking facility and quality checked twice by our expert QC team before delivery. You can send cakes or gifts to your loved ones in Nepal or shop online for yourself in Nepal with UG Bazaar, a pioneer in online shopping in Nepal.",
      "customizable": true,
      "SKU": "SKU: UGC-CC-REDVELVET",
      "category": "cupcake",
      "stock": 12,
      "rating": {
        "value": 4.7,
        "count": 78,
        "stars": 5
      },
      "pricing": {
        "original": 20.39,
        "discounted": 16.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "4 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Red velvet cake",
        "Cream cheese frosting",
        "Gold leaf accents",
        "Romantic design",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "360 kcal" },
        { "label": "Protein", "value": "5g" },
        { "label": "Carbs", "value": "46g" },
        { "label": "Fat", "value": "19g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [1, 5, 10, 11],
    "reviews": [110, 111, 112],
    "faqs": [2, 3, 5]
  },
  {
    "cakeDetails": {
      "title": "Chocolate Truffle cake with choco barks",
      "id": 5,
      "avatar": "https://media.ugcakes.com/products/large/4867-chocolate-cake-with-choco-bark.webp",
      "price": 13.67,
      "description": "This beautiful classic chocolate cake is for chocolate lovers. It is sure that this cake will melt the hearts of every guest at the celebrations. It is topped with choco wafer and bark. This cake not only tastes delicious, but also looks eye-pleasing. The cake can be delivered online, which is the best online cake delivery service in Kathmandu. All cakes are baked with hygiene and quality in the top of our priority at our own state-of-the-art baking facility and quality checked twice by our expert QC team before delivery. You can send cakes or gifts to your loved ones in Nepal or shop online for yourself in Nepal with UG Bazaar, a pioneer in online shopping in Nepal.",
      "customizable": true,
      "SKU": "SKU: UGC-C-190",
      "category": "Cakes",
      "stock": 10,
      "rating": {
        "value": 4.6,
        "count": 67,
        "stars": 5
      },
      "pricing": {
        "original": 20.39,
        "discounted": 16.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "4 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Whiskey chocolate",
        "Rich ganache",
        "Dark chocolate shavings",
        "Masculine design",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "390 kcal" },
        { "label": "Protein", "value": "6g" },
        { "label": "Carbs", "value": "47g" },
        { "label": "Fat", "value": "21g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [2, 4, 6, 12],
    "reviews": [113, 114, 115],
    "faqs": [1, 4, 5]
  },
  {
    "cakeDetails": {
      "title": "Rasmalai Cake with Floral and Pearls Detailing",
      "id": 6,
      "avatar": "https://media.ugcakes.com/products/large/rasmalai-cake-with-floral-and-pearls-detailing-659981711618140-uxGIlG0kaS.webp",
      "price": 13.67,
      "description": "Indulge in the exquisite fusion of tradition and innovation with our Rasmalai Cake adorned with delicate floral and pearl detailing. Crafted with care by the finest bakers at UGCakes, renowned as the best bakery in Kathmandu, this delectable creation promises a symphony of flavors that will tantalize your taste buds. Elevate your celebrations with a cake that seamlessly marries the rich, creamy essence of Rasmalai with the irresistible allure of a classic cake. Treat yourself to the best of both worlds and make every moment unforgettable with our signature Rasmalai Cake. Order now and experience the epitome of cake perfection. Every details used in cake is edible and made out of sponges and creams. All cakes are baked with hygiene and quality at the top of our priority at our own state-of-the-art baking facility and quality is checked twice by our expert QC team before delivery. You can send cakes or gifts to your loved ones in Nepal or shop online for yourself in Nepal with UG Bazaar, a pioneer in online shopping in Nepal.",
      "customizable": true,
      "SKU": "SKU: UGC-B-604",
      "category": "Cakes",
      "stock": 22,
      "rating": {
        "value": 4.8,
        "count": 89,
        "stars": 5
      },
      "pricing": {
        "original": 16.79,
        "discounted": 13.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Fun design",
        "Toy decoration",
        "Colorful sprinkles",
        "Kid-friendly",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "350 kcal" },
        { "label": "Protein", "value": "4g" },
        { "label": "Carbs", "value": "45g" },
        { "label": "Fat", "value": "18g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [2, 3, 7, 13],
    "reviews": [116, 117, 118],
    "faqs": [2, 3, 6]
  },
  {
    "cakeDetails": {
      "title": "Chocolate Muffins",
      "id": 7,
      "avatar": "https://media.ugcakes.com/products/large/3629-chocolate-muffins.JPG",
      "price": 0.83,
      "description": "A pretty birthday cake for daughters, featuring a lovely 'Happy Birthday Daughter' message. Pink ombre cake with vanilla buttercream and edible glitter.",
      "customizable": true,
      "SKU": "SKU: UG-CM",
      "category": "cupcake",
      "stock": 18,
      "rating": {
        "value": 4.9,
        "count": 103,
        "stars": 5
      },
      "pricing": {
        "original": 17.99,
        "discounted": 14.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Pink ombre design",
        "Vanilla buttercream",
        "Edible glitter",
        "Princess theme",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "340 kcal" },
        { "label": "Protein", "value": "4g" },
        { "label": "Carbs", "value": "44g" },
        { "label": "Fat", "value": "18g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [3, 6, 8, 14],
    "reviews": [119, 120, 121],
    "faqs": [1, 4, 6]
  },
  {
    "cakeDetails": {
      "title": "Classic Chocolate Touch",
      "id": 8,
      "avatar": "https://media.ugcakes.com/products/large/classic-chocolate-touch-887631752820294-5GbGylIlSo.webp",
      "price": 10.92,
      "description": "Indulge in the rich, velvety flavor of our Classic Chocolate Touch cake – a perfect treat for every celebration in Kathmandu Valley. Premium quality ingredients for an unforgettable taste. Artistic design that makes every occasion special. Freshly baked and delivered fast within Kathmandu Valley. Perfect for birthdays, anniversaries, and special moments. Order your Classic Chocolate Touch now and experience the finest cake from UG Cakes!",
      "customizable": true,
      "SKU": "SKU: UGC-C-947",
      "category": "Cake",
      "stock": 16,
      "rating": {
        "value": 4.7,
        "count": 72,
        "stars": 5
      },
      "pricing": {
        "original": 16.79,
        "discounted": 13.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Black forest cake",
        "Cherry filling",
        "Chocolate shavings",
        "Cool design",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "360 kcal" },
        { "label": "Protein", "value": "5g" },
        { "label": "Carbs", "value": "46g" },
        { "label": "Fat", "value": "19g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [2, 5, 9, 15],
    "reviews": [122, 123, 124],
    "faqs": [2, 3, 5]
  },
  {
    "cakeDetails": {
      "title": "Red Velvet Cupcakes by UG",
      "id": 9,
      "avatar": "https://media.ugcakes.com/products/large/2200-red-velvet-cupcakes-by-ug.jpg",
      "price": 1.79,
      "description": "Red Velvet Cupcakes for your special day. Cupcakes make people happy, and these sweet recipes are guaranteed to put a smile on any face. These delicious cupcakes can also be a satisfying dessert of yours. This does not just taste delicious, but also looks eye pleasing. The cake can be delivered online, which is the best online cake delivery service in Kathmandu. All cakes are baked with hygiene and quality in the top of our priority at our own state-of-the-art baking facility and quality checked twice by our expert QC team before delivery. You can send cakes or gifts to your loved ones in Nepal or shop online for yourself in Nepal with UG Bazaar, a pioneer in online shopping in Nepal.",
      "customizable": true,
      "SKU": "SKU: UGC-CC-REDVELVET",
      "category": "cupcake",
      "stock": 20,
      "rating": {
        "value": 4.8,
        "count": 94,
        "stars": 5
      },
      "pricing": {
        "original": 1.79,
        "discounted": 14.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Strawberry cake",
        "Fresh strawberries",
        "Pink buttercream",
        "Feminine design",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "345 kcal" },
        { "label": "Protein", "value": "4g" },
        { "label": "Carbs", "value": "45g" },
        { "label": "Fat", "value": "18g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [3, 7, 10, 16],
    "reviews": [125, 126, 127],
    "faqs": [1, 3, 4]
  },
  {
    "cakeDetails": {
      "title": "Blush Bento Cake",
      "id": 10,
      "avatar": "https://media.ugcakes.com/products/large/blush-bento-cake-853601764144956-cFDCnO5gew.webp",
      "price": 5.96,
      "description": "Celebrate love, friendship, or self-care with our delightful Blush Bento Cake — a charming mini cake that’s perfect for intimate celebrations and sweet surprises. Handcrafted by expert bakers at UG Cakes using premium ingredients, this soft and creamy treat makes every moment unforgettable. Perfect size for 1–2 people — ideal for birthdays, anniversaries, or just because.Made with love in Kathmandu using fresh, high-quality ingredients.Beautiful blush design that adds elegance to your celebration.Fast delivery available inside Kathmandu Valley for your last-minute surprises .Order your Blush Bento Cake from UG Cakes today — because",
      "customizable": true,
      "SKU": "SKU: UGBC-196",
      "category": "cake",
      "stock": 8,
      "rating": {
        "value": 4.9,
        "count": 156,
        "stars": 5
      },
      "pricing": {
        "original": 22.79,
        "discounted": 18.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "4 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Red velvet cake",
        "Cream cheese frosting",
        "Rose decorations",
        "Edible pearls",
        "Romantic design"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "365 kcal" },
        { "label": "Protein", "value": "5g" },
        { "label": "Carbs", "value": "47g" },
        { "label": "Fat", "value": "19g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [4, 5, 11, 17],
    "reviews": [128, 129, 130],
    "faqs": [2, 4, 6]
  },
  {
    "cakeDetails": {
      "title": "Elegant Chocolate with Chocolate Balls and golden balls Cake",
      "id": 11,
      "avatar": "https://media.ugcakes.com/products/large/birthday-cake-for-chota-don-763861712903556-xWZIcNwfmQ.webp",
      "price": 11.83,
      "description": "Indulge in the rich, creamy decadence of our Classic Chocolate Cake. Expertly baked by our skilled patissiers, this divine dessert is made with premium cocoa and layered with velvety chocolate ganache. Each bite promises an unforgettable experience of moist, melt-in-your-mouth goodness. Perfect for birthdays, anniversaries, or just to satiate your sweet cravings, our Classic Chocolate Cake is sure to impress. Order now from UG Cakes, Nepal's trusted online bakery, and have this heavenly treat delivered urgently to your doorstep. Because with us, quality and speed go hand in hand. Enjoy a slice of bliss today!All cakes are baked with hygiene and quality at the top of our priority at our own state-of-the-art baking facility and quality is checked twice by our expert QC team before delivery. You can send cakes or gifts to your loved ones in Nepal or shop online for yourself in Nepal with UG Bazaar, a pioneer in online shopping in Nepal",
      "customizable": true,
      "SKU": "SKU: UGC-B-613",
      "category": "cake",
      "stock": 14,
      "rating": {
        "value": 4.7,
        "count": 63,
        "stars": 5
      },
      "pricing": {
        "original": 19.19,
        "discounted": 15.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Vanilla cake",
        "Caramel filling",
        "Walnut topping",
        "Traditional design",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "355 kcal" },
        { "label": "Protein", "value": "5g" },
        { "label": "Carbs", "value": "46g" },
        { "label": "Fat", "value": "19g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [2, 8, 12, 18],
    "reviews": [131, 132, 133],
    "faqs": [1, 3, 5]
  },
  {
    "cakeDetails": {
      "title": "Blackforest cake with chocolate bark",
      "id": 12,
      "avatar": "https://media.ugcakes.com/products/large/4531-blackforest-cake-with-chocolate-bark.jpg",
      "price": 9.08,
      "description": "This Black Forest cake with whipped cream frosting and cherry topping is not only delicious but also eye pleasing. Ranging in multiple color options and styles this cake is unique and tasty. All of our cake flavors are soft-textured cakes and delicious. Please select your desired size, cake flavor, and icing flavor to customize your perfect cake. All cakes are baked with hygiene and quality in the top of our priority at our own state-of-the-art baking facility and quality checked twice by our expert QC team before delivery. You can send cakes or gifts to your loved ones in Nepal or shop online for yourself in Nepal with UG Bazaar, a pioneer in online shopping in Nepal.",
      "customizable": true,
      "SKU": "SKU: UGC-D-138",
      "category": "cake",
      "stock": 16,
      "rating": {
        "value": 4.8,
        "count": 71,
        "stars": 5
      },
      "pricing": {
        "original": 19.19,
        "discounted": 15.99,
        "discountPercentage": 17,
        "currency": "$"
      },
      "specifications": [
        { "label": "Weight", "value": "1 kg (approx)" },
        { "label": "Serves", "value": "8-10 people" },
        { "label": "Shelf Life", "value": "3 days" },
        { "label": "Storage", "value": "Refrigerate" }
      ],
      "features": [
        "Lemon cake",
        "Elderflower buttercream",
        "Edible flowers",
        "Elegant design",
        "Personalized message"
      ],
      "deliveryInfo": [
        { "icon": "Truck", "text": "Free delivery inside Kathmandu Valley" },
        { "icon": "Shield", "text": "100% satisfaction guaranteed" },
        { "icon": "RotateCcw", "text": "24-hour return policy" },
        { "icon": "Package", "text": "Premium quality ingredients" }
      ],
      "nutritionInfo": [
        { "label": "Calories", "value": "335 kcal" },
        { "label": "Protein", "value": "4g" },
        { "label": "Carbs", "value": "43g" },
        { "label": "Fat", "value": "17g" }
      ],
      "additionalImages": [
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-2.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-3.webp",
        "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E-4.webp"
      ]
    },
    "relatedProducts": [3, 9, 13, 19],
    "reviews": [134, 135, 136],
    "faqs": [2, 4, 6]
  }
]

// ==================== REVIEWS DATA ====================

export const reviews = [
  {
    id: 134,
    productId: 12,
    userName: "Sarah Johnson",
    rating: 5,
    title: "Perfect for Grandma!",
    comment:
      "My grandma absolutely loved this cake. The lemon flavor was perfect and the edible flowers made it look so elegant.",
    date: "2024-02-10",
    verified: true,
    helpful: 12,
  },
  {
    id: 135,
    productId: 12,
    userName: "Michael Chen",
    rating: 4,
    title: "Great cake, beautiful design",
    comment:
      "The cake tasted amazing and the delivery was on time. Would order again.",
    date: "2024-02-08",
    verified: true,
    helpful: 5,
  },
  {
    id: 136,
    productId: 12,
    userName: "Emily Davis",
    rating: 5,
    title: "Exceeded expectations",
    comment:
      "The personalized message was perfect. Everyone at the party loved it!",
    date: "2024-02-05",
    verified: true,
    helpful: 8,
  },
  {
    id: 201,
    productId: 21,
    userName: "Jessica & Mark",
    rating: 5,
    title: "Dream wedding cake",
    comment:
      "Our wedding cake was absolutely stunning. Exactly what we wanted!",
    date: "2024-01-15",
    verified: true,
    helpful: 23,
  },
];

// ==================== FAQS DATA ====================

export const faqs = [
  {
    id: 2,
    productId: 12,
    question: "Can I add a custom message?",
    answer:
      "Yes, you can add a personalized message when ordering. Just mention it in the special instructions.",
    category: "Customization",
  },
  {
    id: 4,
    productId: 12,
    question: "How should I store the cake?",
    answer:
      "Keep refrigerated and consume within 3 days for best taste. Let it sit at room temperature for 30 minutes before serving.",
    category: "pastry",
  },
  {
    id: 6,
    productId: 12,
    question: "Is this cake eggless?",
    answer:
      "No, this cake contains eggs. We do have eggless options available in our collection.",
    category: "anniversary-cakes",
  },
];

// ==================== HELPER FUNCTIONS ====================

// Get category by slug
export const getCategoryBySlug = (slug) => {
  return categories.find((cat) => cat.slug === slug);
};

// Get category by ID
export const getCategoryById = (id) => {
  return categories.find((cat) => cat.id === id);
};

// FIXED: Get products by category ID
export const getProductsByCategory = (categoryId) => {
  // First get the category to know its slug
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  // Filter products by matching the category slug
  return products.filter((p) => {
    // Check if the product's category matches the category slug
    return p.cakeDetails.category === category.slug;
  });
};

// Get product by ID
export const getProductById = (id) => {
  return products.find((p) => p.cakeDetails.id === parseInt(id));
};

// FIXED: Get related categories for a category
export const getRelatedCategories = (categoryId) => {
  const relatedIds = CategoriesMap[categoryId] || [];
  return relatedIds.map((id) => getCategoryById(id)).filter(Boolean);
};

// Get related products for a product
export const getRelatedProducts = (productId) => {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) return [];

  return product.relatedProducts
    .map((id) => getProductById(id))
    .filter(Boolean);
};

// Get reviews for a product
export const getProductReviews = (productId) => {
  return reviews.filter((r) => r.productId === parseInt(productId));
};

// Get FAQs for a product
export const getProductFaqs = (productId) => {
  return faqs.filter((f) => f.productId === parseInt(productId));
};

// Get all unique categories from products
export const getAllProductCategories = () => {
  const uniqueCategories = [
    ...new Set(products.map((p) => p.cakeDetails.category)),
  ];
  return uniqueCategories.map((catName) => {
    const category = categories.find((c) => c.name === catName);
    return {
      name: catName,
      id: category?.id || null,
      slug: category?.slug || catName.toLowerCase().replace(/\s+/g, "-"),
      productCount: products.filter((p) => p.cakeDetails.category === catName)
        .length,
    };
  });
};

// FIXED: Get popular products (by rating)
export const getPopularProducts = (limit = 8) => {
  return [...products]
    .sort((a, b) => b.cakeDetails.rating.value - a.cakeDetails.rating.value)
    .slice(0, limit);
};

// Get new products (by ID - assuming higher IDs are newer)
export const getNewProducts = (limit = 8) => {
  return [...products]
    .sort((a, b) => b.cakeDetails.id - a.cakeDetails.id)
    .slice(0, limit);
};

// Get discounted products
export const getDiscountedProducts = (limit = 8) => {
  return products
    .filter((p) => p.cakeDetails.pricing.discountPercentage > 0)
    .sort(
      (a, b) =>
        b.cakeDetails.pricing.discountPercentage -
        a.cakeDetails.pricing.discountPercentage,
    )
    .slice(0, limit);
};

// Search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes(searchTerm) ||
      p.cakeDetails.description.toLowerCase().includes(searchTerm) ||
      p.cakeDetails.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)),
  );
};

// Filter products by price range
export const filterProductsByPrice = (products, min, max) => {
  return products.filter(
    (p) =>
      p.cakeDetails.pricing.discounted >= min &&
      p.cakeDetails.pricing.discounted <= max,
  );
};

// Filter products by rating
export const filterProductsByRating = (products, minRating) => {
  return products.filter((p) => p.cakeDetails.rating.value >= minRating);
};

// Get category-specific data for components
export const getCategorySpecificData = (categoryId) => {
  const specificData = {
    1: {
      ageGroups: ["Kids", "Teens", "Adults", "Seniors"],
      themes: ["Cartoon", "Elegant", "Photo", "Number", "Flowers"],
      popularAges: [1, 5, 10, 18, 21, 30, 40, 50, 60],
      messageExamples: [
        "Happy Birthday!",
        "Happy Birthday Mom/Dad",
        "Happy Birthday Grandma/Grandpa",
        "Happy Birthday [Name]",
      ],
    },
    2: {
      styles: ["Classic", "Modern", "Rustic", "Elegant", "Vintage"],
      colors: ["White", "Ivory", "Gold", "Rose Gold", "Blush Pink", "Navy"],
      cakeToppers: [
        "Bride & Groom",
        "Mr & Mrs",
        "Custom",
        "Fresh Flowers",
        "Gold Letters",
      ],
      tierOptions: ["2-Tier", "3-Tier", "4-Tier", "5-Tier"],
    },
    3: {
      milestones: ["1st", "5th", "10th", "25th", "50th", "60th"],
      romanticThemes: ["Heart", "Rose", "Love Birds", "Eternal Love", "Rings"],
      messageTemplates: [
        "Happy Anniversary",
        "To My Love",
        "Forever Yours",
        "X Years Together",
      ],
    },
    4: {
      characters: [
        "Spider-Man",
        "Frozen",
        "Paw Patrol",
        "Superman",
        "Batman",
        "Mickey Mouse",
      ],
      themes: [
        "Superhero",
        "Princess",
        "Cartoon",
        "Animal",
        "Dinosaur",
        "Space",
      ],
      ageRanges: ["1-3 years", "4-7 years", "8-12 years"],
    },
    5: {
      imageTypes: [
        "Family Photo",
        "Couple Photo",
        "Child Photo",
        "Pet Photo",
        "Logo",
      ],
      shapes: ["Round", "Square", "Heart", "Rectangle"],
      printingQuality: ["High Resolution", "Standard"],
    },
    6: {
      flavors: [
        "Vanilla",
        "Chocolate",
        "Red Velvet",
        "Strawberry",
        "Lemon",
        "Coffee",
      ],
      frostingTypes: ["Buttercream", "Cream Cheese", "Ganache"],
      occasions: ["Birthday", "Wedding", "Baby Shower", "Party"],
    },
    7: {
      types: ["Éclairs", "Cream Puffs", "Tarts", "Danishes", "Mille-feuille"],
      fillings: [
        "Vanilla Cream",
        "Chocolate Cream",
        "Fruit Compote",
        "Pastry Cream",
      ],
    },
    8: {
      varieties: [
        "Chocolate Chip",
        "Oatmeal",
        "Butter",
        "Almond",
        "Double Chocolate",
        "Sugar",
      ],
      giftPackSizes: ["6 pcs", "12 pcs", "24 pcs", "36 pcs"],
    },
  };

  return specificData[categoryId] || {};
};

// Export all data as default object
export default {
  categories,
  products,
  reviews,
  faqs,
  getCategoryBySlug,
  getCategoryById,
  getProductsByCategory,
  getProductById,
  getRelatedCategories,
  getRelatedProducts,
  getProductReviews,
  getProductFaqs,
  getAllProductCategories,
  getPopularProducts,
  getNewProducts,
  getDiscountedProducts,
  searchProducts,
  filterProductsByPrice,
  filterProductsByRating,
  getCategorySpecificData,
};
