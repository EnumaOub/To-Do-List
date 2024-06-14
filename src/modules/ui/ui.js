
import openDialog from './dialog.js';
import { resetData } from '../internal/store.js';
import { showProjects, populateProjectTask } from './showProjects.js';
import { showTasks } from './showTasks.js';
import { showHide } from './showHide.js';
import { buttonFilterTask, changeActiveProject } from './filterTask.js';

console.log("TEST UI");

export function showAll() {
    showProjects();
    populateProjectTask();
    showTasks();
}


export default function callerForm() {
    showAll();
    document.getElementById("add-task").addEventListener("click", (e) => {
        openDialog("create-task")
    });
    document.getElementById("add-project").addEventListener("click", (e) => {
        openDialog("create-project")
    });
    document.getElementById("btn-reset-task").addEventListener("click", (e) => {
        resetData(true, false);
        showTasks();
    });
    document.getElementById("btn-reset-project").addEventListener("click", (e) => {
        resetData(false, true);
        showProjects();
        showTasks();
    });
    document.getElementById("btn-show-sb").addEventListener("click", (e) => {
        const body = document.getElementsByTagName("body")[0];
        if (!showHide("sidebar")) {
            body.style["grid-template-columns"] = "100%";
        }   
        else {
            body.style["grid-template-columns"] = "var(--width-sidebar) calc(100% - var(--width-sidebar))";
        }
    });
    document.getElementById("show-today").addEventListener("click", (e) => {
        const buttons = document.getElementsByClassName("btn-filter");
        buttonFilterTask(e, buttons);
        showAll();
    });
    document.getElementById("show-over").addEventListener("click", (e) => {
        const buttons = document.getElementsByClassName("btn-filter");
        buttonFilterTask(e, buttons);
        showAll();
    });

    const buttonsProject = document.querySelectorAll(".projects-elem .selector");

    for (const button of buttonsProject) {
        button.addEventListener("click", (e) => {
            buttonFilterTask(e, buttonsProject);
            changeActiveProject();
            showTasks();
        });
    }
    

}

export { callerForm };