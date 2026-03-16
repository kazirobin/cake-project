
📦 মাস্টার প্রম্পট:

```
আপনি একজন সিনিয়র সিস্টেম আর্কিটেক্ট এবং ডাটাবেজ ডিজাইনার। আপনি দারাজ, অ্যামাজন, ইবে-এর মতো বড় ই-কমার্স প্ল্যাটফর্মের জন্য ডাটা স্ট্রাকচার ডিজাইন করেন।

আমার জন্য একটি **সম্পূর্ণ, স্কেলেবল, প্রোডাকশন-রেডি ই-কমার্স ডাটা স্ট্রাকচার** তৈরি করুন যা নিচের সবগুলো কালেকশন বা অবজেক্ট কভার করবে:

## মূল কালেকশন সমূহ:
1. Categories (ক্যাটাগরি)
2. Vendors (বিক্রেতা)
3. Shops (দোকান)
4. Products (প্রোডাক্ট)
5. Variants (ভ্যারিয়েন্ট/কালার/সাইজ)
6. Users (ক্রেতা)
7. Wishlist (পছন্দের তালিকা)
8. Carts (কার্ট)
9. Orders (অর্ডার)
10. Payments (পেমেন্ট)
11. Shipments (শিপমেন্ট)
12. Coupons (কুপন)
13. Reviews (রিভিউ)
14. Brands (ব্র্যান্ড) - নতুন
15. Blogs/Articles (ব্লগ) - নতুন
16. Customer Support Tickets (সাপোর্ট টিকেট) - নতুন
17. Flash Sales (ফ্ল্যাশ সেল) - নতুন
18. Affiliate Marketing (অ্যাফিলিয়েট) - নতুন
19. Inventory/Stock Logs (ইনভেন্টরি লগ) - নতুন
20. Notifications (নোটিফিকেশন) - নতুন

## প্রতিটি কালেকশনের জন্য যা যা দরকার:
- প্রতিটি ফিল্ডের নাম এবং তার ডাটা টাইপ (string, number, array, object, date, boolean, ইত্যাদি)
- ফিল্ডের বর্ণনা (কেন এই ফিল্ড দরকার, কি কাজে লাগবে)
- ফিল্ডটি অবশ্যই দরকারি কিনা (required/optional)
- অন্যান্য কালেকশনের সাথে রিলেশনশিপ (reference)
- ডিফল্ট ভ্যালু (যদি থাকে)
- এনাম ভ্যালু (যদি নির্দিষ্ট কিছু ভ্যালু থাকে)

## প্রতিটি কালেকশনের জন্য কমপক্ষে ২টি করে রিয়েলিস্টিক ডামি ডাটা এন্ট্রি দেখান (JSON format এ)।

## বিশেষ বিষয়গুলো মাথায় রাখবেন:
1. মাল্টি-ভেন্ডার সাপোর্ট (একাধিক বিক্রেতা)
2. মাল্টি-কারেন্সি সাপোর্ট (USD, BDT, INR)
3. মাল্টি-ল্যাঙ্গুয়েজ সাপোর্ট (ইংরেজি, বাংলা)
4. SEO ফ্রেন্ডলি (meta fields)
5. ইভেন্ট লগিং (audit trail)
6. সফট ডিলিট (isDeleted ফিল্ড)
7. টাইমস্ট্যাম্প (createdAt, updatedAt)
8. স্কেলেবিলিটি (ফিউচারে ডাটা বড় হলেও সমস্যা হবে না)
9. ই-কমার্সের সব ফিচার (কুপন, ফ্ল্যাশ সেল, রিভিউ, রেটিং, উইশলিস্ট, ইত্যাদি)

## JSON ফরম্যাটে আউটপুট দিন:
- প্রতিটি কালেকশনের জন্য একটি করে JSON অবজেক্ট
- প্রতিটি অবজেক্টের মধ্যে ফিল্ড ডেফিনিশন এবং ডামি ডাটা
- শেষে একটি ডাটাবেজ ডায়াগ্রামের টেক্সটুয়াল রিপ্রেজেন্টেশন (কোন কালেকশন কার সাথে যুক্ত)

## অতিরিক্ত যা যা চাই:
- ইন্ডেক্সিং সাজেশন (কোন কোন ফিল্ডে ইন্ডেক্স দিলে কোয়েরি ফাস্ট হবে)
- পার্টিশনিং স্ট্র্যাটেজি (যদি দরকার হয়)
- ডাটা ভ্যালিডেশন রুলস
- অডিট ট্রেইল কিভাবে রাখবেন
- ক্যাশিং স্ট্র্যাটেজি (কোন ডাটা ক্যাশে রাখবেন)

আপনার ডিজাইনটি এমন হবে যাতে একজন ডেভেলপার সরাসরি MongoDB, PostgreSQL, অথবা Firebase-এ ইমপ্লিমেন্ট করতে পারে।
```


