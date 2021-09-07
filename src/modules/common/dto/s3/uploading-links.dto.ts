export class UploadingLinksDto {
  constructor(uploadUrl: string, fileUri: string) {
    this.uploadUrl = uploadUrl;
    this.fileUri = fileUri;
  }

  readonly uploadUrl: string;

  readonly fileUri: string;
}
