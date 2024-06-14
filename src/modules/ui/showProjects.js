import { extractData } from "../internal/store";
import { deleteProjectFromId } from "../internal/store";
import openDialog from "./dialog";
import { showTasks } from "./showTasks";

console.log("TEST showProjects");


export function populateProjectTask() {
    const containers = document.getElementsByClassName("project-dialog");
    const projectList = extractData()[0];
    for (const select of containers) {
        let i = 0;
        select.innerHTML = "";
        for (const project of projectList) {
            const opt = document.createElement("option");
            if (i == 0) {
                opt.selected = true;
            }
            opt.value = project.title;
            opt.innerHTML = project.title;
            select.appendChild(opt);
            i += 1;
        }
    }
}

export function showProjects() {
    const container = document.getElementById("container-projects");
    container.innerHTML = "";
    const projectList = extractData()[0];
    for (const project of projectList) {
        const card = document.createElement("card");
        card.id = `nb_${project.getid()}`
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const dateStart = document.createElement("p");
        const deleteButton = document.createElement("button")
        const editButton = document.createElement("button")

        title.textContent = project.title;
        description.textContent = project.description;
        dateStart.textContent = project.dateStart.split("-").reverse().join("-");
        deleteButton.textContent = "Del";
        editButton.textContent = "Edit";

        deleteButton.addEventListener("click", (e) => {
            deleteProjectFromId(project.getid());
            populateProjectTask();
            showProjects();
            showTasks();
        })

        editButton.addEventListener("click", (e) => {
            openDialog("edit-project", project.getid());
            
        })

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(dateStart);
        card.appendChild(deleteButton);
        card.appendChild(editButton);
        container.appendChild(card);
    }
}