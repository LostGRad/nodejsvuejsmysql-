<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3 mx-auto">
              <img alt="Vue logo" src="../assets/logo.png" />
          </div>
      </div>
      <div class="row">
          <div class="col-md-12 text-center">
              <label  for="phonenumber">Enter your phone number and find your files</label>
              <input type="text"
              v-mask="'+##(###)-###-##-##'"
              class="form-control col-md-6 mb-6 mx-auto"
              v-model="phonenumber"
              :class="{'is-invalid':$v.phonenumber.$error}"
              @blur="$v.phonenumber.$touch()"
              @input="enableButtun(phonenumber.length)">
              <div class="invalid-feedback"
              v-if="!$v.phonenumber.required">
              Phonenumber field is required
              </div>
              <div class="invalid-feedback"
              v-if="!$v.phonenumber.minLength">
              Min length of number is {{$v.phonenumber.$params.minLength.min}}. Now it is {{ phonenumber.length}}.
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-12 text-center">
              <button class="btn btn-primary mt-2" @click="load"
              :disabled="!seeMyFiles">See my files</button>
          </div>
      </div>
      <div class="row">
          <div class="col">
              <ul class="pt-2" v-if="clients.length>0">
                  <li class="list-group-item" v-for="client of clients"
                  :key="client.id">
                      <strong class="col-md-4">{{ client.firstName }}</strong> {{ client.lastName}} <i class="col-md-4">{{client.phonenumber}}</i> назва файла {{client.nameFile}}
                      <a class="btn btn-secondary"
                      v-bind:href="downloadFile(client.id)">&dArr;</a>
                      <button type="button" class="btn btn-danger"
                      @click="delFile(client.id)">X</button></li>
              </ul>
              <h2  v-else class="message">{{message}}</h2>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { required,  minLength} from 'vuelidate/lib/validators'
export default {

    data(){
        return {
            clients:[],
            resource: null,
            phonenumber:'',
            message:"",
            seeMyFiles:false
        }
    },
    validations:{
        phonenumber:{
            required,
            minLength: minLength(18)
        }
    },
    methods:{
        enableButtun(len){
            if(len>17){
                this.seeMyFiles=true;
            } else this.seeMyFiles=false;
        },
        load(){
            let getEl= 'getposts/'+this.phonenumber;
            this.$http.get(getEl).then( response => response.json()).then(clients => this.clients = clients);
            this.message="You did not upload files (="
        },
        delFile(id){
            let delEl='deleteFile/'+id;
            this.$http.delete(delEl).then(() => {
                this.load();
            }).catch(()=>{});
            // }).catch((e)=>{console.log(e)});
        },
        downloadFile(id){

            let downloadEl='http://127.0.0.1:3000/download/'+id;
            return downloadEl;
        }
    }
};
</script>
<style scoped>
    .message{
        padding-top: 1em;
        color: #707070;
        font-family: 'Aclonica',serif;
        font-size: 4em;
        text-shadow: 0 1px 0 #000000, 0 2px 0 #888888, 0 3px 0 #777777, 0 4px 0 #FFFFFF, 0 5px 0 #555555, 0 6px 0 #444444, 0 7px 0 #333333, 0 8px 7px #001135;
    }
</style>
