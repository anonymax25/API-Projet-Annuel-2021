import { IsNotEmpty } from "class-validator";

export class BufferDTO {
    
    @IsNotEmpty()
    type: String;
    
    @IsNotEmpty()
    data: number[]
}