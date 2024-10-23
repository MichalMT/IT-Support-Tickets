const express = require('express')
const router = express.Router()
const { getTickets, createTicket,updateTicket,deleteTicket, createComment, deleteComment, updateTicketStatus } = require("../controllers/ticketController");
const { auth } = require('../middleware/authMiddleware');
const { checkAdmin } = require('../middleware/adminMiddleware');

router.route("/")
    .get(auth, getTickets)
    .post(auth, createTicket);

router.route("/:id")
    .put(auth, updateTicket)
    .delete(auth, checkAdmin, deleteTicket);

router.route("/:id/comments")
    .post(auth, createComment);

router.route("/:id/comments/:commentId")
    .delete(auth, checkAdmin, deleteComment);

router.route("/:id/status")
    .put(auth, checkAdmin, updateTicketStatus);

module.exports = router;