

<template>
  <div>

  <!-- HEADER  -->  
    <v-layout column>
      <v-flex xs12 sm12>
        <v-toolbar color="indigo" dark>

          <v-toolbar-title>APP PRUEBA</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>

          </v-btn>
        </v-toolbar>

        <div class="text-center">
        </div>
        <v-container fluid grid-list-md class="grey lighten-4">
          <v-layout row wrap>
            <v-flex>
              <v-card>
                <v-card-media src='https://i1.wp.com/blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif?resize=800%2C493' height="300px" width="200px">
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-actions class="white">
                  <v-spacer></v-spacer>

                </v-card-actions>
              </v-card>
            </v-flex>
            
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>

  <!-- LISTAR ITEMS -->  
    <h1>Lista de Items</h1>
    <div class="row">
      <div class="col-md-10"></div>
    </div><br/>

    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Titulo</td>
          <td>Autor</td>
          <td></td>
          <td>Herramientas</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in listItems">
          <td>{{ item._id }}</td>
          <td>{{ item.titulo }}</td>
          <td>{{ item.autor }}</td>
          <td>
            <button class="btn btn-success " dark flat @click="viewiD(item) ; dialog3 = true">Ver</button>
          </td>
          <td>
            <button class="btn btn-primary " dark flat @click="editId(item) ; dialog4 = true">Editar</button>
          </td>
          <!-- BORRAR ITEM  -->  
          <td>
            <button class="btn btn-danger" v-on:click="deleteItem(item._id)">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>



    <!-- BODY  -->  
      <v-app id="inspire">
        <div>
          <v-layout row justify-center>
            <v-btn color="primary" dark @click.stop="dialog = true">Crear Item</v-btn>
  
  <!-- MODAL CREAR ITEM Y LOGIN DE USUARIO -->  

            <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" dark class="primary">
                  <v-btn icon @click.native="dialog = false" dark>
                    <v-icon>Cerrar</v-icon>
                  </v-btn>
                  <v-toolbar-title>Crear Item</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>

                  <v-flex v-if="mostrar == true" xs12 sm6 offset-sm3>
                    <h1>Crear Item</h1>
                    <v-text-field label="Titulo" v-model="createItems.titulo" :counter="10" required></v-text-field>
                    <v-text-field label="Autor" v-model="createItems.autor" required></v-text-field>
                    <v-text-field label="Cuerpo" v-model="createItems.cuerpo" required></v-text-field>
                    <div class="text-center">
                      <button class="btn btn-primary " dark flat @click="addItem() ; dialog = false">Entrar</button>
                    </div>
                  </v-flex>

                  <p v-if="mostrar" xs12 sm6></p>
                  <v-flex v-if="!mostrar" xs12 sm6 offset-sm3>
                    <h1>Debes Iniciar Session para Crear un Item</h1>
                    <v-text-field label="Name" v-model="credentials.nombre" xs12 sm6 :counter="10" required></v-text-field>
                    <v-text-field label="Password" v-model="credentials.password" xs12 sm6 required></v-text-field>
                    <div v-if="!mostrar" class="text-center">
                      <button class="btn btn-primary " @click="submit()">Entrar</button>
                    </div>
                  </v-flex>

                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

          </v-layout>
        </div>

  <!-- MODAL TOKEN  -->  

    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>
          Se ha Generado el Siguiente Token:
        </v-card-title>
        <v-card-text>
          {{token}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog2=false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <!-- MODAL ALERT USER WARNING LOGIN  -->  

    <v-dialog v-model="dialog5" max-width="500px">
      <v-card>
          <v-alert color="warning" icon="priority_high" value="true">
            {{alerta}}
          </v-alert>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog5=false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  <!-- MODAL DETALLE ITEM -->  

    <v-dialog v-model="dialog3" max-width="700px">
      <v-card>
        <v-card-title>
          <h3>Detalle de Item</h3>
        </v-card-title>
        <v-card-text>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{itemId.titulo}}</td>
                <td>{{itemId.autor}}</td>
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Contenido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{itemId.cuerpo}}</td>
              </tr>
            </tbody>
          </table>

        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog3=false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <!-- MODAL EDIT ITEM -->  

    <v-dialog v-model="dialog4" max-width="700px">
      <v-card>
        <v-card-title>
          <h3>Editar Item</h3>
        </v-card-title>
        <v-card-text>

          <v-flex xs12 sm6 offset-sm3>
            <h1>Editar Item</h1>
            <v-text-field label="Titulo" v-model="editarItem.titulo" :counter="10" required></v-text-field>
            <v-text-field label="Autor" v-model="editarItem.autor" required></v-text-field>
            <v-text-field label="Cuerpo" v-model="editarItem.cuerpo" required></v-text-field>
            <div class="text-center">
              <button class="btn btn-primary " dark flat @click="updateItems(editarItem._id) ; dialog4 = false">Actualizar</button>
            </div>
          </v-flex>

        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog4=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>

  </div>
