const express = require('express');
const app = express();
const port = 3000;

// Sample product data (in a real application, this would come from a database)
const products = [
    {
        id: 1,
        name: "Smartphone",
        category: "electronics",
        price: 699.99,
        description: "Latest model smartphone with advanced features"
    },
    {
        id: 2,
        name: "Laptop",
        category: "electronics",
        price: 1299.99,
        description: "High-performance laptop for professionals"
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "sports",
        price: 89.99,
        description: "Comfortable running shoes for athletes"
    },
    {
        id: 4,
        name: "Coffee Maker",
        category: "appliances",
        price: 49.99,
        description: "Automatic drip coffee maker"
    }
];

// Middleware to parse JSON bodies
app.use(express.json());

// GET /products - Return all products
app.get('/products', (req, res) => {
    const { category } = req.query;
    
    if (category) {
        const filteredProducts = products.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
        );
        return res.json(filteredProducts);
    }
    
    res.json(products);
});

// GET /products/:id - Fetch a specific product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
});

app.listen(port, () => {
    console.log(`E-Commerce Product Catalog API running at http://localhost:${port}`);
}); 