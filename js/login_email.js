const join = document.querySelector("#email_signIn");
const error = document.querySelector(".inp-error");

function getInput() {
    console.log(document.querySelector("#input-box-id").value);
    console.log(document.querySelector("input-box-pw").value);
}

async function login() {
    const email = document.querySelector("#input-box-id").value;
    const pw = document.querySelector("#input-box-pw").value;
    const url = "https://mandarin.api.weniv.co.kr";
    const loginData = {
        user: {
            email: email,
            password: pw,
        },
    };

    const res = await fetch(url + "/user/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },

        body: JSON.stringify(loginData),
    });
    const json = await res.json();
    if (json.status === 422) {
        error.innerHTML = `*${json.message}`;
    }
    localStorage.setItem("Token", json.user.token);
    localStorage.setItem("accountName", json.user.accountname);
    localStorage.setItem("user-profile", json.user.image);
    localStorage.setItem("userId", json.user._id);
    location.href = "./index.html";
}
const $loginBtn = document.querySelector(".login_btn");
$loginBtn.addEventListener("click", login);

join.addEventListener("click", function () {
    location.href = "./join.html";
});

// 이메일 유효하지 않을 시

document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.querySelector("#input-box-id");
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
            inputAlert.textContent = `*이메일 형식이 유효하지 않습니다.`;
        }
    });
});
