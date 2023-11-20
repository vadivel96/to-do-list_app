import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ToDoListService } from 'src/to-do-list/to-do-list.service';


@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel:Model<user> ,private todolistSerice:ToDoListService  ){}

  async hashPassword(password:string):Promise<String>{ 
    let salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
  }

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
    if(body.password){
    body.password=  await this.hashPassword(body.password)
    }
    const updateUser=await this.userModel.findByIdAndUpdate(id,body,{new:true});
    return updateUser;
  }

  async deleteById(id:String):Promise<any>{
    await this.todolistSerice.deleteAllTodolist(id);
    return  this.userModel.deleteOne({_id:id});
  }
}
