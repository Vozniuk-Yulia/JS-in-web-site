const data = [
   {
     id:1,
     name: "Chanel Chance",
     img: "images/goodselement.png",
     price:2000,
     catagory: "Chanel",
     volume:"30",
     description:" Зроблено у: Франція, прем'єра аромату: 2010, країна ТМ: Франція, стать: для жінок, класифікація: елітна, тип аромату: фруктові, квіткові",
   },
 
   {
     id:2,
     name: "Miss Dior Eau",
     img: "images/dior.jpg",
     price:3000,
     catagory: "Christian Dior",
     volume:"50",
     description:" Зроблено у: Італія, прем'єра аромату: 2020, країна ТМ: Італія, стать: для жінок, класифікація: елітна, тип аромату: флористичні",
   },
 
   {
     id:3,
     name: "J'adoube Mind Games",
     img: "images/mindMines.jpg",
     price:7200,
     catagory: "Mind Games",
     volume:"30",
     description:" Зроблено у: Франція, прем'єра аромату: 2021, країна ТМ: Франція, стать: для чоловіків, класифікація: елітна, тип аромату: океанічні",
   },
   {
     id:4,
     name: "J'adore L'Absolu",
     img: "images/jadore.jpg",
     price:4536,
     catagory: "Sisters Aroma",
     volume:"100",
     description:" Зроблено у: Іспанія, прем'єра аромату: 2022, країна ТМ: Іспанія, стать: для жінок, класифікація: елітна, тип аромату:пряні",
   },
 ];
 const shoppingCart = [
   {
     id:1,
     productId:1,
     name: "Chanel Chance",
     img: "images/goodselement.png",
     price:2000,
     count:1,
   },
 
   {
     id:2,
     productId:2,
     name: "Miss Dior Eau",
     img: "images/dior.jpg",
     price:3000,
     count:1,
   },
 ];
const selectedJSONProduct = localStorage.getItem('selectedProduct');
selectedProduct = JSON.parse(selectedJSONProduct);
if (selectedProduct) {
   const productDetailsElement = document.getElementById('exactProdDetail');
   productDetailsElement.innerHTML = `
   <div class="col">
   <img class="main prod det" src="${selectedProduct.img}">
  
 </div>
 <div class="col">
     <h1 class="product name" id="prodDName">${selectedProduct.name}
  </h1>
  <h2 class="product price">${selectedProduct.price}</h2>
  <div class="row">
      <div class="col">
         <button class="btn volume">30 мл</button>
      </div>
      <div class="col">
          <button class="btn volume">50 мл</button>
       </div>
       <div class="col">
          <button class="btn volume">100 мл</button>
       </div>
   </div>
   <br>
   <span class="product main txt">
      Характеристика та опис ↓
      <br>
     ${selectedProduct.description}
   </span>
   <br>
   <br>
   <div>
      <button id="buyButton" onclick='addToCart(${selectedProduct.id})' class="btn buy">В кошик</button>
   </div>
  
 </div>
   `;

   localStorage.removeItem('selectedProduct');
 }
//const buyButton = document.getElementById('buyButton');
//const goodsCountSpan = document.getElementById('goodsCount');
//let goodsCount = parseInt(localStorage.getItem('goodsCount')) || 0;

const cartView = document.querySelector(".shoppingbag.page .col.bagList");
function addToCart(choosenProductId)
{

  const choosenProduct = data.find((item) => item.id === choosenProductId);
  const newItem = {

    productId: choosenProductId,
    name: choosenProduct.name,
    img: choosenProduct.img,
    price: choosenProduct.price,
    count: 1, 
  };
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  shoppingCart.push(newItem);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  console.log(shoppingCart);
  window.location.href='shoppingbag.html';
  console.log(shoppingCart);
    
}
function displayCart(carts) {

  const cartView = document.querySelector(".col.bagList");

  if (carts.length > 0) {
     const review_carts = carts
        .map(
           (card) => `
           <div class="shopingbag box">
              <div>
                 <img class="bag photo" src="${card.img}">
              </div>
              <div class="bag content">
                 <h4 class="bag name product">${card.name}</h4>
                 <p>Кількість:<input onchange="countSum(${card.productId})" class="count prod" id="productsCount" value="1"></p>
                 <span id="totalPrice" class="product price bag">${card.price}₴</span>
                 <button  onclick="deleteProduct(${card.productId})" class="btnwithicon">
                 <i class="fa-solid fa-xmark"></i>
                 </button>
              </div>
           </div>
           `
        )
        .join("");
     cartView.innerHTML = review_carts;
  } else {
     cartView.innerHTML = "<h3>Порожня корзина</h3>";
  }
}
const shoppingCartUpdate = JSON.parse(localStorage.getItem("shoppingCart")) || [];
displayCart(shoppingCartUpdate);
function deleteProduct(productId) {
  
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  const productIndex = shoppingCart.findIndex((item) => item.productId === productId);

  if (productIndex !== -1) {
   
    shoppingCart.splice(productIndex, 1);

    
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    displayCart(shoppingCart);
  }
}

function countSum(prodId)
{
   const countInput = document.getElementById('productsCount');
   const priceElement = document.getElementById('totalPrice');
   const choosenProductId = prodId;
   const choosenProduct = shoppingCart.find(item => item.productId=== choosenProductId);
   const count = parseInt(countInput.value);
   const totalPrice = choosenProduct.price * count;
   priceElement.textContent = totalPrice + '₴';
}
