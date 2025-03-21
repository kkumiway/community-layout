document.addEventListener("DOMContentLoaded", function () {
    // 요소 가져오기
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");
    const saveBtn = document.getElementById("save-btn");
    const imageUpload = document.getElementById("image-upload");
    const previewImage = document.getElementById("preview-image");

    // 헬퍼 메시지
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
    previewImage.src = imageSrc; // 이미지를 미리보기에 설정

    // 비동기 함수로 이미지 불러오기 처리
    async function loadImage() {
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();

            const fileName = imageSrc.split('/').pop(); // 파일명 추출
            const myFile = new File([blob], fileName, { type: blob.type });

            // DataTransfer를 이용하여 input[type="file"] 값 설정
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(myFile);
            imageUpload.files = dataTransfer.files;
        } catch (error) {
            console.error("이미지 파일을 불러오는 중 오류 발생:", error);
        }
    }

    // 비동기 함수 실행
    loadImage();

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

    // 이미지 업로드 시 미리보기 변경(사실 미리보기는 display: none임)
    imageUpload.addEventListener("change", function () {
        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
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
