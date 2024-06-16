import { storeData, extractData, insertTaskFromId } from "./store";
import { getTaskFromId } from "../internal/getInfo.js";

// Task

let counter = 0;
export class Task {
    constructor(title, description, dateDue, dateStart, project, priority=2, id=null) {
        
        this.title = title;
        this.description = description;
        this.dateDue = dateDue;
        this.dateStart = dateStart;
        this.project = project;
        this.priority = priority;
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

    setDateDue(dateDue) {
        this.dateDue = dateDue;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    setProject(project) {
        this.project = project;
    }

    checkId(id2check) {
        return this.getid().toString() === id2check.toString()
    }

    checkProject(project2check) {
        return this.project.toString() === project2check.toString()
    }
    
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dateDue: this.dateDue,
            dateStart: this.dateStart,
            project: this.project,
            priority: this.priority,
            id: this.id,
        }
      }
}


// Factory Function allowing to create and edit tasks

export function taskGen() {

    const getAttributeTask = (name) => {
        const title = document.getElementById(`${name}-title`);
        const description = document.getElementById(`${name}-description`);
        const dateDue = document.getElementById(`${name}-dateDue`);
        const dateStart = document.getElementById(`${name}-dateStart`);
        const project = document.getElementById(`${name}-project`);
        const priority = document.getElementById(`${name}-priority`);
        return [title, description, dateDue, dateStart, project, priority]
    };
    
    const modifyTask = (taskAttributes, id) => {
        const taskValues = taskAttributes.map((elem) => elem.value);
        const newTask = getTaskFromId(id);
        if (newTask){
            newTask.setTitle(taskValues[0]);
            newTask.setDescription(taskValues[1]);
            newTask.setDateDue(taskValues[2]);
            newTask.setDateStart(taskValues[3]);
            newTask.setProject(taskValues[4]);
            newTask.setPriority(taskValues[5]);
            insertTaskFromId(id, newTask);
        }
    };
    
    const generateTask = (taskAttributes) => {
        const taskValues = taskAttributes.map((elem) => elem.value);
        const newTask = new Task(...taskValues);
        const oldTasks = extractData()[1];
        storeData([], [...oldTasks, newTask]);
    };
    
    const createTask = () => {
        const taskAttributes = getAttributeTask("task");
        generateTask(taskAttributes);
    };
    
    const editTask = (id) => {
        const taskAttributes = getAttributeTask("edit-task");
        modifyTask(taskAttributes, id);
    };

    return { editTask, createTask };
}

