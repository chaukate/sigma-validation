using System;

namespace Sigma.Validation.Model
{
    public class ValidationResult<TResult>
    {
        public ValidationResult(TResult result, Exception exception = null, string errorMessage = null)
        {
            Result = result;
            Exception = exception;
            Message = errorMessage;
        }
        public string Message { get; set; }
        public Exception Exception { get; set; }
        public TResult Result { get; set; }
    }
}
