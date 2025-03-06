// 이메일, 비밀번호 유효성 검사
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");

// 오류 메시지
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

// 이메일 형식 검사
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// 비밀번호 형식 검사 (8~20자, 대문자, 소문자, 숫자, 특수문자 포함)
function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(password);
}

// 입력값 변경 시 유효성 검사 수행
function validateInputs() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
        emailError.textContent = "*올바른 이메일 주소를 입력해주세요.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(password)) {
        passwordError.textContent = "*비밀번호는 8~20자이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    // 로그인 버튼 활성화 / 비활성화
    if (isValid) {
        loginButton.removeAttribute("disabled");
        loginButton.style.backgroundColor = "#7F6AEE"; // 색상 변경
    } else {
        loginButton.setAttribute("disabled", "true");
        loginButton.style.backgroundColor = "#ACA0EB"; // 기본 색상
    }
}

// 입력 이벤트 리스너 추가
emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);

// 로그인 버튼 클릭 시 페이지 이동
loginButton.addEventListener("click", function() {
    if (!loginButton.disabled) {
        alert("로그인 성공! 게시판으로 이동합니다.");
        window.location.href = "post.html"; // 게시글 목록 페이지로 이동
    }
});
