# reservation-mc
browser-based naju-hills reservation (stable)

### Via Bookmark
1. 아래 [스크립트](https://github.com/SuperLeeK/reservation-mc/blob/main/bookmark.js)를 복사하기 (우측 복사버튼)
    ```javascript
    javascript:(function(){fetch('https://raw.githubusercontent.com/SuperLeeK/reservation-mc/refs/heads/main/script.js').then(response=>{if(!response.ok){throw new Error(`Failed to fetch script: ${response.statusText}`);}return response.text();}).then(scriptContent=>{const script=document.createElement('script');script.textContent=scriptContent;document.head.appendChild(script);console.log('Script loaded and executed.');}).catch(error=>{console.error(error);});})();
    ```
2. 브라우저에서, `ctrl+shift+b` 를 통해 북마크바 표시하기
3. `ctrl+d` 를 통해 아무 페이지에서 북마크 추가
4. 북마크 우클릭 - 수정
5. 북마크 "url" 부분에 복사한 스크립트 붙여넣기 (제목 x)
6. [예약 할 화면](https://najuhills.com/reservation) 페이지에서, 해당 북마크 클릭하고 날짜 입력하기 ( 예약할 날짜 )