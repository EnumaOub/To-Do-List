console.log("TEST project");

export class Project {
    constructor(id, title, description, dateStart) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dateStart = dateStart;
    }
    
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dateStart: this.dateStart,
        }
      }
}