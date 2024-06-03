<script setup lang="ts">
import { ref, computed} from "vue";
import { useCounterStore } from "@/stores/counter";
import { useBooksStore } from "@/stores/books";
import BookVeiw from "@/components/BookVeiw.vue";

const counter = useCounterStore();
const booksList = useBooksStore();
//debugger
const show:boolean = false;
const searchText = ref('');


const selectedList = computed(() => {
	if (booksList.books.length == 0) {
		booksList.loadBooks
	}
	if (searchText.value.length > 1) {
		return booksList.books.filter(el => {
			const unitedText = el.title.toLowerCase() +  el.author.toLowerCase()
			return unitedText.includes(searchText.value.toLowerCase()) 
		})
	}	else {
		return booksList.books
	}
})
const selectedListCount = computed(() => {
	return selectedList.value.length;
})


</script>

<template>
  <main>
	<input type="searchText" v-model="searchText" placeholder="более 1-го символа"/>
	<span>выбрано {{ selectedListCount }} к прочтению {{ booksList.countInList }}</span>
	<div v-if="booksList.isLoading">загружаем</div>
	<book-veiw
		v-for="book in selectedList"
		:key="book.id"
		:book="book"
		:show="show"
	/>
	

	
	
	
	{{ counter.count }}
  </main>
</template>
<style scoped>
.books-list {
	display: flex;
	flex-wrap: wrap;
}

</style>