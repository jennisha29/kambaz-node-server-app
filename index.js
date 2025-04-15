import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import UserRoutes from "./Kambaz/Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"

//"mongodb+srv://jennishamartin163:jennimart@kambaz.sqj5dwo.mongodb.net/Kambaz"

//"mongodb+srv://jennishamartin163:<db_password>@kambaz.sqj5dwo.mongodb.net/?retryWrites=true&w=majority&appName=Kambaz"

//process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"

//"mongodb+srv://jennishamartin163:jennimart@kambaz.sqj5dwo.mongodb.net/Kambaz"

console.log("Connection string being used:", CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);

const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
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

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);