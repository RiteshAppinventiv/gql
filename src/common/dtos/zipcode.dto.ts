// @ApiPropertyOptional()
// @IsString()
// jsonData: string;
import { ApiPropertyOptional , ApiProperty} from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class zipCodeDto {
    @ApiProperty({
        description: 'Country code',
        example : "IN",
    })
    @IsString()
    country: String;

    @ApiProperty({
        description: 'Zip code',
        example : "110064",
    })
    @IsString()
    codes: String;
}