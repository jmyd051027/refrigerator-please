// 1. 버튼과 입력창을 찾아오기
const button = document.getElementById("recommendBtn");
const input = document.getElementById("ingredients");
const result = document.getElementById("result");

// 2. 버튼을 클릭하면 실행되는 함수
button.addEventListener("click", async () => {
  // 3. 입력창에 적은 재료 가져오기
  const ingredients = input.value;

  // 4. 재료를 안 적었으면 알려주기
  if (ingredients === "") {
    result.innerText = "재료를 입력해주세요! 🥕";
    return;
  }

  // 5. 기다리는 중 표시
  result.innerText = "메뉴를 생각하는 중... 🍳";

   // 6. 백엔드(api/recommend)로 재료 보내기
  try {
    const response = await fetch("/api/recommend", {
      method: "POST",                              // 데이터를 보낼 땐 POST
      headers: { "Content-Type": "application/json" }, // JSON 형식으로 보낸다고 알림
      body: JSON.stringify({ ingredients: ingredients }) // 재료를 JSON으로 변환
    });

    const data = await response.json();  // 서버 응답을 JSON으로 받기

    // 7. 받아온 추천 메뉴를 화면에 표시
    result.innerText = data.result;
  } catch (error) {
    // 8. 에러가 나면 알려주기
    result.innerText = "앗! 오류가 발생했어요 😢 다시 시도해주세요.";
    console.error(error);  // 개발자 도구에 자세한 에러 출력
  }});