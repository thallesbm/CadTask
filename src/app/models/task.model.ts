// Cria a minha tarefa
//Propriedades são pública
//Preciso saber o nome do item e se está concluído ou não
//Criei um construtor para sempre passar o title e o done quando der um "new task"
//ao invés de ter que ficar sempre instanciando

export class Task {
    constructor(
        public title: string,
        public done: boolean
    ) {
    }
}