import { Optional } from "@nestjs/common";
import { IsString } from "class-validator";


export class updateTodolistDTO{

    @IsString()
    title:String;

    @IsString()
    description:String;

}