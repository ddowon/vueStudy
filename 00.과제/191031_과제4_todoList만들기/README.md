# 과제4. Local Storage를 활용한 Vuex Todo List
>기한: 김도원(10월 30일(수) PM 03:00), 명소희(10월 31일(목) PM 03:00)
***
## 필수과제
1. 터미널(우리가 쓰는 프로그램은 Cmder)에서 vue ui 명령어로 Todo List 프로젝트를 새로 생성한다.
    > 반드시 새로 프로젝트를 생성해야 하며, 기존 과제를 복사하거나 붙여넣지 않아야 한다.

2. Vuex와 Babel-polyfill을 GUI 화면 또는 터미널에서 추가 설치한다.

3. `TodoInput.vue, TodoStatus.vue, TodoSearch.vue` 그리고 `common/Modal.vue` 컴포넌트를 작성한다.

4. `할 일 객체는 제목과 완료여부`를 담고 있어야 하며, `할 일 배열(todos)은 HTML5 LocalStorage와 연동`한다.
    > 힌트: Local Storage로 기간 만료 없이 사용자 도메인의 Local Storage 객체에 접근, 데이터를 저장할 수 있다.
    > - `localStorage.setItem('name', '조하늘')` => 단일 데이터 저장
    > - `let arrs = [ '사과', '딸기', '배', '바나나' ]`
    > - `localStorage.setItem('fruits', arrs)` => 배열 데이터 저장
    > - `localStorage.getItem('fruits')` => 데이터 읽기
    > - `localStorage.removeItem('fruits')` => 데이터 삭제
    > - `localStorage.clear()` => 데이터 전체삭제

5. Todo List는 다음의 기능을 갖고 있어야 한다.
    - 할 일 보기/추가/수정/삭제
    - 전체보기/미완료/완료 목록 필터링
    - 제목으로 할 일 검색

6. 할 일을 수정하거나 삭제할 때는 공통 모달창 `common/Modal.vue` 파일을 사용하며, 모달창에 Props로 모달 타이틀과 내용을 전달하도록 한다.
    > 힌트: v-if 디렉티브로 수정 모달창이면 수정 input를 표시, 삭제 모달창이면 input를 비표시

7. 할 일 검색에는 find()와 includes() 메서드를 사용하거나 자유롭게 구현한다.
    > 힌트: find()와 includes() 메서드를 조합하면 특정 문자열을 지닌 배열을 추출할 수 있다.
    > - `let test = '조하늘'`
    > - `console.log(test.includes('하늘'))` => true를 반환

> 각자 배운 내용을 모두 활용하여 자유롭게 작성한다.
