(function () {
    class Person {
        name: string = "";
        age: number = -1;

        printInfo() {
            console.log("name: " + this.name);
            console.log("age: " + this.age);
        }

        setName(name: string) {
            this.name = name;
            console.log("set name: " + name);
        }

        setAge(age: number) {
            this.age = age;
            console.log("set age: " + age);
        }
    }

    const per = new Person();
    per.printInfo();
    per.setAge(18);
    per.setName("mike");
    per.printInfo();
})();
