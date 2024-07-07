import React from 'react'
import PopUp from '@components/PopUp';
import InputForm from '@components/InputForm';
import TextAreaForm from '@components/TextAreaForm';
import Checkbox from '@components/Checkbox';
import { faUser, faHashtag, faLocationDot, faPhone, faWeightHanging, faList } from '@fortawesome/free-solid-svg-icons';
function Registrar({activar, setActivar}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div className='formregister'>
        <h2 style={{display: 'flex', justifyContent: 'center'}}>REGISTRAR</h2>
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
            width_input='90px'
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
            width_input='90px'
            titule='Direccion'></InputForm>
        </div>
        <br></br>
        <InputForm 
            iconin={faPhone} 
            width_input='250px'
            titule='Telefono'></InputForm>
        <br></br>
        <TextAreaForm
          iconin={faList}></TextAreaForm>
        <br></br>
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <InputForm 
            iconin={faWeightHanging} 
            width_input='170px'
            titule='Peso(Lb)'
            height_input='50px'
            font='35px'></InputForm>
          <InputForm 
            iconin={faHashtag}
            width_input='270px'
            titule='Codigo'
            height_input='50px'
            font='40px'></InputForm>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
          <Checkbox name='SECO' />
          <Checkbox name='FRIO' />
          <InputForm
            iconin={faUser}
            width_input='270px'
            titule='Atentido por'
            height_input='30px'
            font='20px'
          />
        </div>
      </div>
      
    </PopUp>
  )
}

export default Registrar