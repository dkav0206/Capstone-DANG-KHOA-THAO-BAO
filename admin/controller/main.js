const productSer = new ProductService();
const productList = new ProductList();
const validation = new Validation();

productSer.getProductList();

const initList = () => { 
    var axiosResult = productSer.getProductList();
    axiosResult.then(function(result){
        //Resolve (thành công) 
        // console.log(result);
        productList.ProductList = result.data;
    }).catch(function(error){
        //Reject (Thất bại)
        console.log(error)
    })
}

initList();



function showTable(arrayData){
    var content = "";

    arrayData.map(function (product, index) {
        var trELE = `<tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString()}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}<br/>${product.frontCamera}</td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
                <button onclick="deleteProduct('${product.id}')"   class="btn btn-danger"  >Xóa</button>
                <button data-toggle="modal" data-target="#myModal" onclick="showProductDetail('${product.id}')"      class="btn btn-info" >Xem</button>
            </td>
        </tr>`

        content += trELE;
    });


    document.querySelector("#tableDanhSach").innerHTML = content;
}


function showProductList(){
    //hiển thị danh sách khi thành công. Ngược lại báo lỗi khi thất bại 

    var axiosResult = productSer.getProductList();
    axiosResult.then(function(result){
        //Resolve (thành công) 
        // console.log(result);
        console.log(result.data);
        showTable(result.data);
    }).catch(function(error){
        //Reject (Thất bại)
        console.log(error)
    })
}

showProductList();

function addProduct(){
    //lấy dữ liệu từ form 
    var name = document.querySelector("#name").value;
    var price = document.querySelector("#price").value;
    var screen = document.querySelector("#screen").value;
    var backCamera = document.querySelector("#backCamera").value;
    var frontCamera = document.querySelector("#frontCamera").value;
    var img = document.querySelector("#img").value;
    var desc = document.querySelector("#desc").value;
    var type = document.querySelector("#type").value;
    console.log(type);

    var isValid = true;


    isValid &= validation.checkEmpty(name, "tbName", "Tên sản phẩm không để trống!");

    //price: có dữ liệu ko, đúng định dạng không

    isValid &= validation.checkEmpty(price, "tbPrice", "Giá tiền không để trống!") && validation.checkPrice(price, "tbPrice", "Giá tiền phải lớn hơn 0");


    //screen:  Không được trống
    isValid &= validation.checkEmpty(screen, "tbScreen", "Màn hình không để trống!");

    //backCamera: Không được trống
    isValid &= validation.checkEmpty(backCamera, "tbBackCamera", "Camera sau không để trống!");

    //frontCamera: Không được trống
    isValid &= validation.checkEmpty(frontCamera, "tbFrontCamera", "Camera trước chưa hợp lệ!");

    //img: Không được trống

    isValid &= validation.checkEmpty(img, "tbImg", "Hình ảnh không để trống!");

     //desc: Không được trống
    isValid &= validation.checkEmpty(desc, "tbDesc", "Mô tả không để trống!");

     //type: Không được trống
    isValid &= validation.checkSelect("type", "tbType", "Lựa chọn không hợp lệ!");

    //Tạo đối tượng sản phẩm
    
   

    if (isValid){
        var product = new Product(name,price,screen,backCamera,frontCamera,img,desc,type);
        console.log(product);
    
        //Truyền xuống BE
        productSer.addProductSer(product)
        .then(function(result){
            console.log(result);
    
            //lấy thành công
            alert("Cập nhật thành công");
            document.querySelector("#formProduct").reset();
            $('#myModal').modal('hide');

            showProductList();
        }).catch(function(error){
            console.log(error);
        })

        
        
        //hiển thị danh sách 
    }
   
}

