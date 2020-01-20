import i18next from 'i18next';
import numeral from 'numeral';
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      'youWillWantTo': 'Maybe you are looking for',
      "defaultRank": "Default",
      "saleTop": "Top Sale",
      "newArrive": "New Arrive",
      "priceLowToTop": "Price to top",
      "priceTopToLow": "Price to low",
      "contactAdmin": "Please contact content provider",
    }
  },
  ja: {
    translation: {
      "Welcome to React": "こんにちは世界",
      "youWillWantTo": "こんなキーワードでも検索されています",
      "defaultRank": "おすすめ順",
      "saleTop": "人気順",
      "newArrive": "発売日順",
      "priceLowToTop": "価格が低い順",
      "priceTopToLow": "価格が高い順",
      "contactAdmin": "無効なパラメーターです",
    }
  },
  tw: {
    translation: {
      "youWillWantTo": "你可能還會想找",
      "defaultRank":"預設排序",
      "saleTop": "銷量排序",
      "newArrive": "新品上市",
      "priceLowToTop": "價格由低到高",
      "priceTopToLow": "價格由高到低",
      "contactAdmin": "請與管理者聯絡",
    }
  }
};


numeral.register('locale', 'tw', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    var b = number % 10;
    return (~~ (number % 100 / 10) === 1) ? 'th' :
        (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
        (b === 3) ? 'rd' : 'th';
  },
  currency: {
      symbol: '$'
  }
});

numeral.register('locale', 'ja', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    var b = number % 10;
    return (~~ (number % 100 / 10) === 1) ? 'th' :
        (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
        (b === 3) ? 'rd' : 'th';
  },
  currency: {
      symbol: '¥'
  }
});

export default {

  init(lang = 'ja') {
    this.lang = lang;
    numeral.locale(this.lang);
    return i18next
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        fallbackLng: 'ja',
        lng: this.lang,
        debug: true,
        resources,
        keySeparator: false,
        interpolation: {
          escapeValue: false // react already safes from xss
        }
      });
  },

  changeLanguage(lang) {
    this.lang = lang;
    i18next.changeLanguage(this.lang);
    numeral.locale(this.lang);
  }
}