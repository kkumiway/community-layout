document.addEventListener("DOMContentLoaded", function () {
    // 요소 가져오기
    const likeBtn = document.getElementById("like-btn");
    const viewCount = document.querySelector("#view-count span:first-child");
    const commentCount = document.querySelector("#comment-count span:first-child");
    const commentInput = document.getElementById("comment-input");
    const commentSubmit = document.getElementById("comment-submit");
    const commentList = document.getElementById("comment-list");

    const postModal = document.getElementById("post-delete-modal");
    const postEditBtn = document.getElementById("post-edit-btn");
    const postDeleteBtn = document.getElementById("post-delete-btn");
    const postModalCancel = document.getElementById("post-modal-cancel");
    const postModalConfirm = document.getElementById("post-modal-confirm");

    const commentModal = document.getElementById("comment-delete-modal");
    const commentModalCancel = document.getElementById("comment-modal-cancel");
    const commentModalConfirm = document.getElementById("comment-modal-confirm");

    let isLiked = false; // 좋아요 버튼 상태 저장

    // 숫자 변환 (1000 → 1K, 10000 → 10K, 100000 → 100K)
    function formatNumber(num) {
        if (num >= 100000) return Math.floor(num / 1000) + "K";
        if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "K";
        return num.toString();
    }

    // 조회수 & 댓글수 초기 포맷 적용
    viewCount.innerText = formatNumber(Number(viewCount.innerText));
    commentCount.innerText = formatNumber(Number(commentCount.innerText));

    // 게시글 수정 버튼 클릭 시 페이지 이동
    postEditBtn.addEventListener("click", function () {
        alert("게시글 수정 페이지로 이동합니다.");
        window.location.href = "edit_post.html"; // 게시글 수정 페이지로 이동
    });

    // 게시글 삭제 버튼 클릭 시 모달 열기
    postDeleteBtn.addEventListener("click", function () {
        deletePost();
    });

    // 좋아요 버튼 클릭 이벤트
    likeBtn.addEventListener("click", function () {
        let likeCount = parseInt(this.querySelector("span").innerText);
        if (!isLiked) {
            likeCount += 1;
            this.style.backgroundColor = "#ACA0EB";
        } else {
            likeCount -= 1;
            this.style.backgroundColor = "#D9D9D9";
        }
        this.querySelector("span").innerText = likeCount;
        isLiked = !isLiked;
    });

    // 댓글 입력 시 버튼 활성화/비활성화
    commentInput.addEventListener("input", function () {
        if (commentInput.value.trim() !== "") {
            commentSubmit.disabled = false;
            commentSubmit.style.backgroundColor = "#7F6AEE"; // 활성화 색상
        } else {
            commentSubmit.disabled = true;
            commentSubmit.style.backgroundColor = "#ACA0EB"; // 비활성화 색상
        }
    });

    // 기존 댓글 등록 이벤트를 별도로 유지
    commentSubmit.addEventListener("click", addNewComment);

    // 원래의 댓글 등록 기능을 위한 함수
    function addNewComment() {
        const commentText = commentInput.value.trim();
        if (commentText === "") return;

        const newComment = document.createElement("li");
        newComment.classList.add("comment");
        newComment.innerHTML = `
            <div class="comment-header">
                <div class="writer-container">
                    <img src="../assets/profile-placeholder.png" alt="프로필 이미지" class="profile-image">
                    <p class="writer">새로운 작성자</p>
                    <p class="date">${new Date().toISOString().slice(0, 19).replace("T", " ")}</p>
                </div>
                <div class="button-container">
                    <button class="edit-btn">수정</button>
                    <button class="delete-btn">삭제</button>
                </div>
            </div>
            <p class="comment-content">${commentText}</p>
        `;

        // 삭제 및 수정 이벤트 추가
        newComment.querySelector(".delete-btn").addEventListener("click", function () {
            deleteComment(newComment);
        });

        newComment.querySelector(".edit-btn").addEventListener("click", function () {
            editComment(newComment);
            return;
        });

        commentList.appendChild(newComment);
        commentInput.value = "";
        commentSubmit.disabled = true;
        commentSubmit.style.backgroundColor = "#ACA0EB"; // 비활성화 색상

        // 댓글 수 업데이트
        let count = parseInt(commentCount.innerText.replace("k", "000"));
        count += 1;
        commentCount.innerText = formatNumber(count);
    }

    function editComment(commentItem) {
        const commentContent = commentItem.querySelector(".comment-content"); // 기존 댓글 내용 가져오기
        const originalText = commentContent.innerText; // 기존 텍스트 저장
    
        commentInput.value = originalText; // 입력창에 기존 댓글 내용 표시
        commentSubmit.innerText = "댓글 수정"; // 버튼 텍스트 변경
        commentSubmit.disabled = false;
        commentSubmit.style.backgroundColor = "#7F6AEE"; // 활성화 색상
    
        // 기존 이벤트 리스너 제거 (이전 수정 이벤트 중복 방지)
        commentSubmit.removeEventListener("click", addNewComment);
        commentSubmit.removeEventListener("click", updateComment);
    
        // 수정된 댓글을 업데이트하는 함수
        function updateComment() {
            if (commentInput.value.trim() !== "") {
                commentContent.innerText = commentInput.value; // 기존 댓글 내용 변경
                commentInput.value = ""; // 입력창 초기화
                commentSubmit.innerText = "댓글 등록"; // 버튼 텍스트 원상 복구
                commentSubmit.disabled = true;
                commentSubmit.style.backgroundColor = "#ACA0EB"; // 비활성화 색상
    
                // 수정 완료 후 다시 댓글 등록 기능으로 복구
                commentSubmit.removeEventListener("click", updateComment);
                commentSubmit.addEventListener("click", addNewComment);
            }
        }
    
        // 새로운 수정 이벤트 리스너 등록
        commentSubmit.addEventListener("click", updateComment);
    }

    // 게시글 삭제 모달에서 일어나는 작용
    function deletePost(){
        postModal.style.display = "flex";

        // 확인 버튼 클릭 시 삭제하고 페이지 이동
        postModalConfirm.addEventListener("click", function () {
            alert("게시글이 삭제되었습니다. 게시글 목록 페이지로 이동합니다.");
            postModal.style.display = "none";
            window.location.href = "posts.html"; // 게시글 목록 페이지로 이동
        });
        
        // 모달 취소 버튼 클릭 시 닫기
        postModalCancel.addEventListener("click", function () {
            postModal.style.display = "none";
        });
    }

    // 댓글 삭제 모달에서 일어나는 작용
    function deleteComment(commentItem) {
        commentModal.style.display = "flex";

        // 확인 버튼 클릭 시 삭제하고 페이지 이동
        commentModalConfirm.addEventListener("click", function () {
            commentItem.remove();
            alert("댓글이 삭제되었습니다.");
            commentModal.style.display = "none";

            // 댓글 수 업데이트
            let count = parseInt(commentCount.innerText.replace("k", "000"));
            count -= 1;
            commentCount.innerText = formatNumber(count);
        });
        
        // 모달 취소 버튼 클릭 시 닫기
        commentModalCancel.addEventListener("click", function () {
            commentModal.style.display = "none";
        });
    };
});