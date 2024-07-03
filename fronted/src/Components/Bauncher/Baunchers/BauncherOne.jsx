import React from 'react'
import '../Bauncher.css'
function BauncherOne({info}) {
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString();
  return (
      <div >
      <div className='bauncher-contenido'>
        <div className='label-display'>
          <p className='label-name'>Envia: </p>
          <div className='descripcion-label'>
            <p className='contained'>{info?.envia || ''}</p>
            <p className='bulto'>BULTO # {info?.bulto || ''}</p>
          </div>
        </div>
        <div className='label-display'>
          <p className='label-name'>Direccion: </p>
          <div className='descripcion-label'>
            <p className='contained'>{`${info?.direccion_envia || ''} ${info?.ciudad_envia || ''}`}</p>
          </div>
        </div>
        <div className='label2-display'>
          <p className='label-name'>Recibe: </p>
          <div className='descripcion-label'>
            <p className='contained'>{info?.recibe || ''}</p>
          </div>
        </div>
        <div className='label-display'>
          <p className='label-name'>Direccion: </p>
          <div className='descripcion-label'>
            <p className='contained'>{`${info?.direccion_recibe || ''} ${info?.ciudad_recibe || ''} ${info?.region || ''} ${info?.codigo_postal || ''}`}</p>
          </div>
        </div>
        <div className='label2-display'>
          <p className='label-name'>Tel: </p>
          <div className='descripcion-label'>
            <p className='contained'>{info?.telefono_recibe}</p>
          </div>
          <p className='label-name-2'>Fecha: </p>
          <div className='descripcion-label-2'>
            <p className='contained'>{fechaFormateada}</p>
          </div>
        </div>
        <table className='info-table'>
          <thead>
            <tr>
              <th className='head' style={{ width: '125px' }}>DESCRIPCION</th>
              <th className='head' style={{ width: '300px' }}>CONTENIDO</th>
              <th className='head' style={{ width: '90px' }}>PESO</th>
              <th className='head'>CODIGO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='paquete'>{info?.descripcion || ''}</td>
              <td className='contenido' style={{height: '90px'}}>{info?.contenido?.toUpperCase() || ''}</td>
              <td className='ctd'>
                <div className='peso-weight'>
                  <p className='peso-cantidad'>{info?.peso?.split('.')[0] || ''}</p>
                  <p className='peso-cantidad'>lb</p>
                </div>
              </td>
              <td className='ctd'>
                <div className='peso-weight'>
                  <p className='titulo'>{info?.codigo || ''}</p>
                  <p className='titulo-2'>{info?.tipo || ''}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='footer-data'>
          <p className='label-name'>Atendido por:</p>
          <div className='descripcion-label-3'>
            <p className='contained-3'>{info?.atendido || ''}</p>
          </div>
          <p className='label-name-3'>Oficina:</p>
          <div className='descripcion-label-4'>
            <p className='contained-3'>{info?.ciudad_envia || ''}</p>
          </div>
        </div>
      </div>
      <p className='foot'>NOTA: Si hay un retraso en la Aerolínea, no somos responsables por descomposición y por objetos de valor no</p>
    </div>
  )
}

export default BauncherOne