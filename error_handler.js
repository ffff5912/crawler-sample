'use strinct';

module.exports = function(err) {
    if (err) {
        if ("code" in err) {
            return 'Error Code:' + err.code;
        }
        if ("errno" in err) {
            return 'Error No:' + err.errno;
        }
        if ("syscall" in err) {
            return 'Error Syscall:' + err.syscall;
        }
        if ("statusCode" in err) {
            return 'Error Code:' + err.statuscode;
        }
        return err;
    }
    return;
};
