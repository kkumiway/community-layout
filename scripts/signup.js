// 이메일, 비밀번호 유효성 검사
const profilePicInput = document.getElementById("profile-pic");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");

// 헬퍼 메시지
const profilePicHelper = document.getElementById("profile-pic-helper");
const emailHelper = document.getElementById("email-helper");
const passwordHelper = document.getElementById("password-helper");

// 오류 메시지
const profilePicError = document.getElementById("profile-pic-error");
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

// 닉네임 검사 (10자 이하)
function validateNickname(nickname) {
    return nickname.length <= 10;
}

// 비밀번호 확인이 비밀번호와 일치하는지 검사
function validatePasswordConfirmation(password, confirmPassword) {
    return password === confirmPassword;
}

// 입력값 변경 시 유효성 검사 수행
function validateInputs() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const profilePic = profilePicInput.value;
    let isValid = true;

    // 프로필 사진 유효성 검사
    if (!profilePic) {
        profilePicHelper.textContent = "*프로필 사진을 업로드해주세요.";
        profilePicHelper.style.display = "block";
        isValid = false;
    }else{
        profilePicHelper.style.display = "none";
    }

    // 이메일 유효성 검사
    if (!email) {
        emailHelper.textContent = "*이메일 주소를 입력해주세요.";
        emailError.style.display = "none";
        isValid = false;
    }else{
        emailHelper.style.display = "none";
        if (!validateEmail(email)) {
            emailError.textContent = "*올바른 이메일 주소를 입력해주세요.";
            emailError.style.display = "block"; // 오류 메시지 보이기
            isValid = false;
        } else {
            emailError.style.display = "none"; // 오류 메시지 숨기기
        }
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

function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("image-preview");
  
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.style.backgroundImage = `url(${e.target.result})`;
        preview.innerHTML = ''; // Clear the "+" sign
      };
      reader.readAsDataURL(file);
    } else {
      preview.style.backgroundImage = '';
      preview.innerHTML = '<span>+</span>';
    }
  }

// 페이지가 로드되면 validateInputs 실행
document.addEventListener("DOMContentLoaded", validateInputs);

// 입력 이벤트 리스너 추가
profilePicInput.addEventListener("input", validateInputs);
emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);

// 로그인 버튼 클릭 시 페이지 이동
loginButton.addEventListener("click", function() {
    if (!loginButton.disabled) {
        alert("로그인 성공! 게시판으로 이동합니다.");
        window.location.href = "post.html"; // 게시글 목록 페이지로 이동
    }
});
