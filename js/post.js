const commentInput = document.querySelector(".comment-inp");
const commentUploadButton = document.querySelector(".comment-upload-btn");
const alertCommentReport = document.querySelector('.alert-comment-report');
const modal = document.querySelector(".post-modal");
const modalReport = document.querySelector(".post-modal-report")
const modalTxtReport = document.querySelector('.modal-txt-report');
const modalDelete = document.querySelector(".post-modal-delete")
const alertActionBtn = document.querySelectorAll(".alert_action-button")
const alertCancelBtn = document.querySelectorAll('.alert_cancel-button')
const modalWrapper = document.querySelector(".modal-wrapper");
const postFixButton = document.querySelector(".back-btn");
const userId = localStorage.getItem("userId");
const accountName = localStorage.getItem('accountName');
// home_2 page로 이동

postFixButton.addEventListener("click", () => {
    history.back();
});

// 입력시 '게시' 활성화

function changeButtonColor() {
    if (commentInput.value === "") {
        commentUploadButton.classList.remove("active");
    } else {
        commentUploadButton.classList.add("active");
    }
}

commentInput.addEventListener("keyup", changeButtonColor);

// 더보기 아이콘 클릭시 모달창 올라오기

const openModal = () => {
    if (ID) {
        isModalOpen = false;
        modal.classList.remove("modal-open");
    } else {
        isModalOpen = true;
        modal.classList.add("modal-open");
    }
};



// fetch

//브라우저 저장된 토큰
if (localStorage.getItem("Token")) {
    getPost()
}
console.log(localStorage.getItem("Token"))

