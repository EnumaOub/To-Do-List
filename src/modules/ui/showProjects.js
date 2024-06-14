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

const generateCardProject = (project) => {
    const container = document.createElement("div");
    const card = document.createElement("card");
    const select = document.createElement("button");
    const title = document.createElement("h3");
    const deleteButton = document.createElement("button")
    const editButton = document.createElement("button")

    container.id = `nb_${project.getid()}`;
    container.classList.add(project.title);
    container.classList.add("projects-elem");
    
    select.className = "selector";


    select.textContent = "#";
    title.textContent = project.title;
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

    container.appendChild(select);
    card.appendChild(title);
    card.appendChild(deleteButton);
    card.appendChild(editButton);
    container.appendChild(card)
    return container;
}

export function showProjects() {
    const container = document.getElementById("container-projects");
    container.innerHTML = "";
    const projectList = extractData()[0];
    for (const project of projectList) {
        container.appendChild(generateCardProject(project));
    }
}