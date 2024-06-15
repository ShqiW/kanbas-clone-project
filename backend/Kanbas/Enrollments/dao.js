import model from "./model.js"

export const createEnrollment = (enrollment) => {
    return model.create(enrollment);
}
export const findEnrollmentByUserId = (userId) => model.find({user: userId});
export const deleteEnrollment = (enrollmentId) => model.deleteOne({ _id: enrollmentId });
