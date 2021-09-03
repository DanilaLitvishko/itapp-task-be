export class ValidationErrorDto {
  constructor(private messages: string[], private field: string) {}
}
