import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfrbgQhheRjqwf1ONDTH8d4C0ICr2eqm4",
    authDomain: "pahinumdom.firebaseapp.com",
    projectId: "pahinumdom",
    storageBucket: "pahinumdom.appspot.com",
    messagingSenderId: "939107066725",
    appId: "1:939107066725:web:a9ec39a31931870763778c"
};

class Fire { 
    constructor(callback){
        this.init(callback)
    }
    init(callback) {
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null,user);
            }else{
                firebase
                .auth()
                .signInAnonymously()
                .catch(error =>{callback(error)});
            }
        });

    }
    getLists(callback){
        let ref = this.ref.orderBy('name')
        this.unsubscribe = ref.onSnapshot(snapshot => {
            list=[]

            snapshot.forEach(doc => {
                list.push({id:doc.id, ...doc.data()})
                
            })
            callback(list)
        })
    }
    updateList(lists){
        let ref = this.ref
        ref.doc(lists.id).update(lists);
    }
    addList(lists){
        let ref = this.ref;
        ref.add(lists);
    }
    
    get userId(){
        return firebase.auth().currentUser.uid;
    }
    get ref(){
        return firebase.firestore().collection('user').doc(this.userId).collection('list');
    }
  detach() {
    this.unsubscribe();
  }
  deleteList(list) {
    let ref = this.ref;
    ref.doc(list.id).delete();
  }
}
export default Fire;
