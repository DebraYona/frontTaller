import React, {Component} from 'react';
import Listardatos from './ListarComprobantes';
import URL from './API/API';
import { Link } from "react-router-dom";
import './css/Content.css';
import './css/bootstrap.css';
import axios from 'axios';


class Content extends Component{
    constructor(){
        super();

        this.state = {
           selectedOption:{
             nombre:"",
             id_concepto:"",
             dni:"",
             codigo:"",
             voucher:"",
             periodoI:"",
             periodoF:""
           },
            lista:null,
            mensaje:"",
            estado: false,
            operacion:'',
            isLoading:false
        };


      //  this.handleSearchClick=this.handleSearchClick.bind(this);

    //    this.handleSearchKey=this.handleSearchKey.bind((this));
        this.mostrarData=this.mostrarData.bind(this);
        this.buscar=this.buscar.bind(this);
        this.vaciado=this.vaciado.bind(this);
    }

    mostrarData(){
        let contenedor="";
        if(this.state.estado){
           // console.log(this.state.lista);
            switch (this.state.operacion){
                case "V": contenedor=(<div className="alert alert-info">{this.state.mensaje}</div>);break;
                case true: contenedor=(<div><Listardatos listado={this.state.lista}/></div>);break;
                case false: contenedor=(<div className="alert alert-info">{this.state.mensaje}</div>);break;
                default: contenedor=(<div></div>);
            }
        }
        return contenedor;
    }


    handleSearchKey(e){
        if(e.key==="enter"){
            this.buscar();
        }
    }
    vaciado(){
      this.setState({
        selectedOption:{
          nombre:"",
          id_concepto:"",
          dni:"",
          codigo:"",
          voucher:"",
          periodoI:"",
          periodoF:""
        }
      })
    }
    /*
    //buscar
  /* handleSearchClick(e) {
      //  let url = 'https://api-modulocontrol.herokuapp.com/recaudaciones/';
        //          url = url.concat('detallada/');
       let url = URL.url.concat('recaudaciones/detallada/');
      // console.log(url);
       if(this.state.selectedOption === ""){
          this.setState({
               mensaje:"Casilleros vacios",
               estado:true,
               operacion:'V',
               lista:[],
               isLoading:false
           });
       }else{
           let arra = this.state.selectedOption
           this.setState({
               isLoading:true,
               mensaje:"",
               operacion:"c"
           });
           fetch(url, {
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(arra, null, 2)
              //body: (arra)
           })
               .then((response) =>{
                  console.log(response)
                  // return response.json()
               })
               .then(resp => {
                   this.setState({
                       lista: resp.data,
                       estado:true,
                       operacion: (resp.data!==null && resp.data.length!==0),
                       mensaje:(resp.data!==null && resp.data.length!==0)?(""):("Datos no encontrados"),
                       isLoading:false
                   });
                   //console.log( responseJson.data.length);
               });
       }
    }
*/
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.buscar();
        }
    }
    handleSubmit =(even) =>{
      //document.getElementById('formulario').preventDefault();
      even.preventDefault();

      this.refs.formulario.reset()
      this.vaciado()
    // document.getElementById('formulario').reset()
    console.log("DSAEW");
      //even.preventDefault();
    }

