const { Case, Sequence } = require('../models/CaseModel');

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
    const sequenceDocument = await Sequence.findOneAndUpdate(
        { name: sequenceName },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.value;
};

// Function to reset the sequence value
const resetSequenceValue = async (sequenceName) => {
    await Sequence.findOneAndUpdate(
        { name: sequenceName },
        { value: 1 },
        { new: true, upsert: true }
    );
};

// Create a new case
exports.createCase = async (req, res) => {
    try {
        const caseNumber = await getNextSequenceValue('caseNumber');
        const newCase = new Case({
            ...req.body,
            caseNumber,
            caseCategory: req.body.caseCategory.trim(),  // Trim caseCategory before saving
            date: req.body.date,  // Ensure date is included
            userId: req.user.id,  // Use user ID from the AuthMiddleware
        });
        const savedCase = await newCase.save();
        res.status(201).json({ success: true, case: savedCase });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get cases with pagination and filtering
exports.getCases = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const status = req.query.status;
        const priority = req.query.priority;
        const socialWorkInCharge = req.query.socialWorkInCharge;
        const searchQuery = req.query.search;
        const caseCategory = req.query.caseCategory ? req.query.caseCategory.trim() : '';

        let query = { userId: req.user.id };
        
        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }
        if (socialWorkInCharge) {
            query.socialWorkInCharge = socialWorkInCharge;
        }
        if (searchQuery) {
            query.description = { $regex: searchQuery, $options: 'i' };
        }
        if (caseCategory) {
            query.caseCategory = caseCategory;  // Ensure this is only added when caseCategory is present
        }
        
        console.log("Final MongoDB Query:", JSON.stringify(query, null, 2));  // Log to verify query

        const cases = await Case.find(query)
            .skip(skip)
            .limit(limit)
            .select('caseNumber description status priority caseCategory date socialWorkInCharge');
        const totalCases = await Case.countDocuments(query);

        res.status(200).json({
            success: true,
            cases,
            totalCases,
            totalPages: Math.ceil(totalCases / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error("Error fetching cases:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete a case and reset the sequence if no cases remain
exports.deleteCase = async (req, res) => {
    try {
        const { caseId } = req.params;
        await Case.findByIdAndDelete(caseId);

        const remainingCases = await Case.countDocuments({ userId: req.user.id });
        if (remainingCases === 0) {
            await resetSequenceValue('caseNumber');
        }

        res.status(200).json({ success: true, message: 'Case deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
