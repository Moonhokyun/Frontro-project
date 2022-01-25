const BASE_URL = "https://api.mandarin.cf";

// - top-bar, 헤더 바 -

// - 관련 변수들
const btnBack = document.querySelector(".button-back");
// - 뒤로가기 버튼
btnBack.addEventListener("click", () => {
    history.back();
});
// - 채팅방 이름 지어주기
const followType = getQueryValue("follow");
const accountName = getQueryValue("accountName");

const headerTitle = document.querySelector(".tit_top-bar");
if (followType === "following") {
    headerTitle.innerText = "Followings";
}
btnBack.after(headerTitle);

// - followers list, 팔로워 목록 -

const followersList = document.querySelector(".list-followers");
const followersFragment = document.createDocumentFragment();

createAndDrawFollowDOM();

async function createAndDrawFollowDOM() {
    const [followData, followType] = await getFollowData();
    let followingList;
    let accountNameList;

    // follower 페이지일 경우 following하는 user에게만 취소 버튼을 표시해주기 위해
    // following하는 user의 accountname 리스트를 받아온다.
    followingList = await getFollowingList(getQueryValue("accountName"));
    accountNameList = followingList.map((item) => item.accountname);

    console.log(followData);
    for (let user of followData) {
        // follow user DOM 생성
        const userItem = document.createElement("li");
        userItem.className += "user-follow";
        userItem.innerHTML = `
            <div class="cont_link">
                <a href=your_profile.html?accountName=${user.accountname} >
                <img src="${user.image}" alt="${user.username}의 프로필 사진" onerror="this.src='src/png/Ellipse 6.png';" class="follow_profile-image" />
                <div class="follow_text-info">
                    <p class="follow_user-name">${user.username}</p>
                    <p class="follow_user-introduce">${user.intro}</p>
                </div>
            </div>`;
        userItem.innerHTML += `
                ${
                    accountNameList.includes(user.accountname)
                        ? `<button type="button" class="S-Active-button Sbutton-font" data-user=${user.accountname}>취소</button>`
                        : `<button type="button" class="S-button Sbutton-font" data-user=${user.accountname}>팔로우</button>`
                }`;

        followersFragment.appendChild(userItem);
    }
    followersList.appendChild(followersFragment);

    const followBtnList = document.querySelectorAll(".Sbutton-font");
    console.log(followBtnList);
    Array.from(followBtnList).forEach((followBtn) =>
        followBtn.addEventListener("click", () => {
            if (followBtn.innerText === "팔로우") {
                postFollowReq(followBtn.dataset.user, followBtn);
            } else {
                postUnfollowReq(followBtn.dataset.user, followBtn);
            }
        })
    );
}

// - 팔로우하기
async function postFollowReq(accountName, DOM) {
    try {
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/follow`,
            "post",
            token,
            null
        );
        const result = await res.json();
        console.log(result);
        console.log(res.ok);
        if (res.ok) {
            DOM.innerText = "취소";
            DOM.classList.replace("S-button", "S-Active-button");
            console.log(DOM.innerText);
        }
    } catch (error) {
        console.log(error);
    }
}

// - 언팔로우하기
async function postUnfollowReq(accountName, DOM) {
    try {
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/unfollow`,
            "delete",
            token,
            null
        );
        const result = await res.json();
        console.log(result);
        console.log(res.ok);
        if (res.ok) {
            DOM.innerText = "팔로우";
            DOM.classList.replace("S-Active-button", "S-button");
            console.log(DOM.innerText);
        }
    } catch (error) {
        console.log(error);
    }
}

// 콘텐츠의 데이터를 가져오는 함수
async function getFollowData() {
    const followType = getQueryValue("follow");
    const accountName = getQueryValue("accountName");
    let followData;

    if (followType === "follower") {
        followData = await getFollowerList(accountName);
    } else {
        followData = await getFollowingList(accountName);
    }

    return [followData, followType];
}

// 이미지가 유효한 지 검사하는 함수
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
                        return "../src/svg/basic-profile-img.svg";
                    } else {
                        // 이미지가 없을 경우.. 어떻게 처리할 것인가..
                        return "";
                    }
                } else {
                    return image;
                }
            })
        );
    }
    return newArray;
}

// - 내가 follow 하는 사람 리스트 가져오기
async function getFollowingList(accountName) {
    try {
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/following/?limit=300`,
            "get",
            token,
            null
        );
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// - 나를 follow 하는 사람 리스트 가져오기
async function getFollowerList(accountName) {
    try {
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${accountName}/follower/?limit=300`,
            "get",
            token,
            null
        );
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// - 공용으로 쓰이는 코드 -
// - fetch를 쉽게 쓸 수 있게 해주는 함수
async function myFetch(url, method, auth = "", data = "") {
    const responseData = await fetch(url, {
        method,
        headers: {
            // Accept: "application/json",
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

// - url에서 원하는 쿼리 값 받아오기
function getQueryValue(key) {
    const params = new URLSearchParams(location.search);
    const value = params.get(key);
    return value;
}

// 1. html tag > 2. css 적용 > 3. js 적용 순으로 html에서 처리할 수 있는 코드를 css로 작성하거나 js로 작성하요 과도한 스펙의 코드를 작성하지 않도록 한다. js보다는 css로 작성하는 것이 좋음!
// js data attribute
