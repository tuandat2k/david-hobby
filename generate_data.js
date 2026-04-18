const fs = require('fs');

const images = [
  "https://images.unsplash.com/photo-1610992383188-75f284988775?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1594833297298-502a5cf34f6b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620311224213-9a3d4638706b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580477667995-156083561221?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"
];

const categories = ["Gundam", "Marvel", "Anime", "Transformers", "Dragon Ball", "Pokemon", "DC"];
const brands = ["Bandai", "Hot Toys", "Banpresto", "Takara Tomy", "Megahouse", "Good Smile"];

function randomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

const products = [];

for (let i = 1; i <= 25; i++) {
  const category = categories[i % categories.length];
  const brand = brands[i % brands.length];
  
  const img1 = randomImage();
  const img2 = randomImage();
  const img3 = randomImage();
  
  products.push({
    id: `m${i}`,
    name: `Mô Hình ${category} Phiên Bản ${i} (${brand})`,
    name_en: `${category} Figure Version ${i} (${brand})`,
    price: `${(Math.floor(Math.random() * 20) + 5) * 100},000đ`,
    description: `Mô hình cực chất lượng từ vũ trụ ${category}. Thiết kế tinh xảo, màu sắc trung thực, phù hợp trưng bày.`,
    description_en: `High quality figure from the ${category} universe. Exquisite design, true colors, suitable for display.`,
    category: category,
    brand: brand,
    series: `${category} Series`,
    line: `Premium Line ${i}`,
    type: i % 2 === 0 ? "Lắp ráp (Model Kit)" : "Figure tĩnh",
    scale: i % 3 === 0 ? "1/100" : (i % 2 === 0 ? "1/144" : "1/6"),
    features: [
      i % 2 === 0 ? "Có đèn LED" : "Màu sắc sống động",
      "Khớp linh hoạt",
      "Kèm phụ kiện"
    ],
    image: img1,
    images: [img1, img2, img3],
    inStock: Math.random() > 0.3, // 70% in stock
    shopeeLink: "https://shopee.vn/search?keyword=davidhobby",
    fanpageLink: "https://facebook.com"
  });
}

// Add the original 5 products manually to keep the quality text
const originalProducts = [
  {
    "id": "p-gundam-rx782",
    "name": "Mô Hình Gundam RX-78-2 (MG 1/100)",
    "name_en": "Gundam RX-78-2 Model Kit (MG 1/100)",
    "price": "1,250,000đ",
    "description": "Mô hình lắp ráp Gundam chính hãng Bandai. Tỷ lệ 1/100 Master Grade với chi tiết sắc nét, khung xương linh hoạt.",
    "description_en": "Authentic Bandai Gundam model kit. 1/100 Master Grade scale with sharp details and flexible inner frame.",
    "category": "Gundam",
    "brand": "Bandai",
    "series": "Gundam",
    "line": "MG (Master Grade)",
    "type": "Lắp ráp (Model Kit)",
    "scale": "1/100",
    "features": ["Độ chi tiết cao", "Khung xương linh hoạt", "Có decal nước"],
    "image": "https://images.unsplash.com/photo-1610992383188-75f284988775?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610992383188-75f284988775?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620311224213-9a3d4638706b?auto=format&fit=crop&w=800&q=80"
    ],
    "inStock": true,
    "shopeeLink": "https://shopee.vn/",
    "fanpageLink": "https://facebook.com"
  },
  {
    "id": "p-ironman-mk85",
    "name": "Mô Hình Iron Man Mark 85 (1/6 Scale)",
    "name_en": "Iron Man Mark 85 Figure (1/6 Scale)",
    "price": "5,500,000đ",
    "description": "Mô hình Iron Man Mark 85 tỉ lệ 1/6 cực đỉnh. Trang bị đèn LED ở mắt, lò phản ứng hồ quang và lòng bàn tay.",
    "description_en": "Incredible 1/6 scale Iron Man Mark 85 figure. Equipped with LED lights in eyes, arc reactor, and palms.",
    "category": "Marvel",
    "brand": "Hot Toys",
    "series": "Avengers: Endgame",
    "line": "Diecast Series",
    "type": "Figure tĩnh",
    "scale": "1/6",
    "features": ["Có đèn LED", "Khớp linh hoạt", "Phụ kiện đa dạng"],
    "image": "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
    ],
    "inStock": true,
    "shopeeLink": "https://shopee.vn/",
    "fanpageLink": "https://facebook.com"
  }
];

const finalData = [...originalProducts, ...products];

fs.writeFileSync('src/data/products.json', JSON.stringify(finalData, null, 2));
console.log('Generated 27 products');
