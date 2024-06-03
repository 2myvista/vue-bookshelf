<script setup lang="ts">
const props = defineProps({
	id: {
		type: Number
	},
	bookStatus: {
		type: String
	},
	status: {
		type: String
	},

});

const emit = defineEmits(['update:set-status']);

const setStatus = (id:number, status:string) => {
		emit('update:set-status', id, status)
}
</script>
<template>
	{{ props.status }}
	<input @click="setStatus(props.id, props.status)" :checked="props.bookStatus == props.status" true-value  type="checkbox" />
</template>
<style scoped>

</style>