export const products = [
  { id: 1, name: 'Everyday Check Shirt', category: "Men's Wear", type: 'shirt', palette: '#617f72', paletteLight: '#a8b9a3', pattern: 'checks', price: 399, image: '/images/clothing/formal-shirt.jpg', sizes: ['S', 'M', 'L', 'XL'], bestseller: true,
    description: 'A comfortable everyday check shirt with an easy-to-wear fit.' },
  { id: 2, name: 'Indigo Print Shirt', category: "Men's Wear", type: 'shirt', palette: '#526b83', paletteLight: '#a9bcc3', pattern: 'print', price: 499, image: '/images/clothing/knitwear-rack.jpg', sizes: ['M', 'L', 'XL'], bestseller: true,
    description: 'A relaxed printed shirt for everyday plans and weekends.' },
  { id: 3, name: 'Classic Light Shirt', category: "Men's Wear", type: 'shirt', palette: '#dfd9c9', paletteLight: '#fffaf0', pattern: 'plain', price: 449, image: '/images/clothing/formal-shirt.jpg', sizes: ['S', 'M', 'L', 'XL'], bestseller: true,
    description: 'An easy classic that pairs well with your everyday wardrobe.' },
  { id: 4, name: 'Everyday Blue Jeans', category: "Men's Wear", type: 'pants', palette: '#496681', paletteLight: '#88a0b2', pattern: 'plain', price: 499, image: '/images/clothing/jeans-flatlay.jpg', sizes: ['30', '32', '34', '36'], bestseller: true,
    description: 'Classic blue denim with a comfortable everyday fit.' },
  { id: 5, name: 'Earth Check Shirt', category: "Men's Wear", type: 'shirt', palette: '#8b7158', paletteLight: '#c3a881', pattern: 'checks', price: 399, image: '/images/clothing/shirt-rack.jpg', sizes: ['M', 'L', 'XL'], bestseller: false,
    description: 'A warm-toned check shirt made for easy everyday styling.' },
  { id: 6, name: 'Burgundy Casual Shirt', category: "Men's Wear", type: 'shirt', palette: '#8f4051', paletteLight: '#cf8c91', pattern: 'plain', price: 299, image: '/images/clothing/shirt-rack.jpg', sizes: ['S', 'M', 'L', 'XL'], bestseller: false,
    description: 'A versatile colour and a comfortable fit for daily wear.' },
  { id: 7, name: 'Striped Polo Tee', category: "Men's Wear", type: 'polo', palette: '#648a81', paletteLight: '#d5ddd1', pattern: 'stripes', price: 349, image: '/images/clothing/white-tee.jpg', sizes: ['S', 'M', 'L', 'XL'], bestseller: false,
    description: 'A soft-feel polo with a clean striped look.' },
  { id: 8, name: 'Graphic Everyday Tee', category: "Men's Wear", type: 'tshirt', palette: '#b7a16e', paletteLight: '#e1d3ab', pattern: 'print', price: 349, image: '/images/clothing/black-tee.jpg', sizes: ['M', 'L', 'XL'], bestseller: false,
    description: 'A relaxed graphic tee for off-duty days.' },
  { id: 9, name: 'Classic Cotton Kurta', category: "Men's Wear", type: 'kurta', palette: '#647467', paletteLight: '#bdc2a9', pattern: 'plain', price: 599, image: '/images/clothing/linen-set.jpg', sizes: ['M', 'L', 'XL'], bestseller: true,
    description: 'A simple, comfortable kurta for everyday and festive occasions.' },
  { id: 10, name: 'Kids Playtime Set', category: 'Kids & Baby', type: 'kids', palette: '#7792a5', paletteLight: '#d6c9a7', pattern: 'print', price: 399, image: '/images/clothing/folded-tees.jpg', sizes: ['2Y', '4Y', '6Y', '8Y'], bestseller: false,
    description: 'A cheerful and comfortable outfit for little everyday adventures.' },
  { id: 11, name: 'Baby Soft Cotton Set', category: 'Kids & Baby', type: 'kids', palette: '#c68a88', paletteLight: '#ead1ba', pattern: 'plain', price: 449, image: '/images/clothing/folded-tees.jpg', sizes: ['0-6M', '6-12M', '1-2Y'], bestseller: false,
    description: 'A soft-feel matching set for little ones.' },
  { id: 12, name: 'Everyday Track Pants', category: 'Nightwear & Activewear', type: 'pants', palette: '#484c54', paletteLight: '#95959a', pattern: 'stripes', price: 399, image: '/images/clothing/trackwear.jpg', sizes: ['M', 'L', 'XL'], bestseller: false,
    description: 'Easy-moving track pants for relaxing and active days.' },
  { id: 13, name: 'Relaxed Night Pants', category: 'Nightwear & Activewear', type: 'nightwear', palette: '#586e83', paletteLight: '#a6b2bd', pattern: 'checks', price: 299, image: '/images/clothing/activewear.jpg', sizes: ['M', 'L', 'XL'], bestseller: false,
    description: 'Comfort-first night pants for winding down at home.' },
  { id: 14, name: 'Everyday Cotton Vest', category: 'Innerwear & Essentials', type: 'vest', palette: '#d8d1c4', paletteLight: '#fffdf5', pattern: 'plain', price: 149, image: '/images/clothing/white-tee.jpg', sizes: ['S', 'M', 'L', 'XL'], bestseller: false,
    description: 'A soft-feel everyday innerwear essential.' },
  { id: 15, name: 'Classic Sando', category: 'Innerwear & Essentials', type: 'vest', palette: '#b9c9bd', paletteLight: '#f0f1e9', pattern: 'plain', price: 129, image: '/images/clothing/white-tee.jpg', sizes: ['S', 'M', 'L', 'XL'], bestseller: false,
    description: 'A lightweight sleeveless basic for everyday comfort.' },
  { id: 16, name: 'Everyday Comfort Briefs', category: 'Innerwear & Essentials', type: 'underwear', palette: '#526574', paletteLight: '#9eabb0', pattern: 'plain', price: 179, image: '/images/clothing/folded-tees.jpg', sizes: ['S', 'M', 'L', 'XL'], bestseller: false,
    description: 'A simple, comfortable everyday essential.' },
]

