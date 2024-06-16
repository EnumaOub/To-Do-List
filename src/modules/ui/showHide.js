

export function showHide () {
    const toggleShow = (id) => {
        const elem = document.getElementById(id);
        elem.classList.toggle("active");
        updateLayout(id);
        return elem.classList.contains("active");
    };
    
    const updateLayout = (id) => {
        const elem = document.getElementById(id);
        if (elem.classList.contains("active")) {
            elem.style.display = "flex";
        }
        else {
            elem.style.display = "none";
        }
    };

    return { toggleShow }
}

