const BASE_URL = "https://mandarin.api.weniv.co.kr";

checkLoginUser();
// - top-bar, 헤더 바

// - 관련 변수들 -
const btnBack = document.querySelector(".button-back");
const btnMore = document.querySelector(".button-more");
const backgroundUpModal = document.querySelector(".background_up-modal");
const upModal = document.querySelector(".up-modal");
const postItemList = document.querySelectorAll(".item-modal");
const logoutBtn_up = Array.from(postItemList).find(
    (item) => item.innerText === "로그아웃"
); // ※ find를 쓰기 위해선 nodeList > Array 변환 이 필요
const backgroundPopupModal = document.querySelector(".background_popup-modal");
const popupModal = document.querySelector(".popup-modal");
const cancelBtn_popup = document.querySelector(".cancel-button_popup");
const logoutBtn_popup = document.querySelector(".action-button_popup");

// - 뒤로가기 버튼
btnBack.addEventListener("click", () => {
    // 채팅방 뒤로가기 작성하고 작성팀원분들과 얘기하고 작성하기
    history.back();
    // location.href("");
});

// - 더보기 버튼 & up modal, 위로 올라오는 모달
btnMore.addEventListener("click", () => {
    backgroundUpModal.style.display = "block";
    upModal.style.bottom = "0";
});
backgroundUpModal.addEventListener("click", () => {
    backgroundUpModal.style.display = "none";
    upModal.style.bottom = "-20rem";
});

// - popup modal, 띄워지는 모달
logoutBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    popupModal.style.display = "block";
});
cancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
});

// - 로그 아웃 기능
logoutBtn_popup.addEventListener("click", () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("accountName");
    localStorage.removeItem("userId");
    localStorage.removeItem("user-profile");
    location.href = "login.html";
});

// - profile-info, 프로필 정보 -

// - 관련 변수
const profileCont = document.querySelector(".cont_profile");

const profileFollowers = document.querySelector(".number_followers");
const profileFollowings = document.querySelector(".number_followings");
const profileFollowersBtn = document.querySelector(".followers_profile");
const profileFollowingsBtn = document.querySelector(".followings_profile");
const profileImg = document
    .querySelector(".header_profile")
    .querySelector("img");
const profileName = document.querySelector(".name_profile");
const profileAccount = document.querySelector(".account_profile");
const profileIntro = document.querySelector(".explain_profile");
const profileFixButton = document.querySelector(
    ".footer_profile > button:first-child"
);
const addProductButton = document.querySelector(
    ".footer_profile > button:nth-child(2)"
);

// - 프로필 데이터 fetch로 가져오기
getProfileData();

// - followers, followings 버튼 페이지 이동
profileFollowersBtn.addEventListener("click", () => {
    const accountName = localStorage.getItem("accountName");
    location.href = `follow.html?accountName=${accountName}&follow=follower`;
});
profileFollowingsBtn.addEventListener("click", () => {
    const accountName = localStorage.getItem("accountName");
    location.href = `follow.html?accountName=${accountName}&follow=following`;
});

