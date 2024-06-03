import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
	const userDiscountData = ref(0.5)
	const isAuthorized = ref(true)

  return { userDiscountData, isAuthorized }
})
