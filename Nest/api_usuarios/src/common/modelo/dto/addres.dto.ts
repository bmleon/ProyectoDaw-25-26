import { IsOptional, IsString, Length } from "class-validator";

export class AddressDto{
    @IsString()
    @IsOptional()
    @Length(2, 50)
    pais?: string;

    @IsString()
    @IsOptional()
    @Length(2, 50)
    ciudad?: string;

    @IsString()
    @IsOptional()
    @Length(2, 50)
    provincia?: string;

    @IsString()
    @IsOptional()
    @Length(2, 50)
    calle?: string;

    @IsString()
    @IsOptional()
    @Length(1, 3)
    numero?: string;

    @IsString()
    @IsOptional()
    @Length(2, 50)
    cpostal?: string;
}