// 날짜 & 시간 계산하기
const description = document.querySelector('.desc');
const picture = document.querySelector('.cont-following>img');
console.log(picture);
const getDateString = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${year}년 ${month}월 ${day}일`
}
const getTimeString = (date) => {
    const currentDate = new Date()
    const commentDate = new Date(date)
    const yearDiff = currentDate.getFullYear() - commentDate.getFullYear()
    if (yearDiff > 0) {
        return `${yearDiff}년 전`
    }
    const monthDiff = currentDate.getMonth() - commentDate.getMonth()
    if (monthDiff > 0) {
        return `${monthDiff}달 전`
    }
    const dayDiff = currentDate.getDate() - commentDate.getDate()
    if (dayDiff > 0) {
        return `${dayDiff}일 전`
    }
    const hourDiff = currentDate.getHours() - commentDate.getHours()
    if (hourDiff > 0) {
        return `${hourDiff}시간 전`
    }
    const minuteDiff = currentDate.getMinutes() - commentDate.getMinutes()
    if (minuteDiff > 0) {
        return `${minuteDiff}분 전`
    }
    const secondDiff = currentDate.getSeconds() - commentDate.getSeconds()
    if (secondDiff > 0) {
        return `${secondDiff}초 전`
    }
    return "0초 전"
}
// 게시물 상세보기 페이지

async function getPost() {
    console.log('getPost')
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    console.log("searchparams: ", searchParams)
    const postId = searchParams.get('id');
    const url = `http://146.56.183.55:5050/post/${postId}`;
    fetch(url, {
        method: 'GET', // or 'PUT'
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("Token"),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then((response) => {
            console.log("res: ", response)
            const post = response.post
            const postDom = document.querySelector('.post')
            postDom.innerHTML = `
            <div class="profile">
                <img class="profile-pic" src="${post.author.image}" alt="프로필 사진">
                <div class="user">
                    <p class="tit-post">${post.author.username}</p>
                    <p class="user-id font-gray">@${post.author.accountname}</p>
                </div>
            </div>
            <div class="cont-following">
                <p class="desc">
                   ${post.content}
                </p>
                <ul class="img-container"></ul>
                <ul class="indicator">
                </ul>
                <div class="icon-box font-gray">
                    <button type="button" class="btn btn-like">
                        <img src="./src/png/${post.hearted ? "icon-heart-active.png" : "icon-heart.png"}" class="heart">
                    </button>
                    <span class="count count-heart">${post.heartCount}</span>
                    <button type="button" class="btn btn-comment"><img src="./src/svg/message-circle.svg"></button>
                    <span class="count count-comment">${post.commentCount
                }</span>
                </div>
                <p class="date font-gray">${getDateString(post.createdAt)}</p>
            </div>
            <button class="more-btn2 " data-postid="${post.id}" data-userid="${post.author._id}" >
                <img src="src/svg/s-icon-more-vertical.svg" alt="더보기" class="icon-more2">
            </button>
            `;

            getPostMoreBtn();
            profileImg();

            // const profilePic = document.querySelectorAll(".profile-pic");
            // for (const i of profilePic) {
            //     i.addEventListener('click', () => {
            //         window.location.href = `your_profile.html?accountName=${post.author.accountname}`;
            //     })
            // }

            heartCheck = post.hearted;

            //좋아요
            const likeBtn = document.querySelector('.btn-like > img');
            const countHeart = document.querySelector('.count-heart');
            likeBtn.addEventListener('click', () => {
                if (post.hearted) {
                    post.hearted = false;
                    countHeart.textContent = post.heartCount -= 1;
                    likeBtn.src = './src/png/icon-heart.png';
                    unHeart();
                } else {
                    post.hearted = true;
                    countHeart.textContent = post.heartCount += 1;
                    likeBtn.src = './src/png/icon-heart-active.png';
                    fullHeart();
                }
            })

            const heart = document.querySelector('.btn-like > img');
            if (heartCheck === true) {
                heart.src = './src/png/icon-heart-active.png';
            }
            // addPostImages(post.image);
            // console.log("postImg: ", addPostImages(post.image))
            const slides = document.querySelector('.img-container');
            console.log("slides: ", slides)
            const indicator = document.querySelector('.indicator');
            console.log("indicator: ", indicator)
            if (post.image.split(',').length > 1) {
                for (let i = 0; i < post.image.split(',').length; i++) {
                    slides.innerHTML += `<li><img src="${post.image.split(',')[i]}" alt="게시글 이미지" class="picture"></li>`;
                    indicator.innerHTML += `<li>
                    <button type="button" class="list-slide current">
                    <span class="blind">1번 슬라이드</span>
                    </button>
                    </li>`
                }
            }
            else if (post.image.length === 0) {
                // 이미지 없을때
                slides.innerHTML = `<li></li>`;
            } else {
                slides.innerHTML += `<li><img src="${post.image}" alt="게시글 이미지" class="picture"></li>`;
                indicator.style.display = "none";
            }
            slideImgList()
        });
    getComment();
}


function getPostMoreBtn() {
    const queryString = window.location.href.split('?')[1]
    const commentMoreBtn = document.querySelector('.more-btn2');
    const buttonUserId = commentMoreBtn.dataset.userid;
    const modalMix = document.querySelector(".post-modal-mix");
    const modalTxtDelete = modalMix.querySelector('.modal-txt-delete');
    const modalTxtModi = document.querySelector('.modal-txt-modi')
    const alertPostDelete = document.querySelector('.alert-post-delete');
    const alertPostModi = document.querySelector('.alert-post-modi');
    const searchParams = new URLSearchParams(queryString)
    console.log("searchparams: ", searchParams)
    const postId = searchParams.get('id');
    commentMoreBtn.addEventListener('click', () => {
        if (userId === buttonUserId) {
            modalMix.classList.add('modal-open');
            modalWrapper.style.display = 'block';
        }
        modalTxtModi.addEventListener('click', () => {
            alertPostModi.style.display = 'block';
            alertActionBtn[3].addEventListener('click', () => {
                location.href = `upload.html?${postId}`;
            })
        })
        modalTxtDelete.addEventListener('click', () => {
            alertPostDelete.style.display = 'block';
            alertActionBtn[2].addEventListener('click', postDel)
        })
        alertCancelBtn[2].addEventListener('click', () => {
            alertPostDelete.style.display = 'none';
            modalWrapper.style.display = 'none';
            modalMix.classList.remove('modal-open');
        })
        if (userId !== buttonUserId) {
            modalReport.classList.add('modal-open');
            modalWrapper.style.display = 'block';
        }
        modalTxtReport.addEventListener('click', () => {
            alertCommentReport.style.display = 'block';
        })
    })
    modalWrapper.addEventListener('click', () => {
        modalWrapper.style.display = 'none';
        modalMix.classList.remove('modal-open');
    })
}


const goPostPage = document.querySelectorAll(".profile-pic")
for (const [idx, profile] of goPostPage.entries()) {
    profile.addEventListener('click', () => {
        window.location.href = `your_profile.html?id=${post[idx].id}`;
    })
}

// 이미지 슬라이드
function slideImgList() {
    const indicator = document.querySelector('.indicator');
    const buttons = indicator.querySelectorAll('.list-slide')
    const imgList = document.querySelector('.img-container');
    let currentBtn = indicator.querySelector(".current");
    buttons.forEach((button, index) => {
        buttons[0].classList.add('on');
        button.addEventListener("click", () => {
            currentBtn.classList.remove("on");
            button.classList.add("on");
            currentBtn = indicator.querySelector(".on");
            imgList.style.transform = `translateX(-${304 * index}px)`;
            imgList.style.transition = 'all 0.3s ease'
        });
    });
}


// 좋아요
async function fullHeart() {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    const postId = searchParams.get('id');
    await fetch(`http://146.56.183.55:5050/post/${postId}/heart`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    });
}
// 좋아요 취소
async function unHeart() {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    const postId = searchParams.get('id');
    await fetch(`http://146.56.183.55:5050/post/${postId}/unheart`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    });
}


