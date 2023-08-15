let itemCart = [];
getElement("#cartList").innerHTML = `
<h2 class="text-center">Chưa có sản phẩm nào đc chọn<h2/>
`;

// Hàm chọn sản phẩm thêm vào giỏ hàng
function selectItem(productId) {
  apiGetProductById(productId)
    .then((response) => {
      let item = response.data;
      let cartItem = { ...item, quantity: 1 };

      // for (cartItem in itemCart) {
      //   console.log("có rồi má");
      // }
      itemCart.push(cartItem);
      displayCart(itemCart);
      console.log(itemCart);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(itemId) {
  itemCart = itemCart.filter((value) => {
    return value.id !== itemId;
  });
  displayCart(itemCart);
}

// Hàm reset giỏ hàng
function resetCart() {
  getElement("#cartList").innerHTML = "Giỏ hàng trống";
}

function displayCart(products) {
  let html = products.reduce((result, value) => {
    let product = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );

    return (
      result +
      `
        <tr>
            <td><img src="${product.img}" width="90px" height="90px" /></td>
            <td>${product.name}</td>
             <td width="100px">
              <div class="quantity d-flex">
                <button 
                  id="btn-countDown"
                  class="btn-quantity"
                  onclick="handleMinus()"
                  >
                  <i class="fa-solid fa-minus"></i>
                   </button>
                   <input 
                    class="w-50 text-center"
                    type="text" 
                    name="quantity" 
                    id="quantity-input"
                    value="1"
                    />
                    <button
                      id="btn-countUp"
                      class="btn-quantity"
                      onclick="handlePlus()"
                      >
                  <i class="fa-solid fa-plus"></i>
                  </button>
              </div>
             </td>
             <td>${product.price} $</td>
             <td><button class="btn btn-close" onclick="removeItem('${product.id}')"></button></td>
         </tr>
        
      `
    );
  }, "");

  document.getElementById("cartList").innerHTML = html;
}

// ======= Utils =======
function getElement(selector) {
  return document.querySelector(selector);
}

// tăng giảm số lượng sản phẩm trong giỏ hàng

let quantity = getElement("#quantity-input").value;

let handlePlus = () => {
  quantity++;
  getElement("#quantity-input").value = quantity;
};

let handleMinus = () => {
  if (quantity > 1) quantity--;
  getElement("#quantity-input").value = quantity;
};
