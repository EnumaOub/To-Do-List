console.log("TEST task");

export class Task {
    constructor(id, title, description, dateDue, dateStart, project, priority, progress) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dateDue = dateDue;
        this.dateStart = dateStart;
        this.project = project;
        this.priority = priority;
        this.progress = progress;
    }
    
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dateDue: this.dateDue,
            dateStart: this.dateStart,
            project: this.project,
            priority: this.priority,
            progress: this.progress,
        }
      }
}
