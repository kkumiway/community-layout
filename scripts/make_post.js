const titleInput = document.getElementById("post-title");
const contentInput = document.getElementById("post-content");
const saveBtn = document.getElementById("submit-btn");
const imageUpload = document.getElementById("image-upload");

//헬퍼 메시지
const contentInputHelper = document.getElementById("content-input-helper");

// 유효성 검사
function validateInputs() {
    if (titleInput.value.trim() !== "" && contentInput.value.trim() !== "") {
        saveBtn.classList.add("active");
        saveBtn.disabled = false;

        contentInputHelper.style.display = "none";
    } else {
        saveBtn.classList.remove("active");
        saveBtn.disabled = true;

        contentInputHelper.textContent = "*제목, 내용을 모두 작성해주세요.";
        contentInputHelper.style.display = "block";
    }
}

// 페이지가 로드되면 validateInputs 실행
document.addEventListener("DOMContentLoaded", validateInputs);

// 제목 입력 제한 (최대 26자)
titleInput.addEventListener("input", function () {
    if (this.value.length > 26) {
        this.value = this.value.slice(0, 26);
    }
    validateInputs();
});

// 본문 입력 감지
contentInput.addEventListener("input", validateInputs);

// 이미지 업로드 처리
imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; border-radius: 5px;">`;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = "";
    }
});

// 게시글 등록 버튼 클릭 이벤트
saveBtn.addEventListener("click", function () {
    if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
        alert("제목과 내용을 모두 작성해주세요.");
        return;
    }
    alert("게시글이 등록되었습니다!");
    titleInput.value = "";
    contentInput.value = "";
    imageUpload.innerHTML = "";
    saveBtn.classList.remove("active");
    saveBtn.disabled = true;
    window.location.href = "post.html"; // 게시글 목록 페이지로 이동
});

