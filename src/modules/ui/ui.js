
import openDialog from './dialog.js';

console.log("TEST UI");


export default function callerForm() {
    document.getElementById("add-task").addEventListener("click", (e) => {
        openDialog("form-task")
    });
    document.getElementById("add-project").addEventListener("click", (e) => {
        openDialog("form-project")
    });
}

export { callerForm };