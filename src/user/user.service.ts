import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel:Model<user> ){}

  async createUser(user: CreateUserDto) {   
      const newuser=new this.userModel(user);
      return await newuser.save()
    
  }

  async getUser(){
    return await this.userModel.find().exec();
  }

  

  async findByEmail(Email:String) {
    return await this.userModel.findOne({email:Email})
  }

  async findById(id:String) {
    return await this.userModel.findById(id);
  }

  async updateById(id:String,body:UpdateUserDto):Promise<any>{
    const updateUser=await this.userModel.findByIdAndUpdate(id,body,{new:true});
    return updateUser;
  }

  async deleteById(id:String):Promise<any>{
    return  this.userModel.deleteOne({_id:id});
  }
}
