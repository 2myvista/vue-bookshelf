<script setup lang="ts">
import { useBooksStore } from "@/stores/books";
import { useUserStore } from "@/stores/user";
import type { IBook } from "@/types/book";
import checkbox from "@/components/CheckBox.vue";

//import { onMounted } from "vue";


const bookStore = useBooksStore();
const user = useUserStore();

const props = defineProps<{
	book: IBook,
	show: {
		type: Boolean
	}, }>();

const statusReading: Array<string> = ["reading", "read"];

const setStatus  =  (id: number, status: string) => {
	bookStore.setStatus(id, status)
}

</script>

<template>
	<div class="books-Item"><span v-if="book.inList" class="bold red">!</span> {{ book.title }} - {{book.author}}
		<button v-if="user.isAuthorized" @click="bookStore.setInList(book.id)">{{book.inList?'-':'+'}}</button>
		<span v-if="show"><checkbox v-for="status in statusReading" :key="book.id+1" :id="book.id" :status="status" :bookStatus="book.status" @update:set-status="setStatus"/></span>
		 <span class="bold">{{book.status}}</span>
	</div>
</template>
<style scoped>
.bold {
	font-weight: bold;
	margin-left: 5px
}
.red {
	color: red;
}
</style>