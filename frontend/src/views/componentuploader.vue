<template>
 <div class="container">
     <div class="text-center">
         <h1>Hello you can upload yor file!!</h1>
     </div>
     <div class="row">
         <div class="col-md-12 text-center">
             <form id="uploaded" @submit="checkForm">
                 <div class="form-row">
                     <h6  class="col-md-8 mx-auto" v-if="errors.length">
                      <b>Please correct the indicated errors.</b>
                  </h6>
                 </div>
                 <div class="form-row">
                  <ul v-if="errors.length" class="col-md-8 mx-auto">
                    <li class="list-group-item list-group-item-danger" v-for="error in errors">{{ error }}</li>
                  </ul>
              </div>
               <div class="form-row">
                 <div class="col-md-4 mb-6 ml-auto">
                     <label for="firstName">Your first name</label>
                     <input type="text" id="firstName" class="form-control" v-model.trim="firstName">
                 </div>
                 <div class="col-md-4 mb-6 mr-auto">
                     <label for="lastNamer">Your last name</label>
                     <input type="text" id="lastName" class="form-control" v-model.trim="lastName">
                 </div>
               </div>
               <div class="form-row">
                       <div class="col-md-8 mb-8 mx-auto">
                           <label for="phonenumber">Your phonenumber</label>
                           <input type="text"
                           v-mask="'+##(###)-###-##-##'"
                           class="form-control"
                           @blur="$v.phonenumber.$touch()"
                           :class="{'is-invalid':isActive}"
                           v-model="phonenumber">
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
               <div class="form-row mt-2">
                   <div class="col-md-6 mb-3 mr-auto">
                       <label for="sampleFile" class="btn btn-info">Change your file</label>
                       <input type="file" name="sampleFile" class="hide" id="sampleFile" ref='uploadFile' v-on:change="handleFileUpload()">
                   </div>
                   <div class="col-md-4 mb-3 mr-auto">
                       <button class="btn btn-success" @click="createClient">Add your file</button>
                   </div>
               </div>
             </form>
         </div>
     </div>


 </div>
</template>

<script>
import { required,  minLength} from 'vuelidate/lib/validators'
export default {
    data(){
        return {
            firstName:'',
            lastName: '',
            phonenumber:'',
            nameFile:'',
            clients:[],
            resource: null,
            sampleFile:'',
            isActive:false,
            errors: []
        }
    },
    validations:{
        phonenumber:{
            required,
            minLength: minLength(18)
        }
    },
    methods:{
        checkForm: function (e) {
              this.errors = [];
              if (this.phonenumber.length != 18) {
                  this.isActive=true;
                  this.errors.push('enter the correct number');
             }
             if(this.sampleFile.name==undefined){
                 this.errors.push('Change your file!!!');
             }
              if (!this.errors.length) {
                return true;
              }
              e.preventDefault();
          },
        createClient(){
                if(this.sampleFile.name!=undefined){
                    if (this.phonenumber.length == 18)
                    {
                    const client = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phonenumber: this.phonenumber,
                        nameFile: this.sampleFile.name
                        }
                    this.resource.save({}, client);
                    this.uploadFile();
                    }
        }
        },
        uploadFile(){
            var formData = new FormData();
            formData.append('file', this.sampleFile);
            formData.append('phonenumber', this.phonenumber);
            let config = {
                  header : {
                   'Content-Type' : 'multipart/form-data'
                 }
            }
            this.$http.post('http://127.0.0.1:3000/upload', formData, config).then(response => {
                console.log('SUCCESS!!');
              }, response => {
                console.log('FAILURE!!');
              });
        },
        handleFileUpload(){
        this.sampleFile = this.$refs.uploadFile.files[0];
      }
    },
    created(){
        this.resource = this.$resource('setclient')
    }
};

</script>
<style scoped>
.hide{
    position: absolute;
    overflow: hidden;
    z-index: -1;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
}
</style>
