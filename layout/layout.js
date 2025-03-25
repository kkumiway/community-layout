document.addEventListener("DOMContentLoaded", function() {
    fetch("../components/header.html") // 헤더 HTML을 가져옴
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            setupProfileDropdown();
        })
        .catch(error => console.error("헤더를 불러오는 중 오류 발생:", error));
});

function setupProfileDropdown() {
    const profileButton = document.getElementById("profile-button");
    const dropdownMenu = document.getElementById("dropdown-menu");

    profileButton.addEventListener("click", function() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(event) {
        if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
}

// 기능 함수 (클릭 시 실행할 함수들)
function editProfile() {
    alert("회원정보 수정 페이지로 이동");
    window.location.href = "/edit-profile.html";
}

function changePassword() {
    alert("비밀번호 수정 페이지로 이동");
    window.location.href = "/change-password.html";
}

function logout() {
    alert("로그아웃되었습니다.");
    window.location.href = "/login.html";
}