import { Task } from "./task";
import { Project } from "./project";
import { getIndexProjectFromId, getIndexTaskFromId, getTaskFromProject } from "../internal/getInfo.js";

export function storeData(lstProjects, lstTask){
    if (lstProjects.length > 0) {
        localStorage.setItem("projects", JSON.stringify(lstProjects));
    }
    if (lstTask.length > 0) {
        localStorage.setItem("tasks", JSON.stringify(lstTask));
    }
}


export function extractData(){
    let lstTask = [];
    let lstProject = [];
    if (localStorage.getItem('tasks')) {
        const task_hist = JSON.parse(localStorage.getItem('tasks'));
        for (const task of task_hist) {
            lstTask.push(new Task(...Object.values(task)));
        }
    }
    if (localStorage.getItem('projects')) {
        const project_hist = JSON.parse(localStorage.getItem('projects'));
        for (const project of project_hist) {
            lstProject.push(new Project(...Object.values(project)));
        }
    }
    return [lstProject, lstTask]
}

export function resetData(taskRST, projectRST) {
    if (taskRST) {
        localStorage.removeItem("tasks");
    }
    if (projectRST) {
        localStorage.removeItem("tasks");
        localStorage.removeItem("projects");
    }
}

export function insertTaskFromId(id, newTask) {
    const lstTask = extractData()[1];
    const index = getIndexTaskFromId(id);
    const newtaskList = lstTask.slice()
    if (index !== -1) {
        newtaskList[index] = newTask;
        storeData([], [...newtaskList]);
        return true
    }
    else {
        return false
    }
}

const deleteTasskFromProject = (project) =>  {
    const lstTask = getTaskFromProject(project);
    for (const task of lstTask) {
        deleteTaskFromId(task.getid())
    }
} 

const changeTaskFromProject = (newProject, oldProject) => {
    const lstTask = getTaskFromProject(oldProject);
    for (const task of lstTask) {
        task.setProject(newProject);
        insertTaskFromId(task.getid(), task);
    }
}

export function insertProjectFromId(id, newProject, oldProject) {
    const lstProject = extractData()[0];
    const index = getIndexProjectFromId(id);
    const newProjectList = lstProject.slice()
    if (index !== -1) {
        newProjectList[index] = newProject;
        changeTaskFromProject(newProject.title, oldProject);
        storeData([...newProjectList], []);
        return true
    }
    else {
        return false
    }
}

export function deleteTaskFromId(id) {
    const lstTask = extractData()[1];
    const index = getIndexTaskFromId(id);
    const newtaskList = lstTask.slice()
    if (index !== -1) {
        newtaskList.splice(index, 1);
        if (newtaskList.length > 0){
            storeData([], newtaskList);
        }
        else {
            resetData(true, false);
        }
        return true;
    }
    else {
        return false;
    }
    
}

export function deleteProjectFromId(id) {
    const lstProject = extractData()[0];
    const index = getIndexProjectFromId(id);
    const newProjectList = lstProject.slice()
    if (index !== -1) {
        deleteTasskFromProject(newProjectList[index].title);
        newProjectList.splice(index, 1);
        if (newProjectList.length > 0){
            storeData(newProjectList, []);
        }
        else {
            resetData(false, true);
        }
        return true;
    }
    else {
        return false;
    }
}