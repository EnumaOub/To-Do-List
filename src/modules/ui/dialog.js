import { compareAsc, format } from "date-fns";
import { createTask, createProject } from "./form";

console.log("TEST Dialog");

const toggleDialog = () => {
    
}

const initCancelButton = (id_dialog) => {
    const form = document.getElementById(id_dialog);
    const close_form_btn = document.querySelector(`#${id_dialog} .btn-close-dialog`)
    close_form_btn.addEventListener("click", function(event){
        form.close();
        removeEventListener("click", event)
    });
}

const initDateStart = (id_dialog) => {
    const dateStart = document.querySelector(`#${id_dialog} .date-start`)
    const date1 = format(new Date(), 'yyyy-MM-dd')
    dateStart.value = date1;
}

const initForm = (id_dialog) => {
    const form = document.getElementById(id_dialog);
    const task_add = document.querySelector(`#form-task form`);
    const project_add = document.querySelector(`#form-project form`);
    task_add.addEventListener("submit", function(event){
        event.preventDefault()
        createTask();
        form.close();
    });
    project_add.addEventListener("submit", function(event){
        event.preventDefault()
        createProject();
        form.close();
    });

}

export default function openDialog(id_dialog) {
    const form = document.getElementById(id_dialog);
    form.showModal();
    initCancelButton(id_dialog);
    initDateStart(id_dialog);
    initForm(id_dialog);

    
    

}