আপনার দেওয়া ডাটা স্ট্রাকচারটি একটি ই-কমার্স প্ল্যাটফর্মের (দারাজের মতো) জন্য ভালো বেস তৈরি করেছে। তবে এটি একটি মিনিমাম ভায়াবল প্রোডাক্ট (MVP) এর জন্য যথেষ্ট হলেও, একটি স্কেলেবল, প্রোডাকশন-রেডি প্ল্যাটফর্মের জন্য আরও অনেকগুলি প্রপার্টি এবং কালেকশন অ্যাড করতে হবে।

নিচে প্রথমে আপনার ডাটায় কি কি প্রপার্টি লেভেলে ইমপ্রুভমেন্ট করা যায় এবং তারপর একটি আপডেটেড এবং স্কেলেবল ডাটা স্ট্রাকচার দেওয়া হলো।

---

১. যে প্রপার্টিগুলো ইম্প্রুভ বা অ্যাড করা উচিত

Categories (ক্যাটাগরি)

· SEO ফিল্ডস: metaTitle, metaDescription, metaKeywords অ্যাড করতে হবে যাতে ক্যাটাগরি পেজগুলো সার্চ ইঞ্জিনে ভালো র্যাংক পায়।
· ছবি: প্রতিটি ক্যাটাগরির জন্য image বা icon ফিল্ড রাখা উচিত (হোমপেজে ক্যাটাগরি দেখানোর জন্য)।
· ফিল্টার অ্যাট্রিবিউটস: এই ক্যাটাগরির প্রোডাক্টের জন্য কোন কোন ফিল্ড ফিল্টার হিসেবে দেখানো হবে, সেটা ডিফাইন করা যেতে পারে (যেমন: ব্র্যান্ড, প্রাইস রেঞ্জ, সাইজ ইত্যাদি)।

Products (প্রোডাক্ট)

· SEO ফিল্ডস: ক্যাটাগরির মতোই প্রোডাক্টের জন্যও metaTitle, metaDescription দরকার।
· স্ট্যাটাস: প্রোডাক্টের স্ট্যাটাস দরকার (যেমন: active, draft, out-of-stock, pending-approval)।
· ওয়ারেন্টি: warranty বা guarantee ইনফরমেশন।
· শিপিং ইনফো: প্রোডাক্টের ওজন, ডাইমেনশন (length, width, height), এবং শিপিং কস্ট টাইপ (যেমন: free, fixed, weight-based)।
· ভ্যারিয়েন্ট ম্যানেজমেন্ট: আপনার attributes ফিল্ড ভালো আছে, তবে ভ্যারিয়েন্ট আইডিগুলো প্রোডাক্টের মধ্যেই রাখা যেতে পারে।
· প্রোডাক্ট ভিডিও: অ্যাড করার অপশন।

Vendors & Shops (বিক্রেতা ও দোকান)

· ঠিকানা: address ফিল্ড অ্যাড করতে হবে (যাতে লোকেশন-ভিত্তিক কন্টেন্ট বা ট্যাক্স ক্যালকুলেশন করা যায়)।
· ব্যাংক ডিটেলস: পেমেন্ট সেটেল করার জন্য ব্যাংক অ্যাকাউন্ট বা মোবাইল ফাইন্যান্স ইনফো।
· দোকানের বিবরণ: description, bannerImage।

Users (ইউজার)

· ঠিকানা: ইউজারের একাধিক ঠিকানা রাখার জন্য addresses অ্যারে লাগবে (ডেলিভারি অ্যাড্রেসের জন্য)।
· ফোন ভেরিফিকেশন: isPhoneVerified ফিল্ড লাগবে।
· লাস্ট লগিন: lastLoginAt ফিল্ড।

