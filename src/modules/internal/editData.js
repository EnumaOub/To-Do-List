import { Task } from "./task";
import { Project } from "./project";
import { storeData, extractData } from "./store";
import { getIndexProjectFromId, getIndexTaskFromId, getProjectFromId, getTaskFromId, insertTaskFromId, insertProjectFromId } from "../internal/getInfo.js";

console.log("TEST Form");


const checkTaskValues = (taskValues) => {

}

const getAttributeTask = () => {
    const title = document.getElementById("edit-task-title");
    const description = document.getElementById("edit-task-description");
    const dateDue = document.getElementById("edit-task-dateDue");
    const dateStart = document.getElementById("edit-task-dateStart");
    const project = document.getElementById("edit-task-project");
    return [title, description, dateDue, dateStart, project]
}

const generateTask = (taskAttributes, id) => {
    const taskValues = taskAttributes.map((elem) => elem.value);
    const taskList = extractData()[1];
    const newTask = getTaskFromId(id);
    if (newTask){
        
        
        newTask.setTitle(taskValues[0]);
        newTask.setDescription(taskValues[1]);
        newTask.setDateStart(taskValues[3]);
        newTask.setProject(taskValues[4]);
        insertTaskFromId(id, newTask);
    }
   
    
}

export function editTask(id) {
    const taskAttributes = getAttributeTask();
    generateTask(taskAttributes, id);
    console.log("editTask");
    console.log(extractData()[1]);

}

const getAttributProject = () => {
    // const title = document.getElementById("project-title");
    // const description = document.getElementById("project-description");
    // const dateStart = document.getElementById("project-dateStart");
    // return [title, description, dateStart]
}

const generateProject = (projectAttributes) => {
    // const projectValues = projectAttributes.map((elem) => elem.value);
    // const newProject = new Project(...projectValues);
    // const oldProjects = extractData()[0];
    // storeData([...oldProjects, newProject], []);
}

export function editProject(id) {
    const projectAttributes = getAttributProject();
    generateProject(projectAttributes);
    console.log("createProject");
    console.log(extractData()[0]);
}