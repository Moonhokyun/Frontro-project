const userNameInput = document.querySelector("#user-name");
const profileImg = document.querySelector(".img-profile-empty");
const saveButton = document.querySelector(".nav > button");
const userIdInput = document.querySelector("#user-id");
const intro = document.querySelector("#user-info");
const warningTextList = document.querySelectorAll(".warning-text");
const backBtn = document.querySelector(".btn-back");
const token = localStorage.getItem("Token");
const myAccountName = localStorage.getItem("accountName");
console.log(localStorage);
// 뒤로가기(my_profile)
backBtn.addEventListener("click", () => {
    history.back();
});

// 이름 2~10자 이내 유효성 검사
const isUserNameInputValid = () => {
    const userName = userNameInput.value;
    if (userName.length < 2 || 10 < userName.length) {
        return false;
    }
    return true;
};

// 영문, 숫자, ._ 만 가능한 유효성 검사
const isUserIdInputValid = () => {
    const userId = userIdInput.value;
    const reg1 = /[A-Z]/g;
    const reg2 = /[a-z]/g;
    const reg3 = /[0-9]/g;
    const reg4 = /[\.\_]/g;
    const isValid =
        reg1.test(userId) ||
        reg2.test(userId) ||
        reg3.test(userId) ||
        reg4.test(userId);
    return isValid;
};

// 버튼 클릭 했을때 유효성 검사 (유효성 검사 실패시 저장버튼 안 눌림)

// saveButton.addEventListener('click', () => {
//     if (!isUserNameInputValid()) {
//         warningTextList[0].classList.remove('invisible');
//         return;
//     }
//     warningTextList[0].classList.add('invisible');
//     if (!isUserIdInputValid()) {
//         warningTextList[1].classList.remove('invisible');
//         return;
//     }
//     warningTextList[1].classList.add('invisible');
//     submitProfileModi();
// })

// imput에 입력시 유효성 검사

userNameInput.addEventListener("input", () => {
    if (!isUserNameInputValid()) {
        warningTextList[0].classList.remove("invisible");
        if (userNameInput.value === "") {
            warningTextList[0].classList.add("invisible");
        }
        return;
    }
    warningTextList[0].classList.add("invisible");
});
userIdInput.addEventListener("input", () => {
    if (!isUserIdInputValid()) {
        warningTextList[1].classList.remove("invisible");
        if (userIdInput.value === "") {
            warningTextList[1].classList.add("invisible");
        }
        return;
    }
    saveButton.classList.add("active");
    warningTextList[1].classList.add("invisible");
});

// 버튼 활성화 (이름과 ID 입력시 버튼 활성화)

const isButtonActive = () => {
    if (!isUserNameInputValid()) {
        saveButton.classList.remove("active");
        return;
    }
    if (!isUserIdInputValid()) {
        saveButton.classList.remove("active");
        return;
    }
    // 버튼 활성화
    saveButton.classList.add("active");
};

userNameInput.addEventListener("input", isButtonActive);
userIdInput.addEventListener("input", isButtonActive);

// 기존 프로필 가져오기

async function fetchData() {
    try {
        const res = await fetch(
            `https://mandarin.api.weniv.co.kr/profile/${myAccountName}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const json = await res.json();
        localStorage.setItem("userId", json.profile._id);
        console.log("json: ", json);
        profileImg.src = json.profile.image;
        userNameInput.value = json.profile.username;
        userIdInput.value = json.profile.accountname;
        intro.value = json.profile.intro;
        saveButton.classList.add("active");
        return json;
    } catch (err) {
        console.log(err);
    }
}

fetchData();

//수정된 내용을 서버에 전송

document
    .querySelector(".image_inputType_file")
    .addEventListener("change", profileImage);

async function profileImage(e) {
    const files = e.target.files;
    console.log("files: ", files);
    const result = await imageUpload(files);
    console.log("result: ", result);
    profileImg.src = `https://mandarin.api.weniv.co.kr/${result}`;
}

async function imageUpload(files) {
    const formData = new FormData();
    formData.append("image", files[0]);

    const res = await fetch(
        `https://mandarin.api.weniv.co.kr/image/uploadfile`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();
    const imgFileName = data["filename"];
    return imgFileName;
}

saveButton.addEventListener("click", () => {
    submitProfileModi();
});

async function submitProfileModi() {
    const userAccountName = userIdInput.value;
    const userName = userNameInput.value;
    const intro = document.querySelector("#user-info").value;
    const userImgUrl = profileImg.src;

    const res = await fetch(`https://mandarin.api.weniv.co.kr/user`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            user: {
                username: userName,
                accountname: userAccountName,
                intro: intro,
                image: userImgUrl,
            },
        }),
    });
    const json = await res.json();
    if (res.status == 200) {
        const accountName = localStorage.getItem("accountName");
        localStorage.setItem("accountName", json.user.accountname);
        localStorage.setItem("user-profile", json.user.image);
        location.href = `my_profile.html?accountName=${accountName}`;
    } else {
        console.log(json);
    }
}
