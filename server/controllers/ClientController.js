const Client = require('../models/ClientModel');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    console.log('Received client data:', req.body); // Log the request body

    // Find the highest caseId globally (not just for the current user)
    const lastClient = await Client.findOne().sort({ 'caseDetails.caseId': -1 });
    const newCaseId = lastClient ? lastClient.caseDetails.caseId + 1 : 1;

    const newClient = new Client({
      ...req.body,
      caseDetails: {
        caseId: newCaseId, // Assign a unique caseId globally
      },
      userId: req.body.userId,
    });

    const savedClient = await newClient.save();
    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: savedClient,
    });
  } catch (error) {
    console.error('Error creating client:', error); // Log the error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate caseId error',
        error: 'A client with this caseId already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create client',
      error: error.message,
    });
  }
};

// Get all clients with pagination and filtering (filtered by user ID)
exports.getClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search;

    let query = { userId: req.user.id };

    if (searchQuery) {
      query.$or = [
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { 'caseDetails.description': { $regex: searchQuery, $options: 'i' } }
      ];
    }

    console.log("Final MongoDB Query:", JSON.stringify(query, null, 2));  // Log to verify query

    const clients = await Client.find(query)
      .skip(skip)
      .limit(limit)
      .select('firstName lastName contactNo caseDetails');

    const totalClients = await Client.countDocuments(query);

    res.status(200).json({
      success: true,
      data: clients,
      totalClients,
      totalPages: Math.ceil(totalClients / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve clients',
      error: error.message,
    });
  }
};

// Get a single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client || client.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }
    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve client',
      error: error.message,
    });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client || client.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      data: updatedClient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update client',
      error: error.message,
    });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client || client.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete client',
      error: error.message,
    });
  }
};
