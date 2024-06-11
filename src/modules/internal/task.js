console.log("TEST task");

export class Task {
    constructor(title, description, dateDue, dateStart, project, priority=0, progress=0) {
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