// 채운님께 여쭤보기 아무나 수정이 가능한건지.. 넘겨줘야할 데이터가 있는 지
// - 프로필 수정 페이지로 이동
profileFixButton.addEventListener("click", () => {
    window.location.href = "profile_modification.html";
});
// - 상품 등록 페이지로 이동
addProductButton.addEventListener("click", () => {
    window.location.href = "add_product.html";
});
// 프로필 데이터 가져오기
async function getProfileData() {
    try {
        const myAccountName = localStorage.getItem("accountName");
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${myAccountName}`,
            "get",
            token
        );
        let result = await res.json();
        result = result.profile;

        profileFollowers.innerText = result.followerCount;
        profileFollowings.innerText = result.followingCount;
        profileImg.src = result.image;
        profileName.innerText = result.username;
        profileAccount.innerText = `@ ${result.accountname}`;
        profileIntro.innerText = result.intro ? result.intro : "-";
        makeTitle(result.accountname);
    } catch (error) {
        console.log(error);
    }
}

// - cont_on-sale -

// - 관련 변수
const onSaleCont = document.querySelector(".cont_on-sale");
const onSaleList = document.querySelector(".ul_on-sale");
const onSaleFragment = document.createDocumentFragment();
// - on-sale up modal 관련 변수
const onSaleUpModal = document.querySelector(".on-sale");
const onSaleBtnList = document.querySelectorAll(".on-sale .item-modal");
const onSaleDeleteBtn_up = onSaleBtnList[0];
const onSaleModifyBtn_up = onSaleBtnList[1];
const onSaleLinkBtn_up = onSaleBtnList[2];
// - on-sale popup modal 관련 변수
const onSalePopupModal = document.querySelector(".popup-modal+.delete_on-sale");
const onSaleCancelBtn_popup = onSalePopupModal.querySelector(
    ".cancel-button_popup"
);
const onSaleDeleteBtn_popup = onSalePopupModal.querySelector(
    ".action-button_popup"
);
// - product.id & product.link를 담는 변수
let productId;
let productLink;

// - 삭제 버튼 누를 시 팝업 띄워주기
onSaleDeleteBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    onSalePopupModal.style.display = "block";
});
// - 취소 버튼 누를 시 팝업관련 화면 다 안보임 처리
onSaleCancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    onSalePopupModal.style.display = "none";
});

createAndDrawOnSale();

// - on-sale DOM 요소 생성 및 화면 그리기
async function createAndDrawOnSale() {
    const productList = await getOnSaleData();

    // 등록된 상품이 있을 경우만 리스트 보여주기
    if (productList.length > 0) {
        onSaleCont.style.display = "flex";
    } else {
        return;
    }

    // productList.forEach((product) => {
    for (let product of productList) {
        // 가격에 ','를 달아주는 로직
        const price = makeMoneysComma(`${product.price}`);

        // 상품 노드 생성
        const productItem = document.createElement("li");
        productItem.className += "li_on-sale";
        productItem.innerHTML = `
            <article class="item_on-sale">
                <img src="${product.itemImage}" alt="판매상품 ${product.itemName}의 이미지" onerror="this.src='/src/png/add-product-box.png';">
                <p class="tit_item">
                ${product.itemName}
                </p>
                <p class="price_item">
                    <strong>${price}</strong>원
                </p>
            </article>`;
        onSaleFragment.appendChild(productItem);

        // 상품 노드 이벤트 등록
        productItem.addEventListener("click", () => {
            backgroundUpModal.style.display = "block";
            onSaleUpModal.style.bottom = "0";
            productId = product.id;
            productLink = product.link;
            // 일회성 이벤트 등록
            // 상품 삭제 이벤트 등록
            onSaleDeleteBtn_popup.addEventListener("click", deleteOnSaleFunc);
            // 상품 수정 이벤트 등록
            onSaleModifyBtn_up.addEventListener("click", modifyOnSaleFunc);
            // 상품 링크 이동 이벤트 등록
            onSaleLinkBtn_up.addEventListener("click", LinkFuncWrapper);
        });
    }
    // });
    backgroundUpModal.addEventListener("click", () => {
        onSaleUpModal.style.bottom = "-20rem";
        onSaleDeleteBtn_popup.removeEventListener("click", deleteOnSaleFunc);
        onSaleModifyBtn_up.removeEventListener("click", modifyOnSaleFunc);
        onSaleLinkBtn_up.removeEventListener("click", LinkFuncWrapper);
    });
    onSaleList.appendChild(onSaleFragment);
}

// - on-sale 이벤트 함수
// 삭제 이벤트
async function deleteOnSaleFunc() {
    console.log("상품 삭제!");
    deleteItem(productId, "onSale");
}

// 수정 이벤트
function modifyOnSaleFunc() {
    modifyItem(productId, "onSale");
}

// 링크 이벤트
function LinkFuncWrapper() {
    moveToLink(productLink);
}
function moveToLink(productLink) {
    window.open(productLink);
}

// - 유저 판매 상품 데이터를 가져오기
async function getOnSaleData() {
    try {
        const myAccountName = localStorage.getItem("accountName");
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/product/${myAccountName}`,
            "get",
            token,
            null
        );
        const result = await res.json();
        const productList = result.product;

        return productList;
    } catch (error) {
        console.log(error);
    }
}

