import ProductLog from "../models/productlog.model.js";
import {v4 as uuidv4} from 'uuid'


export const createProductLog = async (req, res, next) => {
    const {referenceId, cart} = req.body; // Expecting the cart as an array in the request body

    console.log("Received cart data:", JSON.stringify(cart, null, 2)); // Log incoming cart

    // Validate that the cart is an array and not empty
    if (!Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ success: false, message: "Cart must be a non-empty array." });
    }

    // Validate that each cart item has the required fields
    const missingFields = cart.map((item, index) => {
        const errors = [];
        if (!item._id) errors.push("_id"); // Use _id as productId
        if (!item.productName) errors.push("productName");
        if (!item.productImage) errors.push("productImage");
        if (!item.quantity) errors.push("quantity");
        if (!item.productPrice) errors.push("productPrice");
        if (!item.numberOfProductsAvailable) errors.push("numberOfProductsAvailable");
        return errors.length > 0 ? { index, errors } : null;
    }).filter(Boolean);

    if (missingFields.length > 0) {
        return res.status(400).json({ 
            success: false, 
            message: "The following items are missing required fields.",
            missingFields 
        });
    }

    try {
        // Create a new product log entry that includes the entire cart
        const newProductLog = new ProductLog({ 
            referenceId,
            items: cart.map(item => ({
            productId: item._id, // Use _id as productId
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            productPrice: item.productPrice,
            numberOfProductsAvailable: item.numberOfProductsAvailable
        })) });

        // Save the product log entry
        const savedProductLog = await newProductLog.save();

        // Respond with the created product log
        res.status(201).json({ success: true, data: savedProductLog });
    } catch (error) {
        console.error("Error saving product log:", error); // Log the error
        next(error); // Pass the error to the error handler
    }
};