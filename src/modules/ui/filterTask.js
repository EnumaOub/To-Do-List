

export function getActivebutton(buttons) {
    for (const button of buttons) {
        if (button.classList.contains("active")){
            return button;
        }
    }
    return null;
}

export function buttonFilterTask(event) {
    const buttons = document.getElementsByClassName("btn-filter");
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