# 🌟 David Hobby - Premium Model Figure Showcase

Welcome to **David Hobby**, a professional product showcase platform dedicated to high-quality model figures, Gundam kits, and collectible action figures. Built with the latest web technologies, this platform offers a seamless experience for hobbyists to explore, search, and discover their favorite collectibles.

---

## 🚀 Features

-   **🌍 Multi-language Support (i18n):** Full support for Vietnamese and English, allowing users to browse in their preferred language.
-   **🔍 Advanced Search:** Quickly find products by name or category.
-   **📦 Dynamic Product Catalog:** Browse through various categories like Gundam, Marvel, Anime, and more.
-   **📱 Responsive Design:** Optimized for all devices, from desktop to mobile.
-   **⚡ High Performance:** Leverages Next.js 16 and React 19 for ultra-fast page loads and smooth transitions.
-   **🛠️ Modular Architecture:** Clean and maintainable code using CSS Modules and a component-based structure.

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
-   **Library:** [React 19](https://react.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [CSS Modules](https://github.com/css-modules/css-modules)
-   **Localization:** Custom i18n implementation with middleware and dynamic dictionaries.
-   **Data:** Static JSON-based data management for high speed and simplicity.

---

## 📂 Project Structure

```text
david-hobby/
├── src/
│   ├── app/            # Next.js App Router (Routes & Layouts)
│   │   ├── [lang]/     # Dynamic localization routes
│   │   └── globals.css  # Global styles
│   ├── components/     # Reusable UI components
│   ├── dictionaries/   # i18n JSON files (en, vi)
│   ├── data/           # Static product data (products.json)
│   └── middleware.ts   # Localization routing logic
├── public/             # Static assets (images, icons)
├── generate_data.js    # Utility script for mock data generation
└── package.json        # Project dependencies and scripts
```

---

## 🏁 Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or later recommended).

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/david-hobby.git
cd david-hobby
npm install
```

### 3. Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🛠️ Utilities

### Data Generation

To generate fresh mock data for the product catalog, you can run:

```bash
node generate_data.js
```

This script will update `src/data/products.json` with a randomized list of products across different categories.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve David Hobby, please feel free to fork the repository and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is private and for personal use. All rights reserved.

---

Created with ❤️ by **David Hobby Team**
