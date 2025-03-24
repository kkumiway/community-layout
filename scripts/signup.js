// 이메일, 비밀번호 유효성 검사
const profilePicInput = document.getElementById("profile-pic");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");
const nicknameInput = document.getElementById("nickname");
const signupButton = document.getElementById("signup-btn");

// 헬퍼 메시지
const profilePicHelper = document.getElementById("profile-pic-helper");
const emailHelper = document.getElementById("email-helper");
const passwordHelper = document.getElementById("password-helper");
const passwordConfirmHelper = document.getElementById("password-confirm-helper");
const nicknameHelper = document.getElementById("nickname-helper");

// 오류 메시지
const profilePicError = document.getElementById("profile-pic-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const passwordConfirmError = document.getElementById("password-confirm-error");
const nicknameError = document.getElementById("nickname-error");

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

// 닉네임 검사 (10자 이하 및 공백 포함 여부)
function validateNickname(nickname) {
    // 닉네임에 공백이 포함되어 있으면 false 반환
    const containsWhitespace = /\s/; // \s는 공백 문자 (띄어쓰기, 탭, 개행 등)를 의미
    if (containsWhitespace.test(nickname)) {
        return false;
    }
    return nickname.length < 10; // 10자 이하인지도 체크
}

// 비밀번호 확인이 비밀번호와 일치하는지 검사
function validatePasswordConfirm(password, passwordConfirm) {
    return password == passwordConfirm;
}

// 입력값 변경 시 유효성 검사 수행
function validateInputs() {
    const profilePic = profilePicInput.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordConfirm = passwordConfirmInput.value.trim();
    const nickname = nicknameInput.value.trim();

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
    if (!password) {
        passwordHelper.textContent = "*비밀번호를 입력해주세요.";
        passwordError.style.display = "none";
        isValid = false;
    }else{
        passwordHelper.style.display = "none";
        if (!validatePassword(password)) {
            passwordError.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
            passwordError.style.display = "block"; // 오류 메시지 보이기
            isValid = false;
        } else {
            passwordError.style.display = "none"; // 오류 메시지 숨기기

            // 비밀번호가 정상일 때만 비밀번호 확인 유효성 검사
            if (!passwordConfirm) {
                passwordConfirmHelper.textContent = "*비밀번호를 한 번 더 입력해주세요.";
                passwordConfirmError.style.display = "none";
                isValid = false;
            }else{
                passwordConfirmHelper.style.display = "none";
                if (password !== passwordConfirm) {
                    passwordConfirmError.textContent = "*비밀번호가 다릅니다.";
                    passwordConfirmError.style.display = "block"; // 오류 메시지 보이기
                    isValid = false;
                } else {
                    passwordConfirmError.style.display = "none"; // 오류 메시지 숨기기
                }
            }
        }
    }

    // 닉네임 유효성 검사
    if (!nickname) {
        nicknameHelper.textContent = "*닉네임을 입력해주세요.";
        nicknameError.style.display = "none";
        isValid = false;
    } else {
        nicknameHelper.style.display = "none";
        if (!validateNickname(nickname)) {
            // 닉네임에 공백이 포함되거나 10자 초과시 오류 메시지 표시
            nicknameError.textContent = "*닉네임은 최대 10자까지 작성 가능하며, 공백을 포함할 수 없습니다.";
            nicknameError.style.display = "block"; // 오류 메시지 보이기
            isValid = false;
        } else {
            nicknameError.style.display = "none"; // 오류 메시지 숨기기
        }
    }

    // 회원가입 버튼 활성화 / 비활성화
    if (isValid) {
        signupButton.removeAttribute("disabled");
        signupButton.style.backgroundColor = "#7F6AEE"; // 색상 변경
    } else {
        signupButton.setAttribute("disabled", "true");
        signupButton.style.backgroundColor = "#ACA0EB"; // 기본 색상
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
passwordConfirmInput.addEventListener("input", validateInputs);
nicknameInput.addEventListener("input", validateInputs);

// 회원가입 버튼 클릭 시 페이지 이동
signupButton.addEventListener("click", function() {
    if (!signupButton.disabled) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        window.location.href = "login.html"; // 로그인 페이지로 이동
    }
});
