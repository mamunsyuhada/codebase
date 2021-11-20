module.exports = (payload) => {
    try {
        payload = JSON.parse(payload.toString());
    } catch (error) {
        return { error: true, message: error.message };
    }
    payload.error = null;
    return payload;
};