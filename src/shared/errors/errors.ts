import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(public readonly code: number, public readonly message: string) {
    super(message, code);
  }
}

export class InvalidModelError extends ApiError {
  constructor(model: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, `Invalid Model Error: model ${model} is invalid`);
  }
}

export class ValidationError extends ApiError {
  constructor(model: string, field: string, message: string) {
    super(HttpStatus.BAD_REQUEST, `Validation Error: model ${model} field ${field} ${message}`);
  }
}

export class NotFoundError extends ApiError {
  constructor(model: string) {
    super(HttpStatus.NOT_FOUND, `Not Found Error: ${model} not found`);
  }
}

export class NotUniqueError extends ApiError {
  constructor(field: string) {
    super(HttpStatus.BAD_REQUEST, `${field} is not unique`);
  }
}

export class ForbiddenError extends ApiError {
  constructor() {
    super(HttpStatus.FORBIDDEN, 'No access token found');
  }
}
