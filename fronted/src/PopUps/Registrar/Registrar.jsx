import React, { useEffect,useState } from 'react';
import PopUp from '@components/PopUp';
import InputForm from '@components/InputForm';
import TextAreaForm from '@components/TextAreaForm';
import Checkbox from '@components/Checkbox';
import { faUser, faHashtag, faLocationDot, faPhone, faWeightHanging, faList, faFilePen, faPrint, faX } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button';
import InputAutocompleted from '@components/InputAutocompleted';
import useApi from '@hooks/useApi';
import useForm from '@hooks/useForm';
import { object, string, number } from 'yup'

//Schema to send packages  
const schema = object({
  hawb: string().required(),
  manifest: string().required(),
  weight_lb: number().required(),
  description_spanish: string().required(),
  shipper: string().required(),
  tel_ship: string().required().default("0"),
  id_ship: number().required(),
  consing: string().required(),
  tel_consg: string().required().min(10, "El numero minimo es de 10 caracteres"),
  id_consing: number().required(),
  type_bag: string().required(),
  atendend: string().required(),
  bag: number().required()
})

function Registrar({ activar, setActivar, sendtoPrint, setCodigo, manifiesto }) {
  const { values, setValue, validate, errors } = useForm(schema)
  const [id_gt, setId_gt] = useState([])
  const [id_usa, setId_usa] = useState([])
  const { llamadowithoutbody } = useApi();
  const [seco, setSeco] = useState(false);
  const [frio, setFrio] = useState(false);
  const handleSubmit = async () => {
    console.log('Values:', values)
    console.log(values.weight_lb)
  }

  const cancel = () => {
    setActivar(false)
  }

  const print = async() => {
    await sendtoPrint()
    setActivar(false)
  }

  useEffect(() => {
    const getDirecciones_guate = async () => {
      const data = await llamadowithoutbody('GET', 'http://127.0.0.1:8000/api/guatemala_address')
      const ids = data.map(item => item.id);  
      setId_gt(ids)
    }
    const getDirecciones_usa = async () => {
      const data = await llamadowithoutbody('GET', 'http://127.0.0.1:8000/api/usa_address')
      const ids = data.map(item => item.id);
      setId_usa(ids)
    }
    getDirecciones_guate();
    getDirecciones_usa();
  }, [])

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
          type="number"
          value={values.bag || ''}
          onChange={(value) => {setValue('bag', value)}}
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <InputForm
            iconin={faUser}
            width_input='350px'
            titule='Nombre Envia'
            height_input='35px'
            value={values.shipper || ''}
            onChange={(value) => {setValue('shipper', value)}}
          />
          <InputAutocompleted
            width_input='85px'
            titule='Direccion'
            iconin={faLocationDot}
            options={id_gt}
            type="number"
            value={(values.id_ship || '').toString()}
            onChange={(value) => {setValue('id_ship', value)}}
            setValue={(value) => {setValue('id_ship', value)}}
            />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <InputForm
            iconin={faUser}
            width_input='350px'
            titule='Nombre Recibe'
            height_input='35px'
            value={values.consing || ''}
            onChange={(value) => {setValue('consing', value)}}
          />
          <InputAutocompleted
            width_input='85px'
            titule='Direccion'
            iconin={faLocationDot}
            options={id_usa}
            type="number"
            value={(values.id_consing || '').toString()}
            onChange={(value) => {setValue('id_consing', value)}}
            setValue={(value) => {setValue('id_consing', value)}}
            />
        </div>
        <InputForm
          iconin={faPhone}
          width_input='250px'
          titule='Telefono'
          height_input='35px'
          type="number"
          value={values.tel_consg || ''}
          onChange={(value) => {setValue('tel_consg', value)}}
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
            type="number"
            value={values.weight_lb || ''}
            onChange={(value) => {setValue('weight_lb', value)}}
          />
          <InputForm
            iconin={faHashtag}
            width_input='270px'
            titule='Codigo'
            height_input='50px'
            font='40px'
            value={values.hawb || ''}
            onChange={(value) => {setValue('hawb', value)}}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', marginTop: '0px'}}>
          <Checkbox 
            name='SECO' 
            onpress={() => {setValue('type_bag','SECO'); setFrio(false)}}
            pressed={seco}
            setPressed={setSeco}/>
          <Checkbox 
            name='FRIO' 
            onpress={() => {setValue('type_bag','FRIO'); setSeco(false)}}
            pressed={frio}
            setPressed={setFrio}/>
          <InputForm
            iconin={faUser}
            width_input='270px'
            titule='Atentido por'
            height_input='35px'
            font='20px'
            value={values.atendend || ''}
            onChange={(value) => {setValue('atendend', value)}}
            
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', gap: '30px', marginBottom: '0px', alignItems: 'center', justifyContent: 'center', marginTop: '0px'}}>
          <Button
            iconin={faFilePen}
            titule='Insertar'
            color='#1B75BA'
            fontcolor='white'
            hovercolor='#0090FF'
            height_btn='40px'
            onclick={handleSubmit}></Button>
          <Button
            iconin={faPrint}
            titule='Imprimir'
            color='#0090FF'
            fontcolor='white'
            hovercolor='#0090FF'
            height_btn='40px'
            onclick={print}></Button>
          <Button
            iconin={faX}
            titule='Cancelar'
            color='white'
            fontcolor='#004981'
            hovercolor='#0090FF'
            bordercolor='#07395E'
            height_btn='40px'
            onclick={cancel}></Button>
        </div>
      </div>
    </PopUp>
  )
}

export default Registrar;
