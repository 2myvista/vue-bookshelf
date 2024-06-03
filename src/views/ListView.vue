<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from 'pinia'
import BookVeiw from "@/components/BookVeiw.vue";
import { useBooksStore } from "@/stores/books";
const books = useBooksStore();
const show: boolean = true;
const { showFiltered } = storeToRefs(books)

//const

/* const filterStatus(statusRead: string) {
	
} */
const keyData = ref('');
const valueData = ref('');
const noData = ref(false);
const reading = ref(false)
const read = ref(false)

const clickfilterStatus = (key:string, value:string ) => {
	if (value == 'reading')
		read.value = false
	else if (value == 'read')
		reading.value = false

	//debugger
	 keyData.value = key
	 valueData.value = value
}

const filteredList = computed(() => {
	if (keyData.value.length > 0 && reading.value || read.value) {
		let tmp = books.showFiltered(keyData.value, valueData.value)
		if (tmp.length > 0)
			return tmp
		else {
			noData.value = true
			return books.booksSelectedList
		}
	}
	noData.value = false
	return books.booksSelectedList
})
</script>


<template>
  <div class="list">
    <h1>Список из {{ books.countInList }} книг для прочтения</h1>
	<span>читаю: {{ books.countRead('reading') }} прочитал: {{ books.countRead('read') }}</span>

	читаю: <input type="checkbox" v-model="reading" @click="clickfilterStatus('status', 'reading')"  />
	прочитал: <input type="checkbox" v-model="read" @click="clickfilterStatus('status', 'read')"  />
	<div v-show="noData">данные не найдены</div>
		<book-veiw
		v-show="!noData"
		v-for="book in filteredList"
		:key="book.id"
		:book="book"
		:show="show"
	/>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .list {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