// - cont_contents, 게시물 정보 -

// - 관련 변수
const contentsCont = document.querySelector(".cont_contents");
// - view-style 관련 변수
const viewStyleCont = document.querySelector(".cont_view-style");
const styleBtn = viewStyleCont.querySelectorAll("button");
const listStyleBtn = Array.from(styleBtn)[0];
const pictureStyleBtn = Array.from(styleBtn)[1];
// - contents 관련 변수
const userContentsCont = document.querySelector(".cont_user-contents");
const contentsList = document.querySelector(".ul_user-contents");
const contentsFragment = document.createDocumentFragment();
const pictureContentList = document.querySelector(".ul-picture_user-contents");
const pictureContentsFragment = document.createDocumentFragment();
// - content up modal 관련 변수
const contentUpModal = document.querySelector(".content");
const contentBtnList = document.querySelectorAll(".content .item-modal");
const contentDeleteBtn_up = contentBtnList[0];
const contentModifyBtn_up = contentBtnList[1];
// - content popup modal 관련 변수
const contentPopupModal = document.querySelector(
    ".popup-modal+.delete_content"
);
const contentCancelBtn_popup = contentPopupModal.querySelector(
    ".cancel-button_popup"
);
const contentDeleteBtn_popup = contentPopupModal.querySelector(
    ".action-button_popup"
);
// - content.id를 담는 변수
let contentId;

// 삭제 버튼 클릭 시 삭제 모달 띄우기
contentDeleteBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    contentPopupModal.style.display = "block";
});
// 취소 버튼 클릭 시 모달관련 화면 다 안보임 처리
contentCancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    contentPopupModal.style.display = "none";
});

// - view-style change
// 이벤트 처리하는 경우와 ui처리에 관해서 생각해보지 않으니 일을 두번하게 된다..
listStyleBtn.addEventListener("click", () => {
    if (Array.from(listStyleBtn.classList).includes("off")) {
        if (Array.from(userContentsCont.classList).includes("picture-style")) {
            userContentsCont.classList.remove("picture-style");
            contentsList.style.display = "block";
            pictureContentList.style.display = "none";

            // list button 활성화
            listStyleBtn.classList.replace("off", "on");
            listStyleBtn.querySelector("img").src =
                "/src/png/icon-post-list-on.png";

            // picture button 비활성화
            pictureStyleBtn.classList.replace("on", "off");
            pictureStyleBtn.querySelector("img").src =
                "/src/png/icon-post-album-off.png";
        }
    }
});
pictureStyleBtn.addEventListener("click", () => {
    if (Array.from(pictureStyleBtn.classList).includes("off")) {
        userContentsCont.classList.add("picture-style");
        contentsList.style.display = "none";
        pictureContentList.style.display = "flex";

        // list button 비활성화
        listStyleBtn.classList.replace("on", "off");
        listStyleBtn.querySelector("img").src =
            "/src/png/icon-post-list-off.png";

        // picture button 활성화
        pictureStyleBtn.classList.replace("off", "on");
        pictureStyleBtn.querySelector("img").src =
            "/src/png/icon-post-album-on.png";
    }
});

// - content DOM 요소 생성 및 화면 그리기
createAndDrawContent();

