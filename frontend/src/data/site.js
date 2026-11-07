// ===== Shop details & static content. Edit text here. =====
export const shop = {
  name: 'Modern Style',
  shortName: 'MS',
  tagline: 'Try It Wear It',
  type: "Men's Wear",
  address: 'Shop No.10, Fort Morris Apt., Opp. Vasai Janta Bank, Next to Flyover, V.S. Marg, Virar (E) 401 305',
  phone: '',
  email: '',
  whatsapp: '',
  hours: 'Mon - Sun: 10:30 AM - 9:30 PM',
}

// Price board seen outside the shop
export const priceBoard = [
  { name: 'Formal Shirt', price: 299 },
  { name: 'Shirt', price: 399 },
  { name: 'Premium Shirt', price: 499 },
  { name: 'Formal Pant', price: 449 },
  { name: 'Jeans', price: 499 },
]

export const categories = ['All', "Men's Wear", 'Kids & Baby', 'Nightwear & Activewear', 'Innerwear & Essentials']

export const departments = [
  {
    name: "Men's Wear",
    mark: 'M',
    items: ['Shirts', 'T-shirts', 'Pants', 'Kurtas'],
    photos: [
      { label: 'Shirts', image: '/images/clothing/formal-shirt.jpg' },
      { label: 'T-shirts', image: '/images/clothing/tee-model.jpg' },
      { label: 'Pants', image: '/images/clothing/jeans-flatlay.jpg' },
      { label: 'Kurtas', image: '/images/clothing/linen-set.jpg' },
    ],
  },
  {
    name: 'Kids & Baby',
    mark: 'K',
    items: ['Baby clothing', 'Everyday basics'],
    photos: [
      { label: 'Everyday sets', image: '/images/clothing/folded-tees.jpg' },
      { label: 'Playtime styles', image: '/images/clothing/tee-model.jpg' },
    ],
  },
  {
    name: 'Nightwear & Activewear',
    mark: 'N',
    items: ['Track pants', 'Night pants'],
    photos: [
      { label: 'Activewear', image: '/images/clothing/trackwear.jpg' },
      { label: 'Nightwear', image: '/images/clothing/activewear.jpg' },
    ],
  },
  {
    name: 'Innerwear & Essentials',
    mark: 'E',
    items: ['Baniyan', 'Sando', 'Underwear'],
    photos: [
      { label: 'Baniyan', image: '/images/clothing/white-tee.jpg' },
      { label: 'Sando', image: '/images/clothing/folded-tees.jpg' },
      { label: 'Underwear', image: '/images/clothing/black-tee.jpg' },
    ],
  },
]

export const features = [
  { no: '01.', title: 'Everyday Clothing', text: 'Explore shirts, tees, pants and more for everyday wear.' },
  { no: '02.', title: 'A Local Favourite', text: 'Find clothing and essentials for the whole family in one place.' },
  { no: '03.', title: 'Try It in Store', text: 'Visit our Virar East shop, check the fit, and choose what feels right.' },
]

export const testimonials = [
  { name: 'Emily D. Carter', role: 'Marketing Consultant', text: 'From the moment I received my order, I could tell there was something different about the brand. Every detail, from the packaging.', image: '/images/clothing/formal-shirt.jpg' },
  { name: 'Rohit Patil', role: 'Regular Customer', text: 'Great collection and honest prices. I always find a good shirt here for office and weekends.', image: '/images/clothing/tee-model.jpg' },
  { name: 'Amit Shah', role: 'Virar Local', text: 'The trial room and the staff make shopping easy. Fits well and the quality is nice for the price.', image: '/images/clothing/folded-tees.jpg' },
]
