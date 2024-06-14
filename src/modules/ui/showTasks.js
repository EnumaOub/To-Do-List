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

export function showTasks() {
    const container = document.getElementsByTagName("main")[0];
    container.innerHTML = "";
    generateProjectDiv(container);
    const taskList = extractData()[1];
    
    for (const task of taskList) {
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
}