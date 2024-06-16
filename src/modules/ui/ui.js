
import openDialog from './dialog.js';
import { resetData, extractData } from '../internal/store.js';
import { showProjects, populateProjectTask } from './showProjects.js';
import { showTasks } from './showTasks.js';
import { showHide } from './showHide.js';
import { buttonFilterTask, changeActiveProject } from './filterTask.js';
import { autoPop } from '../internal/autoPop.js';

const showAll = () => {
    showProjects();
    populateProjectTask();
    showTasks();
    checkEmpty();
}

const addButton = () => {
    document.getElementById("add-task").addEventListener("click", (e) => {
        const oldProjects = extractData()[0];
        if (oldProjects.length > 0) {
            openDialog("create-task");
        }
    });
    document.getElementById("add-project").addEventListener("click", (e) => {
        openDialog("create-project")
    });
}

const resetButton = () => {
    document.getElementById("btn-reset-task").addEventListener("click", (e) => {
        if (confirm(`Are you sure of Resetting all tasks!`)) {
            resetData(true, false);
            showTasks();
            checkEmpty();
        }
        
    });
    document.getElementById("btn-reset-project").addEventListener("click", (e) => {
        if (confirm(`Are you sure of Resetting all projects be aware that it will also reset all tasks!`)) {
            resetData(false, true);
            showProjects();
            showTasks();
            checkEmpty();
        }
    });
}

const showHideButton = () => {
    document.getElementById("btn-show-sb").addEventListener("click", (e) => {
        const body = document.getElementsByTagName("body")[0];
        if (!showHide("sidebar")) {
            body.style["grid-template-columns"] = "100%";
        }   
        else {
            body.style["grid-template-columns"] = "var(--width-sidebar) calc(100% - var(--width-sidebar))";
        }
    });
}

const filterButton = () => {
    const buttonsProject = document.querySelectorAll(".projects-elem .selector");

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
    document.getElementById("show-urgent").addEventListener("click", (e) => {
        const buttons = document.getElementsByClassName("btn-filter");
        buttonFilterTask(e, buttons);
        showAll();
    });

    for (const button of buttonsProject) {
        button.addEventListener("click", (e) => {
            buttonFilterTask(e, buttonsProject);
            changeActiveProject();
            showTasks();
        });
    }
}

const checkEmpty = () => {
    const container = document.getElementsByTagName("main")[0];
    if(!(container.firstChild)){
        const div = document.createElement("div");
        const btn = document.createElement("button");
        div.id = "gen-data-rd";
        div.textContent = "You can create Tasks by using the button '+' next to Projects and Tasks in sidebar or use the button below to generate some examples:";
        btn.textContent = "Generate Data ?";
        btn.addEventListener("click", function(event){
            autoPop();
            showAll();
        });
        div.appendChild(btn);
        container.appendChild(div);
    }
}

export default function callerForm() {
    showAll();
    addButton();
    resetButton();
    showHideButton();
    filterButton(); 
    checkEmpty();
}

export { callerForm };