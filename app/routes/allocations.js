const AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;
const {
    environmentalScripts
} = require("../../config/config");

function AllocationsHandler(db) {
    "use strict";

    const allocationsDAO = new AllocationsDAO(db);

    this.displayAllocations = (req, res, next) => {
        /*
        // Fix for A4 Insecure DOR -  take user id from session instead of from URL param
        const { userId } = req.session;
        */
        // Take the user ID from the session, not from the URL
        const sessionUserId = req.session.userId;
        const {
            threshold
        } = req.query;

        // Users can only view their own allocations
        if (String(req.params.userId) !== String(sessionUserId)) {
            return res.status(403).send("403 Forbidden: You do not have permission to view this data.");
        }

        allocationsDAO.getByUserIdAndThreshold(sessionUserId, threshold, (err, allocations) => {
            if (err) return next(err);
            return res.render("allocations", {
                userId: sessionUserId,
                allocations,
                environmentalScripts
            });
        });
    };
}

module.exports = AllocationsHandler;
