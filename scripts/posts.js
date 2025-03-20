// 작성 버튼 클릭 시 페이지 이동
document.querySelector('.write-post-btn').addEventListener('click', function() {
    window.location.href = "write_post.html"; // 게시글 작성 페이지로 이동
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("../components/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(error => console.error("헤더를 불러오는 중 오류 발생:", error));

    const postList = document.querySelector(".post-list");
    let page = 1; // 페이지 번호 (데이터 페이징 용)

    // 제목이 20자를 넘으면 '...' 처리
    function truncateTitle(title, maxLength = 20) {
        return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
    }

    // 숫자 변환 (1000 → 1K, 10000 → 10K, 100000 → 100K)
    function formatNumber(num) {
        if (num >= 100000) return Math.floor(num / 1000) + "K";
        if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "K";
        return num.toString();
    }

    // 더미 게시글 데이터 생성 함수
    function createPostCard(post) {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        postCard.innerHTML = `
            <div class="post-header">
                <span>${truncateTitle(post.title)}</span>
            </div>
            <div class="post-info">
                <span>좋아요 ${formatNumber(post.likes)}  댓글 ${formatNumber(post.comments)}  조회수 ${formatNumber(post.views)}</span>
                <span>${post.date}</span>
            </div>
            <div class="post-divider"></div>
            <div class="post-writer">
                <img src="../assets/profile-placeholder.png" alt="프로필 이미지" class="profile-image">
                <span>${post.author}</span>
            </div>
        `;

        // 클릭 시 post.html로 이동 (postId를 쿼리 파라미터로 전달)
        postCard.addEventListener("click", function () {
            // window.location.href = `post.html?id=${postId}`;
            window.location.href = `post.html`
        });

        return postCard;
    }

    // 더미 데이터 생성
    function generateDummyPosts(count) {
        const posts = [];
        for (let i = 0; i < count; i++) {
            posts.push({
                title: `20자 이상 될 수도? 있는 제목 ${page * count + i + 1}`,
                likes: Math.floor(Math.random() * 100000),
                comments: Math.floor(Math.random() * 5000),
                views: Math.floor(Math.random() * 500000),
                date: new Date().toISOString().slice(0, 19).replace("T", " "),
                author: `작성자 ${page * count + i + 1}`,
            });
        }
        return posts;
    }

    // 게시글 추가 함수
    function addPosts(count = 5) {
        const newPosts = generateDummyPosts(count);
        newPosts.forEach(post => {
            postList.appendChild(createPostCard(post));
        });
        page++; // 페이지 증가
    }

    // 초기 5개 게시글 추가
    addPosts(5);

    // 무한 스크롤 이벤트 리스너
    window.addEventListener("scroll", function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            addPosts(5); // 스크롤이 끝에 도달하면 5개 추가
        }
    });
});