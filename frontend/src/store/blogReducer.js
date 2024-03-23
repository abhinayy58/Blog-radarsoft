import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    selectBlog(state, action) {
      state.selectedBlog = action.payload;
    },
    deleteBlogAction(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
  },
});
export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  selectBlog,
  deleteBlogAction,
} = blogSlice.actions;
export default blogSlice.reducer;
