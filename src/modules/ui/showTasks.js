import { compareAsc, format, formatDistance, formatRelative, subDays } from "date-fns";
import { storeData, extractData, resetData, deleteTaskFromId } from "../internal/store";
import openDialog from "./dialog";

console.log("TEST showTasks");

const generateProjectDiv = (container) => {
    const projectList = extractData()[0];
    for (const project of projectList) {
        const projectDiv = document.createElement("div");
        const titleProject = document.createElement("h2");

        projectDiv.id = project.title;
        projectDiv.className = "project-show";

        titleProject.textContent = project.title;
        projectDiv.style.display = "none";

        projectDiv.appendChild(titleProject);
        container.appendChild(projectDiv);
    }
}

const generateCardTask = (task) => {
    const projectContainer = document.getElementById(task.project);
    projectContainer.style.display = "grid";

    const card = document.createElement("card");
    const buttonValidate = document.createElement("button");
    const title = document.createElement("h3");
    const dateDue = document.createElement("p");
    const dateStart = document.createElement("p");
    const buttonShow = document.createElement("button");
    const infoContainer = document.createElement("div");
    const description = document.createElement("p");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    card.id = `nb_${task.getid()}`;
    card.classList.add(`priority-${task.priority}`);
    buttonShow.classList.add("show");
    buttonValidate.classList.add("valid-btn");

    buttonValidate.textContent = "V";
    title.textContent = task.title;

    dateDue.innerHTML = `<span class="element-task">Due: </span>`;
    if (task.dateDue) {
        dateDue.appendChild(document.createTextNode(formatDistance(new Date(task.dateDue), new Date(), { addSuffix: true })));
    }

    dateStart.innerHTML = `<span class="element-task">Started: </span>`;
    if (task.dateStart) {
        dateStart.appendChild(document.createTextNode(formatRelative(new Date(task.dateStart), new Date()).split('at')[0]));
    }

    buttonShow.textContent = "+"

    description.innerHTML = `<span class="element-task">Description: </span>`;
    description.appendChild(document.createTextNode(task.description));

    deleteButton.textContent = "Del";
    editButton.textContent = "Edit";

    buttonValidate.addEventListener("click", (e) => {
        if (confirm(`Are you sure of Validating the task "${task.title}" !`)) {
            deleteTaskFromId(task.getid());
            showTasks();
        }
    })

    deleteButton.addEventListener("click", (e) => {
        deleteTaskFromId(task.getid());
        showTasks();
    })

    editButton.addEventListener("click", (e) => {
        openDialog("edit-task", task.getid());
    })

    buttonShow.addEventListener("click", (e) => {
        infoContainer.innerHTML = "";

        if (e.target.classList.contains("show")){
            e.target.textContent = "-";
            infoContainer.appendChild(dateStart);
            infoContainer.appendChild(description);
            infoContainer.appendChild(deleteButton);
            infoContainer.appendChild(editButton);
        }
        else {
            e.target.textContent = "+";
        }
        e.target.classList.toggle("show");
    })

    projectContainer.appendChild(buttonValidate);

    card.appendChild(title);
    card.appendChild(dateDue);
    card.appendChild(buttonShow);
    card.appendChild(infoContainer);
    
    projectContainer.appendChild(card);
}

const checkFilters = (task) => {
    const buttonToday = document.getElementById("show-today");
    const buttonOverdue = document.getElementById("show-over");
    const taskDate = new Date(task.dateDue); 
    const today = new Date();
    let sameDate = false;
    let overDate = false;
    if (task.dateDue) {
        sameDate = (taskDate.getYear() === today.getYear()
                        && taskDate.getMonth() === today.getMonth()
                        && taskDate.getDay() === today.getDay());
        overDate = (taskDate < today);
    }
    return {
            today: {
                active: buttonToday.classList.contains("active"), 
                check: sameDate
            }, 
            overdue: {
                active: buttonOverdue.classList.contains("active"), 
                check: overDate && !sameDate
            },
        };
}

const checkProjectsFilter = () => {
    const projects = document.getElementsByClassName("projects-elem");
    for (const project of projects) {
        if (project.classList.contains("active")){
            return project.classList[0];
        }
    }
    return false
}

export function showTasks() {
    const container = document.getElementsByTagName("main")[0];
    container.innerHTML = "";
    generateProjectDiv(container);
    const taskList = extractData()[1];
    
    for (const task of taskList) {
        const filterDate = checkFilters(task);
        const filterProject = checkProjectsFilter();
        if (filterDate.today.active) {
            if (filterDate.today.check){
                generateCardTask(task);
            }
        }
        else if (filterDate.overdue.active) {
            if (filterDate.overdue.check){
                generateCardTask(task);
            }
        }
        else if (filterProject){
            if (filterProject === task.project) {
                generateCardTask(task);
            }
        }
        else {
            generateCardTask(task);
        }
        
        
    }
}