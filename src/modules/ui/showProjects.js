import { deleteProjectFromId, extractData } from "../internal/store";
import { formatRelative } from "date-fns";
import { Dialog } from "./dialog";
import { taskUI } from "./showTasks";


export function projectUI () {

    const populateProjectTask = () => {
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
        const buttonShow = document.createElement("button");
        const infoContainer = document.createElement("div");
        const description = document.createElement("p");
        const dateStart = document.createElement("p");
        const deleteButton = document.createElement("button")
        const editButton = document.createElement("button")
    
        container.id = `nb_${project.getid()}`;
        container.classList.add(project.title);
        container.classList.add("projects-elem");
    
        deleteButton.classList.add("delete-btn");
        editButton.classList.add("edit-btn");
        
        select.className = "selector";
        buttonShow.classList.add("info-project");
        buttonShow.classList.add("show");
    
        infoContainer.classList.add("more-info");
    
    
        select.textContent = "#";
        title.textContent = project.title;
        buttonShow.textContent = "+"
    
        dateStart.innerHTML = `<span class="element-project">Started: </span>`;
        if (project.dateStart) {
            dateStart.appendChild(document.createTextNode(formatRelative(new Date(project.dateStart), new Date()).split('at')[0]));
        }
    
        description.innerHTML = `<span class="element-project">Description: </span>`;
        description.appendChild(document.createTextNode(project.description));
    
        deleteButton.addEventListener("click", (e) => {
            deleteProjectFromId(project.getid());
            populateProjectTask();
            showProjects();
            taskUI().showTasks();
        })
    
        editButton.addEventListener("click", (e) => {
            Dialog().openDialog("edit-project", project.getid());
    
        })
    
        buttonShow.addEventListener("click", (e) => {
            infoContainer.innerHTML = "";
    
            if (e.target.classList.contains("show")){
                const container = document.createElement("div");
                container.classList.add("btn-more-info");
                infoContainer.classList.toggle("active");
                e.target.textContent = "-";
                infoContainer.appendChild(dateStart);
                infoContainer.appendChild(description);
                container.appendChild(deleteButton);
                container.appendChild(editButton);
                infoContainer.appendChild(container);
            }
            else {
                e.target.textContent = "+";
                infoContainer.classList.toggle("active");
            }
    
            e.target.classList.toggle("show");
        })
    
        container.appendChild(select);
        card.appendChild(title);
        card.appendChild(buttonShow);
        card.appendChild(infoContainer);
        container.appendChild(card);
        return container;
    }
    
    const showProjects = () => {
        const container = document.getElementById("container-projects");
        container.innerHTML = "";
        const projectList = extractData()[0];
        for (const project of projectList) {
            container.appendChild(generateCardProject(project));
        }
    }

    return { showProjects, populateProjectTask }
}

