// tạo biến global cho giỏ h
var carts = [];

console.log("carts global", carts);

window.onload = function () {
  loadStorage();
};
// Hiển thị dữ liệu từ local Storage
function loadStorage() {
  if (localStorage.getItem("cartStorage")) {
    carts = JSON.parse(localStorage.getItem("cartStorage"));
    displayCart(carts);
  }
}
// chưa ổn ?????????????????????????????
// thêm sản phẩn thì chưa cập nhật được số lượng bị reset giỏ hàng mới

getElement("#cartList").innerHTML = `
<h2 class="text-center">Chưa có sản phẩm nào đc chọn<h2/>
`;

// Hàm chọn sản phẩm thêm vào giỏ hàng
function selectItem(productId) {
  apiGetProductById(productId)
    .then((response) => {
      let item = response.data;
      // kiểm tra xem sp đã có trong giỏ hàng hay chưa
      const found = carts.find((items) => items.id === productId);

      let cartItem = [];
      if (found) {
        // có sản phẩm trong giỏi hàng thì tang giá trị quantity lên 1 đơn vị
        cartItem = carts.map((item) => {
          if (item.id === productId) {
            console.log("có rồi");
            return { ...item, quantity: (item.quantity += 1) };
          }
          return item;
        });
        // hiển thị ra giỏ  hàng
        displayCart(carts);
        // lưu mảng vào LocalStorage
        localStorage.setItem("cartStorage", JSON.stringify(carts));
        console.log(" tồn tại");
        console.log("mảng mới", carts);
      } else {
        // chưa có sản phẩm trong giỏ hàng thì thêm vào giỏ và thêm thuộc tính quantity :1  cho sp
        console.log("chưa có");

        cartItem.push({ ...item, quantity: 1 });
        carts.push(...cartItem);
        // hiển thị ra giỏ  hàng
        displayCart(carts);
        // lưu mảng vào LocalStorage
        localStorage.setItem("cartStorage", JSON.stringify(carts));
        console.log("cart", carts);
      }
      changeQuantity(productId);
    })
    .catch((error) => {
      console.log(error);
    });
}

function changeQuantity(event) {
  let quantity = event.target.value;
  let price = event.target.parentElement.nextElement;
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(itemId) {
  carts = carts.filter((value) => {
    return value.id !== itemId;
  });
  // Lưu lại storage
  localStorage.setItem("cartStorage", JSON.stringify(carts));
  displayCart(carts);
}

// Hàm reset giỏ hàng
function resetCart() {
  getElement("#cartList").innerHTML = "Giỏ hàng trống";
  getElement("#total").innerHTML = ``;
  localStorage.clear();
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
      value.type,
      value.quantity
    );
    console.log(value.name);
    console.log(value.quantity);

    return (
      result +
      `
        <tr class="cart-row">
            <td><img src="${product.img}" width="90px" height="90px" /></td>
            <td class="cart-item" id="name">${product.name}</td>
             <td width="100px">
              <div class="quantity d-flex">
                <button 
                  id="btn-countDown"
                  class="btn-quantity"
                  
                  >
                  <i class="fa-solid fa-minus"></i>
                   </button>
                   <input 
                    class="w-50 text-center cart-quantity-input"
                    type="" 
                    name="quantity" 
                    id="quantityInput"
                    value="${product.quantity}"
                    />
                    
                    <button
                      id="btn-countUp"
                      class="btn-quantity"
                      
                      >
                  <i class="fa-solid fa-plus"></i>
                  </button>
              </div>
             </td>
             <td class="cart-price">${product.price} $</td>
             <td><button class="btn btn-close btn-removecart" onclick="removeItem('${product.id}')"></button></td>
         </tr>
        
      `
    );
  }, "");

  getElement("#cartList").innerHTML = html;
}

// ======= Utils =======
function getElement(selector) {
  return document.querySelector(selector);
}

// tăng giảm số lượng sản phẩm trong giỏ hàng

let quantity = getElement("#quantityInput").value;

let handlePlus = () => {
  quantity++;
  getElement("#quantityInput").value = quantity;
};

let handleMinus = () => {
  if (quantity > 1) quantity--;
  getElement("#quantityInput").value = quantity;
};

// duyệt mảng giỏ hàng truyền vào id
function changeQuantity(Id) {
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].id === Id) {
      getElement("#btn-countUp").onclick = () => {
        carts[i].quantity += 1;
      };
    }
  }
}
