# guayo-instagram-auto

Automatically create 4 images for Guayo with background and discount banner after receiving a POST request. Recieve email with pictures and Instagram text.

## Installation
1. Install [ImageMagick](https://imagemagick.org/index.php)
2. Download or clone the repository
3. Run `npm install`
4. Set environment variables for emailer: EMAIL and PASSWORD

## Usage
1. Run `npm start`
2. Send POST request to "/"

## Example
Sample POST request
```
{
    "image": "https://i.imgur.com/EH2lAFf.png",
    "promotionPrice": 70000,
    "refPrice": 160000,
    "companyName": "Company Name",
    "productName": "Product Name",
    "to": "user@email.com",
    "productDescription": "Product Description",
    "companyDescription": "Company Description"
}
```

## Available

Running on Heroku server
`https://guayo-auto.herokuapp.com/`
