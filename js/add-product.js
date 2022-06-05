const productNameInput = document.querySelector("#product-name");
const saveButton = document.querySelector(".nav > button");
const productPriceInput = document.querySelector("#product-price");
const warningTextList = document.querySelectorAll(".warning-text");
const productUrlInp = document.querySelector("#product-link");
const inpImage = document.querySelector("#real-input");
const imgBox = document.querySelector(".img-box");
const backBtn = document.querySelector(".btn-back");
const productId = location.href.split("=")[1];
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("Token");
const accountName = localStorage.getItem("accountName");

// 뒤로가기 버튼
backBtn.addEventListener("click", () => {
    history.back();
});

// 업로드 할 상품 이미지 미리보기

function readImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewImage = document.querySelector(".img-box");
            previewImage.setAttribute("width", "322px");
            previewImage.setAttribute("height", "204px");
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById("real-input").addEventListener("change", (e) => {
    readImage(e.target);
});

// 상품명 유효성 검사

productNameInput.addEventListener("input", () => {
    const isProductNameInputValid = () => {
        const productName = productNameInput.value;
        if (productName.length < 2 || 15 < productName.length) {
            return false;
        }
        return true;
    };

    if (!isProductNameInputValid()) {
        warningTextList[0].classList.remove("invisible");
        if (productNameInput.value === "") {
            warningTextList[0].classList.add("invisible");
        }
    } else {
        warningTextList[0].classList.add("invisible");
    }
    uploadBtnCheck();
});

// 상품 가격 유효성 검사

productPriceInput.addEventListener("input", checkMoney);

function checkMoney() {
    const price = productPriceInput.value;

    const isPriceValid = () => {
        const reg1 = /[0-9]/g;
        const isValid = reg1.test(price);
        console.log(isValid); // 숫자일때 true출력
        return isValid;
    };

    if (isPriceValid()) {
        const productPrice = Number(price.split(",").join(""));
        const productPriceLocale = productPrice.toLocaleString();
        productPriceInput.value = productPriceLocale;
        warningTextList[1].classList.add("invisible");
    } else if (productPriceInput.value === "") {
        warningTextList[1].classList.add("invisible");
    } else {
        warningTextList[1].classList.remove("invisible");
    }
    uploadBtnCheck();
}

productUrlInp.addEventListener("input", () => {
    uploadBtnCheck();
});

// 버튼 활성화

function uploadBtnCheck() {
    if (
        productNameInput.value &&
        productPriceInput.value &&
        productUrlInp.value
    ) {
        saveButton.disabled = false;
        saveButton.classList.add("active");
    } else {
        saveButton.disabled = true;
        saveButton.classList.remove("active");
    }
}

async function imageUpload(files, index) {
    let formData = new FormData();
    formData.append("image", files[index]);
    const res = await fetch(
        "https://mandarin.api.weniv.co.kr/image/uploadfile",
        {
            method: "POST",
            body: formData,
        }
    );
    const data = await res.json();
    const productImgName = data["filename"];
    return productImgName;
}

async function postData(e) {
    const itemName = productNameInput.value;
    const itemPrice = Number(productPriceInput.value.replaceAll(",", ""), 10); //number로 변환
    const itemLink = productUrlInp.value;
    const imageUrls = [];
    const files = inpImage.files;
    try {
        for (let index = 0; index < files.length; index++) {
            const imgurl = await imageUpload(files, index);
            //완성된 url을 만들어서 넣어준다.
            imageUrls.push("https://mandarin.api.weniv.co.kr" + "/" + imgurl);
        }
        const res = await fetch(`https://mandarin.api.weniv.co.kr/product`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                product: {
                    itemName: itemName,
                    price: itemPrice,
                    link: itemLink,
                    itemImage: imageUrls + "",
                },
            }),
        });
        const json = await res.json();
        console.log("json: ", json);
        if (res.status == 200) {
            location.href = `my_profile.html?${accountName}`;
        } else {
            console.log(json);
        }
    } catch (err) {
        alert(err);
    }
}

// 수정할 상품 가져오기

if (productId) {
    getProductData();
}

async function getProductData() {
    // const itemPrice = Number(productPriceInput.value.replaceAll(",", ""), 10);
    const res = await fetch(
        `https://mandarin.api.weniv.co.kr/product/detail/${productId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await res.json();
    console.log("data: ", data);
    imgBox.src = data.product.itemImage;
    productNameInput.value = data.product.itemName;
    productPriceInput.value = data.product.price;
    productPriceInput.value = data.product.price;
    productUrlInp.value = data.product.link;
}

// 상품수정

async function productModi() {
    const itemName = productNameInput.value;
    const price = productPriceInput.value;
    const link = productUrlInp.value;
    const productImgUrl = imgBox.src;
    const res = await fetch(
        `https://mandarin.api.weniv.co.kr/product/${productId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                product: {
                    itemName: itemName,
                    price: price,
                    link: link,
                    itemImage: productImgUrl,
                },
            }),
        }
    );
    const data = await res.json();
    console.log("data: ", data);
    if (res.status === 200) {
        alert("업로드 성공");
        location.href = `my_profile.html?${accountName}`;
    } else {
        alert("업로드 실패");
    }
}

saveButton.addEventListener("click", () => {
    if (productId) {
        productModi();
    } else {
        postData();
    }
});
