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
    card.id = `nb_${task.getid()}`
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const dateStart = document.createElement("p");
    const deleteButton = document.createElement("button")
    const editButton = document.createElement("button")

    title.textContent = task.title;
    description.textContent = task.description;
    dateStart.textContent = task.dateStart.split("-").reverse().join("-");
    deleteButton.textContent = "Del";
    editButton.textContent = "Edit";

    deleteButton.addEventListener("click", (e) => {
        deleteTaskFromId(task.getid());
        
        showTasks();
    })

    editButton.addEventListener("click", (e) => {
        openDialog("edit-task", task.getid());
    })

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dateStart);
    card.appendChild(deleteButton);
    card.appendChild(editButton);
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