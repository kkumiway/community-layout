document.addEventListener("DOMContentLoaded", function() {
    fetch("/components/header.html") // 헤더 HTML을 가져옴
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(error => console.error("헤더를 불러오는 중 오류 발생:", error));
});
