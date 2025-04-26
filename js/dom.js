import { delUser, infoFunc } from "./api.js";

let tbody = document.querySelector("tbody");
let infoDialog = document.querySelector(".infoDialog");
let infoID = document.querySelector(".infoID");
let infoTitle = document.querySelector(".infoTitle");
let infoCancel = document.querySelector(".infoCancel");
let inputSearch = document.querySelector(".inputSearch");
function getData(data) {
    tbody.innerHTML = "";
    inputSearch.oninput = () => {
        if (inputSearch.value == "") {
            getData(data);
        }
        else {
            const data1 = inputSearch.value.toLowerCase();
            const data2 = data.filter(e => e.name.toLowerCase().includes(data1));
            getData(data2);
        }
    }
    data.forEach((e, i) => {
        let tr = document.createElement("tr");
        let id = document.createElement("td");
        let title = document.createElement("td");
        let actions = document.createElement("td");
        let infoBtn = document.createElement("button");
        let editBtn = document.createElement("button");
        let delBtn = document.createElement("button");

        id.innerHTML = i + 1;
        title.innerHTML = e.name;
        infoBtn.innerHTML = "Info";
        editBtn.innerHTML = "Edit";
        delBtn.innerHTML = "Delete";

        infoBtn.classList.add("infoBtn");
        editBtn.classList.add("editBtn");
        delBtn.classList.add("delBtn");

        delBtn.onclick = () => {
            delUser(e.id);
        }

        infoBtn.onclick = async () => {
            let info = await infoFunc(e.id)
            infoDialog.showModal();
            infoID.innerHTML = info.id;
            infoTitle.innerHTML = info.name;
        }
        infoCancel.onclick = () => {
            infoDialog.close();
        }

        actions.append(infoBtn, editBtn, delBtn);
        tr.append(id, title, actions);
        tbody.append(tr);
    })
}

export default getData;