// - content DOM 요소 생성 및 화면 그리기
async function createAndDrawContent() {
    const contentsListData = await getContents();

    // 등록된 게시글이 없으면 게시글란 안보이게 처리하기
    if (contentsListData.length > 0) {
        contentsCont.style.display = "block";
    } else {
        return;
    }

    // DOM에 붙여줄 버튼들을 리스트로 관리 > filter나 find로 미리 작성할 수 있다? 뭐가 더 좋을까
    const btnMoreList = [];
    const btnHeartList = [];
    const btnCommentList = [];

    // 여러 비동기에 쓰이는 await를 한 번으로 묶을 수는 없을까??, class나 생성자 함수로 각 게시물들을 바꿔주면 더 좋을 것 같다.
    for (let content of contentsListData) {
        const authorImage = await validateImage(
            content.author.image,
            "profile"
        );
        // const contentImage = await validateImage(content.image, "content"); > image onerror 속성을 이용해서 처리

        const imageArray = content.image.split(",");
        let imageHTML = "";
        if (imageArray.length === 1 && imageArray[0]) {
            imageHTML = `<img src="${imageArray[0]}" alt="post-image" class="content-img_content-info" onerror="this.style.display='none';">`;
        } else if (imageArray.length > 1) {
            const arr = [];
            imageArray.forEach((image) => {
                if (image) {
                    arr.push(
                        `<li><img src="${image}" alt="post-image" class="content-img_slide-item" onerror="this.style.display='none';"></li>`
                    );
                }
            });
            imageHTML = `<ul class="content-img_slide">${arr.join("")}</ul>`;
        }

        // list-content 노드 생성
        const contentItem = document.createElement("li");
        contentItem.className += "li_user-contents";
        contentItem.innerHTML = `
        <article class="content_user-contents">
            <div class="content-header_user-contents">
                <img src="${content.author.image}" alt="${
            content.author.username
        }님의 프로필 사진" onerror="this.src='/src/png/Ellipse 6.png';" class="img_content-info" />
                <p class="name_content-info">${content.author.username}</p>
                <p class="email_content-info">@ ${
                    content.author.accountname
                }</p>
            </div>
            <div class="desc_content-info">
                <p class="txt_content-info">${content.content}</p>
                ${imageHTML ? imageHTML : ""}
                <div class="cont_buttons"></div>
                <p class="date_content-info">${makeKoreaDate(
                    content.updatedAt
                )}</p>
            </div>
        </article>`;

        // picture-content 노드 생성
        // 1. 이미지가 있다면 앨범형 콘텐츠 노드 생성
        // 1.1 이미지가 단일 이미지라면 그냥 이미지 + 클릭하면 post.html으로 이동
        // 1.2 이미지가 다중 이미지라면 이미지 + 여러장 아이콘 + 클릭하면 post.html으로 이동
        if (imageArray.length >= 1) {
            // 단일이미지 콘텐츠 생성
            if (imageArray[0] && imageArray.length === 1) {
                const pictureContentItem = document.createElement("li");
                pictureContentItem.innerHTML = `<a href=post.html?id=${content.id}><img src=${imageArray[0]} alt="post-image" class="content-img_content-info"></a>`;
                pictureContentsFragment.appendChild(pictureContentItem);
            }
            // 다중 이미지 콘텐츠 생성
            else if (imageArray[0] && imageArray.length > 1) {
                const pictureContentItem = document.createElement("li");
                pictureContentItem.classList.add("multi-image");
                pictureContentItem.innerHTML = `<a href=post.html?id=${content.id}><img src=${imageArray[0]} alt="post-image" class="content-img_content-info"></a>`;
                pictureContentItem.addEventListener("click", () => {
                    location.href = `post.html?id=${content.id}`;
                });
                pictureContentsFragment.appendChild(pictureContentItem);
            }
        }

        // forEach문 돌 때 마다 콘텐츠 헤더 더보기, 좋아요, 댓글 버튼 생성
        // 더보기 버튼 노드 생성
        const btnMoreHTML = document.createElement("button");
        btnMoreHTML.className += "btn-more_content button-noneBackground";
        btnMoreHTML.innerHTML = `<img class="" src="src/svg/s-icon-more-vertical.svg" alt="더보기 버튼">`;
        btnMoreHTML.addEventListener("click", () => {
            contentId = content.id;
            backgroundUpModal.style.display = "block";
            contentUpModal.style.bottom = "0";
            // 일회성 이벤트 등록(여러개의 콘텐츠가 하나의 업모달을 공유해서 이벤트를 달기 때문에 일회성 이벤트를 사용)
            // 상품 삭제 이벤트 등록
            contentDeleteBtn_popup.addEventListener("click", deleteContentFunc);
            // 상품 수정 이벤트 등록
            contentModifyBtn_up.addEventListener("click", modifyContentFunc);
        });

        // 좋아요 버튼 생성
        const btnHeartHTML = document.createElement("button");
        btnHeartHTML.className += "button-like button-noneBackground";
        btnHeartHTML.innerHTML = `
            <img src="./src/png/${
                content.hearted ? "icon-heart-active.png" : "icon-heart.png"
            }" alt="">
            <strong class="count-heart">${content.heartCount}</strong>
            `;
        btnHeartHTML.addEventListener("click", () => {
            const token = localStorage.getItem("Token");

            // 하트 활성화에 따라 처리를 다르게
            // case 1. 하트 활성화
            // - hearted true값 false 값으로 바꾸기
            // - countHeart값 -1
            // - img 변경
            // - 해당 게시물의 id로 post 요청

            // case 2. 하트 비활성화
            // - hearted false값 true 값으로 바꾸기
            // - countHeart값 +1
            // - img 변경
            // - 해당 게시물의 id로 post 요청

            if (content.hearted) {
                content.hearted = false;
                content.heartCount -= 1;
                content.image = "./src/png/icon-heart.png";
                postHeartReq(
                    "delete",
                    "unheart",
                    btnHeartHTML,
                    content.id,
                    content.heartCount,
                    content.image
                );
            } else {
                content.hearted = true;
                content.heartCount += 1;
                content.image = "./src/png/icon-heart-active.png";
                postHeartReq(
                    "post",
                    "heart",
                    btnHeartHTML,
                    content.id,
                    content.heartCount,
                    content.image
                );
            }
        });

        // 댓글 버튼 생성
        const btnCommentHTML = document.createElement("button");
        btnCommentHTML.className += "button-comment button-noneBackground";
        btnCommentHTML.innerHTML = `<img src="./src/png/icon-message-circle.png" alt="">
              <strong class="count-comment">${content.commentCount}</strong>`;

        btnCommentHTML.addEventListener("click", () => {
            location.href = `post.html?id=${content.id}`;
        });

        // 생성한 버튼들 리스트에 넣어서 관리
        btnMoreList.push(btnMoreHTML);
        btnHeartList.push(btnHeartHTML);
        btnCommentList.push(btnCommentHTML);
        contentsFragment.appendChild(contentItem);
    }

    contentsList.appendChild(contentsFragment);
    pictureContentList.appendChild(pictureContentsFragment);

    // content-header_user-contents에 addEventListener 달아주기
    const contentHeaderList = document.querySelectorAll(
        ".content-header_user-contents"
    );
    Array.from(contentHeaderList).forEach((contentHeader) => {
        contentHeader.addEventListener("click", () => {
            location.href = "my_profile.html";
        });
    });

    // - 리스트로 관리했던 버튼들 DOM에 붙여주기
    // 더보기 버튼
    const descContentInfoList = document.querySelectorAll(".desc_content-info");
    Array.from(descContentInfoList).forEach((descContentInfo, index) => {
        descContentInfo.after(btnMoreList[index]);
    });
    // 좋아요 & 댓글 버튼
    const contentBtnContList = document.querySelectorAll(".cont_buttons");
    console.log(contentBtnContList);
    Array.from(contentBtnContList).forEach((contentBtnCont, index) => {
        contentBtnCont.appendChild(btnHeartList[index]);
        contentBtnCont.appendChild(btnCommentList[index]);
    });
    backgroundUpModal.addEventListener("click", () => {
        contentUpModal.style.bottom = "-20rem";
        contentDeleteBtn_popup.removeEventListener("click", deleteContentFunc);
        contentModifyBtn_up.removeEventListener("click", modifyContentFunc);
    });
}
// content 이벤트 함수
async function deleteContentFunc() {
    console.log("게시글 삭제!");
    deleteItem(contentId, "content");
}
async function deleteItem(itemId, itemType) {
    console.log(itemId);
    const token = localStorage.getItem("Token");

    if (itemType === "onSale") {
        // 팝업, 업 모달 다 내려주기
        backgroundPopupModal.style.display = "none";
        backgroundUpModal.style.display = "none";
        onSalePopupModal.style.display = "none";
        onSaleUpModal.style.bottom = "-20rem";

        // 상품 삭제 로직...
        const res = await myFetch(
            `${BASE_URL}/product/${itemId}`,
            "delete",
            token,
            null
        );

        const response = await res.json();

        // 상품 삭제 완료여부 알려주기
        if (res.ok) {
            window.alert(response.message);
            location.reload();
        } else {
            window.alert("삭제 실패하였습니다!");
        }
    } else if (itemType === "content") {
        // 팝업, 업 모달 다 내려주기
        backgroundPopupModal.style.display = "none";
        backgroundUpModal.style.display = "none";
        contentPopupModal.style.display = "none";
        contentUpModal.style.bottom = "-20rem";

        // 게시글 삭제 로직...
        const res = await myFetch(
            `${BASE_URL}/post/${itemId}`,
            "delete",
            token,
            null
        );

        const response = await res.json();

        // 게시글 삭제 완료여부 알려주기
        if (res.ok) {
            window.alert(response.message);
            location.reload();
        } else {
            window.alert("삭제 실패하였습니다!");
        }
    }
}
function modifyContentFunc() {
    modifyItem(contentId, "content");
}
function modifyItem(itemId, itemType) {
    if (itemType === "onSale") {
        // 여쭤보고 작성하기
        location.href = `add_product.html?productid=${itemId}`;
    } else if (itemType === "content") {
        location.href = `upload.html?${itemId}`;
    }
}

