import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment,editComment,removeComment } from "./commentApi";

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

//delete Comment 
export const deleteComment = createAsyncThunk("comments/delete",
  async ({id}) =>{
    return await removeComment(id);
  }
)

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
      })
      //remove
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove deleted comment from state
       state.comments = state.comments.filter(
              (c) => c._id !== action.payload._id // ✅ match against deleted comment’s id
  );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;
