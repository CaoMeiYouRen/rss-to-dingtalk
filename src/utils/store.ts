import { CACHE } from '@/config'
import Lru from 'lru-cache'
// const store = new Lru({
//     maxAge: CACHE.CACHE_AGE * 1000,
//     updateAgeOnGet: false,
// })
const cache: any = {}
const store = {
    get(key: string): unknown {
        return cache[key]
    },
    set(key: string, value: any) {
        cache[key] = value
    },
}
export default store