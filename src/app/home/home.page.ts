import { Component, OnInit } from '@angular/core';
import { List } from '../models/list.model';
import { AlertController } from '@ionic/angular';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Task } from '../models/task.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 
})
export class HomePage {

  imagePath = '';

  constructor(
    private camera: Camera,  private sn: DomSanitizer,   
    private alertCtrl: AlertController
    ) {
    const tasks: Task[] = [];
      tasks.push(new Task('Shampoo', false));
      tasks.push(new Task('Sabonete', false));
      tasks.push(new Task('Perfume', false));
      tasks.push(new Task('Creme de Barbear', false));

      this.list = new List(
        'Minha lista de Tarefas',
       tasks
      );

    // this.save(this.list);
    this.list = this.get();

    }


  startCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });

  }
 
  
  
public list: List;



  async showAddTask() {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar nova tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Qual a sua tarefa?'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Adicionar',
          handler: (data) => {
            console.log(data);
            this.list.tasks.push(new Task(data.task,false));
          }
        }
      ]
    });

    await alert.present();
  }

  addTask(task: Task){
    this.save(this.list);
  }

  removeTask(task: Task){
    const index = this.list.tasks.indexOf(task);
    this.list.tasks.splice(index, 1);
    this.save(this.list);
  }

  toggleDone(task: Task){
    if (task.done)
    task.done = false;
    else
    task.done = true;

    this.save(this.list);

    }

     // Deve ficar no service
     public save(list: List) {
      const data = JSON.stringify(list);
      localStorage.setItem('list', data);
    } 

    public get(): List {
      const data = localStorage.getItem('list');
      if(data)
      return JSON.parse(data);
      else
      return new List('Minha Lista de tarefas', []);
    }
  }



