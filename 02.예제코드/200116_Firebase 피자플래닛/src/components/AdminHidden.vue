<template>
	<section>
		<div class="row">
			<div class="col-sm-12 col-md-6">
				<pp-new-pizza></pp-new-pizza>
			</div>
			<div class="col-sm-12 col-md-6">
				<h3>등록된 메뉴</h3>
				<table class="table table-hover">
					<thead class="thead-default">
						<tr>
							<th>메뉴 정보</th>
							<th>메뉴 삭제하기</th>
						</tr>
					</thead>
					<tbody v-for="item in getMenuItems" :key="item['.key']">
						<tr>
							<td>{{ item.name }}</td>
							<td><button class="btn btn-outline-danger btn-sm" @click="removeMenuItem(item['.key'])">x</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<h3>피자 주문 건수: {{ numberOfOrders }}</h3>
				<table class="table table-sm" v-for="(orders, index) in getOrders" :key="orders['.key']">
					<thead class="thead-default">
						<tr>
							<th>메뉴</th>
							<th>사이즈</th>
							<th>수량</th>
							<th>가격</th>
						</tr>
					</thead>
					<tbody>
						<div class="order-number">
							<strong><em>주문번호: {{ index + 1  }}</em></strong>
							<button class="btn btn-outline-danger btn-sm" @click="removeOrderItem(orders['.key'])">x</button>
						</div>
						<tr v-for="orderItems in orders['.value']">
							<td>{{ orderItems.name }}</td>
							<td>{{ orderItems.size }}"</td>
							<td>{{ orderItems.quantity }}</td>
							<td>{{ orderItems.price | currency }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</template>

<script>
import NewPizza from '@/components/NewPizza.vue'
import { mapGetters } from 'vuex'
import { menuRef, ordersRef } from '@/config/firebase'
import { formatNumber } from '@/utils/mixin'

export default {
	components: {
		ppNewPizza: NewPizza
	},
	mixins: [ formatNumber ],
	computed: {
		...mapGetters([
			'numberOfOrders',
			'getMenuItems',
			'getOrders'
		])
	},
	methods: {
		removeMenuItem(key) {
			menuRef.child(key).remove()
		},
		removeOrderItem(key) {
			ordersRef.child(key).remove()
		}
	},
	beforeRouteLeave: (to, from, next) => {
		if (confirm(`로그아웃 했는 지 확인하세요.\n페이지를 이동하시겠습니까?`) == true) {
			next()
		} else {
			next(false)
		}
	}
}
</script>