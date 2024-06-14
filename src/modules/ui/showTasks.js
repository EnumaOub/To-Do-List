import { storeData, extractData, resetData, deleteTaskFromId } from "../internal/store";
import openDialog from "./dialog";

console.log("TEST showTasks");


export function showTasks() {
    const container = document.getElementsByTagName("main")[0];
    container.innerHTML = "";
    const taskList = extractData()[1];
    for (const task of taskList) {
        const card = document.createElement("card");
        card.id = `nb_${task.getid()}`
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const dateStart = document.createElement("p");
        const projectVal = document.createElement("p");
        const deleteButton = document.createElement("button")
        const editButton = document.createElement("button")

        title.textContent = task.title;
        description.textContent = task.description;
        projectVal.textContent = task.project;
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
        card.appendChild(projectVal);
        card.appendChild(deleteButton);
        card.appendChild(editButton);
        container.appendChild(card);
    }
}