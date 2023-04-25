# E-Commerce API

This is an E-Commerce API built with Node.js, Express, and MySQL. It provides endpoints for managing products, orders, and order items.

## Getting Started

### Prerequisites

To run this project, you need to have the following installed on your machine:

- Node.js
- MySQL

### Installation

1. Clone this repository:

```
git clone https://github.com/Aum3010/ecommerce-api.git
```
2. Navigate into the cloned repository:
```
cd ecommerce-api
```
3. Install the dependencies:

```
npm install
```

4. Create a `.env` file at the root of the project with the following content:

```
DB_HOST=your-mysql-host
DB_USER=your-mysql-username
DB_PORT=your-mysql-port
DB_PASSWORD=your-mysql-password
DB_DATABASE=your-mysql-database
```

Replace the placeholders with your MySQL database information.

5. Create the necessary tables in your MySQL database by running the following command:

```
npm run create-tables
```

### Usage

To start the server, run the following command:

```
npm run dev
```

You can then access the API at `http://localhost:3000`.

### Testing

To test the API endpoints, open `http://localhost:3000/api-docs` in your browser to access the Swagger UI.

## Endpoints

The API provides the following endpoints:

### Products

- `GET /api/products` - Retrieves a list of all products
- `GET /api/products/:id` - Retrieves a specific product by ID
- `POST /api/products` - Creates a new product
- `PUT /api/products/:id` - Updates an existing product by ID
- `DELETE /api/products/:id` - Deletes a product by ID

### Orders

- `GET /api/orders` - Retrieves a list of all orders
- `GET /api/orders/:id` - Retrieves a specific order by ID
- `POST /api/orders` - Creates a new order
- `PUT /api/orders/:id` - Updates an existing order by ID
- `DELETE /api/orders/:id` - Deletes an order by ID

### Order Items

- `GET /api/order-items` - Retrieves a list of all order items
- `GET /api/order-items/:orderId/:productId` - Retrieves a specific order item by order ID and product ID
- `POST /api/order-items` - Creates a new order item
- `PUT /api/order-items/:orderId/:productId` - Updates an existing order item by order ID and product ID
- `DELETE /api/order-items/:orderId/:productId` - Deletes an order item by order ID and product ID

## Built With

- Node.js
- Express
- MySQL

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
