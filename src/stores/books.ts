import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IBook } from '@/types/book'

export const useBooksStore = defineStore('books', {
    state: () => ({
        books: <IBook[]>[],
        booksSelectedList: <IBook[]>[],
        isLoading: false
    }),
    getters: {
        booksInList(): IBook {
            return this.booksSelectedList
        },
        async loadBooks() {
            this.isLoading = true
            const res = await fetch('https://freetestapi.com/api/v1/books')
            const data = await res.json()
            this.books = data
            this.isLoading = false
        },
        countInList(): number {
            return this.booksSelectedList.length
        },
        showFiltered: (state) => {
            return (key: string, value: string) =>
                state.booksSelectedList.filter((book) => book[key] == value)
        }
    },
    actions: {
        setInList(id: number): void {
            this.books.filter((book) => {
                let deleted: number | null = null
                if (book.id == id) {
                    this.booksSelectedList.filter((bs, key) => {
                        if (bs.id == id) {
                            deleted = key
                        }
                    })
                    if (deleted === null) this.booksSelectedList.push(book)
                    else {
                        this.booksSelectedList.splice(deleted, 1)
                    }
                    book.inList = !book.inList
                }
            })
        },
        setStatus(id: number, status: string): void {
            this.booksSelectedList.filter((book) => {
                if (book.id === id) {
                    book.status = book.status == status ? '' : status
                }
            })
        },
        countRead(status: string): number {
            let i: number = 0
            this.booksSelectedList.filter((el) => {
                if (el.status == status) {
                    return i++
                }
            })
            return i
        }
    }
})