/* MAGIC */
handleChangeMagico = (values,n) => {
  //  console.log(this.state.selectedOption[n])
   this.setState(prevState=>{
     let selectedOption = prevState.selectedOption;
     selectedOption[n]=values;
     return {selectedOption:selectedOption}
   })
   console.log(this.state.selectedOption);
  }


  buscar =()=>{
    let n =this.state.selectedOption
    let url2= URL.url.concat('recaudaciones/detallada/');
    axios({
      url: url2,
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      responseType:'json',
      data:n

    })
    .then(response=> {
      console.log(response);
      console.log(response.data.data[0]);
      this.setState({
        lista:response.data.data,
        estado:true,
        operacion: (response.data!==null && response.data.length!==0),
        mensaje:(response.data!==null && response.data.length!==0)?(""):("Datos no encontrados"),
        isLoading:false
      })
      this.forceUpdate()

      console.log(this.state.lista);
    })
    console.log("palilalala");

  }




    render(){
      const { selectedOption } = this.state;

        return(
            <div className="content">

                <div className="buscar">

                  <form ref="formulario" onSubmit={this.handleSubmit} >
                    <div className="input-group mb-3 col-xs-12">
                          <div className="input-group mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="input-group-prepend input_nombre ">
                            <span className="input-group-text " id="basic-addon1">Nombre o Apellido</span>
                        </div>
                        <input id="busca" type="text" className="form-control"name="nombre"  onChange={(values)=>this.handleChangeMagico(values.target.value,"nombre")} placeholder="nombre o apellido" aria-label="Username" aria-describedby="basic-addon1"
                               onKeyPress={this.handleKeyPress}/>
                            </div>
                         <div className="input-group mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="input-group-prepend input_pago">
                            <span className="input-group-text" id="basic-addon1">Concepto de Pago</span>
                        </div>
                        <input id="concepto" type="text" className="form-control" name="id_concepto"  onChange={(values)=>this.handleChangeMagico(values.target.value,"id_concepto")}placeholder="ejem:123,123,123" aria-label="Username" aria-describedby="basic-addon1"
                               onKeyPress={this.handleKeyPress}/>
                    </div>
                    </div>

                    <div className="input-group mb-3 col-xs-12 ">
                        <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6 ">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">DNI</span>
                        </div>
                        <input id="dni" type="text" className="form-control" name="dni"  onChange={(values)=>this.handleChangeMagico(values.target.value,"dni")} placeholder="DNI" aria-label="Username" aria-describedby="basic-addon1"
                               onKeyPress={this.handleKeyPress}/>
                                   </div>
                  <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Codigo</span>
                        </div>
                        <input id="codigo" type="text" className="form-control" name="codigo"  onChange={(values)=>this.handleChangeMagico(values.target.value,"codigo")} placeholder="codigo" aria-label="Username" aria-describedby="basic-addon1"
                               onKeyPress={this.handleKeyPress}/>
                    </div>
                    </div>

                    <div className="input-group mb-3 col-xs-12">
                        <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Desde:</span>
                        </div>
                        <input type="date" className="form-control"  name="periodoI" value={selectedOption.initDate}   onChange={(values)=>this.handleChangeMagico(values.target.value,"periodoI")} aria-label="Username" aria-describedby="basic-addon1"
                               onKeyPress={this.handleKeyPress}/>
                                   </div>
                         <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                        <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Hasta</span>
                    </div>
                        <input type="date" className="form-control" name="periodoF" value={selectedOption.endDate}   onChange={(values)=>this.handleChangeMagico(values.target.value,"periodoF")} aria-label="Username" aria-describedby="basic-addon1"
                               onKeyPress={this.handleKeyPress}/>
                        </div>
                    </div>
                        <div className="input-group mb-3 col-xs-12 ">
                    <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Nro de Recibo</span>
                        </div>
                        <input id="recibo" type="text" className="form-control" name="voucher"  onChange={(values)=>this.handleChangeMagico(values.target.value,"voucher")} placeholder="ejem:cod1,cod2,..." aria-label="Username" aria-describedby="basic-addon1"
                               onKeyPress={this.handleKeyPress}/>
                    </div>

                    <div className="cont_boton input-group mb-3 col-xs-12  text-center">
                        <div className="Botones">
                        <div className="Buton-contenedor">
                            <button id="Buscar" onClick={this.buscar} className="btn btn-primary">Buscar </button>
                            <Link to="/nueva" className="btn btn-primary boton_medio">Agregar</Link>
                            <a className="btn btn-primary" href="https://siga-fisi.herokuapp.com/dashboard" >Regresar</a>
                        </div>
                        </div>

                    </div>
                    </div>
                  </form>

                    </div>
                <div className={(this.state.isLoading)?("isLoading"):("listar")}>
                    {this.mostrarData()}
                </div>

            </div>

        );

    }
}
export default Content;