// 콘텐츠의 데이터를 가져오는 함수
async function getContents() {
    const myAccountName = localStorage.getItem("accountName");
    const token = localStorage.getItem("Token");

    const res = await myFetch(
        `${BASE_URL}/post/${myAccountName}/userpost/?limit=6`,
        "get",
        token,
        null
    );
    const result = await res.json();
    const contentsListData = result.post;
    return contentsListData;
}

// - 이미지가 유효한 지 검사하는 함수
async function validateImage(image, imageType) {
    const token = localStorage.getItem("Token");

    const imageArray = await image.split(",");
    const newArray = [];
    for (let image of imageArray) {
        newArray.push(
            await myFetch(
                image ? `${image}` : "notfoundimage",
                "get",
                token,
                null
            ).then((res) => {
                if (res === "error") {
                    if (imageType === "profile") {
                        return "/src/svg/basic-profile-img.svg";
                    } else {
                        return "/src/png/add-product-box.png";
                    }
                } else {
                    return image;
                }
            })
        );
    }
    return newArray;
}

async function postHeartReq(method, postType, dom, id, count, img) {
    const heartCountDom = dom.querySelector("strong");
    const heartImgDom = dom.querySelector("img");
    const token = localStorage.getItem("Token");

    const res = await myFetch(
        `${BASE_URL}/post/${id}/${postType}`,
        method,
        token,
        null
    );
    if (res.ok) {
        heartCountDom.innerText = count;
        heartImgDom.src = img;
    } else {
        window.alert("요청에 실패했습니다.");
    }
}

