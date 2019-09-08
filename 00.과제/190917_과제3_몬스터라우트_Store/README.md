# 과제3. 몬스터 페이지 라우트와 Store
>기한: 9월 17일(화) AM 02:00
***
## 필수과제
1. src/components/AppSubNav.vue 컴포넌트 안에 monster 서브 메뉴를 출력한다. '몬스터 정보 보기'는 서브 메뉴가 될 수 없으므로, 서브 메뉴를 출력하는 v-for문에서 예외 처리한다.

2. src/components/MonsterList.vue의 `[자세히 보기] 클릭 시 모달창 대신 http://localhost:8080/#/monster/view/몬스터 숫자(= 배열 인덱스)로 이동`하도록 수정한다.

3. 몬스터 자세히 보기 화면에서 지난 과제와 마찬가지로 정보와 때리기를 탭으로 구분하고, 몬스터의 hp가 40이하면 노란색, 20이하면 빨간색 그래프를 나타내도록 class를 추가한다.

4. src/components/MonsterForm.vue 컴포넌트 안에 몬스터를 추가하는 form과 methods를 작성한다.
> 반드시 store/monsters.js에서 불러온 몬스터 배열 정보를 바탕으로 input을 배치한다.
> 힌트: 처음 몬스터를 추가할 때 fullHP와 hp는 동일한 값이어야 한다.

> 각자 배운 내용을 모두 활용하여 자유롭게 작성한다.

***

## 선택과제
- store/index.js에 몬스터를 제거하는 methods를 추가한 후, 몬스터 자세히 보기 화면에서 `[몬스터 삭제하기] 클릭 시 몬스터를 제거`한다.
- 몬스터를 추가하고 나면 '몬스터를 추가하였습니다!' 메시지를 보여주고, `입력 form을 비우거나` `몬스터 리스트(http://localhost:8080/#/monster)로 이동`한다. (택1)
> 힌트: 몬스터를 추가하면 msg에 값을 넣어 해당 값이 있을 때만 p 태그를 렌더링한다. `<p v-if="msg">{{ msg }}</p>`

***

### 참고파일
>190910_중첩라우트_Form_Store 폴더의 힌트 코드를 바탕으로 과제를 수행해 보세요.
>- [vue-study/02.예제코드/190910_중첩라우트_Form_Store](https://bitbucket.org/pubweb_ui/vue-study/src/master/02.%EC%98%88%EC%A0%9C%EC%BD%94%EB%93%9C/190910_%EC%A4%91%EC%B2%A9%EB%9D%BC%EC%9A%B0%ED%8A%B8_Form_Store/)
