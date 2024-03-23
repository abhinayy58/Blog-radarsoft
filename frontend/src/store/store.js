// store.js
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogReducer';
import singleBlogReducer from './singleBlogReducer';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    singleBlog:singleBlogReducer
    // Add more reducers as needed
  },
});
