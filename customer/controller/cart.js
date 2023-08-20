// tạo biến global cho giỏ h
var carts = [];

window.onload = function () {
  loadStorage();
};
// Hiển thị dữ liệu từ local Storage
function loadStorage() {
  // check xem có dữ liệu trọng storage ko
  if (localStorage.getItem("cartStorage")) {
    // lấy ra dữ liệu và chuyển về mảng lại
    carts = JSON.parse(localStorage.getItem("cartStorage"));
    displayCart(carts);
  }
}

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
        carts = cartItem;
        // hiển thị ra giỏ  hàng
        displayCart(carts);
        // lưu mảng vào LocalStorage
        localStorage.setItem("cartStorage", JSON.stringify(carts));
      } else {
        // chưa có sản phẩm trong giỏ hàng thì thêm vào giỏ và thêm thuộc tính quantity :1  cho sp

        cartItem.push({ ...item, quantity: 1 });
        carts.push(...cartItem);
        // hiển thị ra giỏ  hàng
        displayCart(carts);
        // lưu mảng vào LocalStorage
        localStorage.setItem("cartStorage", JSON.stringify(carts));
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
                  onclick="handleMinus('${product.id}')"
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
                      onclick="handlePlus('${product.id}')"
                      >
                  <i class="fa-solid fa-plus"></i>
                  </button>
              </div>
             </td>
             <td class="cart-price">${product.price.toLocaleString("it-IT", {
               style: "currency",
               currency: "VND",
             })}</td>
             <td><button class="btn btn-close btn-removecart" onclick="removeItem('${
               product.id
             }')"></button></td>
         </tr>
        
      `
    );
  }, "");

  getElement("#cartList").innerHTML = html;
  getElement(
    "#total"
  ).innerHTML = `<div class="text-danger mt-2"><h3>Tổng: ${totalPrice(
    carts
  ).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  })}</h3></div>`;
}

// ======= Utils =======
function getElement(selector) {
  return document.querySelector(selector);
}

// tăng giá trị quantity khi nhấn nút
let handlePlus = (productId) => {
  let index = carts.findIndex((value) => {
    return value.id === productId;
  });
  carts[index].quantity++;
  displayCart(carts);
};

// giảm giá trị quantity khi nhấn nút
let handleMinus = (productId) => {
  let index = carts.findIndex((value) => {
    return value.id === productId;
  });

  if (carts[index].quantity > 1) {
    carts[index].quantity--;
    displayCart(carts);
  } else {
    // nếu số lượng nhỏ hơn 1 thì xóa khỏi giỏ hàng
    removeItem(productId);
  }
};

function totalPrice(carts) {
  let total = 0;
  for (let i = 0; i < carts.length; i++) {
    total += carts[i].price * carts[i].quantity;
  }
  return total;
}
