import Vue from 'vue'
import monsters from '@/store/monsters'

export const store = Vue.observable({
	monsters: monsters
})

export const mutations = {
	addMonster : function(obj){
		monsters.push(obj);
		alert('추가되었습니다');
		window.history.go(-1);
	},
	removeMonster : function(idx){
		// monsters.splice(idx, 1);

		if(confirm('삭제하시겠습니까?')){
			monsters.splice(idx, 1);
			alert('삭제되었습니다.');
			window.history.go(-1);
		}else{
			alert('바보');
		}

	}
	
	// 여기에 addMonster와 removeMonster를 구현해 보세요.

}