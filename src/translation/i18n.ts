import i18next, { Resource } from 'i18next'
import FinnishTranslation from './resources/Finnish/translation.json'
import EnglishTranslation from './resources/English/translation.json'

export interface ILanguageResource {
    translation: object
    flagCode: string
    label: string
}

export interface ILanguageResources {
    [languageCode: string]: ILanguageResource
}

const resources: ILanguageResources = {
    en: {
        translation: EnglishTranslation,
        flagCode: 'US',
        label: 'English',
    },
    fi: {
        translation: FinnishTranslation,
        flagCode: 'FI',
        label: 'Finnish',
    },
}

i18next.init({
    resources: resources as unknown as Resource,
    lng: 'en', //default
    interpolation: {
        escapeValue: false,
    },
})
