import { ApiProperty } from "@nestjs/swagger";

export class ResponseCreatedDto {

  @ApiProperty()
  id: string

  @ApiProperty()
    name: string;

  @ApiProperty()
    alias: string;
}