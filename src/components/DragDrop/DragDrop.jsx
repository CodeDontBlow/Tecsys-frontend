// Third Party Imports
import { useState, useRef } from "react";

// Local Imports
import styles from './DragDrop.module.css';
import api from "../../services/axiosConfig";

const DragDropFiles = () => {
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("pdf", file[0]);

    // api.post("/pdf/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
    // )

    setIsFileUploaded(true);
  };


  if (isFileUploaded) {
    return (
      <>
        <div className={styles.dropzone}>
          <div className={styles.uploadClock}>
            <i class="bi bi-clock-fill"></i>

          </div>

          <div className={styles['text-container']}>
            <h1>PDF Carregado</h1>
            <h2>Clique no botão “Cancelar” para cancelar o processo</h2>
          </div>
        </div>

        <p className={styles.infoText}>
          Clique em Cancelar para remover o PDF ou para interromper a extração do arquivo
        </p>

        <div className={styles.actions}>
          <button onClick={() => {
            setFile(null)
            setIsFileUploaded(false)
          }}> Cancelar </button>
        </div>
      </>
    );
  }

  if (file) {
    return (
      <>
        <div className={styles.dropzone}>
          <div className={styles.uploadIcon}>
            <i class="bi bi-file-earmark-check-fill"></i>

          </div>

          <div className={styles['text-container']}>
            <h1>PDF Carregado</h1>
            <h2>Clique no botão “Enviar” para começar o processo</h2>
          </div>
        </div>

        <p className={styles.infoText}>
          Clique em Cancelar para remover o PDF ou para interromper a extração do arquivo
        </p>

        <div className={styles.actions}>
          <button onClick={() => setFile(null)}>Cancelar</button>
          <button onClick={handleUpload}>Enviar</button>
        </div>
      </>
    );
  }

  return (
    <div
      className={styles.dropzone}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <button onClick={() => inputRef.current.click()} className={styles.uploadButton}>
        <i className='bi bi-upload'></i>
      </button>

      <div className={styles['text-container']}>
        <h1>Carregar PDF</h1>
        <h2>Selecione ou arraste o pedido de compra aqui</h2>
      </div>

      <input
        type="file"
        multiple
        onChange={(event) => setFile(event.target.files)}
        hidden
        accept="application/pdf"
        ref={inputRef}
      />
    </div>
  );
};

export default DragDropFiles;
