import { Task } from "./task";
import { Project } from "./project";
import { storeData, extractData } from "./store";
import { getTaskFromId, insertTaskFromId, getProjectFromId, insertProjectFromId } from "../internal/getInfo.js";

console.log("TEST Form");

// Task

const getAttributeTask = (name) => {
    const title = document.getElementById(`${name}-title`);
    const description = document.getElementById(`${name}-description`);
    const dateDue = document.getElementById(`${name}-dateDue`);
    const dateStart = document.getElementById(`${name}-dateStart`);
    const project = document.getElementById(`${name}-project`);
    return [title, description, dateDue, dateStart, project]
}

const modifyTask = (taskAttributes, id) => {
    const taskValues = taskAttributes.map((elem) => elem.value);
    const newTask = getTaskFromId(id);
    if (newTask){
        newTask.setTitle(taskValues[0]);
        newTask.setDescription(taskValues[1]);
        newTask.setDateStart(taskValues[3]);
        newTask.setProject(taskValues[4]);
        insertTaskFromId(id, newTask);
    }
}

const generateTask = (taskAttributes) => {
    const taskValues = taskAttributes.map((elem) => elem.value);
    const newTask = new Task(...taskValues);
    const oldTasks = extractData()[1];
    storeData([], [...oldTasks, newTask]);
}

export function createTask() {
    const taskAttributes = getAttributeTask("task");
    generateTask(taskAttributes);
    console.log("createTask");
    console.log(extractData()[1]);

}

export function editTask(id) {
    const taskAttributes = getAttributeTask("edit-task");
    modifyTask(taskAttributes, id);
    console.log("editTask");
    console.log(extractData()[1]);
}


// Project

const getAttributProject = (name) => {
    const title = document.getElementById(`${name}-title`);
    const description = document.getElementById(`${name}-description`);
    const dateStart = document.getElementById(`${name}-dateStart`);
    return [title, description, dateStart]
}

const generateProject = (projectAttributes) => {
    const projectValues = projectAttributes.map((elem) => elem.value);
    const newProject = new Project(...projectValues);
    const oldProjects = extractData()[0];
    storeData([...oldProjects, newProject], []);
}

export function createProject() {
    const projectAttributes = getAttributProject("project");
    generateProject(projectAttributes);
    console.log("createProject");
    console.log(extractData()[0]);
}

const modifyProject = (projectAttributes, id) => {
    const projectValues = projectAttributes.map((elem) => elem.value);
    const newProject = getProjectFromId(id);
    if (newProject){
        newProject.setTitle(projectValues[0]);
        newProject.setDescription(projectValues[1]);
        newProject.setDateStart(projectValues[2]);
        insertProjectFromId(id, newProject);
    }
}

export function editProject(id) {
    const projectAttributes = getAttributProject("edit-project");
    modifyProject(projectAttributes, id);
    console.log("createProject");
    console.log(extractData()[0]);
}