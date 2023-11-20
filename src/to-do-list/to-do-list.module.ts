import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListController } from './to-do-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { todolistSchema } from 'src/schema/to-do-list.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'todolist',schema:todolistSchema}])],
  providers: [ToDoListService],
  controllers: [ToDoListController],
  exports:[ToDoListService]
})
export class ToDoListModule {}
