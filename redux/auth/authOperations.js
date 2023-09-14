import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";



export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, nickName }, thunkAPI) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const user = data.user;
      console.log('user register====> ', user);

      refreshUser({ displayName: nickName });

      return {
        email: user.email,
        uid: user.uid,
        displayName: nickName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      const user = data.user;
      console.log('login user====> ', user);
      return {
        email: user.email,
        uid: user.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut", 
  async (_, thunkAPI) => {
  try {
    await signOut(auth); 
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = async (update) => {

  const user = auth.currentUser;

  if (user) {
        try {
            await updateProfile(user, update);
        } catch(error) {
            throw error
        }
  }
};