getProducts();
// lấy và hiển thị sản phẩm ra giao diện
function getProducts() {
  apiGetProducts()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      display(response.data);
      // console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectItem(productId) {
  apiGetProductById(productId)
    .then((response) => {
      let product = response.data;
      displayCart(product);
    })
    .catch((error) => {
      console.log(error);
    });
}
// Hàm hiển thị data ra giao diện
function display(products) {
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
      <div class="col-3">
      <div class="main-card p-3">
        <div class="card p-3">
          
            <img src="${product.img}" width="254px" height="254px" />
          
          <div class="card-body">
            <h5 class="text-center">${product.name}</h5>
            <h4>Giá: ${product.price} VNĐ</h4>
            <p class="card-text">${product.desc}</p>
          </div>
          
          
          <div class="overlay">
                <div class="product-text">
                <h5>Màn hình: <span>${product.screen}</span></h5>
                <h5>Camera trước: <span>${product.frontCamera}</span></h5>
                <h5>Camera sau: <span>${product.backCamera}</span></h5>
                
                  
                  <a href="#" class="btn btn-primary" onclick="selectItem('${product.id}')">Thêm vào giỏ hàng</a>
                </div>
                
              </div>
        </div>
        
      </div>
    </div>
    `
    );
  }, "");

  document.getElementById("productList").innerHTML = html;
}

// Hàm hiển thị sản phẩm vào giỏ hàng
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
      <td>${product.img}</td>
      <td>${product.type}</td>
      <td>
        <input
          id="form1"
          min="0"
          name="quantity"
          value="1"
          type="number"
          class="form-control form-control-sm"
        />
      </td>
      <td>${product.price}</td>
      <td><button class="btn btn-close"></button></td>
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

// Chức năng lọc sản phẩm theo loại
let searchTypeArr = [];
function changeTypeOfPhone() {
  apiGetProducts()
    .then((response) => {
      let phoneArr = response.data;
      let typePhone = getElement("#searchType").value.toLowerCase();
      searchTypeArr = [];
      for (let index = 0; index < phoneArr.length; index++) {
        if (phoneArr[index].type.toLowerCase() === typePhone) {
          searchTypeArr.push(phoneArr[index]);
          display(searchTypeArr);
        }
      }
      if (searchTypeArr.length === 0) {
        if (typePhone === "all brands") {
          display(response.data);
        } else {
          getElement("#productList").innerHTML = `
          <div class="col-12">
          <h2>Không có điện thoại ${typePhone} nào ở đây! </h2>
          <h3>Đợi sốp nhập thêm hàng nhé! Mãi Iu</h3>
          </div>
          `;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// Chức năng thêm sản phẩm vào giỏ hàng
let cart = [];
function addToCart() {
  apiGetProductById(productId).then((response) => {
    let product = response.data;
  });
}
