console.log("TEST showHide");


const toggleActive = (element) => {
    const element_active = document.querySelector();
    element_active.classList.toggle("active");
    element.classList.toggle("active");
}

const updateLayout = (element) => {
    if (element.classList.contains("active")) {
        element.style.display = "initial";
    }
    else {
        element.style.display = "none";
    }

}