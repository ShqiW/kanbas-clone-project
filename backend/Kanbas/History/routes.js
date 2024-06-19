import * as dao from "./dao.js"

export default function HistoryRoutes(app) {
    const updateHistory = async (req, res) => {
        const { qid } = req.params;
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        let newHistory = {...JSON.parse(JSON.stringify(req.body)), user: currentUser._id, quiz: qid, points: 0}
        newHistory.questions.forEach(q => {
            if (q.questionType === 'MULTIPLE_CHOICE') {
                if (q.multipleChoiceQuestionAnswers[q.answer].correct) {
                    newHistory.points += q.points
                }
            } else if (q.questionType === 'TRUE_FALSE') {
                if (q.answer === q.trueFalseAnswer) {
                    newHistory.points += q.points
                }
            } else if (q.questionType === 'FILL_IN') {
                for (let a of q.fillInBlankAnswers) {
                    if (q.answer === a.text || (a.caseInsensitive && q.answer.toLowerCase() === a.text.toLowerCase())) {
                        newHistory.points += q.points
                        break
                    }
                }
            }
        });
        let currentHistory = await dao.findHistoriesByQuizId(currentUser._id, qid)
        if (currentHistory.length > 0) {
            newHistory.attempts = currentHistory[0].attempts + 1
            let status = await dao.updateHistory(currentHistory[0]._id, newHistory)
            res.json(status)
        } else {
          newHistory.attempts = 1
          newHistory = await dao.createHistory(newHistory)
          res.json(newHistory)
        }
    }
    const findHistoriesByQuizId = async (req, res) => {
        const { qid } = req.params;
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const quizzes = await dao.findHistoriesByQuizId(currentUser._id, qid);
        res.json(quizzes);
    }

    app.post("/api/history/:qid", updateHistory);
    app.get("/api/history/:qid", findHistoriesByQuizId);
}
