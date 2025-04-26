import getData from "./dom.js";
let API = "https://to-dos-api.softclub.tj/api/categories";
let addInput = document.querySelector(".addInput");
let addBtn = document.querySelector(".addBtn");
async function get() {
    try {
        const { data } = await axios.get(API);
        getData(data.data);
    } catch (error) {
        console.error(error);
    }
}

async function delUser(id) {
    try {
        await axios.delete(`${API}?id=${id}`);
        get();
    } catch (error) {
        console.error(error);
    }
}

addBtn.onclick = async () => {
    try {
        let newUser = {
            name: addInput.value
        }
        await axios.post(API, newUser);
        get();
        addInput.value = "";
    } catch (error) {
        console.error(error);
    }
}

async function infoFunc(id) {
    try {
        const { data } = await axios.get(`${API}/${id}`);
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export { get, delUser, infoFunc };