// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/bootstrap/customizations.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    rewriteUrls: 'all'
                }
            }
        }
    }
})
