const profilePicInput = document.getElementById("profile-pic");
const nicknameInput = document.getElementById("nickname");
const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");
const toastMessage = document.getElementById("toast-message");
const deleteModal = document.getElementById("delete-modal");
const deleteModalCancel = document.getElementById("modal-cancel-delete");
const deleteModalConfirm = document.getElementById("modal-confirm-delete");

const nicknameHelper = document.getElementById("nickname-helper");
const nicknameError = document.getElementById("nickname-error");

// Default values
document.getElementById("nickname").value = "스타트업코드";
document.getElementById("email").value = "startupcode@gmail.com";
document.getElementById("profile-image").src = "../assets/profile-placeholder.png";

document.addEventListener("DOMContentLoaded", function () {    
    // Nickname validation (max 10 characters and no spaces)
    function validateNickname(nickname) {
        const containsWhitespace = /\s/; // Checks for whitespace
        if (containsWhitespace.test(nickname)) {
            return false;
        }
        return nickname.length <= 10; // Validate that the nickname is less than or equal to 10 characters
    }

    // Validate inputs
    function validateInputs() {
        const nickname = nicknameInput.value.trim();

        let isValid = true;

        // Nickname validation
        if (!nickname) {
            nicknameHelper.textContent = "*닉네임을 입력해주세요.";
            nicknameHelper.style.display = "block";
            nicknameError.style.display = "none";
            isValid = false;
        } else {
            nicknameHelper.style.display = "none";
            if (!validateNickname(nickname)) {
                nicknameError.textContent = "*닉네임은 최대 10자까지 작성 가능하며, 공백을 포함할 수 없습니다.";
                nicknameError.style.display = "block";
                isValid = false;
            } else {
                nicknameError.style.display = "none";
            }
        }

        // Enable or disable update button based on validation
        if (isValid) {
            updateBtn.removeAttribute("disabled");
            updateBtn.style.backgroundColor = "#7F6AEE"; // Change button color to active
        } else {
            updateBtn.setAttribute("disabled", "true");
            updateBtn.style.backgroundColor = "#ACA0EB"; // Default inactive color
        }
    }

    // Run validation on page load
    validateInputs();

    // Add event listeners for real-time validation
    profilePicInput.addEventListener("input", validateInputs);
    nicknameInput.addEventListener("input", validateInputs);
});

// Profile picture upload preview
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
        preview.innerHTML = '<p class="text">변경</p>';
    }
}

// Update button click handler
updateBtn.addEventListener("click", function () {
    if (!updateBtn.disabled) {
        toastMessage.classList.add("show");
        setTimeout(() => {
            toastMessage.classList.remove("show");
            alert("회원 정보가 수정되었습니다. 로그인 페이지로 이동합니다.");
            window.location.href = "login.html"; // Redirect to login page
        }, 2000); // disappears after 2 seconds
    }
});

// 회원 탈퇴 모달
deleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "flex";
});

deleteModalCancel.addEventListener("click", function () {
    deleteModal.style.display = "none";
});

deleteModalConfirm.addEventListener("click", function () {
    alert("회원 탈퇴가 완료되었습니다.");
    deleteModal.style.display = "none";
    window.location.href = "login.html";
});
