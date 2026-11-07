# Modern Style - Men's Wear (E-commerce)

    modern-style/
      frontend/   Vue 3 + Vite  (done - this stage)
      backend/    Laravel API   (later)

## Run the frontend

    cd frontend
    npm install
    npm run dev        # open http://localhost:5173
    npm run build      # production files in frontend/dist

## Frontend folder guide (where to change things)

    frontend/src/
      assets/css/main.css     colors, fonts, buttons  (change theme here)
      data/site.js            shop address, phone, texts, testimonials, price board
      data/products.js        product list (name, price, image, sizes)
      data/orders.js          demo orders for admin
      services/api.js         ALL backend calls (swap mock data for Laravel here)
      store/cart.js           shopping cart logic
      router/index.js         all page URLs
      layouts/                UserLayout.vue (website), AdminLayout.vue (admin)
      components/common/      shared pieces (ProductCard)
      components/user/        website sections: Header, Footer, Hero, Lookbook, ...
      components/admin/       admin pieces (OrdersTable)
      views/user/             website pages: Home, Shop, Product, Cart, Checkout, Contact
      views/admin/            admin pages: Login, Dashboard, Products, Orders
    frontend/public/images/   all photos (replace files, keep same names)

## Quick edits

- Phone / email / WhatsApp: `src/data/site.js` (marked TODO)
- Add a product: copy a block in `src/data/products.js`, put photo in `public/images`
- Change home page order: `src/views/user/HomePage.vue`
- Admin demo login: `/admin/login` -> admin@modernstyle.in / admin123

## Notes

- Images: cropped from the reference video and your shop photos. Video photos (hero, lookbook,
  testimonial, white shirt, jeans) are women's-fashion placeholders - replace with your own
  product photos using the same file names.
- Cart is saved in the browser. Orders/admin changes are demo only until the Laravel API is connected.
