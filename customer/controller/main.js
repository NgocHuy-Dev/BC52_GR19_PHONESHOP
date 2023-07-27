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
      <div class="p-3">
        <div class="card p-3" style="width: 18rem; height: 30rem">
          
            <img src="${product.img}" />
          
          <div class="card-body">
            <h5 class="text-center">${product.name}</h5>
            <h4>Giá: ${product.price} VNĐ</h4>
            <p class="card-text">${product.desc}</p>
          </div>
          
            <a href="#" class="btn btn-primary">Thêm vào giỏ hàng</a>
          
        </div>
      </div>
    </div>
    `
    );
  }, "");

  document.getElementById("productList").innerHTML = html;
}
