import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import './add.css';

export default function Add({ nextCaseId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    id: nextCaseId,
    firstName: '',
    lastName: '',
    middleName: '',
    extensionName: '',
    civilStatus: '',
    gender: '',
    birthDate: '',
    placeOfBirth: '',
    religion: '',
    contactNo: '+63',
    occupation: '',
    income: '',
    houseNo: '',
    street: '',
    barangay: '',
    municipality: '',
    spouseFirstName: '',
    spouseLastName: '',
    spouseMiddleName: '',
    spouseExtensionName: '',
    familyMembers: [{ fullName: '', relationship: '', birthday: '', occupation: '', income: '' }],
    description: '',
    remarks: '',
    status: '',
    priority: '',
    caseCategory: '',
    date: '',
    attachments: null,
    socialWorkInCharge: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: nextCaseId,
    }));
  }, [nextCaseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'contactNo') {
      // Remove all non-numeric characters except for the '+' at the start
      let rawValue = value.replace(/[^0-9]/g, '');
  
      // Ensure the string starts with '63' (removing + because it's not part of the number)
      if (!rawValue.startsWith('63')) {
        rawValue = '63' + rawValue;
      }
  
      // Add the formatting back to the number
      let formattedValue = '+63 ';
      if (rawValue.length > 2) {
        formattedValue += rawValue.slice(2, 5);
      }
      if (rawValue.length > 5) {
        formattedValue += '-' + rawValue.slice(5, 8);
      }
      if (rawValue.length > 8) {
        formattedValue += '-' + rawValue.slice(8, 12);
      }
  
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  
  
  

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachments: e.target.files[0] });
  };

  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
    const newFamilyMembers = [...formData.familyMembers];
    newFamilyMembers[index][name] = value;
    setFormData({ ...formData, familyMembers: newFamilyMembers });
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      familyMembers: [...formData.familyMembers, { fullName: '', relationship: '', birthday: '', occupation: '', income: '' }]
    });
  };

  const removeFamilyMember = (index) => {
    const newFamilyMembers = formData.familyMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, familyMembers: newFamilyMembers });
  };

  const validateStep1 = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact No. is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    if (!formData.socialWorkInCharge.trim()) {
      newErrors.socialWorkInCharge = 'Social Work In-Charge is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 2) {
        if (!validateStep2()) return;

        const clientData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            middleName: formData.middleName,
            extensionName: formData.extensionName,
            civilStatus: formData.civilStatus,
            gender: formData.gender,
            birthDate: formData.birthDate,
            placeOfBirth: formData.placeOfBirth,
            religion: formData.religion,
            contactNo: formData.contactNo,
            occupation: formData.occupation,
            income: formData.income,
            houseNo: formData.houseNo,
            street: formData.street,
            barangay: formData.barangay,
            municipality: formData.municipality,
            spouseFirstName: formData.spouseFirstName,
            spouseLastName: formData.spouseLastName,
            spouseMiddleName: formData.spouseMiddleName,
            spouseExtensionName: formData.spouseExtensionName,
            familyMembers: formData.familyMembers,
        };

        const caseData = {
            id: formData.id,
            description: formData.description,
            remarks: formData.remarks,
            status: formData.status,
            priority: formData.priority,
            caseCategory: formData.caseCategory,
            date: formData.date,
            socialWorkInCharge: formData.socialWorkInCharge,
        };

        try {
            dispatch(showLoading());
            const token = localStorage.getItem('token');

            const clientResponse = await fetch('http://localhost:5000/api/v1/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(clientData),
            });

            const clientDataResponse = await clientResponse.json();

            if (clientResponse.status === 500) {
                console.error('Internal Server Error:', clientDataResponse.message);
                setErrors({ form: 'An unexpected server error occurred. Please try again later.' });
                return;
            }

            if (!clientDataResponse.success) {
                console.error('Failed to add client:', clientDataResponse.message);
                setErrors({ form: 'Failed to add client. Please try again.' });
                return;
            }

            const caseResponse = await fetch('http://localhost:5000/api/v1/cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(caseData),
            });

            const caseDataResponse = await caseResponse.json();

            if (!caseDataResponse.success) {
                console.error('Failed to add case:', caseDataResponse.message);
                setErrors({ form: 'Failed to add case. Please try again.' });
                return;
            }

            // Redirect based on case category
            let redirectPath = '';
            switch (formData.caseCategory) {
                case 'Victim Survivors':
                case 'Children in Conflict':
                case 'Person Who Used Drugs':
                case 'Special Cases':
                    redirectPath = `/progress?caseCategory=${encodeURIComponent(formData.caseCategory.trim())}`;
                    break;
                default:
                    redirectPath = '/progress';
            }

            // Reset the form data after successful submission
            setFormData({
                id: nextCaseId,
                firstName: '',
                lastName: '',
                middleName: '',
                extensionName: '',
                civilStatus: '',
                gender: '',
                birthDate: '',
                placeOfBirth: '',
                religion: '',
                contactNo: '',
                occupation: '',
                income: '',
                houseNo: '',
                street: '',
                barangay: '',
                municipality: '',
                spouseFirstName: '',
                spouseLastName: '',
                spouseMiddleName: '',
                spouseExtensionName: '',
                familyMembers: [{ fullName: '', relationship: '', birthday: '', occupation: '', income: '' }],
                description: '',
                remarks: '',
                status: '',
                priority: '',
                caseCategory: '',
                date: '',
                attachments: null,
                socialWorkInCharge: ''
            });
            setErrors({});
            navigate(redirectPath);
        } catch (error) {
            console.error('Error submitting data:', error);
            setErrors({ form: 'Failed to save data. Please try again.' });
        } finally {
            dispatch(hideLoading());
        }
    }
};

  return (
    <div className='addwhole'>
      <div className='addreportwhole'>
        <div className='report'>
          <h2>Add Report</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="section-title">Personal Information</div>
              <div className="section-custom">
                {/* Personal Information Fields */}
                <div className="field-custom">
                  <label className="label-custom">First Name:</label>
                  <input
                    className="input-custom"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder='FirstName'
                  />
                  {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>

                <div className="field-custom">
                  <label className="label-custom">Last Name:</label>
                  <input
                    className="input-custom"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder='LastName'
                  />
                  {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                </div>

                <div className="field-custom">
                  <label className="label-custom">Middle Name:</label>
                  <input className="input-custom" type="text" name="middleName" placeholder='MiddleName' value={formData.middleName} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Extension Name:</label>
                  <input className="input-custom" type="text" name="extensionName" placeholder='Jr. , Sr. , III , etc.' value={formData.extensionName} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Civil Status:</label>
                  <select className="input-custom" name="civilStatus" value={formData.civilStatus} onChange={handleInputChange}>
                    <option value="">Select Civil Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>

                <div className="field-custom">
                  <label className="label-custom">Gender:</label>
                  <select className="input-custom" name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="field-custom">
                  <label className="label-custom">Birth Date:</label>
                  <input className="input-custom" type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Place of Birth:</label>
                  <input className="input-custom" type="text" name="placeOfBirth" placeholder='Birth Place' value={formData.placeOfBirth} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Religion:</label>
                  <input className="input-custom" type="text" name="religion" placeholder='Religion' value={formData.religion} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Contact No.:</label>
                  <input
                    className="input-custom"
                    type="text"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    placeholder="09XX-XXX-XXXX"
                    maxLength="16"
                    required
                  />
                  {errors.contactNo && <p className="error-message">{errors.contactNo}</p>}
                </div>


                <div className="field-custom">
                  <label className="label-custom">Occupation:</label>
                  <input className="input-custom" type="text" name="occupation" placeholder='Occupation' value={formData.occupation} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Income:</label>
                  <input className="input-custom" type="text" name="income" placeholder='Income' value={formData.income} onChange={handleInputChange} />
                </div>
              </div>

              <div className="section-title">Permanent Address</div>
              <div className="section-custom">
                {/* Address Fields */}
                <div className="field-custom">
                  <label className="label-custom">House No.:</label>
                  <input className="input-custom" type="text" name="houseNo" placeholder='House No.' value={formData.houseNo} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Street :</label>
                  <input className="input-custom" type="text" name="streetNo" placeholder='Street' value={formData.streetNo} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Barangay:</label>
                  <input className="input-custom" type="text" name="barangay" placeholder='Barangay' value={formData.barangay} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Municipality:</label>
                  <input className="input-custom" type="text" name="municipality" placeholder='Municipality' value={formData.municipality} onChange={handleInputChange} />
                </div>
              </div>

              <div className="section-title">Family Information</div>
              <div className="section-custom">
                {/* Spouse Information Fields */}
                <div className="field-custom full-width">
                  <label className="label-custom">Name of Spouse (if married):</label>
                </div>
                <div className="field-custom">
                  <label className="label-custom">First Name:</label>
                  <input className="input-custom" type="text" name="spouseFirstName" placeholder='FirstName' value={formData.spouseFirstName} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Last Name:</label>
                  <input className="input-custom" type="text" name="spouseLastName" placeholder='LastName' value={formData.spouseLastName} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Middle Name:</label>
                  <input className="input-custom" type="text" name="spouseMiddleName" placeholder='MiddleName' value={formData.spouseMiddleName} onChange={handleInputChange} />
                </div>
                <div className="field-custom">
                  <label className="label-custom">Extension Name:</label>
                  <input className="input-custom" type="text" name="spouseExtensionName" placeholder='Jr. , Sr. , III , etc.' value={formData.spouseExtensionName} onChange={handleInputChange} />
                </div>
              </div>

              <h3 className="section-title">Family Members</h3>
              <div className="family-members-header">
                <div className="family-member-cell">Name</div>
                <div className="family-member-cell">Relationship</div>
                <div className="family-member-cell">Birthday</div>
                <div className="family-member-cell">Occupation</div>
                <div className="family-member-cell">Income</div>
                <div className="family-member-cell">Action</div>
              </div>
              {formData.familyMembers.map((member, index) => (
                <div className="family-member-custom" key={index}>
                  <div className="field-custom-inline">
                    <input className="input-custom" type="text" name="fullName" placeholder='Whole Name' value={member.fullName} onChange={(e) => handleFamilyMemberChange(index, e)} />
                    {errors.familyMemberName && <p className="error-message">{errors.familyMemberName}</p>}
                  </div>
                  <div className="field-custom-inline">
                    <input className="input-custom" type="text" name="relationship" placeholder='Relationship' value={member.relationship} onChange={(e) => handleFamilyMemberChange(index, e)} />
                    {errors.familyMemberRelationship && <p className="error-message">{errors.familyMemberRelationship}</p>}
                  </div>
                  <div className="field-custom-inline">
                    <input className="input-custom" type="date" name="birthday" value={member.birthday} onChange={(e) => handleFamilyMemberChange(index, e)} />
                    {errors.familyMemberBirthday && <p className="error-message">{errors.familyMemberBirthday}</p>}
                  </div>
                  <div className="field-custom-inline">
                    <input className="input-custom" type="text" name="occupation" placeholder='Occupation' value={member.occupation} onChange={(e) => handleFamilyMemberChange(index, e)} />
                  </div>
                  <div className="field-custom-inline">
                    <input className="input-custom" type="text" name="income" placeholder='Income' value={member.income} onChange={(e) => handleFamilyMemberChange(index, e)} />
                  </div>
                  <div className="field-custom-inline">
                    <button className="button-remove-custom" type="button" onClick={() => removeFamilyMember(index)}>Remove</button>
                  </div>
                </div>
              ))}
              <button className="button-custom" type="button" onClick={addFamilyMember}>Add Family Member</button>
              <button className="button-custom" type="button" onClick={handleNextStep}>Next</button>
              <button className="button-custom" type="button" onClick={() => navigate('/progress')}>Case Reports</button>
            </>
          )}
          {step === 2 && (
            <>
              {/* Case Information Fields */}
              <div className='summary'>
                <label>Description</label>
                <textarea
                  placeholder="Type Here..."
                  name="description"
                  type="text"
                  className='sum'
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                {errors.description && <p className="error">{errors.description}</p>}
              </div>
              <div className='summary'>
                <label>Remarks</label>
                <textarea
                  placeholder="Type Here..."
                  name="remarks"
                  type="text"
                  className='sum'
                  value={formData.remarks}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field-grid">
                <label className="label-custom">Status</label>
                <select
                  name="status"
                  className="input-custom"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && <p className="error">{errors.status}</p>}
              </div>

              <div className="field-grid">
                <label className="label-custom">Priority</label>
                <select
                  name="priority"
                  className="input-custom"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="">Select Priority</option>
                  <option value="Simple">Simple</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Complex">Complex</option>
                </select>
              </div>

              <div className="field-grid">
                <label className="label-custom">Case Category</label>
                <select
                  name="caseCategory"
                  className="input-custom"
                  value={formData.caseCategory}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Victim Survivors">Victim Survivors</option>
                  <option value="Children in Conflict">Children in Conflict</option>
                  <option value="Person Who Used Drugs">Person Who Used Drugs</option>
                  <option value="Special Cases">Special Cases</option>
                </select>
                {errors.caseCategory && <p className="error">{errors.caseCategory}</p>}
              </div>

              <div className="field-grid">
                <label className="label-custom">Date</label>
                <input
                  type="date"
                  name="date"
                  className="input-custom"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
                {errors.date && <p className="error">{errors.date}</p>}
              </div>

              <div className="attachment">
                <label className="label-custom">Attachments</label>
                <input
                  type="file"
                  name="attachments"
                  className="attachments"
                  onChange={handleFileChange}
                />
              </div>

              <div className="field-grid">
                <label className="label-custom">Social Work In-Charge</label>
                <input
                  type="text"
                  name="socialWorkInCharge"
                  className="input-custom"
                  value={formData.socialWorkInCharge}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {errors.form && <p className="error">{errors.form}</p>}
              <div className='savebutadd'>
                <button type="button" className='savebutt' onClick={() => setStep(1)}>Back</button>
                <button type="submit" className='savebutt'>Save</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
