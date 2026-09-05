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

  // 6. (나중에 여기서 백엔드로 재료를 보낼 거예요!)
});