Orders, Payments, Shipments (অর্ডার, পেমেন্ট, শিপমেন্ট)

· অর্ডার হিস্টোরি: অর্ডারের প্রতিটি স্ট্যাটাস পরিবর্তনের লগ রাখার জন্য statusHistory ফিল্ড দরকার (যেমন: "প্লেসড", "পেমেন্ট কনফার্মড", "শিপড", "ডেলিভারড", "কাস্টমার কনফার্মড")।
· পেমেন্ট ডিটেলস: পেমেন্টের সময় প্রাপ্ত সম্পূর্ণ API রেসপন্স সংরক্ষণের জন্য gatewayResponse ফিল্ড রাখা ভালো (ডিবাগিং এবং ডিস্পিউট মীমাংসার জন্য)।
· শিপিং ঠিকানা: অর্ডারের সময় ইউজারের দেওয়া ঠিকানা অর্ডার অবজেক্টের মধ্যে কপি করে রাখা উচিত, কারণ পরে ঠিকানা পরিবর্তন হলেও অর্ডারের রেকর্ড ঠিক থাকবে।

---

২. নতুন আরও বড় স্কেলেবল অবজেক্ট

নিচে উপরের পয়েন্টগুলোর আলোকে একটি আপডেটেড এবং বর্ধিত ডাটা স্ট্রাকচার দেওয়া হলো:

