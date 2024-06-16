import { extractData, storeData } from "./store";
import { format } from "date-fns";
import { Task } from "./task";
import { Project } from "./project";

const initProject = () => {
    const oldProjects = extractData()[0];
    if (oldProjects.length == 0) {
        const dateToday = new Date();
        const datev = format(dateToday, 'yyyy-MM-dd');
        const newProject1 = new Project("Default", "", datev);
        const newProject2 = new Project("Inbox", "", datev);
        storeData([...oldProjects, newProject1, newProject2], []);
    }
}


const initTask = () => {
    const oldTasks = extractData()[1];
    if (oldTasks.length == 0) {
        const dateToday = new Date();
        const dateCreate = format(dateToday, 'yyyy-MM-dd');
        const dateYesterday = format(dateToday.setDate(dateToday.getDate() - 1), 'yyyy-MM-dd');
        const dateTomorrow = format(dateToday.setDate(dateToday.getDate() - 1), 'yyyy-MM-dd');
        const Task1 = new Task("Task Urgent", "lorem", dateCreate, dateCreate, "Default", "3");
        const Task2 = new Task("Task which is not a priority", "lorem bim", dateYesterday, dateCreate, "Default", "1");
        const Task3 = new Task("Task normal priority", "lorem bim", dateTomorrow, dateCreate, "Inbox", "1");
        storeData([], [...oldTasks, Task1, Task2, Task3]);
    }
}

export function autoPop() {
    initProject();
    initTask();
}