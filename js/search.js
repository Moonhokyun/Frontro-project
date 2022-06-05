const iconBack = document.querySelector(".box-search > img");
// console.log(iconBack);
iconBack.addEventListener("click", () => {
    history.back();
});

// footer 페이지이동
const goToReload = document.querySelector("ul > li:first-child");
const goToChat = document.querySelector("ul > li:nth-child(2)");
const goUpload = document.querySelector("ul > li:nth-child(3)");
const goMyProfile = document.querySelector("ul > li:last-child");

// footer 페이지 이동 기능
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

const TEST_TOKEN = "Bearer " + localStorage.getItem("token");
const URL = "https://mandarin.api.weniv.co.kr";

const GET_HEADER = new Headers({
    Authorization: TEST_TOKEN,
    "Content-type": "application/json",
});

const getUserInfo = async () => {
    const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: GET_HEADER,
    });

    const data = await response.json();
    return data;
};

const searchinput = document.querySelector(".inp-search");
const main = document.querySelector(".main");

const showResult = async (event) => {
    const data = await getUserInfo();
    let result = data.filter((e) => e.accountname.includes(event.target.value));
    main.innerHTML = "";
    result.forEach((user) => {
        let newResult = document.createElement("div");
        newResult.classList.add("user-search");
        newResult.addEventListener("click", () => movePage(user.accountname));
        newResult.innerHTML = `
    <img src=${
        user.image ? user.image : "../src/basic-profile.png"
    } alt="사용자 프로필사진" onerror="checkImgErr(this)" class="search_profile-image">
    <div class="search_text-info">
      <p class="search_searched-word" data-accountname="${user.accountname}">${
            user.username
        }</p>
      <span class="search_user-email">@ ${user.accountname.replace(
          event.target.value,
          `<span class="search_search-word">${event.target.value}</span>`
      )}</span>
    </div>`;
        main.appendChild(newResult);
    });

    const usernameList = document.querySelectorAll(".search_searched-word");
    // console.log(usernameList)
    const searchInfo = document.querySelectorAll(".search_text-info");

    // for (const info of searchInfo) {
    //     console.log(info)
    //     const authorAccountName = info.dataset.accountname;
    //     console.log(authorAccountName)
    //     info.addEventListener('click', () => {
    //         window.location.href = `your_profile.html?accountName=${authorAccountName}`;
    //     })
    // }

    for (const username of usernameList) {
        // console.log(username)
        const authorAccountName = username.dataset.accountname;
        // console.log(authorAccountName)
        username.addEventListener("click", () => {
            window.location.href = `your_profile.html?accountName=${authorAccountName}`;
        });
    }
};

searchinput.addEventListener("keydown", showResult);

function checkImgErr(image) {
    image.src = "../src/png/basic-profile-img.png";
}

function movePage(accountName) {
    //   localStorage.setItem("currentUser", accountName)
    location.href = `your_profile.html?accountName=${authorAccountName}`;
}
