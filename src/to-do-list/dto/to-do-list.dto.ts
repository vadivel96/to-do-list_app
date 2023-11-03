import { Optional } from "@nestjs/common";
import { IsString } from "class-validator";


export class TodolistDTO{

    @IsString()
    title:String;

    @IsString()
    description:String;

}