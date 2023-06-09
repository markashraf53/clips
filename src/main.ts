import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import firebase from 'firebase/compat/app';
import { AppModule } from './app/app.module';
import 'firebase/compat/auth'
import { environment } from './environments/environment';

firebase.initializeApp(environment.firebaseConfig)

let appInit= false

firebase.auth().onAuthStateChanged(()=>{
  if(!appInit){
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); 
  }
  appInit = true

})

