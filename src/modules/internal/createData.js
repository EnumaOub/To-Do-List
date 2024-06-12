import { Task } from "./task";
import { Project } from "./project";
import { storeData, extractData } from "./store";

console.log("TEST Form");


const checkTaskValues = (taskValues) => {

}

const getAttributeTask = () => {
    const title = document.getElementById("task-title");
    const description = document.getElementById("task-description");
    const dateDue = document.getElementById("task-dateDue");
    const dateStart = document.getElementById("task-dateStart");
    const project = document.getElementById("task-project");
    return [title, description, dateDue, dateStart, project]
}

const generateTask = (taskAttributes) => {
    const taskValues = taskAttributes.map((elem) => elem.value);
    const newTask = new Task(...taskValues);
    const oldTasks = extractData()[1];
    storeData([], [...oldTasks, newTask]);
}

export function createTask() {
    const taskAttributes = getAttributeTask();
    generateTask(taskAttributes);
    console.log("createTask");
    console.log(extractData()[1]);

}

const getAttributProject = () => {
    const title = document.getElementById("project-title");
    const description = document.getElementById("project-description");
    const dateStart = document.getElementById("project-dateStart");
    return [title, description, dateStart]
}

const generateProject = (projectAttributes) => {
    const projectValues = projectAttributes.map((elem) => elem.value);
    const newProject = new Project(...projectValues);
    const oldProjects = extractData()[0];
    storeData([...oldProjects, newProject], []);
}

export function createProject() {
    const projectAttributes = getAttributProject();
    generateProject(projectAttributes);
    console.log("createProject");
    console.log(extractData()[0]);
}