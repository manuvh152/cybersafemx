import { IsString, IsNotEmpty } from 'class-validator';

export class CreateComplaintDto{
  
  @IsString()
  @IsNotEmpty()
  topic: string

  @IsNotEmpty()
  steps: string
}