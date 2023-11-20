import { Controller,Get, Post,Body, Delete, Put, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { todolist } from 'src/schema/to-do-list.schema';
import { TodolistDTO } from 'src/to-do-list/dto/to-do-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('to-do-list')
export class ToDoListController {
    constructor(private todolistservice:ToDoListService){}
    
    @UseGuards(JwtAuthGuard)
    @Get('/getAllTodolist')
    getAllTodolist(@Req() req:any){
        return this.todolistservice.getAllTodolist(req);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/createTodolist')
    createTodolist(@Body() body:TodolistDTO,@Req() req:any){
        return this.todolistservice.createTodolist(body,req);
    }
    
    

    @UseGuards(JwtAuthGuard)
    @Get('/getAllTodolist/:id')
    getTodolistById(@Param('id')id:String){
        return this.todolistservice.getTodolistById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/updateTodolist/:id')
    updateTodolist(@Body() body:any,@Param('id') id:String){
        return this.todolistservice.updateTodolistById(id,body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/deleteTodolist/:id')
    deleteTodolist(@Param('id')id:String){
        return this.todolistservice.deleteTodolist(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/deleteAllTodolist/:id')
    deleteAllTodolist(@Param('id')id:String){
        return this.todolistservice.deleteAllTodolist(id);
    }


}
