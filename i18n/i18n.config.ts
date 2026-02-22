import en from './locales/en.json'
import mr from './locales/mr.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        mr,
    },
}))
