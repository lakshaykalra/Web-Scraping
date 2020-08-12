const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
   // headless:false 
  });
  const page = await browser.newPage();
  await page.goto('https://www.bcliquorstores.com/product-catalogue?category=wine&sort=name.raw:asc&page=1');
  await page.screenshot({path: 'example.png'});

  const products = await page.evaluate(() => {
    var productName = document.querySelectorAll(`h3.product-name`);
    var productImage = document.querySelectorAll(`img.product-image`);
    var tempArray = [];
    for (var i = 0; i < productName.length; i++) {
      tempArray[i] = {
        productName: productName[i].innerText.trim(),
        productImage:productImage[i].src.trim()
      };
    }
    return tempArray;
  });

   //All products are here -----

   console.log('<<<<<<<',products)

  await browser.close();
})();