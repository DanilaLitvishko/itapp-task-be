import { ApiResponseProperty } from '@nestjs/swagger';

export class UploadingLinksDto {
  constructor(uploadUrl: string, fileUri: string) {
    this.uploadUrl = uploadUrl;
    this.fileUri = fileUri;
  }

  @ApiResponseProperty()
  readonly uploadUrl: string;

  @ApiResponseProperty()
  readonly fileUri: string;
}
