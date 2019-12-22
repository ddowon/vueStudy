<template>
	<form>
		<h3>새 메뉴 등록하기</h3>

		<div class="form-group row">
			<label class="col-sm-3">메뉴명</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="newPizza.name">
			</div>
		</div>

		<div class="form-group row">
			<label class="col-sm-3">설명</label>
			<div class="col-sm-9">
				<textarea type="text" class="form-control" rows="5" v-model="newPizza.description"></textarea>
			</div>
		</div>

		<p><strong>옵션:</strong></p>
		<div class="form-group row">
			<label class="col-sm-3">사이즈</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="newPizza.options[0].size">
			</div>
		</div>

		<div class="form-group row">
			<label class="col-sm-3">가격</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="newPizza.options[0].price">
			</div>
		</div>

		<p><strong>옵션2:</strong></p>
		<div class="form-group row">
			<label class="col-sm-3">사이즈</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="newPizza.options[1].size">
			</div>
		</div>

		<div class="form-group row">
			<label class="col-sm-3">가격</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="newPizza.options[1].price">
			</div>
		</div>

		<div class="form-group row">
			<button type="button" class="btn btn-success btn-block" @click="addMenuItem">등록하기</button>
		</div>

	</form>
</template>

<script>
import { menuRef } from '@/config/firebase'

export default {
	data: () => ({
		newPizza: {
			'name': '하와이안 피자',
			'description': '사이사이 맛있는 파인애플 조각이 들어있어요!',
			'options': [{
				'size': '작은 거',
				'price': '20000'
			}, {
				'size': '큰 거',
				'price': '27000'
			}]
		}
	}),
	methods: {
		addMenuItem() {
			menuRef.push(this.newPizza)
		}
	}
}
</script>