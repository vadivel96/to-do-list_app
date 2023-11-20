import * as mongoose from 'mongoose';
import {IsString} from 'class-validator'

export const todolistSchema = new mongoose.Schema({
  title: {type:String,required:true},
  description: String,
  email:String,
  userid:String,
});

export interface todolist extends mongoose.Document {
  title: String;
  description: String;
  email:String;
  userid:String;
} 

export const todolistModel = mongoose.model<todolist>('todolist', todolistSchema);
