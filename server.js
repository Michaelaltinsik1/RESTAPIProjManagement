import express from 'express';
import {getProjects, getProjectById, createProject, updateProject, deleteProject} from './queries.js';
const app = express();
const port = 3030;
app.use(express.json());
app.use( express.urlencoded({extended: true,}));
app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get('/project', getProjects)

// app.get('/project/:id', getProjectById)

// app.post('/project', createProject)

// app.put('/project/:id', updateProject)

// app.delete('/project/:id', deleteProject)

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

            