// - nav bar, 하단 탭 페이지이동 -
// 경서님 코드
const goToReload = document.querySelector("ul > li:first-child");
console.log(goToReload);

const goToChat = document.querySelector("ul > li:nth-child(2)");
console.log(goToChat);

const goUpload = document.querySelector("ul > li:nth-child(3)");
console.log(goUpload);

const goMyProfile = document.querySelector("ul > li:last-child");
console.log(goMyProfile);

goToReload.addEventListener("click", () => {
    window.location.href = "index.html";
});

goToChat.addEventListener("click", () => {
    window.location.href = "chat_list.html";
});

goUpload.addEventListener("click", () => {
    window.location.href = "upload.html";
});

goMyProfile.addEventListener("click", () => {
    window.location.href = "my_profile.html";
});

// 내코드
// // - 관련 변수
// const goToHome = document.querySelector(".tap-menu-home");
// const goToChat = document.querySelector(".tap-menu-chat");
// const goUpload = document.querySelector(".tap-menu-upload");
// const goMyProfile = document.querySelector(".tap-menu-user");

// // - 페이지 이동
// goToHome.addEventListener("click", () => {
//     window.location.href = "index.html";
// });
// goToChat.addEventListener("click", () => {
//     window.location.href = "chat_list.html";
// });
// goUpload.addEventListener("click", () => {
//     window.location.href = "upload.html";
// });
// goMyProfile.addEventListener("click", () => {
//     window.location.href = "my_profile.html";
// });

