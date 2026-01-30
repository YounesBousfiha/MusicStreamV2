export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Invalid request. Please check your input.',
  401: 'Session expired. Please login again.',
  403: 'Access denied. You do not have permission.',
  404: 'The requested resource was not found.',
  409: 'Conflict error. This resource already exists.',
  422: 'Validation error. Please check your data.',
  500: 'Server internal error. Try again later.',
  503: 'Service unavailable. Server is busy.',
  0: 'Connection lost. Please check your internet.'
}



export const getErrorMessages = (error: any): string => {
  if(error.error instanceof ErrorEvent) {
    return `Network Error: ${error.error.message}`;
  }

  if(error.error && error.error.message) {
    return error.error.detail;
  }

  return HTTP_ERROR_MESSAGES[error.status] || 'An unexpected error occurred.';
}
