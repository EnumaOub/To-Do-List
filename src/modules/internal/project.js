import { storeData, extractData, insertProjectFromId } from "./store";
import { getProjectFromId } from "../internal/getInfo.js";
// Class

let counter = 0;
export class Project {
    constructor(title, description, dateStart, id=null) {
        
        this.title = title;
        this.description = description;
        this.dateStart = dateStart;
        if (id !== null){
            this.id = id;
        }
        else{
            const val = counter++;
            const d = new Date();
            this.id = val.toString() + title + description + d.toString();
        }
    }

    getid() {
        return this.id.toString()
    }

    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }

    setDateStart(dateStart) {
        this.dateStart = dateStart;
    }

    checkId(id2check) {
        return this.getid().toString() === id2check.toString()
    }
    
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dateStart: this.dateStart,
            id: this.id,
        }
      }
}

// Factory Function allowing to create and edit projects

export function projectGen() {
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
    
    const createProject = () => {
        const projectAttributes = getAttributProject("project");
        generateProject(projectAttributes);
    }
    
    const modifyProject = (projectAttributes, id) => {
        const projectValues = projectAttributes.map((elem) => elem.value);
        const newProject = getProjectFromId(id);
        if (newProject){
            const oldProject = newProject.title;
            newProject.setTitle(projectValues[0]);
            newProject.setDescription(projectValues[1]);
            newProject.setDateStart(projectValues[2]);
            insertProjectFromId(id, newProject, oldProject);
        }
    }
    
    const editProject = (id) => {
        const projectAttributes = getAttributProject("edit-project");
        modifyProject(projectAttributes, id);
    }

    return {editProject, createProject}
}

