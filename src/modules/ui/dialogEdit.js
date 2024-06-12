import { compareAsc, format } from "date-fns";
import { editTask, editProject } from "../internal/editData.js";
import { showTasks } from './showTasks.js';
import { showProjects } from './showProjects.js';
import { extractData } from "../internal/store.js";
import { getIndexProjectFromId, getIndexTaskFromId, getProjectFromId, getTaskFromId } from "../internal/getInfo.js";

console.log("TEST Dialog");

const initCancelButton = (id_dialog) => {
    const form = document.getElementById(id_dialog);
    const close_form_btn = document.querySelector(`#${id_dialog} .btn-close-dialog`)
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

const submitTask = (event, id) => {
    const form = document.getElementById("edit-task");
    event.preventDefault()
    editTask(id);
    form.close();
    showTasks();
}

function submitProject(event, id) {
    const form = document.getElementById("edit-project");
    event.preventDefault()
    editProject(id);
    form.close();
    showProjects();
}

const initForm = (id) => {
    const task_add = document.querySelector(`#edit-task form`);
    const project_add = document.querySelector(`#edit-project form`);
    task_add.removeEventListener("submit", (event) => {submitTask(event, id)});
    project_add.removeEventListener("submit", (event) => {submitProject(event, id)});
    task_add.addEventListener("submit", (event) => {submitTask(event, id)});
    project_add.addEventListener("submit", (event) => {submitProject(event, id)});

}

export default function openDialog(id_dialog, id) {
    const form = document.getElementById(id_dialog);
    form.showModal();
    initCancelButton(id_dialog);
    initValue(id_dialog, id);
    initForm(id);
}

