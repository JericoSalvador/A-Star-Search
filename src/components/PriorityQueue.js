
class QueueItem {

    constructor(priority, item){
        this.priority = priority
        this.item = item
    }
}

export class PriorityQueue {

    constructor(){
        this.items = []
    }

    enqueue(priority, item){

        const newItem = new QueueItem(priority, item)
        
        let added = false; 

        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].priority > newItem.priority){
                this.items.splice(i,0,newItem)
                added = true
                break
            }
        }
        if(!added){
            this.items.push(newItem)
        }
    }

    dequeue(){
        if(this.isEmpty)
            return null
        return this.items.shift()

    }

    get isEmpty(){
        if(this.items.length === 0){
            return true
        }
        return false
    }

    get front(){
        if(this.isEmpty)
            return null
        return this.items[0]
    }

    get print(){
        console.log(this.items)
    }
}