```json
{
  "categories": [
    {
      "_id": "cat_electronics",
      "name": "Electronics",
      "slug": "electronics",
      "parentId": null,
      "level": 0,
      "path": "electronics",
      "subCategories": ["cat_mobiles", "cat_computers"],
      "image": "electronics-cat-banner.jpg",
      "icon": "electronics-icon.svg",
      "metaTitle": "Buy Electronics Products Online | Daraz-like",
      "metaDescription": "Shop from a wide range of Electronics including Mobiles, Computers and more. Best prices in Bangladesh.",
      "filterableAttributes": ["brand", "price", "ram", "storage"]
    }
  ],

  "vendors": [
    {
      "_id": "vendor1",
      "name": "Tech World",
      "email": "techworld@shop.com",
      "phone": "01711111111",
      "verified": true,
      "shopId": "shop1",
      "rating": 4.7,
      "totalSales": 1500,
      "joinedAt": "2025-01-01T00:00:00Z",
      "address": {
        "street": "123 Elephant Road",
        "city": "Dhaka",
        "division": "Dhaka",
        "country": "Bangladesh",
        "zipCode": "1205"
      },
      "bankDetails": {
        "accountHolderName": "Tech World",
        "bankName": "DBBL",
        "accountNumber": "1234567890",
        "routingNumber": "123456789"
      },
      "isActive": true
    }
  ],

  "shops": [
    {
      "_id": "shop1",
      "vendorId": "vendor1",
      "name": "Tech World Official",
      "slug": "tech-world-official",
      "logo": "techworld.png",
      "bannerImage": "techworld-banner.png",
      "description": "Official reseller of Samsung and Xiaomi products. 100% authentic products with brand warranty.",
      "followers": 12000,
      "createdAt": "2025-01-10T00:00:00Z",
      "totalProducts": 350,
      "responseTime": "within 1 hour"
    }
  ],

  "products": [
    {
      "_id": "prod1",
      "title": "Samsung Galaxy S23 Ultra",
      "slug": "samsung-galaxy-s23-ultra",
      "categoryId": "cat_android",
      "shopId": "shop1",
      "brand": "Samsung",
      "price": {
        "regular": 1300,
        "discount": 1199,
        "currency": "USD"
      },
      "images": [
        { "url": "s23-1.jpg", "isPrimary": true, "altText": "Samsung Galaxy S23 Ultra Black Front" },
        { "url": "s23-2.jpg", "isPrimary": false, "altText": "Samsung Galaxy S23 Ultra Back" }
      ],
      "videoUrl": "s23-promo.mp4",
      "rating": {
        "average": 4.8,
        "totalReviews": 340
      },
      "attributes": {
        "color": ["Black", "Green"],
        "storage": ["256GB", "512GB"],
        "ram": ["12GB"]
      },
      "variants": ["var1", "var2"],
      "specifications": {
        "display": "6.8-inch Dynamic AMOLED 2X",
        "processor": "Snapdragon 8 Gen 2",
        "battery": "5000 mAh"
      },
      "warranty": "1-year official warranty",
      "shippingInfo": {
        "weight": "0.234 kg",
        "dimensions": { "length": 16.3, "width": 7.8, "height": 0.89 },
        "shippingCostType": "free"
      },
      "status": "active",
      "metaTitle": "Samsung Galaxy S23 Ultra Price in Bangladesh | Tech World",
      "metaDescription": "Buy the latest Samsung Galaxy S23 Ultra at the best price in Bangladesh. 200MP Camera, Snapdragon 8 Gen 2 and 5000 mAh battery. Official Warranty included.",
      "createdAt": "2026-01-15T00:00:00Z",
      "updatedAt": "2026-03-01T00:00:00Z"
    }
  ],

  "variants": [
    {
      "_id": "var1",
      "productId": "prod1",
      "color": "Black",
      "storage": "256GB",
      "price": 1199,
      "stock": 40,
      "sku": "S23U-BLK-256",
      "images": ["s23-black-256-1.jpg"]
    }
  ],

  "users": [
    {
      "_id": "user1",
      "name": "Rahim Uddin",
      "email": "rahim@gmail.com",
      "phone": "01710000000",
      "role": "customer",
      "status": "active",
      "cartId": "cart1",
      "wishlistId": "wish1",
      "isPhoneVerified": true,
      "addresses": [
        {
          "_id": "addr1",
          "type": "home",
          "street": "House 12, Road 5, Dhanmondi",
          "city": "Dhaka",
          "division": "Dhaka",
          "country": "Bangladesh",
          "zipCode": "1209",
          "isDefault": true
        }
      ],
      "lastLoginAt": "2026-03-15T08:30:00Z",
      "createdAt": "2025-05-20T00:00:00Z"
    }
  ],

  "orders": [
    {
      "_id": "order1",
      "userId": "user1",
      "products": [
        {
          "productId": "prod2",
          "variantId": "var3",
          "quantity": 1,
          "price": 260,
          "title": "Xiaomi Redmi Note 13",
          "image": "redmi1.jpg"
        }
      ],
      "totalPrice": 260,
      "shippingAddress": {
        "street": "House 12, Road 5, Dhanmondi",
        "city": "Dhaka",
        "division": "Dhaka",
        "country": "Bangladesh",
        "zipCode": "1209"
      },
      "status": "processing",
      "paymentStatus": "paid",
      "paymentId": "payment1",
      "shipmentId": "ship1",
      "createdAt": "2026-03-15T10:30:00Z",
      "updatedAt": "2026-03-15T10:35:00Z",
      "statusHistory": [
        { "status": "pending", "timestamp": "2026-03-15T10:30:00Z", "note": "Order placed" },
        { "status": "processing", "timestamp": "2026-03-15T10:35:00Z", "note": "Payment confirmed" }
      ]
    }
  ],

  "payments": [
    {
      "_id": "payment1",
      "orderId": "order1",
      "method": "bkash",
      "transactionId": "TXN9834723",
      "amount": 260,
      "status": "success",
      "gatewayResponse": {},
      "paidAt": "2026-03-15T10:32:00Z"
    }
  ],

  "shipments": [
    {
      "_id": "ship1",
      "orderId": "order1",
      "courier": "Pathao",
      "trackingNumber": "PTH12345678",
      "status": "shipped",
      "estimatedDelivery": "2026-03-20T00:00:00Z",
      "shippedAt": "2026-03-16T09:00:00Z"
    }
  ],

  "coupons": [
    {
      "_id": "coupon1",
      "code": "DARAZ10",
      "discountType": "percentage",
      "discountValue": 10,
      "minOrder": 100,
      "maxDiscount": 50,
      "usageLimit": 1000,
      "usedCount": 25,
      "applicableCategories": ["cat_electronics"],
      "applicableVendors": ["vendor1"],
      "expiresAt": "2026-12-31T23:59:59Z",
      "status": "active"
    }
  ],

  "reviews": [
    {
      "_id": "rev1",
      "productId": "prod1",
      "userId": "user1",
      "rating": 5,
      "review": "Excellent phone with amazing camera.",
      "images": ["review-img1.jpg"],
      "likes": 3,
      "createdAt": "2026-03-10T00:00:00Z"
    }
  ]
}
```



✅✅✅


