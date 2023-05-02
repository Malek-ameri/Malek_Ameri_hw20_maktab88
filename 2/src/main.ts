interface reqresResponse {
    page: number;
    per_page: number
    total: number
    total_pages: Number
    data: Person[]
}

class Person {
    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public last_name: string,
        public avatar: string,
    ) {

    }
}

class UserShema {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public avatar: string,
    ) { }

    save() {
        const newPerson: Person = new Person(this.id, this.email, this.first_name, this.last_name, this.avatar);
        const personData: Person[] = JSON.parse(localStorage.getItem("Users") || '');
        personData.push(newPerson)
        localStorage.setItem("Users", JSON.stringify(personData))
        console.log(personData)

    }

    static find() {
        const personData: Person[] = JSON.parse(localStorage.getItem("Users") || '')
        console.log(personData)
    }

    static findById(id: number) {
        const personData: Person[] = JSON.parse(localStorage.getItem("Users") || '')
        const find: Person | undefined = personData.find(item => item.id === id)
        if (find === undefined) {
            console.log([])
        }
        if (!!find) {
            console.log(find)
        }
    }

    static deleteById(id: number) {
        const personData: Person[] = JSON.parse(localStorage.getItem("Users") || '')
        const find: Person | undefined = personData.find(item => item.id === id)
        if (find === undefined) {
            console.log("not found user ID")
        }
        if (!!find) {
           const deletedUserOfArray: Person[] = personData.filter(item => item.id !== id)
           localStorage.setItem("Users", JSON.stringify(deletedUserOfArray))
           console.log(find)
        }
    }

    static updateById(id: number, updateData:Person) {
        const personData: Person[] = JSON.parse(localStorage.getItem("Users") || '')
        const find: Person | undefined = personData.find(item => item.id === id)
        if (find === undefined) {
            console.log("not found user ID")
        }
        if (!!find) {
           const deletedUserOfArray: Person[]  = personData.filter(item => item.id !== id)
           deletedUserOfArray.push(updateData)
           localStorage.setItem("Users", JSON.stringify(deletedUserOfArray))
           console.log(updateData)

        }
    }
}




async function getData(): Promise<reqresResponse | null> {
    try {
        const response: Response = await fetch("https://reqres.in/api/users?page=2");
        const result: reqresResponse = await response.json()
        return result

    } catch (error) {
        return null
    }
}
getData().then(result => localStorage.setItem("Users",JSON.stringify(result?.data) )).catch(err => console.log(err))

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