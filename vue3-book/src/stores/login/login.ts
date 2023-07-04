import { accountLogin } from "@/service/login/login";
import { localCache } from "@/utils/cache";
import { defineStore } from "pinia";

const accountLoginStore = defineStore("login", {
    state: () => ({

    }),
    actions: {
        async accountLoginAction(account: any) {
            const result = await accountLogin(account)
            const { token } = result.data
            localCache.setCache("token", token)
        }
    }
})

export default accountLoginStore()