// const Pool = require("pg").Pool;
import pg from 'pg'

const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "ProjectManagement",
    password: "changeme",
    port: 5432,
});
const getProjects = (request, response) => {
//if(Object.keys(request.body).length === 0){
    pool.query("SELECT * FROM projects ORDER BY id DESC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
//}   
};
const getProjectById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query("SELECT * FROM projects WHERE id = $1", [id], (error, results) => {
         if (error) {
             throw error;
         }
         response.status(200).json(results.rows);
    });
};
const createProject = (request, response) => {
   
    const { ProjectName, ProjectBudget, ProjectLeaderId } = request.body;
    pool.query("INSERT INTO projects (project_name, project_budget,project_leader_id) VALUES ($1, $2, $3)", [ProjectName, ProjectBudget, ProjectLeaderId], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Project was added!`);
    });

};
const updateProject = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3",[name, email, id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Project modified with ID: ${id}`);
    });
};
const deleteProject = (request, response) => {
    const id = parseInt(request.params.id);
    
    pool.query("DELETE FROM projects WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }   
        response.status(200).send(`Project deleted with ID: ${id}`);
    });
};
export {getProjects, getProjectById, createProject,updateProject,deleteProject}

