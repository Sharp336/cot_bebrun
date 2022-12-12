import 'regenerator-runtime/runtime';

class Api {

    static async CheckUser(user) {
        let answer = await fetch( `https://cats.petiteweb.dev/api/single/${user}/show`)
        if (answer.ok){
            if (typeof (await answer.json())[0] != "undefined") return "Online"
            return "Empty"
        }
        return "Offline"
    }

    static async getAll(user) {
        return await fetch( `https://cats.petiteweb.dev/api/single/${user}/show`).then(a => a.json())
    }

    static async getSingle(user, id) {
        return await fetch( `https://cats.petiteweb.dev/api/single/${user}/show/${id}`).then(a => a.json())
    }

    static async addCat(body, path="https://cats.petiteweb.dev/api/single/astrology_noob/add") {
        console.log(JSON.stringify(body));
        return await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => data);
    }

    static async getIds(path="https://cats.petiteweb.dev/api/single/astrology_noob/ids") {
        return await fetch(path).then(res => res.json()).then(data => data);
    }

    static async updateCat(id, body, path="https://cats.petiteweb.dev/api/single/astrology_noob/update") {
        return await fetch(path + "/" + id, {
                    method: "PUT",  
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(data => data.data);
    }

    static async deleteCat(id, path="https://cats.petiteweb.dev/api/single/astrology_noob/delete") {
        return await fetch(path + "/" + id, {
            method: "DELETE"
        }).then(res => res.json()).then(data => data.data);
    }
}

export default Api;