import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  admin: null,
  users: [],
  AllPosts: [],
  PinnedPosts: [],
  Ads: [],

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload;
    },
    logout: (state) => {
      state.admin = null;
    },
    allusers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    allAdsStore: (state, action) => {
      state.Ads = action.payload;
    },
    addAd: (state, action) => {
      state.Ads = [...state.Ads, action.payload];
    },
    removeUser: (state, action) => {
      const { _id } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      console.log(newState.users, _id);
      const PostIndex = newState.users.findIndex((user) => user._id === _id);

      if (PostIndex !== -1) {

        newState.users = newState.users.filter(obj => obj._id !== _id)
      }
      return newState;
    },
    allPosts: (state, action) => {
      state.AllPosts = action.payload;
    },
    addNewPosts: (state, action) => {
      state.AllPosts = [action.payload, ...state.AllPosts,];
    },
    removePosts: (state, action) => {
      const { _id } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      const PostIndex = newState.AllPosts.findIndex((post) => post._id === _id);

      if (PostIndex !== -1) {
        newState.AllPosts = newState.AllPosts.filter(obj => obj._id !== _id)
      }

      newState.PinnedPosts = newState.PinnedPosts.filter(obj => obj.postId !== _id)




      return newState;
    },

    updatePostStatus: (state, action) => {
      const { _id, post } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      const PostIndex = newState.AllPosts.findIndex((post) => post._id === _id);

      if (PostIndex !== -1) {

        newState.AllPosts[PostIndex] = post
      }
      return newState;
    },
    updatePost: (state, action) => {
      // const { _id, post } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      const PostIndex = newState.AllPosts.findIndex((post) => post._id === action.payload._id);
      const PinnedIndex = newState.PinnedPosts.findIndex((post) => post.postId === action.payload._id);
      console.log(PostIndex);
      console.log(PinnedIndex)
      if (PinnedIndex >= 0) {
        console.log("new action", action.payload);
        newState.PinnedPosts[PinnedIndex].postContent = action.payload.postContent
        newState.PinnedPosts[PinnedIndex].PostCreated = action.payload.PostCreated
        newState.PinnedPosts[PinnedIndex].postMediaUrl = action.payload.postMediaUrl
        newState.PinnedPosts[PinnedIndex].postMediaType = action.payload.postMediaType
        newState.PinnedPosts[PinnedIndex].postAwsBucketKey = action.payload.postAwsBucketKey

        console.log("akjakjs", newState.AllPosts[PinnedIndex]);
      }
      if (PostIndex !== -1) {
        newState.AllPosts[PostIndex] = action.payload
      }
      return newState;
    },
    BumpPost: (state, action) => {
      const { postId } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      const postIndex = newState.AllPosts.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        const bumpedPost = newState.AllPosts.splice(postIndex, 1)[0];
        newState.AllPosts.unshift(bumpedPost);
      }

      return newState;
    },

    allBumperPosts: (state, action) => {
      state.PinnedPosts = action.payload;
    },
    addPinnedPosts: (state, action) => {
      const { postId, NewBumperPost, TotalPinned } = action.payload

      const newState = JSON.parse(JSON.stringify(state));
      const PostIndex = newState.AllPosts.findIndex((post) => post._id === postId);
      if (TotalPinned === 5) {
        const oldestPinnedPostIndex = newState.PinnedPosts.length - 1;

        if (oldestPinnedPostIndex >= 0) {
          const oldestPinnedPostId = newState.PinnedPosts[oldestPinnedPostIndex].postId;

          const originalPostIndex = newState.AllPosts.findIndex((post) => post._id === oldestPinnedPostId);

          if (originalPostIndex >= 0) {
            newState.AllPosts[originalPostIndex].isPinned = false;
          }

          newState.PinnedPosts.splice(oldestPinnedPostIndex, 1);
        }
      }
      if (PostIndex >= 0) {
        newState.AllPosts[PostIndex].isPinned = true
      }
      newState.PinnedPosts.unshift(NewBumperPost);

      return newState;

    },
    removePinnedPosts: (state, action) => {
      const { _id } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));

      const PinnedPostIndex = newState.PinnedPosts.findIndex((post) => post._id === _id);
      if (PinnedPostIndex !== -1) {

        const PostIndex2 = newState.AllPosts.findIndex((post) => post._id === newState.PinnedPosts[PinnedPostIndex].postId);
        if (PostIndex2 >= 0) {
          newState.AllPosts[PostIndex2].isPinned = false
        }

        newState.PinnedPosts = newState.PinnedPosts.filter(obj => obj._id !== _id)
      }


      return newState;
    },
    updateBumperPostStatus: (state, action) => {
      const { _id, post } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      console.log(newState.PinnedPosts, _id);
      const PostIndex = newState.PinnedPosts.findIndex((post) => post._id === _id);

      if (PostIndex !== -1) {

        newState.PinnedPosts[PostIndex] = post
      }
      return newState;
    },


  },

});


export const selecteUsers = (state) => state.auth.users;
export const selectAdmin = (state) => state.auth.admin;
export const selectAllPosts = (state) => state.auth.AllPosts;
export const selectAllPinnedPosts = (state) => state.auth.PinnedPosts;
export const selectAllAds = (state) => state.auth.Ads;


export const {  addAd, allAdsStore, login, logout, allusers, removeUser, allPosts, allBumperPosts, removePosts, updatePostStatus, addPinnedPosts, removePinnedPosts, updateBumperPostStatus, addNewPosts, updatePost, BumpPost } = authSlice.actions;

export default authSlice.reducer;
