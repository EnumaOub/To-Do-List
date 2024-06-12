console.log("TEST project");

let counter = 0;
export class Project {
    constructor(title, description, dateStart, id=null) {
        if (id !== null){
            this.id = id;
        }
        else{
            this.id = counter++;
        }
        this.title = title;
        this.description = description;
        this.dateStart = dateStart;
    }
    
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dateStart: this.dateStart,
            id: this.id,
        }
      }
}