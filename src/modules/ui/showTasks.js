import { storeData, extractData, resetData } from "../internal/store";

console.log("TEST showTasks");

export function showTasks() {
    const container = document.getElementsByTagName("main")[0];
    container.innerHTML = "";
    const taskList = extractData()[1];
    for (const task of taskList) {
        const card = document.createElement("card");
        card.id = `nb${task.id}`
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const dateStart = document.createElement("p");
        const deleteButton = document.createElement("button")

        title.textContent = task.title;
        description.textContent = task.description;
        dateStart.textContent = task.dateStart.split("-").reverse().join("-");
        deleteButton.textContent = "Del";

        deleteButton.addEventListener("click", (e) => {
            const index = taskList.indexOf(task);
            const newtaskList = taskList.slice()
            if (index !== -1) {
                newtaskList.splice(index, 1);
            }
            if (newtaskList.length > 0){
                storeData([], newtaskList);
            }
            else {
                resetData(true, false);
            }
            
            showTasks();
        })

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(dateStart);
        card.appendChild(deleteButton);
        container.appendChild(card);
    }
}