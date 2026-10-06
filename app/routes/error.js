// Error handling middleware

const errorHandler = (err, req, res,next) => {

    "use strict";

    console.error(err.message);
    console.error(err.stack);
    // Use the status code of the error if it has one
    res.status(err.status || 500);
    res.render("error-template", {
        error: err
    });
};

module.exports = { errorHandler };
