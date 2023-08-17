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
      <div class="base-card">
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

  getElement("#productList").innerHTML = html;
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

// CÁC CHỨC NĂNG CHO GIỎ HÀNG
