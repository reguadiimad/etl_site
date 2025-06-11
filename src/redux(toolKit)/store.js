import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import isHomeReducer from './slices/isHomeSlice'
import indexSice from './slices/indexSice';
import scrollVal from './slices/scrollSlice';
import pageIndexSlice from './slices/pageIndexSlice';
import showLangSlice from './slices/showLang';
import showMenuSlice from './slices/showMenu';
import showTopMenu from './slices/showTopMenu'
import adminReducer from "./slices/adminSlice"; 
import ipSlice from './slices/ipSlice';
import latestNews from './slices/latestNewsSlice';
import newsReducer from './slices/newsSlice';
const store = configureStore({
  reducer: {
    presntion: contentReducer,
    isHome: isHomeReducer,
    indexSlice: indexSice,
    scrollVal: scrollVal,
    pageIndex: pageIndexSlice,
    showLang : showLangSlice,
    showMenu:showMenuSlice,
    showTopMenu,showTopMenu,
    admin: adminReducer,
    ipAddress: ipSlice,
    latestNews: latestNews,
    news: newsReducer,

  },
});

export default store;
