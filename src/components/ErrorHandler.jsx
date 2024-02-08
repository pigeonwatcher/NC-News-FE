export default function ErrorHandler({ error, errorMessages = {} }) {
    const statusCode = error.response ? error.response.status || error.code : error.code;
    let message = error.response ? error.response.data ? error.response.data.msg || error.message : error.message : error.message;

    for(const errorCode in errorMessages) {
        if(errorCode === statusCode) {
            message = errorMessages[errorCode];
            break;
        }
    }

    return <div>Error: {`${statusCode} ${message}`}</div>;
}