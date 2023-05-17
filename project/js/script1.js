var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    centeredSlides: false,
    slidesPerGroupSkip: 1,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      769: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  const revs = [
     {
       name: "Андрій",
       review: "Парфуми просто супер.",
       img: "images/person.png",
     },
     {
       name: "Анна",
       review: "Розкішні парфуми",
       img: "images/person.png",
     },
     {
        name: "Олекснадра",
        review: "Великий вибір",
        img: "images/person.png",
      },
   ];

   const userReview = document.querySelector(".swiper-wrapper");

   function displayReviews(respons) {
     if (respons.length > 0) {
       const review_list = respons
         .map(
           (product) => `
           <div class="swiper-slide">
             <div class="review box">
               <img class="person img" src="${product.img}">
               <h3 id="personName" class="person name">${product.name}</h3>
               <h4 id="txtReview" class="review txt">${product.review}</h4>
             </div>
           </div>
         `
         )
         .join("");
       userReview.innerHTML = review_list;
     } else {
       userReview.innerHTML = "<h3>No Reviews Available</h3>";
     }
   }

   displayReviews(revs);
function addReview()
{
  let username=document.querySelector("#username");
  let  text=document.querySelector("#rewiewTxt");
  if(username.value==="" || text.value==="")
  {
    alert("Enter username or text");
  }
  if(username.value==="" && text.value==="")
  {
    alert("Enter username or text");
  }
  else if(username.value.length>0 && text.value.length>0)
  {
    const newItem = {
        name: username.value,
        review: text.value,
        img: "images/person.png",
      };

      revs.push(newItem);
      displayReviews(revs);
    username.value="";
    text.value="";
  }
 
}