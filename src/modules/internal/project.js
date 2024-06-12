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

    getid() {
        return this.id.toString()
    }

    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }

    setDateStart(dateStart) {
        this.dateStart = dateStart;
    }

    checkId(id) {
        return this.id.toString() === id.toString()
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