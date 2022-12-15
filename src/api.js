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

    static async CheckCat(user, id) {
        let answer = await fetch( `https://cats.petiteweb.dev/api/single/${user}/show/${id}`)
        return answer.ok ? "Found" : "Not found"
    }

    static async getAll(user) {
        return await fetch( `https://cats.petiteweb.dev/api/single/${user}/show`).then(a => a.json())
    }

    static async getSingle(user, id) {
        return await fetch( `https://cats.petiteweb.dev/api/single/${user}/show/${id}`).then(a => a.json())
    }

    static async getIds(user) {
        return await fetch( `https://cats.petiteweb.dev/api/single/${user}/ids/`).then(a => a.json())
    }

    static async addCat(user, data) {
        return await fetch(`https://cats.petiteweb.dev/api/single/${user}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }).then(a => a.json());
    }

    static async updateCat(user, id, data) {
        return await fetch(`https://cats.petiteweb.dev/api/single/${user}/update/${id}`, {
                    method: "PUT",  
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(a => a.json())
    }

    static async deleteCat(user, id) {
        return await fetch(`https://cats.petiteweb.dev/api/single/${user}/delete/${id}`, {
            method: "DELETE"
        }).then(a => a.json());
    }
}

export default Api;