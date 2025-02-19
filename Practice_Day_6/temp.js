// const x = {
// 	a: 1,
// 	b: 2,
// 	c: 3,
// }
// ({ a, b, c } = x);
// console.log(a, b, c);

// class Temp {
// 	name = "something";
// 	get() {
// 		return this.name;
// 	}
// 	set(name) {
// 		console.log(name);
// 		this.name = name;
// 	}
// }

// let temp = new Temp();
// console.log(temp.get())
// console.log(temp.set("someone"))

// const car = {
// 	brand: "Toyota",
// 	model: "Camry",
// 	fullname: this.brand + " " + this.model,
// };

// // Object.defineProperty(car, "fullName", {
// // 	get: function () {
// // 		return this.brand + " " + this.model;
// // 	},
// // 	set: function (value) {
// // 		const parts = value.split(" ");
// // 		this.brand = parts[0];
// // 		this.model = parts[1];
// // 	},
// // });

// console.log(car.fullName); // 👉 "Toyota Camry"

// // car.fullName = "Honda Accord"; // Calls the setter

// console.log(car.brand); // 👉 "Honda"
// console.log(car.model); // 👉 "Accord"
// console.log(car.fullName); // 👉 "Honda Accord"
// value = null

// if(!value){
// 	value = "default"
// }

// value = value || "default"
// value ||= "default"

// value = value ? value : "default"

// value = value ?? "default"

// value ??= "default"

// console.log("value = ",value)
// console.log({value})

// let obj = {
// 	// prop: "value",
// };
// obj = null

// if (obj) {
//     console.log(obj.prop);
// }

// console.log(obj?.prop);
// console.log(obj?.prop? obj.prop : "prop is not defined");

// let obj = {
// 	prop: "value",
// 	prop2: "value2",
// 	prop3: "value3",
// }

// let obj2 = {...obj, prop: "new value"}
// console.dir(obj2)

let x = 'something'
console.log(`%c ${x}`, 'color: orange');