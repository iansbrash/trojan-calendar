const maxAttempts = 2;

const tryCatchWrapper = async (asyncFunction, message) => {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            const res = await asyncFunction();
            return res;
        }
        catch {
            console.log("Error in tryCatchWrapper, attempt #" + i);
        }
        
    }
    throw {
        isCustom: true,
        message: "Error in " + message,
        code: message
    }
}

module.exports.tryCatchWrapper = tryCatchWrapper;