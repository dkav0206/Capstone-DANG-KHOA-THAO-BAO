// function checkID(params) {
//     fdsghjd
// }

class Validation {
    //phương thức kiểm tra
    //input: valueInput , spanID , message
    //output: đúng true , sai false
    checkEmpty = (valueInput, spanID, message) => {
        if (valueInput == "") {
            //không hợp lệ
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }

        //hợp lệ
        document.getElementById(spanID).style.display = "none";
        document.getElementById(spanID).innerHTML = "";
        return true
    }

    checkID = (valueInput, spanID, message, mang) => {
        // some(): trả về true / false (kiểm tra điều kiện nào đó trong mảng)
        var isExist = false; //? giả sử chưa có mã

        //? kiểm chứng mã có trong mảng chưa
        isExist = mang.some(function (sp) {
            return valueInput === sp.id
        });

        if (isExist) {
            //! đã tồn tại mã sinh viên => không hợp lệ
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false

        } else {
            //? mã không trùng => hợp lệ
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

    }

    checkName = (valueInput, spanID, message) => {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/

        // test(), match()
        if (valueInput.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

        //không hợp lệ
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false
    }

    checkSelect = (selectID, spanID, message) => {
        var indexOption = document.getElementById(selectID).value;

        if (indexOption !== "Chọn Loại Sản Phẩm") {
            //hợp lệ
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }


        //không hợp lệ
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false

    }


    checkPrice =  (valueInput, spanID, message) => {
        //var pattern = /^(\d{1,2}(\.\d{1,2})?)$/;

        if (valueInput > 0) {
            //hợp lệ

            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

        //không hợp lệ
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false


    }

}