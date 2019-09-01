# 과제2. 몬스터 리스트
>기한: 9월 2일(월) PM 11:59
***
## 필수과제
1. src/views/Monster.vue 라우터 뷰 컴포넌트 안에 src/components/MonsterList.vue 컴포넌트를 import 구문으로 가져온 후, `<template>`안에 삽입한다.

2. MonsterList.vue에는 v-for문을 사용하여 src/views/Monster.vue의 data 중 monsters 배열을 `<li> 및 <button>몬스터 자세히 보기</button> 버튼을 포함하여` 반복 렌더링 한다.

3. Monster.vue 안에 있는 monsters 배열 속 객체 데이터의 속성과 값은 자유이나 monster.name은 반드시 있어야 한다. ex) { name: ‘하늘’, age: 29, desc: ‘짱짱걸’ }

4. 2번의 `<button>몬스터 자세히 보기</button>` 버튼 클릭 시, 해당 몬스터의 세부 속성을 src/components/MonsterModal.vue 컴포넌트를 import 해서 해당 Modal창에 보여준다.

5. MonsterList.vue의 v-for문 바깥으로 `<button>몬스터 추가하기</button>` 버튼 클릭 시, 부모 컴포넌트 Monster.vue에 있는 monsters 배열에 새 몬스터를 추가한다.

6. 최종 과제 파일을 `vue-study/00.과제/190902_과제2_몬스터리스트/자기 이름` 폴더에 올린다.
> 압축하지 않고 package.json 파일 포함해서 올려 주세요.

***

## 선택과제
- 지난 시간 과제였던 몬스터 죽이기와 몬스터 리스트를 결합, MonsterModal.vue 안에 버튼 몬스터 때리기 컴포넌트를 불러온다.
> 힌트: src/components/MonsterHit.vue 컴포넌트 생성, src/views/Monster.vue의 monsters 배열에 isDied 속성 추가

- 필수과제 4번의 Modal창은 몬스터의 정보와 몬스터 때리기가 같이 보이는 형태가 되어야 한다.
> 단, MonsterModal.vue 파일 `<template>` 안에 `<MonsterHit />` 컴포넌트가 있어야 함

***

### 참고파일
>190831_부모 자식 컴포넌트 폴더의 힌트 코드를 바탕으로 과제를 수행해 보세요.
>- [vue-study/02.예제코드/190831_부모 자식 컴포넌트](https://bitbucket.org/pubweb_ui/vue-study/src/master/02.%EC%98%88%EC%A0%9C%EC%BD%94%EB%93%9C/190831_%EB%B6%80%EB%AA%A8%20%EC%9E%90%EC%8B%9D%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8/)
