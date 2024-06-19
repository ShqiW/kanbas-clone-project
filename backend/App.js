import express from 'express';
import Hello from './Hello.js';
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/route.js';
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import QuizRoutes from './Kanbas/Quizzes/routes.js';
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';
import HistoryRoutes from './Kanbas/History/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));


Hello(app)
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
QuizRoutes(app);
EnrollmentRoutes(app);
HistoryRoutes(app)
app.listen(process.env.PORT || 4000)