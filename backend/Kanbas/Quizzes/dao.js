import mongoose from "mongoose";
import model from "./model.js";

export const createQuiz = (quiz) => {
    quiz._id = new mongoose.Types.ObjectId()._id;
    return model.create(quiz);
}

export const findQuizzesByCourseId = (courseId) => model.find({ course: courseId });
export const findQuizByQuizId = (quizId) => model.findOne({ _id: quizId });
export const findAllQuizzes = () => model.find();
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId })

