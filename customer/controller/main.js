// =========================================

// =========================================

getProducts();

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
    console.log(product.price);
    return (
      result +
      `
      <div class="col-3">
      <div class="main-card p-3">
        <div class="card p-3">
          
            <img src="${product.img}" />
          
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
                
                  
                  <a href="#" class="btn btn-primary btn-add">Thêm vào giỏ hàng</a>
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
