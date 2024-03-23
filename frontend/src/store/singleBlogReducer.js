import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  selectedBlog: null, 
  loading: false,
  error: null,
};

const singleBlogSlice = createSlice({
  name: 'singleBlog',
  initialState,
  reducers: {
    fetchBlogsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogsSuccess(state, action) {
      state.loading = false;
      state.blogs = action.payload;
    },
    fetchBlogsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    selectBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
});

export const { fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure, selectBlog } = singleBlogSlice.actions;
export default singleBlogSlice.reducer
