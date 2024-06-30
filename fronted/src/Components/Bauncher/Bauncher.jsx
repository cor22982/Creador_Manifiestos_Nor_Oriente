import React, { forwardRef } from 'react';
import './Bauncher.css';

const Bauncher = forwardRef((props, ref) => {
  return (
    <div className='recuadro' ref={ref}>
      <div className='bauncher-contenido'>
        <div className='label-display'>
          <p className='label-name'>Envia: </p>
          <div className='descripcion-label'>
            <p className='contained'>OLAYA DUARTE</p>
            <p className='bulto'>BULTO # 18</p>
          </div>
        </div>
        <div className='label-display'>
          <p className='label-name'>Direccion: </p>
          <div className='descripcion-label'>
            <p className='contained'>11 CALLE 1-74 ZONA 1 CHIQUIMULA - GUATEMALA</p>
          </div>
        </div>
        <div className='label2-display'>
          <p className='label-name'>Recibe: </p>
          <div className='descripcion-label'>
            <p className='contained'>AMILCAR PEREZ</p>
          </div>
        </div>
        <div className='label-display'>
          <p className='label-name'>Direccion: </p>
          <div className='descripcion-label'>
            <p className='contained'>89 MARVIN AVE BREWSTER NY 10509</p>
          </div>
        </div>
        <div className='label2-display'>
          <p className='label-name'>Tel: </p>
          <div className='descripcion-label'>
            <p className='contained'>9142994836</p>
          </div>
          <p className='label-name-2'>Fecha: </p>
          <div className='descripcion-label-2'>
            <p className='contained'>29/06/2024</p>
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
              <td className='paquete'>1PAQ</td>
              <td className='contenido' style={{height: '90px'}}>ROPA, DOCUMENTOS, SUPLEMENTO VITAMINICO</td>
              <td >
                <div className='peso-weight'>
                  <p className='peso-cantidad'>40</p>
                  <p className='peso-cantidad'>lb</p>
                </div>
              </td>
              <td >
                <div className='peso-weight'>
                  <p className='titulo'>702K</p>
                  <p className='titulo-2'>SECO</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='footer-data'>
          <p className='label-name'>Atendido por:</p>
          <div className='descripcion-label-3'>
            <p className='contained-3'>SULI</p>
          </div>
          <p className='label-name-3'>Oficina:</p>
          <div className='descripcion-label-4'>
            <p className='contained-3'>CHIQUIMULA - GUATEMALA</p>
          </div>
        </div>
      </div>
      <p className='foot'>NOTA: Si hay un retraso en la Aerolínea, no somos responsables por descomposición y por objetos de valor no</p>
    </div>
  );
});

export default Bauncher;
