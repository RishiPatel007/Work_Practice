class Stack{
    constructor(){
        this.stack = []
        this.top = -1
    }

    push(data){
        this.top++
        this.stack[this.top] = data
    }
    pop(){
        if(this.isEmpty()) return -1
        return this.stack[this.top--]
    }
    length(){
        return this.top+1
    }
    isEmpty(){
        if(this.top == -1){
            return true
        }
        return false
    }
}


class Queue{
    constructor(){
        this.queue = []
        this.head = -1
        this.tail = -1
    }

    enqueue(data){
        if(this.head == -1){
            this.head = 0
        }
        this.tail++
        this.queue[this.tail] = data
    }
    dequeue(){
        if(this.isEmpty()) return -1
        if(this.head == this.tail){
            this.head == -1
            this.tail == -1
        }
        return this.queue[this.head++]
    }
    isEmpty(){
        if(this.head == -1){
            return true
        }
        return false
    }
    length(){
        let x = this.tail - this.head + 1
        if (x >= 0) return x

        return 0
    }
}

let stack = new Stack()

stack.push(1)
stack.push(1)
stack.pop()
// stack.pop()

console.log(stack.length())
console.log(stack.isEmpty())

let queue = new Queue()

queue.enqueue(1)
queue.enqueue(1)
queue.enqueue(1)
queue.dequeue()
queue.dequeue()
queue.dequeue()
// queue.dequeue()
// console.log(queue.dequeue())

console.log(queue.length())
console.log(queue.isEmpty())
