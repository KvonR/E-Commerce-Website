# Typescript and React - E-Commerce Site

**Date:** May 3, 2024

## Introduction

This project is a dynamic and reactive e-commerce front-end website built using Typescript and React. It scales and reorders elements to suit the screen size of the device being used, and updates elements of the page without the need for a full reload.

![Screenshot 2024-07-13 131355.png](Typescript%20and%20React%20-%20E-Commerce%20Site%2016e74e78389144db9aa05410e7fbcdf7/Screenshot_2024-07-13_131355.png)

## Features Implemented

### 1. Results Indicator

- **Dynamic Count Display**: Shows the number of search results or products available. Displays:
    - `n Products` if the search bar is empty.
    - `1 Product` if there is only one product.
    - `m Results` if the search query returns multiple products.
    - `No search results found` if no products match the search query.

### 2. Enhanced Search Functionality

- **Sorting Options**: Added functionality to sort the product list by name, price, or rating.
- **In-Stock Filter**: Implemented an "in stock" checkbox to filter the results to show only products with a quantity greater than 0.

### 3. Shopping Basket Management

- **Add to Basket Button**:
    - Displays `Out of stock` and disables the button if the product quantity is 0.
    - Adds products to the shopping basket, increasing the quantity of the relevant item if it's already in the basket.
        
        ![Screenshot 2024-07-13 131243.png](Typescript%20and%20React%20-%20E-Commerce%20Site%2016e74e78389144db9aa05410e7fbcdf7/Screenshot_2024-07-13_131243.png)
        

### 4. Visualizing the Basket

- **Empty Basket Message**: Displays "Your basket is empty" if there are no items in the basket.
- **Basket Item Display**: Each item in the basket is shown with:
    - Product name, price, and quantity.
    - A `Remove` button to decrement the product quantity or remove it from the basket if the quantity reaches 0.
- **Total Cost Calculation**: Shows the total cost of the items in the basket, formatted to two decimal places.

## Product Attributes

Each product has the following attributes:

- **ID**: Unique identifier (integer).
- **Name**: Name of the product.
- **Price**: Price of the product in pounds.
- **Category**: General category of the product.
- **Quantity**: Number of items in stock (non-negative integer).
- **Rating**: Rating of the product (real number between 0 and 5).
- **Image Link**: File location of the promotional image.
