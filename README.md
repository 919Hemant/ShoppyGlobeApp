# ShoppyGlobe: E-commerce Application

ShoppyGlobe is a modern e-commerce application built using **React.js**. It demonstrates various React features, including component-based architecture, state management with Redux Toolkit, React Router for navigation, and dynamic data fetching. The project is designed to showcase a functional, responsive, and user-friendly e-commerce interface.

---

## Key Features

- **Homepage**: Displays a list of products fetched dynamically from the DummyJSON API.
- **Product Details**: View detailed information about a selected product.
- **Shopping Cart**: Add, remove, or update items in your cart.
- **Search Functionality**: Filter products by name, description, category, or brand.
- **Checkout Process**: Complete user-friendly checkout flow.
- **Lazy Loading**: Performance optimization with React.lazy and Suspense.
- **Routing**: Seamless navigation between pages with React Router.
- **Error Handling**: Gracefully handles API request failures with custom hooks.
- **Responsive Design**: Optimized for various screen sizes with custom CSS.

---

## Tech Stack

- **Frontend**: React.js with React Router v6
- **State Management**: Redux Toolkit (with slices, actions, and selectors)
- **UI Components**: Material UI (MUI) for enhanced UI elements
- **Styling**: Tailwind CSS and custom CSS modules
- **Build Tool**: Vite for fast development and optimized production builds
- **API**: Data fetched from [DummyJSON](https://dummyjson.com/products) API

---

## Project Structure

The application follows a modular component architecture:

- `App.jsx`: Main component with Router configuration
- `components/`:
  - `Header`: Navigation bar with cart icon and menu
  - `Body`: Landing page with featured content
  - `ProductList`: Displays the catalog of products
  - `ProductDetails`: Detailed view of a single product
  - `Cart`: Shopping cart management interface
  - `Checkout`: Order completion process
  - `NotFound`: 404 error page for unknown routes
- `utils/`:
  - `appStore.js`: Redux store configuration
  - `cartSlice.js`: Redux slice for cart state management
  - `useProductList.js`: Custom hook for product data fetching with search and filtering
  - `useProductDetails.js`: Custom hook for single product details

---

## How to Run the Project

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone or download the repository to your local machine

2. Navigate into the project directory:
   ```
   cd ShoppyGlobe
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```



