<template>
	<div class="row">
		<div class="col-sm-12 col-md-6">
			<table class="table table-hover">
				<thead class="thead-default">
					<tr>
						<th>사이즈</th>
						<th>가격</th>
						<th>장바구니에 담기</th>
					</tr>
				</thead>
				<tbody v-for="item in getMenuItems" :key="item['.key']">
					<tr>
						<td><strong>{{ item.name }}</strong></td>
					</tr>
					<tr v-for="option in item.options">
						<td>{{ option.size }}</td>
						<td>{{ option.price | currency }}</td>
						<td><button class="btn btn-sm btn-outline-success" type="button" @click="addToBasket(item, option)">+</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-sm-12 col-md-6">
			<div v-if="basket.length > 0">
				<table class="table">
					<thead class="thead-default">
						<tr>
							<th>수량</th>
							<th>피자 정보</th>
							<th>총액</th>
						</tr>
					</thead>
					<tbody v-for="item in basket">
						<tr>
							<td><button class="btn btn-sm" type="button" @click="decreaseQuantity(item)">-</button>
								<span>{{ item.quantity }}-</span>
								<button class="btn btn-sm" type="button" @click="increaseQuantity(item)">+</button>
							</td>
							<td>{{ item.name }} {{ item.size }}</td>
							<td>{{ item.price * item.quantity | currency }}</td>
						</tr>
					</tbody>
				</table>
				<p>주문 총액: {{ total | currency }}</p>
				<button class="btn btn-success btn-block" @click="addNewOrder">주문하기</button>
			</div>
			<div v-else>
				<p>{{ basketText }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ordersRef } from '@/config/firebase'
import { formatNumber } from '@/utils/mixin'

export default {
	data: () => ({
		basket: [],
		basketText: '장바구니가 비었습니다.'
	}),
	mixins: [ formatNumber ],
	computed: {
		...mapGetters([
			'getMenuItems'
		]),
		total() {
			let totalCost = 0
			this.basket.map((item) => {
				totalCost += item.quantity * item.price
			})
			return totalCost
		}
	},
	methods: {
		addToBasket(item, option) {
			this.basket.push({
				name: item.name,
				price: option.price,
				size: option.size,
				quantity: 1
			})
		},
		removeFromBasket(item) {
			this.basket.splice(this.basket.indexOf(item), 1)
		},
		increaseQuantity(item) {
			item.quantity++;
		},
		decreaseQuantity(item) {
			item.quantity--;

			if (item.quantity === 0) {
				this.removeFromBasket(item)
			}
		},
		addNewOrder() {
			// this.$store.commit('addOrder', this.basket)
			ordersRef.push(this.basket)
			this.basket = []
			this.basketText = '오오! 피자를 시켰어요!\n주문해 주셔서 고맙습니다!'
		}
	}
}
</script>