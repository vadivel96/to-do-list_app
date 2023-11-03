import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {todolist} from 'src/schema/to-do-list.schema';
import { TodolistDTO } from 'src/to-do-list/dto/to-do-list.dto';
import{updateTodolistDTO} from'src/to-do-list/dto/to-do-list.update.dto';
const jwt = require('jsonwebtoken');

@Injectable()
export class ToDoListService {
    constructor(@InjectModel('todolist') private todolistModel:Model<todolist>){}
    
    async getAllTodolist(req:any): Promise<todolist[]> {
      const token=req.headers.authorization.split(' ')[1];
      const data=jwt.decode(token);
      console.log(data.email);
        return await this.todolistModel.find({email:data.email}).exec();
      }

      async createTodolist(todoData: TodolistDTO,req:any): Promise<todolist> {
        try {
          console.log(todoData);
          const token=req.headers.authorization.split(' ')[1];
        const data=jwt.decode(token);
        const todolist =await new this.todolistModel({...todoData,email:data.email});
        return todolist.save();
        } catch (error) {
          console.log(error);
        }
        
      }

      

      async getTodolistById(id:String):Promise<todolist>{
        const singleTodo=await this.todolistModel.findById(id);
        return singleTodo;
      }

      async updateTodolistById(id:String,body:updateTodolistDTO):Promise<todolist>{
        const updateTodo=await this.todolistModel.findByIdAndUpdate(id,body,{new:true});
        return updateTodo;
      }

      async deleteTodolist(id:String):Promise<any>{
        return  this.todolistModel.deleteOne({_id:id});
      }

}