const productPhotoOptions = {
  shirt: ['/images/clothing/formal-shirt.jpg', '/images/clothing/shirt-rack.jpg', '/images/clothing/knitwear-rack.jpg'],
  tshirt: ['/images/clothing/white-tee.jpg', '/images/clothing/black-tee.jpg', '/images/clothing/tee-model.jpg', '/images/clothing/folded-tees.jpg'],
  polo: ['/images/clothing/white-tee.jpg', '/images/clothing/black-tee.jpg', '/images/clothing/tee-model.jpg', '/images/clothing/folded-tees.jpg'],
  pants: ['/images/clothing/jeans-flatlay.jpg', '/images/clothing/denim-rack.jpg'],
  nightwear: ['/images/clothing/trackwear.jpg', '/images/clothing/activewear.jpg'],
  kurta: ['/images/clothing/linen-set.jpg', '/images/clothing/knitwear-rack.jpg'],
  kids: ['/images/clothing/folded-tees.jpg', '/images/clothing/tee-model.jpg'],
  vest: ['/images/clothing/white-tee.jpg', '/images/clothing/folded-tees.jpg', '/images/clothing/black-tee.jpg'],
  underwear: ['/images/clothing/folded-tees.jpg', '/images/clothing/white-tee.jpg', '/images/clothing/black-tee.jpg'],
}

export function getProductPhotoViews(product) {
  const sources = [...new Set([
    product.image,
    ...(productPhotoOptions[product.type] || []),
  ].filter(Boolean))].slice(0, 3)

  return sources.map((source, index) => ({
    value: ['front', 'detail', 'folded'][index],
    label: ['Photo', 'Collection', 'Flat lay'][index],
    source,
  }))
}

export function formatPrice(value) {
  return 'Rs. ' + Number(value).toLocaleString('en-IN')
}
