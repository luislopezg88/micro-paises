import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Date } from "mongoose";

export class CreatePais {

    id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    alias: string;
    


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    createdBy: string;
}