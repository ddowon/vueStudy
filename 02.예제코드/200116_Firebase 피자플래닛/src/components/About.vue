<template>
	<div>
		<p>Pizza Planet! 더 많은 정보는 아래 링크에서 확인 하세요.</p>
		<nav class="navbar navbar-toggleable-md navbar-light">
			<ul class="navbar-nav">
				<router-link :to="{ name: 'historyLink' }" tag="li"><a class="nav-link">Our History</a></router-link>
				<router-link :to="{ name: 'contactLink' }" tag="li"><a class="nav-link">Contact Us</a></router-link>
				<router-link :to="{ name: 'orderingGuideLink' }" tag="li"><a class="nav-link">Ordering Guide</a>
				</router-link>
				<router-link :to="{ name: 'deliveryLink' }" tag="li"><a class="nav-link">Delivery</a></router-link>
			</ul>
		</nav>
		<router-view></router-view>
	</div>
</template>