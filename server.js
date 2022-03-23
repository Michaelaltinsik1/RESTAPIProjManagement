import express from 'express';
import {getProjects, getProjectById, createProject, updateProject, deleteProject} from './queries.js';
const app = express();
const port = 3031;
app.use(express.json());
app.use( express.urlencoded({extended: true,}));
app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get('/projects', getProjects)

app.get('/projects/:id', getProjectById)

app.post('/projects', createProject)

app.put('/projects/:id', updateProject)

app.delete('/projects/:id', deleteProject)

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

            