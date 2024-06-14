

export function getActivebutton(buttons) {
    for (const button of buttons) {
        if (button.classList.contains("active")){
            return button;
        }
    }
    return null;
}

export function buttonFilterTask(event, buttons) {
    
    const buttonSlct = event.target;
    const buttonActive = getActivebutton(buttons);
    if (buttonActive === buttonSlct){
        buttonSlct.classList.toggle("active");
    }
    else {
        buttonSlct.classList.toggle("active");
        if (buttonActive) {
            buttonActive.classList.toggle("active");
        }
    }

}

export function changeActiveProject() {
    const projects = document.getElementsByClassName("projects-elem");
    for (const project of projects) {
        const buttonSlct = project.getElementsByClassName("selector")[0];
        if (buttonSlct.classList.contains("active")){
            project.classList.add("active");
        }
        else if (project.classList.contains("active")){
            project.classList.toggle("active");
        }
    }
}