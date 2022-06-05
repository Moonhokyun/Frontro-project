// join 1: 이메일로 회원가입 폼 부분 선택
const userEmailInput = document.querySelector("#inpEmail");
const userPwInput = document.querySelector("#inputPw");
const nextBtn = document.querySelector(".next_btn");

// join2 : 프로필 설정 부분 선택
const startButton = document.querySelector(".start-btn");
const warningTextList = document.querySelectorAll(".warning-text");
const userNameInput = document.querySelector("#inpName");
const userIdInput = document.querySelector("#inpId");
const userIntro = document.querySelector("#inpIntroduce");

// 화면 전환을 위한 section 선택
const $emailPw = document.querySelector(".email-pw");
const $profile = document.querySelector(".profile-set");
const $imagePre = document.querySelector("#imagePre");

// const url = "http://146.56.183.55:5050";
const url = "https://mandarin.api.weniv.co.kr";

// 이메일 중복 체크 함수
async function checkEmailValid(email) {
    const res = await fetch(`${url}/user/emailvalid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                email: email,
            },
        }),
    });
    const json = await res.json();
    return json.message == "사용 가능한 이메일 입니다." ? true : false;
}

// 이메일 형식 검사
document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.querySelector("#inpEmail");
    const inputAlert = document.querySelector(".input_alert");
    const isEmail = (value) => {
        // 골뱅이가 있고 골뱅이 뒤에 점이 있다면
        return value.indexOf("@") > 1 && value.split("@")[1].indexOf(".") > 1;
    };

    inputBox.addEventListener("keyup", (event) => {
        const value = event.currentTarget.value;
        if (isEmail(value)) {
            inputAlert.style.color = "green";
            inputAlert.textContent = ``;
        } else {
            inputAlert.style.color = "#eb5757";
            inputAlert.textContent = `*올바르지 않은 이메일 형식입니다.`;
            inputAlert.fontSize = `1.2rem`;
        }
    });
});

// 이메일로 회원가입 창에서 (다음) 버튼 눌렀을 때
// 통과하면 프로필 설정 창 띄우고
// 통과못하면 경고문구 띄우기
nextBtn.addEventListener("click", async () => {
    const email = document.querySelector("#inpEmail").value;
    const pw = document.querySelector("#inputPw").value;
    // 이메일 유효성 검사 통과시 화면 전환 통과 못하면 경고 문구 띄우기
    const emailValid = await checkEmailValid(email);
    if (emailValid) {
        $emailPw.style.display = "none";
        $profile.style.display = "block";
    } else {
        warningTextList[0].classList.remove("invisible");
    }
});

// 비밀번호 6자 이상 유효성 검사 함수
const validPassword = () => {
    const password = userPwInput.value;
    if (password.length < 6) {
        return false;
    }
    return true;
};

// input에 입력시, 비밀번호 유효성 검사 경고 출력
userPwInput.addEventListener("input", () => {
    if (!validPassword()) {
        warningTextList[1].classList.remove("invisible");
        if (userPwInput.value === "") {
            warningTextList[1].classList.add("invisible");
        }
        return;
    }
    warningTextList[1].classList.add("invisible");
});

// 프로필 설정 폼
// 사용자 이름이 2~10자인지 유효성 검사
const isUserNameInputValid = () => {
    const userName = userNameInput.value;
    if (userName.length < 2 || 10 < userName.length) {
        return false;
    }
    return true;
};

// 계정 ID : 영문, 숫자, ._만 가능한 유효성 검사
const isUserIdInputValid = () => {
    const userId = userIdInput.value;
    const reg1 = /[A-Z]/g;
    const reg2 = /[a-z]/g;
    const reg3 = /[0-9]/g;
    const reg4 = /[._]/g;
    const isValid =
        reg1.test(userId) ||
        reg2.test(userId) ||
        reg3.test(userId) ||
        reg4.test(userId);
    return isValid;
};

// 은이네 문방구 시작하기 버튼 눌렀을 때
// 검사 통과시 login_email 이동
// 아니면 경고 문구
startButton.addEventListener("click", () => {
    if (!isUserNameInputValid()) {
        warningTextList[2].classList.remove("invisible");
        console.log("2~10자 이내여야 합니다.");
        return;
    }
    warningTextList[2].classList.add("invisible");
    if (!isUserIdInputValid()) {
        warningTextList[3].classList.remove("invisible");
        return;
    }
    warningTextList[2].classList.add("invisible");
});

// input에 입력시 경고 띄워주기
userNameInput.addEventListener("input", () => {
    if (!isUserNameInputValid()) {
        warningTextList[2].classList.remove("invisible");
        if (userNameInput.value === "") {
            warningTextList[2].classList.add("invisible");
        }
        return;
    }
    warningTextList[2].classList.add("invisible");

    userIdInput.addEventListener("input", () => {
        if (!isUserIdInputValid()) {
            warningTextList[3].classList.remove("invisible");
            if (userIdInput.value === "") {
                warningTextList[3].classList.add("invisible");
            }
            return;
        }
        startButton.classList.add("active");
        warningTextList[3].classList.add("invisible");
    });
});

// 시작하기 버튼 색상 활성화
const isButtonActive = () => {
    if (!isUserNameInputValid()) {
        startButton.classList.remove("active");
        return;
    }
    if (!isUserIdInputValid()) {
        startButton.classList.remove("active");
        return;
    }
    startButton.classList.add("active");
};

userNameInput.addEventListener("input", isButtonActive);
userIdInput.addEventListener("input", isButtonActive);

// 프로필 사진 사진 미리 보기
function readImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewImage = document.querySelector(".picture");
            // previewImage.setAttribute('width', '322px')
            previewImage.setAttribute("height", "100%");
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

document.querySelector(".profile-input").addEventListener("change", (e) => {
    readImage(e.target);
});

// 이미지 업로드
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
    const productImgName = data["filename"];
    return productImgName;
}

async function profileImage(e) {
    const files = e.target.files;
    const result = await imageUpload(files);
    imagePre.src = "https://mandarin.api.weniv.co.kr/" + result;
    console.log(result);
}
document
    .querySelector("#profile-input")
    .addEventListener("change", profileImage);

// 회원가입 fetch 연결
async function join() {
    const email = document.querySelector("#inpEmail").value;
    const password = document.querySelector("#inputPw").value;
    const userName = document.querySelector("#inpName").value;
    const userId = document.querySelector("#inpId").value;
    const intro = document.querySelector("#inpIntroduce").value;
    const imageUrl = document.querySelector(".picture").src;

    const res = await fetch("https://mandarin.api.weniv.co.kr/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                email: email,
                password: password,
                username: userName,
                accountname: userId,
                intro: intro,
                image: imageUrl,
            },
        }),
    });
    console.log(res);
    const json = await res.json();
    // const message = json.message
    if (res.status == 200) {
        console.log("회원가입 성공");
        location.href = "./login_email.html";
    } else {
        console.log(json);
    }
}
startButton.addEventListener("click", join);
