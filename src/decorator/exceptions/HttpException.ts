/** Defines the base HTTP exception. */
export class HttpException extends Error {
    public name: string = "HttpException";
    public statusCode: number;
    public errors?: string[];
    public isSuccess: boolean = false;

    /**
     * Instantiates an `HttpException` Exception.
     *
     * @param statusCode HTTP status code
     * @param message Error message
     * @param errors Additional errors
     *
     * @example
     * `throw new HttpException(403, 'Forbidden')`
     */
    public constructor(
        statusCode: number,
        message?: string,
        errors?: string[]
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.isSuccess = false;
    }
}
