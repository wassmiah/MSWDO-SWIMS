const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid'); // Import UUID for generating unique IDs if needed

// FamilyMemberSchema remains unchanged
const FamilyMemberSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  occupation: {
    type: String,
  },
  income: {
    type: Number,
  },
});

// Updated CaseDetailsSchema
const CaseDetailsSchema = new Schema({
  caseId: {
    type: Number,
    required: true,
    unique: true, // Ensure each caseId is unique
  },
  // Add more fields if needed for case details
});

// Updated ClientSchema with the modified caseDetails field
const ClientSchema = new Schema({
  id: {
    type: String,
    unique: true,
    default: uuidv4, // Automatically generate a unique id using UUID
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  extensionName: {
    type: String,
  },
  civilStatus: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  placeOfBirth: {
    type: String,
  },
  religion: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  occupation: {
    type: String,
  },
  income: {
    type: Number,
  },
  houseNo: {
    type: String,
  },
  street: {
    type: String,
  },
  barangay: {
    type: String,
  },
  municipality: {
    type: String,
  },
  spouseFirstName: {
    type: String,
  },
  spouseLastName: {
    type: String,
  },
  spouseMiddleName: {
    type: String,
  },
  spouseExtensionName: {
    type: String,
  },
  familyMembers: [FamilyMemberSchema],
  caseDetails: {
    type: CaseDetailsSchema,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  }, // Link to user
}, {
  timestamps: true
});

// Pre-save hook to ensure `caseId` uniqueness only within the scope of the user
ClientSchema.pre('save', async function (next) {
  const client = this;

  if (!client.caseDetails.caseId) {
    const lastClient = await mongoose.model('Client').findOne({ userId: client.userId }).sort({ 'caseDetails.caseId': -1 });
    client.caseDetails.caseId = lastClient ? lastClient.caseDetails.caseId + 1 : 1;
  }

  next();
});

module.exports = mongoose.model('Client', ClientSchema);
