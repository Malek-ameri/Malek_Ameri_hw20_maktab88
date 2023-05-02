"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Person {
    constructor(id, email, first_name, last_name, avatar) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.avatar = avatar;
    }
}
class UserShema {
    constructor(id, first_name, last_name, email, avatar) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.avatar = avatar;
    }
    save() {
        const newPerson = new Person(this.id, this.email, this.first_name, this.last_name, this.avatar);
        const personData = JSON.parse(localStorage.getItem("Users") || '');
        personData.push(newPerson);
        localStorage.setItem("Users", JSON.stringify(personData));
        console.log(personData);
    }
    static find() {
        const personData = JSON.parse(localStorage.getItem("Users") || '');
        console.log(personData);
    }
    static findById(id) {
        const personData = JSON.parse(localStorage.getItem("Users") || '');
        const find = personData.find(item => item.id === id);
        if (find === undefined) {
            console.log([]);
        }
        if (!!find) {
            console.log(find);
        }
    }
    static deleteById(id) {
        const personData = JSON.parse(localStorage.getItem("Users") || '');
        const find = personData.find(item => item.id === id);
        if (find === undefined) {
            console.log("not found user ID");
        }
        if (!!find) {
            const deletedUserOfArray = personData.filter(item => item.id !== id);
            localStorage.setItem("Users", JSON.stringify(deletedUserOfArray));
            console.log(find);
        }
    }
    static updateById(id, updateData) {
        const personData = JSON.parse(localStorage.getItem("Users") || '');
        const find = personData.find(item => item.id === id);
        if (find === undefined) {
            console.log("not found user ID");
        }
        if (!!find) {
            const deletedUserOfArray = personData.filter(item => item.id !== id);
            deletedUserOfArray.push(updateData);
            localStorage.setItem("Users", JSON.stringify(deletedUserOfArray));
            console.log(updateData);
        }
    }
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://reqres.in/api/users?page=2");
            const result = yield response.json();
            return result;
        }
        catch (error) {
            return null;
        }
    });
}
getData().then(result => localStorage.setItem("Users", JSON.stringify(result === null || result === void 0 ? void 0 : result.data))).catch(err => console.log(err));
// -------create User
// const newUser = new UserShema(12, 'malek', 'ameri', 'male@gmail.com', 'malek.png')
// newUser.save()
// __________findAll_____
// UserShema.find()
// __________findById______________
// UserShema.findById(8)
// ____________deleteById___________
// UserShema.deleteById(19)
// ______________updateById_______________
// UserShema.updateById(9, new Person(19,"malej@gmail.com",'malek','ameri','malek.png'))
