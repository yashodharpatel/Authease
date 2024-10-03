class ApiResponse {
  statusCode: number;
  title: string | null;
  message: string;
  data: object | null;
  stackTrace: string | null;
  success: boolean;

  static success(statusCode: number, message: string, data: object) {
    return new ApiResponse(statusCode, null, message, data, null);
  }

  static error(
    statusCode: number,
    title: string,
    message: string,
    stackTrace: string
  ) {
    return new ApiResponse(statusCode, title, message, null, stackTrace);
  }

  // Constructor with appropriate type annotations
  constructor(
    statusCode: number,
    title: string | null,
    message: string,
    data: object | null,
    stackTrace: string | null
  ) {
    this.statusCode = statusCode;
    this.title = title;
    this.message = message;
    this.data = data;
    this.stackTrace = stackTrace;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;