document.querySelector("#btnThem").onclick = () => {
    document.querySelector("#myModal .modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="addProduct()" >Add Product</button>
    <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal" >Đóng</button>
    `;

    document.querySelector("#formProduct").reset();
};


function deleteProduct(id){
    console.log(id);
    productSer.deleteProductSer(id)
    .then(function(result){
        console.log(result.data);
        showProductList();
    }).catch(function(error){
        console.log(error)
    })
}


function showProductDetail(id){
    console.log(id);
    productSer.getProductItem(id)
    .then(function(result){
        console.log(result.data)
        document.querySelector("#name").value = result.data.name;
        document.querySelector("#price").value = result.data.price;
        document.querySelector("#screen").value = result.data.screen;
        document.querySelector("#backCamera").value = result.data.backCamera;
        document.querySelector("#frontCamera").value = result.data.frontCamera;
        document.querySelector("#img").value = result.data.img;
        document.querySelector("#desc").value = result.data.desc;
        document.querySelector("#type").value = result.data.type;

        document.querySelector("#myModal .modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="updateProduct('${result.data.id}')" >Update Product</button>
            <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal" >Đóng</button>
            `
        //hiển thị lên form
    }).catch(function(error){
        console.log(error);
    })
}


function updateProduct(id) {
    console.log(id);
    //Lấy dữ liệu từ form
    var name = document.querySelector("#name").value;
    var price = document.querySelector("#price").value;
    var screen = document.querySelector("#screen").value;
    var backCamera = document.querySelector("#backCamera").value;
    var frontCamera = document.querySelector("#frontCamera").value;
    var img = document.querySelector("#img").value;
    var desc = document.querySelector("#desc").value;
    var type = document.querySelector("#type").value;

    var isValid = true;


    isValid &= validation.checkEmpty(name, "tbName", "Tên sản phẩm không để trống!");

    //price: có dữ liệu ko, đúng định dạng không

    isValid &= validation.checkEmpty(price, "tbPrice", "Giá tiền không để trống!") && validation.checkPrice(price, "tbPrice", "Giá tiền phải lớn hơn 0");


    //screen:  Không được trống
    isValid &= validation.checkEmpty(screen, "tbScreen", "Màn hình không để trống!");

    //backCamera: Không được trống
    isValid &= validation.checkEmpty(backCamera, "tbBackCamera", "Camera sau không để trống!");

    //frontCamera: Không được trống
    isValid &= validation.checkEmpty(frontCamera, "tbFrontCamera", "Camera trước chưa hợp lệ!");

    //img: Không được trống

    isValid &= validation.checkEmpty(img, "tbImg", "Hình ảnh không để trống!");

     //desc: Không được trống
    isValid &= validation.checkEmpty(desc, "tbDesc", "Mô tả không để trống!");

     //type: Không được trống
    isValid &= validation.checkSelect("type", "tbType", "Lựa chọn không hợp lệ!");

    if(isValid){
        //tạo đối tương productUpdate
        var productUpdate = new Product(name,price,screen,backCamera,frontCamera,img,desc,type);
        console.log(productUpdate);

        //Tương tác với BE để update
        productSer.updateProductSer(productUpdate, id)
        .then(function (result) {
            console.log(result.data);
            //Hiển thị lại table
            showProductList();

            alert("Cập nhật thành công");

            $('#myModal').modal('hide');

        })
        .catch(function (error) {
            console.log(error);
        })

    }

}

document.querySelector("#searchName").onkeyup = function(){
    var keyword = document.querySelector("#searchName").value;
    var mangKQ = productList.searchName(keyword);
    showTable(mangKQ);
}

document.querySelector("#SapXepTang").addEventListener("click", function(){
    var keyword = document.querySelector("#searchName").value;
    var mangKQ = productList.searchName(keyword);
    mangKQ.sort(function(a, b) { 
        return a.price - b.price;
    })
    showTable(mangKQ);
})

document.querySelector("#SapXepGiam").addEventListener("click", function(){
    var keyword = document.querySelector("#searchName").value;
    var mangKQ = productList.searchName(keyword);
    mangKQ.sort(function(a, b) { 
        return b.price - a.price ;
    })
    showTable(mangKQ);
})

