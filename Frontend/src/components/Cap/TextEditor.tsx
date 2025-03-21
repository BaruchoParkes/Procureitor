import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';
import './QuillEditor.css';


export const TextEditor = ({ text, titulo, cuerpo, autos, handleTextChange }: { text: string, titulo: string, cuerpo: string, autos: string, handleTextChange: (newValue: string) => void }) => {
    
  const [value, setValue] = useState('')

  useEffect(() => {
    // Create a Delta for the initial formatted content
    const initialContent = new Delta()
      .insert(titulo + '\n', { bold: true })  // Title with bold
      .insert('\nSR JUEZ:\n') // Regular text between title and body
      .insert('\nDr. CRISTIAN ANDRES PARKES, abogado inscripto al Tº 115 F° 831 CPACF, CUIT 20-29006501-2, IVA Responsable Inscripto, en mi carácter de Letrado apoderado de la parte Actora, en los autos '+ autos + ' a VS, respetuosamente digo: \n') // Regular text between title and body
      .insert(cuerpo + '\n', { indent: 1, align: "justified" })  // Body with first-line indentation
      .insert('PROVEER DE CONFORMIDAD\n',  {indent: 1 }) // Regular text between title and body
      .insert('SERA JUSTICIA\n',  {indent: 1 }); // Regular text between title and body

    // Apply the Delta as initial content to the editor
    setValue(initialContent);

  }, [titulo, cuerpo]);

  const [titular, settitular] = useState<string>(titulo);
  const Delta = Quill.import('delta');
  const [lastChange, setLastChange] = useState();

  const handleTextoChange = (newValue: string) => {
    setValue(newValue); // Updates local state
    handleTextChange(newValue); // Passes the new text to the parent
    //console.log(newValue);
  };

  useEffect(() => {
    if (titulo) {
      settitular(titulo);
    }
  }, [titulo]);

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

  const printContent = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Content</title>
            <style>
              body { font-family: Times New Roman, serif; padding: 80px 20px 20px 80px; font-size:14}
              .ql-indent-1 { margin-left: 6em; } /* Adjust indentation if needed */
            </style>
          </head>
          <body>
            ${document.querySelector('.ql-editor')?.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div>
    <ReactQuill 
      theme="snow" 
      value={value} 
      modules= {{toolbar : toolbarOptions}}
      onChange={handleTextoChange} 
      />
      <button onClick={printContent} style={{ marginTop: '10px' }}>
        Imprimir      
      </button>
      </div>
    );
  };
  