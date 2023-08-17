let mainCarts = [];
console.log("ở ngoài", mainCarts);
init();
function init() {
  carts = JSON.parse(localStorage.getItem("newCarts")) || [];
  carts = carts.map((value) => {
    return new Cart(
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
  });
  displayCart(carts);
}

getElement("#cartList").innerHTML = `
<h2 class="text-center">Chưa có sản phẩm nào đc chọn<h2/>
`;

// Hàm chọn sản phẩm thêm vào giỏ hàng
function selectItem(productId) {
  apiGetProductById(productId)
    .then((response) => {
      let item = response.data;
      // let carts = [];
      // kiểm tra xem sp đã có trong giỏ hàng hay chưa
      const found = carts.find((items) => items.id === productId);
      // console.log(item.id);
      // console.log(found);
      console.log(productId);
      if (found) {
        // có sản phẩm trong giỏi hàng thì tang giá trị quantity lên 1 đơn vị
        const newCarts = carts.map((items) => {
          if (item.id === productId) {
            console.log("có rồi");
            return { ...items, quantity: (items.quantity += 1) };
          }
          return items;
        });

        displayCart(newCarts);
        console.log("newCart", newCarts);
        // console.log(newCarts);
      } else {
        // chưa có sản phẩm trong giỏ hàng thì thêm vào giỏ và thêm thuộc tính quantity :1  cho sp
        console.log("chưa có");
        carts.push({ ...item, quantity: 1 });
        mainCarts.push({ ...item, quantity: 1 });
        displayCart(carts);
        console.log("cart", carts);
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
  displayCart(carts);
}

// Hàm reset giỏ hàng
function resetCart() {
  getElement("#cartList").innerHTML = "Giỏ hàng trống";
  getElement("#total").innerHTML = ``;
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
                    id="quantityInput"
                    value="${product.quantity}"
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

  getElement("#cartList").innerHTML = html;
  getElement("#total").innerHTML = `<h3>Tổng: 123 </h3>`;
}

// ======= Utils =======
function getElement(selector) {
  return document.querySelector(selector);
}

// tăng giảm số lượng sản phẩm trong giỏ hàng

// let quantity = getElement("#quantityInput").value;

// let handlePlus = () => {
//   quantity++;
//   getElement("#quantityInput").value = quantity;
// };

// let handleMinus = () => {
//   if (quantity > 1) quantity--;
//   getElement("#quantityInput").value = quantity;
// };

// tính tổng
function tital() {}
