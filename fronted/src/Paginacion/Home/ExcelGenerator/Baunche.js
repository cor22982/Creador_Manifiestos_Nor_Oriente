import * as XLSX from 'xlsx';
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const Baunche = () => {
    // Datos de ejemplo para el Excel
    const data = [
        ['Envía:', 'OLAYA DUARTE', '', '', '', 'BULTO #', '16'],
        ['Dirección:', '11 CALLE 1-74 ZONA 1', '', '', '', 'CHIQUIMULA - GUATEMALA', ''],
        ['Recibe:', 'AMILCAR PEREZ', '', '', '', '', ''],
        ['Dirección:', '89 MARVIN AVE', 'BREWSTER', 'NY', '10509', '', ''],
        ['Tel:', '9142994836', '', '', 'Fecha:', '28/06/2024', ''],
        ['', '', '', '', '', '', ''],
        ['DESCRIPCION', '', 'CONTENIDO', '', '', 'PESO', 'CODIGO'],
        ['1PAQ', '', 'ROPA, DOCUMENTOS, SUPLEMENTO VITAMINICO', '', '', '40', '702K'],
        ['', '', '', '', '', 'lb', 'SECO'],
        ['', '', '', '', '', '', ''],
        ['Atendido por:', 'SULI', '', '', 'Oficina:', 'CHIQUIMULA - GUATEMALA', ''],
        ['', '', '', '', '', '', ''],
        ['NOTA:', 'Si hay un retraso en la Aerolínea, no somos responsables por descomposición y por objetos de valor no declarados.', '', '', '', '', '']
    ];

    // Crear un nuevo libro de trabajo
    const wb = XLSX.utils.book_new();

    // Convertir los datos a una hoja de trabajo
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Agregar la hoja al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

    // Generar el contenido del Excel en formato binario
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Convertir el contenido binario a un Blob
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;
    const blob = new Blob([buf], { type: 'application/octet-stream' });

    // Guardar el archivo usando file-saver
    saveAs(blob, "Baunche.xlsx");

    // Convertir los datos a formato PDF
    const doc = new jsPDF();

    // Convertir las filas a un formato adecuado para autoTable
    const rows = data.map(row => row.map(cell => cell.toString()));

    // Añadir la tabla al documento PDF
    autoTable(doc, {
        head: [],
        body: rows
    });

    // Guardar el PDF temporalmente para obtener la URL
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);

    // Usar print-js para imprimir el PDF
    printJS({ printable: url, type: 'pdf', showModal: true });
}

export default Baunche;
