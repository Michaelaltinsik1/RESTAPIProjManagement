import pg from 'pg'

const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "ProjectManagement",
    password: "changeme",
    port: 5432,
});
const getProjects = (request, response) => {
    pool.query("SELECT * FROM projects ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    }); 
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
    pool.query("INSERT INTO projects (project_name, project_budget,project_leader_id) VALUES ($1, $2, $3) returning *", [ProjectName, ProjectBudget, ProjectLeaderId], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Project was added with` + ' id:' + results.rows[0].id);
    });

};
const updateProject = (request, response) => {
    const id = parseInt(request.params.id);
    const { ProjectName, ProjectBudget, ProjectLeaderId } = request.body;
    pool.query("UPDATE projects SET project_name = $1, project_budget = $2, project_leader_id = $3 WHERE id = $4",[ProjectName, ProjectBudget, ProjectLeaderId,id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Project modified with ID: ${id}`);
    });
};
const deleteProject = (request, response) => {
    const id = parseInt(request.params.id);  
    pool.query("DELETE FROM project_employee WHERE project_id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }   
    });
    pool.query("DELETE FROM projects WHERE id = $1;", [id], (error, results) => {
        if (error) {
            throw error;
        }   
        response.status(200).send(`Project deleted with ID: ${id}`);
    });
};
export {getProjects, getProjectById, createProject,updateProject,deleteProject}

