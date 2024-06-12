
import openDialog from './dialogCreate.js';
import { resetData } from '../internal/store.js';
import { showProjects } from './showProjects.js';
import { showTasks } from './showTasks.js';

console.log("TEST UI");


export default function callerForm() {
    showTasks();
    document.getElementById("add-task").addEventListener("click", (e) => {
        openDialog("form-task")
    });
    document.getElementById("add-project").addEventListener("click", (e) => {
        openDialog("form-project")
    });
    document.getElementById("btn-reset-task").addEventListener("click", (e) => {
        resetData(true, false);
        showTasks();
    });
    document.getElementById("btn-reset-project").addEventListener("click", (e) => {
        resetData(false, true);
        showProjects();
    });
}

export { callerForm };