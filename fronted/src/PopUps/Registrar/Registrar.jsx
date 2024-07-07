import React from 'react'
import PopUp from '@components/PopUp';
import InputForm from '@components/InputForm';
import { faUser, faHashtag, faLocationDot, faPhone, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
function Registrar({activar, setActivar}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div className='formregister'>
        <h2 style={{display: 'flex', justifyContent: 'center'}}>REGISTRAR</h2>
        <br></br>
        <InputForm 
            iconin={faHashtag} 
            width_input='60px'
            height_input='45px'
            font='29px'
            titule='Bulto'></InputForm>
        <br></br>
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <InputForm 
            iconin={faUser} 
            width_input='350px'
            titule='Nombre Envia'></InputForm>
          <InputForm 
            iconin={faLocationDot}
            width_input='100px'
            titule='Direccion'></InputForm>
        </div>
        <br></br>
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <InputForm 
            iconin={faUser} 
            width_input='350px'
            titule='Nombre Recibe'></InputForm>
          <InputForm 
            iconin={faLocationDot}
            width_input='100px'
            titule='Direccion'></InputForm>
        </div>
        <br></br>
        <InputForm 
            iconin={faPhone} 
            width_input='250px'
            titule='Telefono'></InputForm>
        <br></br>
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <InputForm 
            iconin={faWeightHanging} 
            width_input='250px'
            titule='Peso(Lb)'
            height_input='70px'
            font='40px'></InputForm>
          <InputForm 
            iconin={faHashtag}
            width_input='200px'
            titule='Codigo'
            height_input='70px'
            font='40px'></InputForm>
        </div>
      </div>
      
    </PopUp>
  )
}

export default Registrar