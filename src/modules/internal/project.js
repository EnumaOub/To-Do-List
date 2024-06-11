console.log("TEST project");

export class Project {
    constructor(title, description, dateStart) {
        this.title = title;
        this.description = description;
        this.dateStart = dateStart;
    }
    
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dateStart: this.dateStart,
        }
      }
}