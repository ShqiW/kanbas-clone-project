import model from "./model.js";

export const createHistory = (history) => {
    delete history._id;
    return model.create(history);
}

export const findHistoriesByQuizId = (userId, quizId) => model.find({ user: userId, quiz: quizId });
export const updateHistory = (historyId, history) => model.updateOne({ _id: historyId }, { $set: history });
