// 이메일, 비밀번호 유효성 검사
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");
const updateBtn = document.getElementById("update-btn");

// 헬퍼 메시지
const passwordHelper = document.getElementById("password-helper");
const passwordConfirmHelper = document.getElementById("password-confirm-helper");

const passwordError = document.getElementById("password-error");
const passwordConfirmError = document.getElementById("password-confirm-error");

const toastMessage = document.getElementById("toast-message");

// 비밀번호 형식 검사 (8~20자, 대문자, 소문자, 숫자, 특수문자 포함)
function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(password);
}

// 비밀번호 확인이 비밀번호와 일치하는지 검사
function validatePasswordConfirm(password, passwordConfirm) {
    return password == passwordConfirm;
}

// 입력값 변경 시 유효성 검사 수행
function validateInputs() {
    const password = passwordInput.value.trim();
    const passwordConfirm = passwordConfirmInput.value.trim();

    let isValid = true;

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

    // 회원가입 버튼 활성화 / 비활성화
    if (isValid) {
        updateBtn.removeAttribute("disabled");
        updateBtn.style.backgroundColor = "#7F6AEE"; // 색상 변경
    } else {
        updateBtn.setAttribute("disabled", "true");
        updateBtn.style.backgroundColor = "#ACA0EB"; // 기본 색상
    }
}

// 페이지가 로드되면 validateInputs 실행
document.addEventListener("DOMContentLoaded", validateInputs);

// 입력 이벤트 리스너 추가
passwordInput.addEventListener("input", validateInputs);
passwordConfirmInput.addEventListener("input", validateInputs);

// Update button click handler
updateBtn.addEventListener("click", function () {
    if (!updateBtn.disabled) {
        toastMessage.classList.add("show");
        setTimeout(() => {
            toastMessage.classList.remove("show");
            alert("비밀번호가 수정되었습니다. 로그인 페이지로 이동합니다.");
            window.location.href = "login.html"; // Redirect to login page
        }, 2000); // disappears after 2 seconds
    }
});
