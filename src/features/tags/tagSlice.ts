import { Tag, TagState } from './../../interfaces';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice ,PayloadAction} from "@reduxjs/toolkit";
import axios from "../../components/Axios";

export const asyncGetAllTags = createAsyncThunk(
  "tags/asyncGetAllTags",
  async () => {
    const result = await axios.get("/tags");
    return result.data.data;
  }
);
export const asyncCreateTag = createAsyncThunk(
  "tags/asyncCreateTag",
  async (tag:string) => {
    const tagCretaed = await axios.post(`/tags`,{"name":tag});
    const result = await axios.get("/tags");
    return result.data.data;
  }
);
export const asyncDeleteTag = createAsyncThunk(
  "tags/asyncDeleteTag",
  async (id:number) => {
    const deletedTag = await axios.delete(`/tags/${id}`);
    const result = await axios.get("/tags");
    return result.data.data;
  }
);


const options = {
  name: "tags",
  initialState: {
    tags: [],
  },
  reducers: {
    addTag: (state:TagState, action:PayloadAction<Tag>) => {
      state.tags.push(action.payload);
    },
 
  },
  extraReducers: (builder:ActionReducerMapBuilder<TagState>) => {
    builder.addCase(asyncGetAllTags.fulfilled, (state:TagState, action:PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    }),

    builder.addCase(asyncDeleteTag.fulfilled, (state:TagState, action:PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    }),
    builder.addCase(asyncCreateTag.fulfilled, (state:TagState, action:PayloadAction<Tag[]>) => {
      state.tags = action.payload;

    })
  },
};

export const tagsSlice = createSlice(options);
export const { addTag } = tagsSlice.actions;
