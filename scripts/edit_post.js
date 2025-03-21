document.addEventListener("DOMContentLoaded", function () {
    // 요소 가져오기
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");
    const saveBtn = document.getElementById("save-btn");
    const contentInputHelper = document.getElementById("content-input-helper");
    
    // URL에서 데이터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    const title = decodeURIComponent(urlParams.get("title") || "");
    const content = decodeURIComponent(urlParams.get("content") || "");
    const imageSrc = decodeURIComponent(urlParams.get("image") || "../assets/profile-placeholder.png");

    // 가져온 데이터를 입력 필드에 채우기
    document.getElementById("post-title").value = title;
    document.getElementById("post-content").value = content;
    document.getElementById("preview-image").src = imageSrc;

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

    // 제목 입력 제한 (최대 26자)
    titleInput.addEventListener("input", function () {
        if (this.value.length > 26) {
            this.value = this.value.slice(0, 26);
        }
        validateInputs();
    });

    // 본문 입력 감지
    contentInput.addEventListener("input", validateInputs);

    // 수정 완료 버튼 클릭 시
    saveBtn.addEventListener("click", function () {
        if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        alert("게시글이 수정되었습니다.");
        titleInput.value = "";
        contentInput.value = "";
        imageUpload.innerHTML = "";
        saveBtn.classList.remove("active");
        saveBtn.disabled = true;
        window.location.href = "post.html"; // 게시글 목록 페이지로 이동
        window.location.href = `post.html?id=${postId}`; // 게시글 상세 페이지로 이동
    });
});
