import * as dao from "./dao.js"


export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const quiz = { ...req.body, course: cid }
        const newQuiz = await dao.createQuiz(quiz)
        res.json(newQuiz)

    }
    const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    }
    const findQuizzesByCourseId = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourseId(cid)
        res.send(quizzes)
    }
    const findQuizByQuizId = async (req, res) => {
        const status = await dao.findQuizByQuizId(qid, req.body);
        res.json(status);
    }
    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    }
    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid)
        res.json(status)
    }




    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.get("/api/courses/:cid/quizzes", findQuizzesByCourseId);
    app.get("/api/quizzes/:qid", findQuizByQuizId);
    app.get("/api/quizzes", findAllQuizzes);
    app.put("/api/quizzss/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz)

}