class ProductService { 
    getProductList = () => { 
        return axios({
            method:'get',
            url: 'https://6420435982bea25f6dfd4aed.mockapi.io/Products',
        })
    }   

    addProductSer = (product) => {
        return axios({
            method: 'post',
            url: 'https://6420435982bea25f6dfd4aed.mockapi.io/Products',
            data: product
        })
    }

    //Xóa sản phẩm 
    deleteProductSer = (id) => {
        return axios({
            method: 'delete',
            url: `https://6420435982bea25f6dfd4aed.mockapi.io/Products/${id}`,
        })
    }

    getProductItem = (id) => {
        return axios({
            method: 'get',
            url: `https://6420435982bea25f6dfd4aed.mockapi.io/Products/${id}`,
        })
    }

    updateProductSer = (productUpdate,id) => {
        return axios({
            method: 'put',
            url: `https://6420435982bea25f6dfd4aed.mockapi.io/Products//${id}`,
            data: productUpdate
        })
    }

}