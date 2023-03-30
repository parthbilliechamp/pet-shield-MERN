/**
 * @author Parth Champaneria
 */

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// defining schema for the appointments collection
const appointmentSchema = new mongoose.Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  date: { type: String, required: true },
  status: {type: String, required: true},
  vet: {
    _id: { type: ObjectId, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    photo_url: { type: String },
    license_number: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    clinic_license_number: { type: String, required: true },
    clinic_address: { type: String, required: true },
    clinic_photo_url: { type: String },
    rating: { type: Number, required: true },
    fees: { type: Number, required: true },
    clinic_name: { type: String, required: true },
  },
  pet_id: { type: ObjectId, required: true },
  pet_owner: {
    _id: { type: ObjectId, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
  },
});

const appointment = mongoose.model("appointments", appointmentSchema);

//save appointment data in the database
exports.bookAppointment = async (appointmentData) => {
  appointmentData.status = 'confirm';
  const newAppointment = new appointment(appointmentData);
  const response = await newAppointment.save();
  return response;
};

//modify the appointment, searching the appointment by id and updating with the new data.
exports.updateAppointment = async (id, updatedAppointmentData) => {
  const result = await appointment.findByIdAndUpdate(
    id,
    updatedAppointmentData,
    {
      new: true,
    }
  );
  return result;
};

//cancel the appointment, searching the appointment by id
exports.cancelAppointment = async (id) => {
  const result = await appointment.findByIdAndDelete(id);
  return result;
};

//get list of appointments for a pet owner, searching the reacords by petowner id.
exports.getAppointmentsByPetOwnerId = async (petOwnerId) => {
  const result = await appointment
    .find({
      "pet_owner._id" : petOwnerId,
      //date: { $gte: new Date().toISOString().slice(0, 10) },
    })
    .sort({ date: 1 });
  return result;
};
