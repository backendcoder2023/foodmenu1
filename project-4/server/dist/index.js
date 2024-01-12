"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
const sharp = require("sharp");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Middleware to resize images
app.use("/images", (req, res, next) => {
    const imagePath = path.join(__dirname, "../public/images", req.url);

    // Set the desired width and height for resizing
    const width = 150;
    const height = 100;

    sharp(imagePath)
        .resize({ width, height })
        .toBuffer()
        .then((data) => {
            res.setHeader("Content-Type", "image/png");
            res.send(data);
        })
        .catch(next);
});

app.get("/", (req, res) => {
    const foodData = [
        {
            name: "Boiled Egg",
            price: 10,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/egg.png",
            type: "breakfast",
        },
        {
            name: "Vadapav",
            price: 10,
            text: "Vada pav is always seen on a Mumbai street and is something that everyone who visits the city must have.",
            image: "/images/vadapav.avif",
            type: "breakfast",
        },
        {
            name: "Momos",
            price: 10,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/momos.jpg",
            type: "breakfast",
        },
        {
            name: "RAMEN",
            price: 25,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/ramen.png",
            type: "lunch",
        },
        {
            name: "GRILLED CHICKEN",
            price: 45,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/chicken.png",
            type: "dinner",
        },
        {
            name: "Barbeque",
            price: 25,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/BBQ.jpg",
            type: "dinner",
        },
        {
            name: "CAKE",
            price: 18,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/cake.png",
            type: "breakfast",
        },
        {
            name: "BURGER",
            price: 23,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/burger.png",
            type: "lunch",
        },
        {
            name: "PANCAKE",
            price: 25,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            image: "/images/pancake.png",
            type: "dinner",
        },
    ];

    res.json(foodData);
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
