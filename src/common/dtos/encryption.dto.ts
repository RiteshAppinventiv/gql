import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class EncryptionDto {
  @ApiPropertyOptional()
  @IsString()
  jsonData: string;
}

export class DecryptionDto {
  @ApiPropertyOptional()
  @IsString()
  encryptedData: string;
}


export class PreSignedUrlDto {
  @ApiPropertyOptional({ type: [String] })
  @IsArray() 
  @IsString({ each: true })
  files: string[];
}

export class DownloadPreSignedUrlDto {
  @ApiPropertyOptional()
  @IsString({ each: true })
  fileName: string;
}