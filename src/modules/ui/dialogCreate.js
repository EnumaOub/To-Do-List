import { compareAsc, format } from "date-fns";
import { createTask, createProject } from "../internal/createData.js";
import { showTasks } from './showTasks.js';
import { showProjects } from './showProjects.js';

console.log("TEST Dialog");

const toggleDialog = () => {
    
}

const initCancelButton = (id_dialog) => {
    const form = document.getElementById(id_dialog);
    const close_form_btn = document.querySelector(`#${id_dialog} .btn-close-dialog`);
    close_form_btn.addEventListener("click", function(event){
        form.close();
        removeEventListener("click", event)
    });
}

const initDateStart = (id_dialog) => {
    const dateStart = document.querySelector(`#${id_dialog} .dateStart`);
    const date1 = format(new Date(), 'yyyy-MM-dd');
    dateStart.value = date1;
}

function submitTask(event) {
    const form = document.getElementById("form-task");
    event.preventDefault()
    createTask();
    form.close();
    showTasks();
}

function submitProject(event) {
    const form = document.getElementById("form-project");
    event.preventDefault()
    createProject();
    form.close();
    showProjects();
}

const initForm = () => {
    const task_add = document.querySelector(`#form-task form`);
    const project_add = document.querySelector(`#form-project form`);
    task_add.removeEventListener("submit", submitTask);
    project_add.removeEventListener("submit", submitProject);
    task_add.addEventListener("submit", submitTask);
    project_add.addEventListener("submit", submitProject);

}

export default function openDialog(id_dialog) {
    const form = document.getElementById(id_dialog);
    form.showModal();
    initCancelButton(id_dialog);
    initDateStart(id_dialog);
    initForm();

    
    

}

