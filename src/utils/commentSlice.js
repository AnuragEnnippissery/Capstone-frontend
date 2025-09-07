import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment,editComment } from "./commentApi";

// Add Comment
export const createComment = createAsyncThunk(
  "comments/add",
  async (commentData) => {
    return await addComment(commentData);
  }
);

// Edit Comment
export const updateComment = createAsyncThunk(
  "comments/edit",
  async ({ id, updatedData }) => {
    return await editComment(id, updatedData);
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // will be filled from video API
    loading: false,
    error: null,
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload; // sync with video API
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit
      .addCase(updateComment.fulfilled, (state, action) => {
        const idx = state.comments.findIndex((c) => c._id === action?.payload?._id);
        if (idx !== -1){
           state.comments[idx] = action.payload;}
      });
  },
});

export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;