// 제목 만들어주는 함수
function makeTitle(titleName) {
    const titleTag = document.querySelector("title");
    console.log(titleTag);
    titleTag.innerText = `${titleName} | 은희네문방구`;
}

// - 공용으로 쓰이는 코드 -

async function getAccountName() {
    let accountName = getQueryValue("accountName");
    if (accountName) {
        return accountName;
    } else {
        return localStorage.getItem("accountName");
    }
}

// - fetch를 쉽게 쓸 수 있게 해주는 함수
async function myFetch(url, method, auth = "", data = "") {
    const responseData = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth ? `Bearer ${auth}` : "",
        },
        body:
            method === "get" || method === "delete"
                ? null
                : data
                ? JSON.stringify(data)
                : "",
    })
        .then((res) => {
            if (res.ok) {
                return res;
            } else {
                return "error";
            }
        })
        .catch((err) => {
            return err;
        });

    return responseData;
}

// - 페이지 들어올 때 토큰 있는 지 확인
async function checkLoginUser() {
    // 토큰 검사하는 api 사용해서 수정하기
    const token = localStorage.getItem("Token");
    if (!token) {
        location.href = "login.html";
    }
    // 이 부분은 토큰이 만료됐다 싶을 때 다시 테스트 해보기
    const res = await myFetch(`${BASE_URL}/user/checktoken`, "get", token);
    const result = await res.json();
    if (!result.isValid) {
        window.alert("만료된 토큰입니다.");
        console.log(result.isValid);
        location.href = "login.html";
    } else {
        console.log("만료되지 않았습니다.");
    }
}

// - url에서 원하는 쿼리 값 받아오기
function getQueryValue(key) {
    const params = new URLSearchParams(location.search);
    const value = params.get(key);
    return value;
}

// - 년일월 날짜 변환 함수
function makeKoreaDate(date) {
    // "2022-01-10T09:08:38.035Z"
    const koreaDate = date.split("-").map((value) => parseInt(value));
    return `${koreaDate[0]}년 ${koreaDate[1]}월 ${koreaDate[2]}일`;
}

// - 돈에 ','을 붙여주는 함수
function makeMoneysComma(money) {
    let result = "";
    if (money.length < 4) {
        result = money;
        return result;
    }
    result = "," + money.slice(-3);
    return makeMoneysComma(money.slice(0, -3)) + result;
}

// 코드리뷰 시 피드백 여쭤 볼 것
// - 팝업 및 업 모달을 화면 밑에 숨겨놓거나 display:none으로 처리해서 안보이게 했는데 이부분에 대해서 js로 dom node를 생성해서 처리하는게 좋을 지 지금처럼 css로 처리하는 것이 좋을 지에 대해서 여쭤보기

// createDom,innerHTML 둘 간의 성능 차이??

// 어떤 DOM 요소에 js를 붙일지 고려해서 html의 작성이 필요하다는 것을 깨닫는 계기..
// 나중에 수정하면서 다시 작성하게 된다..

// img alt 값은 한국어로!
// js의 data- attribute를 채영님 코드를 보고 작성해볼 것

// 리펙터링하면서 your_profile, my_profile 한 개로 합치기.
