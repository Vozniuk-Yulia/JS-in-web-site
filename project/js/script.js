
function countSum()
{
  let count=document.querySelector("#productsCount");
  totalPrice.innerHTML=count.value*2000+"$";
}

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
const productsContainer = document.querySelector(".row.cards");
const categoryList = document.querySelector(".producerfilter");
const volumeList = document.querySelector(".volumefilter");
const productsDetail=document.querySelector(".product.page");
//const userReview=document.querySelector(".swiper-wrapper");
function displayReviews(revs)
{
  if (revs.length > 0) {
    const review_list = revs
      .map(
        (product) => `
        <div class="swiper-slide">
                    <div class="review box">
                        <img class="person img" src="${product.img}">
                        <h3 id="personName" class="person name">${product.name}</h3>
                        <h4 id="txtReview" class="review txt"></h4>
                    </div>
                </div>
        `
      )
      .join("");
      userReview.innerHTML = review_list;
  } else {
    userReview.innerHTML = "<h3>No Products Available</h3>";
  }
}
function displayProducts(products) {
    if (products.length > 0) {
      const product_details = products
        .map(
          (product) => `
           <div class="col">
            <div class="catalog card" id="${product.id}">
               <img src="${product.img}" alt="" />
               <span class="product info">${product.name}</span>
               <div class="row additional">
                    <div class="col price">
                        <span class="txt price">${product.price}</span>
                    </div>
                        <div class="col">
                            <button id="detbut" onclick="showProductDetail(${product.id})" class="btnwithicon">
                            <i class="fa-solid fa-bag-shopping"></i>
                            </button>
                        </div>
                </div>
            </div>
           </div>`
        )
        .join("");
  
      productsContainer.innerHTML = product_details;
    } else {
      productsContainer.innerHTML = "<h3>No Products Available</h3>";
    }
  }
  const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector(".priceValue");

function setPrices() {
  const priceList = data.map((product) => product.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);
  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceValue.textContent = maxPrice;
 
  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = e.target.value;
    displayProducts(data.filter((product) => product.price <= e.target.value));
  });
}
function filterProducts() {
  const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map((checkbox) => checkbox.value);
  
  const filteredProducts = data.filter((product) => {
    return selectedCategories.includes(product.catagory) || selectedCategories.length === 0;
  });
  
  displayProducts(filteredProducts);
}
function filterProductsByVolume() {
  const selectedVolume = document.querySelector('input[name="volumeChoice"]:checked').value;
  
  const filteredProducts = data.filter((product) => {
    return selectedVolume === "all" || product.volume === selectedVolume;
  });
  
  displayProducts(filteredProducts);
}
function setCategories() {
  const allCategories = data.map((product) => product.catagory);
  //console.log(allCategories);
  const catagories = [
    ...allCategories.filter((product, index) => {
      return allCategories.indexOf(product) === index;
    }),
  ];
  //console.log(catagories);
  categoryList.innerHTML = catagories.map((catagory) => 
  `
  <label class="container">
    <span class="checkmark"></span>
    <input type="checkbox" onchange="filterProducts()" value="${catagory}">
    ${catagory}
  </label>`).join("");
  
  categoryList.addEventListener("change", filterProducts);


}
function setVolume()
{
  const allVolumes = data.map((product) => product.volume);
  //console.log(allCategories);
  const volumes = [
    ...allVolumes.filter((product, index) => {
      return allVolumes.indexOf(product) === index;
    }),
  ];
  volumeList.innerHTML = volumes.map((volume) => 
  `
  <label class="container">
    <span class="checkmark"></span>
    <input type="radio" name="volumeChoice" onchange="filterProductsByVolume()" value="${volume}">
    ${volume}
  </label>`).join("");
  
  volumeList.addEventListener("change", filterProductsByVolume);
}

  displayProducts(data);
  setPrices();
  setCategories();
  setVolume();
  displayReviews(data);


function showProductDetail(productId)
{
  const product = data.find((item) => item.id === productId);
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'product.html';
}
