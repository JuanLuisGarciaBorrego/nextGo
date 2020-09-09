
export function throwErrorPage(statusCode, message) {
    return {
        props: {
            'error': {
                statusCode: statusCode,
                message: message
            }
        }
    }
}
