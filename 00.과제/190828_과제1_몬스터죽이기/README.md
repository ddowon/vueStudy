# 과제1. 몬스터 죽이기
>기한: 8월 28일(수) AM 02:00
***
## 필수과제
1. 현재 메뉴는 3개인데, 1개를 더 추가한다.
>(메뉴명: 과제 <views/Homework.vue, components/HomeworkView.vue> / http://localhost:8080/#/homework로 접근 가능해야 함!)
2. 과제 메뉴를 클릭하면 HomeworkView.vue가 보인다.
3. HomeworkView.vue 안에 monster라는 객체를 만들고 해당 객체에 name(자유), hp(100) 속성을 부여한다.
4. [ 때리기 ] 버튼을 클릭하면 어떠한 메소드를 호출, 3번에서 만든 monster의 hp를 1번 때릴 때마다 10씩 깎는다.
5. isDied라는 변수를 만들고 isDied에 따라 p 태그를 렌더링한다.
>(v-if / v-else 사용 / isDied의 true 조건 = monster의 hp가 0이 되었을 때)
>v-if="isDied" 시 죽었습니다! 아닐 시 아직 살아있어요!
6. node_modules 빼고 압축해서 00.과제 - 과제명 - 자기 이름 폴더에 올린다.

## 선택과제
* github에 Bookmark 앱을 올려서 -> github pages에 페이지를 serving 한다.
>(npm run build 후 dist 폴더에 생성된 html, cs,s js 파일을 복사해서 github Bookmark앱에 올림)
* 버튼은 예쁘게 Element-UI의 button 라이브러리에서 아무거나 하나 가져다 쓰자.