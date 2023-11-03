import * as mongoose from 'mongoose';
import {IsString} from 'class-validator'

export const userSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  email: {type:String,required:true},
  password: String,
 
});

export interface user extends mongoose.Document {
  firstName:String;
  lastName:String;
  email:String;
  password: String;
  
} 

export const userModel = mongoose.model<user>('user', userSchema);
