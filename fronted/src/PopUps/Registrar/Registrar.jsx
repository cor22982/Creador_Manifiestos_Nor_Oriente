import React from 'react'
import PopUp from '@components/PopUp';
import InputForm from '@components/InputForm';
import TextAreaForm from '@components/TextAreaForm';
import Checkbox from '@components/Checkbox';
import { faUser, faHashtag, faLocationDot, faPhone, faWeightHanging, faList, faFilePen, faPrint, faX } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button';
import InputAutocompleted from '@components/InputAutocompleted';
function Registrar({ activar, setActivar }) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div className='formregister' style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ display: 'flex', justifyContent: 'center', marginBottom: '0px', marginTop: '0px' }}>REGISTRAR</h2>
       
        <InputForm
          iconin={faHashtag}
          width_input='80px'
          height_input='45px'
          font='29px'
          titule='Bulto'
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <InputForm
            iconin={faUser}
            width_input='350px'
            titule='Nombre Envia'
            height_input='35px'
          />
          <InputAutocompleted
            width_input='85px'
            titule='Direccion'
            iconin={faLocationDot}
            />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <InputForm
            iconin={faUser}
            width_input='350px'
            titule='Nombre Recibe'
            height_input='35px'
          />
          <InputAutocompleted
            width_input='85px'
            titule='Direccion'
            iconin={faLocationDot}
            />
        </div>
        <InputForm
          iconin={faPhone}
          width_input='250px'
          titule='Telefono'
          height_input='35px'
        />
        <TextAreaForm
          iconin={faList}
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <InputForm
            iconin={faWeightHanging}
            width_input='170px'
            titule='Peso(Lb)'
            height_input='50px'
            font='35px'
          />
          <InputForm
            iconin={faHashtag}
            width_input='270px'
            titule='Codigo'
            height_input='50px'
            font='40px'
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', marginTop: '0px'}}>
          <Checkbox name='SECO' />
          <Checkbox name='FRIO' />
          <InputForm
            iconin={faUser}
            width_input='270px'
            titule='Atentido por'
            height_input='35px'
            font='20px'
            
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', gap: '30px', marginBottom: '0px', alignItems: 'center', justifyContent: 'center', marginTop: '0px'}}>
          <Button
            iconin={faFilePen}
            titule='Insertar'
            color='#1B75BA'
            fontcolor='white'
            hovercolor='#0090FF'
            height_btn='40px'></Button>
          <Button
            iconin={faPrint}
            titule='Imprimir'
            color='#0090FF'
            fontcolor='white'
            hovercolor='#0090FF'
            height_btn='40px'></Button>
          <Button
            iconin={faX}
            titule='Cancelar'
            color='white'
            fontcolor='#004981'
            hovercolor='#0090FF'
            bordercolor='#07395E'
            height_btn='40px'></Button>
        </div>
      </div>
    </PopUp>
  )
}

export default Registrar;