</template>



<script>


export default {
  data() {
    return {
      listItems: [],
      showModal: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      notifications: false,
      sound: true,
      widgets: false,
      alerta:'',
      createItems: {
        titulo: '',
        autor: '',
        cuerpo: '',

      },
      itemId: {},
      editarItem: {},
      mostrar: false,
      token: '',
      credentials: {
        nombre: '',
        password: ''
      },
      items: []
    }
  },

  created: function() {
    this.fetchItems();
  },

  methods: {
    // GET ITEMS 

    fetchItems() {
      this.axios.get('http://localhost:4000/api/item', localStorage.getItem('user-token'), {

      }).then(response => {

        this.listItems = response.data;
      })
        .catch((error) => {
          console.log('error 3 ' + error);
        });
    },

     // DELETE ITEMS 

    deleteItem(id) {
      let data = { id: id }
      let uri = 'http://localhost:4000/api/deleteItem/' + id;
      this.axios.delete(uri, data, {});
      this.listItems.splice(id, 1);
      this.axios.get('http://localhost:4000/api/item');
    },

    // AGREGAR ITEMS

    addItem() {
    this.axios.post('http://localhost:4000/api/addItem', this.createItems, {
      }).then(response => {

             //<<<LISTAR ITEMS>>>
            this.axios.get('http://localhost:4000/api/item', localStorage.getItem('user-token'), {
            }).then(response => {
              this.listItems = response.data;
            })
              .catch((error) => {
                console.log('error 3 ' + error);
              });

          })
        .catch((error) => {
          console.log('error 3 ' + error);
        });
    },

    // LOGIN USUARIO

    submit() {

      let credentials = JSON.stringify({
        nombre: this.credentials.nombre,
        password: this.credentials.password
      })

      this.axios.post('http://localhost:4000/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        console.log(response.data.message);

        if(response.data.message != undefined && response.data.message != null ){
          if(response.data.message == "noUser"){
              this.alerta = 'Lo lamento el usuario no existe.'
              this.dialog5 = true;
          }else if(response.data.message == "noPass"){
               this.alerta = 'Lo lamento password equivocado.'
               this.dialog5 = true;
          }else{
               this.alerta = 'Error al iniciar Session.'
          }
        }
        if (response.data.success == true) {
          if (response.data.token != null || response.data.token != undefined) {
            var token = response.data.token;


            this.token = token;
            this.dialog2 = true;

            
            localStorage.setItem('user-token', token)
            this.mostrar = true;

                //<<<LISTAR ITEMS>>>

                this.axios.get('http://localhost:4000/api/item', localStorage.getItem('user-token'), {
                }).then(response => {
                  this.listItems = response.data;
                })
                .catch((error) => {
                  console.log('error 3 ' + error);
                });


          }
        }

      });


    },
    
    // VER ITEM POR ID 

    viewiD(item) {
      this.itemId = item;
    },

    // ABRIR MODAL PARA INYECTAR ATRIBUTOS PARA EL UPDATE
    editId(item) {
      this.editarItem = item;
    },


    updateItems(id) {
      console.log(id)

      let uri = 'http://localhost:4000/api/item/' + id;
      this.axios.put(uri, this.editarItem).then((response) => {
        this.$router.push({ name: 'DisplayItem' });
      });
    }


  }
}
</script>

