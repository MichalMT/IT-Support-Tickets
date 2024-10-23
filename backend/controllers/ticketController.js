const asyncHandler = require("express-async-handler");

const Ticket = require("../models/ticketModel");

// GET /api/tickets
const getTickets = asyncHandler(async (req, res) => {
    let tickets = null;
    if (req.user.isAdmin) {
        tickets = await Ticket.find().populate('user', 'name').populate('comments.user', 'name');;
    } else {
        tickets = await Ticket.find({ user: req.user.id }).populate('comments.user', 'name');;
    }
    res.status(200).json(tickets);
});

// POST /api/tickets
const createTicket = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.priority || !req.body.status || !req.body.category || !req.body.description) {
        res.status(400)
        throw new Error("Add required data");
    }
    const ticket = await Ticket.create({
        name: req.body.name,
        priority: req.body.priority,
        status: req.body.status,
        category: req.body.category,
        description: req.body.description,
        user: req.user.id
    });
    const populatedTicket = await Ticket.findById(ticket._id).populate('user', 'name');
    res.status(200).json(populatedTicket);
});

// PUT /api/tickets/:id
const updateTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(400);
        throw new Error("Ticket not found");
    }
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the ticket user or is admin
    if (!req.user.isAdmin && ticket.user.toString() !== req.user.id) {
        res.status(403)
        throw new Error('User not authorized')
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedTicket);
});

// DELETE /api/tickets/:id
const deleteTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(400);
        throw new Error("Ticket not found");
    }
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the ticket user or is admin
    if (!req.user.isAdmin && ticket.user.toString() !== req.user.id) {
        res.status(403)
        throw new Error('User not authorized')
    }
    await ticket.deleteOne();
    res.status(200).json({id: req.params.id});
});

// POST /api/tickets/:id/comments
const createComment = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        return res.status(400);
        throw new Error("Ticket not found");
    }
    ticket.comments.push({
        user: req.user.id,
        text: req.body.text
    });
    await ticket.save({ validateModifiedOnly: true });

    // Populate the 'user' field for the newly added comment
    const savedTicket = await Ticket.findById(req.params.id).populate('comments.user', 'name');

    const addedComment = savedTicket.comments[savedTicket.comments.length - 1];

    res.status(201).json(addedComment); // Return only the new comment
});

// DELETE /api/tickets/:id/comments/:commentId
const deleteComment = asyncHandler(async (req, res) => {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(400);
            throw new Error("Ticket not found");
        }
        const comment = ticket.comments.id(req.params.commentId);
        if (!comment) {
            res.status(400);
            throw new Error("Comment not found");
        }
        if (!req.user.isAdmin && comment.user.toString() !== req.user.id.toString()) {
            res.status(403)
            throw new Error('User not authorized')
        }
        // Remove the comment from the array
        comment.remove();
        await ticket.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
});

// PUT /api/tickets/:id/status
const updateTicketStatus = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
  
    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }
    // Update only the status field
    ticket.status = req.body.status;
  
    try {
        await ticket.save({ validateModifiedOnly: true });
        res.status(200).json(ticket); // Return the updated ticket
    } catch (error) {
        res.status(500).json({ message: 'Error saving ticket status' });
        throw new Error("Error saving ticket status");
    }
  
    res.status(200).json(ticket); // Return the updated ticket
  });

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    createComment,
    deleteComment,
    updateTicketStatus
}