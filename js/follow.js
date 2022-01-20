const BASE_URL = "http://146.56.183.55:5050";

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

getFollowData();

// 콘텐츠의 데이터를 가져와서 그려주는 함수
async function getFollowData() {
    const followType = getQueryValue("follow");
    const accountName = getQueryValue("accountName");
    let followData;

    if (followType === "follower") {
        followData = await getFollowerList(accountName);
    } else {
        followData = await getFollowingList(accountName);
    }

    console.log(followData);

    // 여러 비동기에 쓰이는 await를 한 번으로 묶을 수는 없을까??
    // for (let follower of followData) {
    for (let user of followData) {
        const profileImage = await validateImage(user.image, "profile");
        // list형 content 보여주기
        const userItem = document.createElement("li");
        userItem.className += "user-follow";
        userItem.innerHTML = `
            <div class="cont_link">
                <img src="${profileImage}" alt="${user.username}의 프로필 사진" class="follow_profile-image" />
                <div class="follow_text-info">
                <p class="follow_user-name">${user.username}</p>
                <p class="follow_user-introduce">${user.intro}</p>
                </div>
            </div>
            <button type="button" class="S-button Sbutton-font">팔로우</button>`;
        followersFragment.appendChild(userItem);
    }

    followersList.appendChild(followersFragment);

    // - 페이지 이동 -
    // - 관련 변수
    const followersLinkList = document.querySelectorAll(".cont_link");
    Array.from(followersLinkList).forEach((follower) => {
        console.log(follower);
        const profileName =
            follower.querySelector(".follow_user-name").innerText;
        follower.addEventListener("click", () => {
            location.href = `/your_profile.html?name=${profileName}`;
        });
    });

    // - 팔로우 버튼 기능
    const FollowBtn = document.querySelectorAll(".Sbutton-font");
    Array.from(FollowBtn).forEach((button) => {
        button.addEventListener("click", () => {
            if (button.innerText === "취소") {
                button.innerText = "팔로우";
                button.classList.replace("S-Active-button", "S-button");
                console.log(button.innerText);
                // myFetch(
                //     `${BASE_URL}/profile/${ACCOUNT_NAME}/unfollow`,
                //     "delete",
                //     AUTH,
                //     null
                // )
                //     .then((res) => res.json())
                //     .then((result) => console.log(result))
                //     .catch((error) => console.log(error));
            } else {
                button.innerText = "취소";
                button.classList.replace("S-button", "S-Active-button");
                console.log(button.innerText);
                // myFetch(
                //     `${BASE_URL}/profile/${ACCOUNT_NAME}/follow`,
                //     "post",
                //     AUTH,
                //     null
                // )
                //     .then((res) => res.json())
                //     .then((result) => console.log(result))
                //     .catch((error) => console.log(error));
            }
        });
    });
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