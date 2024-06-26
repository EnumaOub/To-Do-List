
import { extractData } from "../internal/store.js";

export function getAllId() {
    const lstTask = extractData()[1];
    const lstProject = extractData()[0];
    let idTask = [];
    let idProject = [];
    for (const task of lstTask) {
        idTask.push(Number(task.getid()));
    }
    for (const project of lstProject) {
        idProject.push(Number(project.getid()))
    }
    return [idProject, idTask]

}


export function getTaskFromId(id) {
    const lstTask = extractData()[1];
    let res = "";
    for (const task of lstTask) {
        if (task.checkId(id)){
            res = task;
            break;
        }
    }
    return res
}

export function getProjectFromId(id) {
    const lstProject = extractData()[0];
    let res = "";
    for (const project of lstProject) {
        if (project.checkId(id)){
            res = project;
            break;
        }
    }
    return res
}

export function getIndexTaskFromId(id) {
    const lstTask = extractData()[1];
    const task = getTaskFromId(id);

    for (let i=0; i<lstTask.length; i++){
        if(Object.values(lstTask[i]).every((value, index) => Object.values(task)[index] === value)){
            return i;
        }
    }

    return -1;
}

export function getIndexProjectFromId(id) {
    const lstProject = extractData()[0];
    const project = getProjectFromId(id);

    for (let i=0; i<lstProject.length; i++){
        if(Object.values(lstProject[i]).every((value, index) => Object.values(project)[index] === value)){
            return i;
        }
    }

    return -1;
}


export function getTaskFromProject(project) {
    const lstTask = extractData()[1];
    let res = [];
    for (const task of lstTask) {
        if (task.checkProject(project)){
            res.push(task);
        }
    }
    return res;
}

