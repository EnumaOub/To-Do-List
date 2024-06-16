import { format } from "date-fns";
import { taskGen } from "../internal/task.js";
import { projectGen } from "../internal/project.js";
import { projectUI } from './showProjects.js';
import { taskUI } from './showTasks.js';
import { getProjectFromId, getTaskFromId } from "../internal/getInfo.js";


export function Dialog () {

    const initCancelButton = (id_dialog) => {
        const form = document.getElementById(id_dialog);
        const close_form_btn = document.querySelector(`#${id_dialog} .btn-close-dialog`);
        close_form_btn.addEventListener("click", function(event){
            form.close();
            removeEventListener("click", event)
        });
    }
    
    
    const initTaskValue = (id_dialog, id) => {
        const formData = document.querySelectorAll(`#${id_dialog} input`);
        const newTask = getTaskFromId(id);
        if (newTask){
            const paramLst = Object.keys(newTask);
            for (const inputf of formData) {
                if (paramLst.includes(inputf.classList[0])){
                    inputf.value = newTask[inputf.classList[0]]
                }
            }
        }
    }
    
    const initProjectValue = (id_dialog, id) => {
        const formData = document.querySelectorAll(`#${id_dialog} input`);
        const newProject = getProjectFromId(id);
        if (newProject){
            const paramLst = Object.keys(newProject);
            for (const inputf of formData) {
                if (paramLst.includes(inputf.classList[0])){
                    inputf.value = newProject[inputf.classList[0]]
                }
            }
        }
    }
    
    const initValue = (id_dialog, id) => {
        if (id_dialog === "edit-task") {
            initTaskValue(id_dialog, id);
        }
        else if (id_dialog === "edit-project") {
            initProjectValue(id_dialog, id);
        }
        
    }
    
    const initDateStart = (id_dialog) => {
        const dateStart = document.querySelector(`#${id_dialog} .dateStart`);
        const date1 = format(new Date(), 'yyyy-MM-dd');
        dateStart.value = date1;
    }
    
    const submitTask = (event) => {
        const form = document.getElementById("create-task");
        event.preventDefault()
        taskGen().createTask();
        form.close();
        taskUI().showTasks();
    }
    
    const submitProject = (event) => {
        const form = document.getElementById("create-project");
        event.preventDefault()
        projectGen().createProject();
        form.close();
        projectUI().populateProjectTask();
        projectUI().showProjects();
    }
    
    const initCreateForm = (id_dialog) => {
        const form = document.querySelector(`#${id_dialog} form`);
        if (id_dialog.includes("task")){
            form.removeEventListener("submit", submitTask);
            form.addEventListener("submit", submitTask);
        }
        else if (id_dialog.includes("project")){
            form.removeEventListener("submit", submitProject);   
            form.addEventListener("submit", submitProject);
        }
    }
    
    
    const submitEditTask = (event, id, id_dialog) => {
        const form = document.getElementById(`${id_dialog}`);
        event.preventDefault()
        taskGen().editTask(id);
        form.close();
        taskUI().showTasks();
        const formv = document.querySelector(`#${id_dialog} form`);
        formv.removeEventListener("submit", (e) => {submitEditProject(e, id, id_dialog)}); 
    
    }
    
    const submitEditProject = (event, id, id_dialog) => {
        const form = document.getElementById(`${id_dialog}`);
        event.preventDefault()
        projectGen().editProject(id);
        form.close();
        projectUI().populateProjectTask();
        projectUI().showProjects();
        taskUI().showTasks();
        const formv = document.querySelector(`#${id_dialog} form`);
        formv.removeEventListener("submit", (e) => {submitEditProject(e, id, id_dialog)});  
    }
    
    const initEditForm = (id_dialog, id) => {
        const form = document.querySelector(`#${id_dialog} form`);
        if (id_dialog.includes("task")){
            form.addEventListener("submit", (event) => {submitEditTask(event, id, id_dialog)},  { once: true });
        }
        else if (id_dialog.includes("project")){
            form.addEventListener("submit", (event) => {submitEditProject(event, id, id_dialog)},  { once: true });
        }
    
    }
    
    const openDialog = (id_dialog, id=null) => {
        const form = document.getElementById(id_dialog);
        form.showModal();
        if (id_dialog.includes("create")){
            initCancelButton(id_dialog);
            initDateStart(id_dialog);
            initCreateForm(id_dialog);
        }
        else if (id_dialog.includes("edit")){
            initValue(id_dialog, id);
            initEditForm(id_dialog, id);
        }
        
    }

    return { openDialog }
    
    
}


