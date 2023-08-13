let itemCart = [];
getElement("#cartList").innerHTML = `
<h2 class="text-center">Chưa có sản phẩm nào đc chọn<h2/>
`;

function selectItem(productId) {
  apiGetProductById(productId)
    .then((response) => {
      let item = response.data;

      itemCart.push(item);
      console.log(itemCart);
      displayCart(itemCart);
    })
    .catch((error) => {
      console.log(error);
    });
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
             <td width="90px">
             <input
             id="form1"
             min="0"
             name="quantity"
             value="1"
             type="number"
             class="form-control form-control-sm"
           />
             </td>
             <td>${product.price} $</td>
             <td><button class="btn btn-close"></button></td>
         </tr>
        
      `
    );
  }, "");

  document.getElementById("cartList").innerHTML = html;
}
