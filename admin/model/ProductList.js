class ProductList{
    constructor(){
        this.ProductList = []; 
    }


}


ProductList.prototype.searchName = function (keyword) {
    var mangKQ = [];
    //! trim(): xóa khoảng trắng trước và sau đoạn chữ
    // keyword = keyword.trim();
    var keywordLowerCase = keyword.toLowerCase();

    keywordLowerCase = keywordLowerCase.replace(/\s/g, "");

    console.log(keywordLowerCase);
    this.ProductList.map(function(sp) {
        var nameLowerCase = sp.name.toLowerCase().replace(/\s/g, "");
        // nameLowerCase.replace(/\s/g, "");
        if (nameLowerCase.indexOf(keywordLowerCase) > -1) {
            //tìm được sv theo tên
            mangKQ.push(sp);
        }

    });
    return mangKQ;

}

ProductList.prototype.searchfilter = function (keyword) {
    if (keyword != 0){
        var mangKQ = [];
        //! trim(): xóa khoảng trắng trước và sau đoạn chữ
        // keyword = keyword.trim();
        var keywordLowerCase = keyword.toLowerCase();
        keywordLowerCase = keywordLowerCase.replace(/\s/g, "");
        console.log(keywordLowerCase);
        this.ProductList.map(function(sp) {
            var nameLowerCase = sp.type.toLowerCase().replace(/\s/g, "");
            // nameLowerCase.replace(/\s/g, "");
            if (nameLowerCase.indexOf(keywordLowerCase) > -1) {
                //tìm được sv theo tên
                mangKQ.push(sp);
            }

        });
        return mangKQ;
    } else { 
        return mangKQ = this.ProductList;
    }
}