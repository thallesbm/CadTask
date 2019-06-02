import { Task } from './task.model'; //Foi importado sozinho quando eu importei o objeto complexo "tasks"

export class List {
    constructor(
        public title: String,
        public tasks: Task[] // <-- Defini um lista com os colchetes
    ) {

    }
}