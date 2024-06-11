import { compareAsc, format } from "date-fns";


console.log("TEST Dialog");

const toggleDialog = () => {
    
}

const initCancelButton = (id_dialog) =>{
    const form = document.getElementById(id_dialog);
    const close_form_btn = document.querySelector(`#${id_dialog} .btn-close-dialog`)
    close_form_btn.addEventListener("click", function(event){
        form.close();
        removeEventListener("click", event)
    });
}

const initModal = (id_dialog) => {
    const dateStart = document.querySelector(`#${id_dialog} .date-start`)
    const date1 = format(new Date(), 'yyyy-MM-dd')
    dateStart.value = date1;

}

export default function openDialog(id_dialog) {
    const form = document.getElementById(id_dialog);
    form.showModal();
    initCancelButton(id_dialog);
    initModal(id_dialog);

    
    

}