// 댓글 가져오기
async function getComment() {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    console.log("searchparams: ", searchParams)
    const postId = searchParams.get('id');
    fetch(`http://146.56.183.55:5050/post/${postId}/comments`, {
        method: 'GET', // or 'PUT'
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            console.log("res2: ", res)
            const commentsDom = document.querySelector(".comment-container");
            commentsDom.innerHTML = "";
            res.comments.forEach((comment) => {
                commentsDom.innerHTML += `
            <div class="comment-view">
                <img class="profile-pic" src="${comment.author.image
                    }" alt="내 프로필 이미지">
                <div class="txt-container">
                    <div>
                        <span class="user-nic">${comment.author.username}</span>
                        <span class="comment-time">${getTimeString(
                        comment.createdAt
                    )}</span>
                    </div>
                    <p class="comment">${comment.content}</p>
                </div>
                <button class="more-btn3" data-commentid = "${comment.id}" data-userid="${comment.author._id}">
                    <img src="src/svg/s-icon-more-vertical.svg" alt="더보기" class="icon-more2">
                </button>
            </div> 
            `;

                // 댓글 프로필 이미지 클릭시 user 계정으로 이동
                const profilePic = document.querySelectorAll(".profile-pic");
                for (const i of profilePic) {
                    i.addEventListener('click', () => {
                        window.location.href = `your_profile.html?accountName=${comment.author.accountname}`;
                    })
                }

                getCommentMoreBtn();
            })
        });
};

function getCommentMoreBtn() {
    const commentMoreBtn = document.querySelectorAll('.more-btn3');
    console.log("commentbtn: ", commentMoreBtn)
    for (const button of commentMoreBtn.values()) {
        const loginUserId = localStorage.getItem('userId');
        const buttonUserId = button.dataset.userid;
        const modalTxtDelete = document.querySelector('.modal-txt-delete');
        const alertCommentDelete = document.querySelector('.alert-comment-delete');
        console.log('userid: ', loginUserId)
        console.log('buttonuserid: ', buttonUserId)
        if (loginUserId === buttonUserId) {
            button.addEventListener('click', () => {
                modalDelete.classList.add('modal-open');
                modalWrapper.style.display = 'block';
            });
            modalTxtDelete.addEventListener('click', () => {
                alertCommentDelete.style.display = 'block';
                alertActionBtn[0].addEventListener('click', commentDel)
            });
            alertCancelBtn[0].addEventListener('click', () => {
                alertCommentDelete.style.display = 'none';
                modalWrapper.style.display = 'none';
                modalDelete.classList.remove('modal-open');
            });
        } else {
            button.addEventListener('click', () => {
                modalReport.classList.add('modal-open');
                modalWrapper.style.display = 'block';
            });
            modalTxtReport.addEventListener('click', () => {
                alertCommentReport.style.display = 'block';
            });
            alertCancelBtn[1].addEventListener('click', () => {
                alertCommentReport.style.display = 'none';
                modalWrapper.style.display = 'none';
                modalReport.classList.remove('modal-open');
            });
        }
    }
    modalWrapper.addEventListener('click', () => {
        modalWrapper.style.display = 'none';
        modalDelete.classList.remove('modal-open');
        modalReport.classList.remove('modal-open');
    })
}


commentUploadButton.addEventListener("click", createComment);

// 댓글 입력
async function createComment() {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    console.log("searchparams: ", searchParams)
    const postId = searchParams.get('id');
    fetch(`http://146.56.183.55:5050/post/${postId}/comments`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            comment: {
                content: commentInput.value,
            },
        }),
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    });
    commentInput.value = "";
    location.href = `./post.html?${queryString}`;
}

// 게시글 삭제

async function postDel() {
    const commentMoreBtn = document.querySelector('.more-btn2');
    const buttonPostId = commentMoreBtn.dataset.postid;
    const res = await fetch(`http://146.56.183.55:5050/post/${buttonPostId}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    console.log(data);

    if (data) {
        location.href = `my_profile.html?${accountName}`;
    } else {
        alert('삭제 실패');
    }
}

// 댓글삭제

async function commentDel() {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    const postId = searchParams.get('id');
    const alertCommentDelete = document.querySelector('.alert-comment-delete');
    const moreBtn = document.querySelector('.more-btn3')
    const buttonUserId = moreBtn.dataset.commentid;
    const res = await fetch(
        `http://146.56.183.55:5050/post/${postId}/comments/${buttonUserId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
                "Content-Type": "application/json",
            },
        }
    );
    const data = await res.json();
    console.log("data: ", data);
    if (data) {
        alertCommentDelete.style.display = 'none';
        modalWrapper.style.display = 'none';
        modalDelete.classList.remove('modal-open');
        location.reload();
    } else {
        alert('삭제 실패');
    }
}

// 댓글 입력 프로필 이미지
async function profileImg() {
    const res = await fetch(
        `http://146.56.183.55:5050/profile/${accountName}`,
        {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
                "Content-Type": "application/json",
            },
        }
    );
    const data = await res.json();
    const commentContainer = document.querySelector('.comment-upload')
    commentContainer.innerHTML = `
        <div class="comment-upload">
            <img src="${data.profile.image}" alt="내 프로필 이미지" class="comment-user-profile">
            <input type="text" placeholder="댓글 입력하기..." class="comment-inp">
            <button class="comment-upload-btn">게시</button>
        </div>
    `
}


