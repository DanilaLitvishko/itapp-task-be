import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class FileInfoDto {
  @IsString()
  @Expose()
  readonly fileName: string;
  
  @IsString()
  @Expose()
  readonly contentType: string;
}
