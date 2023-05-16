import { IsString, MinLength } from 'class-validator';

export class ITodo {
  @IsString()
  @MinLength(12)
  name: string;
}
