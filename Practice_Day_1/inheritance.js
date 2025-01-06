// Single Level Inheritance
class Parent {
    constructor(name){
        this.name = name;
    }
}

class Child extends Parent{
    constructor(name, hobby){
        super(name);
        this.hobby = hobby;
    }
}

let child1 = new Child('John', 'Gaming');


// Multi level Inheritance
class Vehicle{
    constructor(name){
        this.name = name;
    }
}

class Car extends Vehicle{
    constructor(name, type){
        super(name);
        this.type = type;
    }
}

class Hundai extends Car{
    constructor(name, type, model){
        super(name, type);
        this.model = model;
    }
}
let car1 = new Hundai('Hundai', 'SUV', 'Creta'); 




// Multiple Inheritance
let Swim = {
    swim(){
        console.log('I can swim');
    }
}

let Fly = {
    fly(){
        console.log('I can fly');
    }
}

class Duck{
    constructor(name){
        this.name = name;
    }
}

Object.assign(Duck.prototype, Swim, Fly); // NOTE1 : Prototype lets us inherit properties directyl from objects rather than classes ...

let duck1 = new Duck('Duck1');
duck1.swim();



// Hierarchical Inheritance

class Animal{
    constructor(name){
        this.name = name;
        console.log(`I am ${name}`);
    }
}

class Dog extends Animal{
    bark(){
        console.log('Bark');
    }
}

class Cat extends Animal{
    meow(){
        console.log('Meow');
    }
}

let dog1 = new Dog('Dog1');
let cat1 = new Cat('Cat1');
dog1.bark();
cat1.meow();




//Hybrid Inheritance
class GrandParent{
    method1(){
        console.log('Method 1');
    }
}

class Child1 extends GrandParent{
    method2(){
        console.log('Method 2');
    }
}

class Child2 extends GrandParent{
    method3(){
        console.log('Method 3');
    }
}

class GrandChild extends Child1{
    method4(){
        console.log('Method 4');
    }
}

let grandChild1 = new GrandChild();
grandChild1.method1();
grandChild1.method2();
grandChild1.method4();
// grandChild1.method3(); // Error: method3 is not a function