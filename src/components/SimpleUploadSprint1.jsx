import { useState } from 'react';

/**
 * Componente SimpleUploadSprint1 - Interface TEMPORÁRIA para Sprint 1
 * 
 * IMPORTANTE: Este é um componente temporário criado apenas para validação
 * do fluxo básico na Sprint 1. Nas próximas sprints será substituído por
 * uma interface completa e robusta.
 * 
 * !!!INTEGRAÇÕES PENDENTES COM BACKEND!!!
 * 
 */

function SimpleUploadSprint1() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingComplete, setProcessingComplete] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setResult(null);
    setError(null);
    setProcessingComplete(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor, selecione um arquivo primeiro.');
      return;
    }

    setLoading(true);
    setError(null);
    setProcessingComplete(false);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Implementar endpoint /api/upload no backend
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      setProcessingComplete(true);
    } catch (err) {
      setError(`Erro ao enviar arquivo: ${err.message}`);
      setProcessingComplete(false);
    } finally {
      setLoading(false);
    }
  };

  const handleExportSpreadsheet = async () => {
    try {
      // Implementar endpoint /api/export/{id} no backend
      // Backend deve retornar arquivo Excel com nome correto já definido
      
      if (!result || !result.exportId) {
        setError('Dados não disponíveis para exportação.');
        return;
      }

      const response = await fetch(`http://localhost:8000/api/export/${result.exportId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Erro ao exportar: ${response.status}`);
      }

      // Download do arquivo (nome definido pelo backend)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Backend deve enviar filename no header Content-Disposition
      // Caso contrário, usar nome padrão
      const filename = response.headers.get('content-disposition')
        ?.split('filename=')[1]
        ?.replace(/"/g, '') || 'descriptum-analise.xlsx';
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      setError(`Erro: ${err.message}`);
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: 'var(--WHITE_BASE_WHITE)',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'var(--NAVY_BASE_NAVY)',
        borderRadius: '8px',
        background: `linear-gradient(135deg, 
          var(--NAVY_BASE_NAVY) 0%, 
          var(--ROYAL_BASE_ROYAL) 100%)`
      }}>
        <img 
          src="/LOGOEXEMPLO.svg" 
          alt="Descriptum Logo" 
          style={{
            maxHeight: '80px',
            maxWidth: '300px',
            height: 'auto',
            width: 'auto',
            filter: 'brightness(1.1)'
          }}
        />
      </div>

      {/* Barra de carregamento - aparece apenas durante o processamento */}
      {loading && (
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'var(--WHITE_WHITE_300)',
          borderRadius: '6px',
          border: '1px solid var(--WHITE_WHITE_700)',
          textAlign: 'center'
        }}>
          <div style={{
            marginBottom: '10px',
            color: 'var(--NAVY_BASE_NAVY)',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 500,
            fontSize: '16px'
          }}>
            Processando documento...
          </div>
          
          {/* Animação da barra */}
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--WHITE_WHITE_700)',
            borderRadius: '3px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              background: `linear-gradient(90deg, 
                var(--ROYAL_BASE_ROYAL) 0%, 
                var(--ROYAL_ROYAL_700) 50%, 
                var(--ROYAL_BASE_ROYAL) 100%)`,
              borderRadius: '3px',
              width: '40%',
              animation: 'loading 2s ease-in-out infinite',
              position: 'absolute'
            }} />
          </div>
          
          <div style={{
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--BLACK_BLACK_500)',
            fontFamily: 'Crimson Pro, serif'
          }}>
            Aguarde enquanto analisamos o pedido de compra.
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes loading {
            0% { left: -40%; }
            50% { left: 50%; }
            100% { left: 100%; }
          }
        `}
      </style>
      
      <div style={{ 
        marginBottom: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '15px',
          color: 'var(--BLACK_BLACK_700)',
          fontWeight: '500',
          fontFamily: 'Crimson Pro, serif',
          fontSize: '16px'
        }}>
          Selecione um arquivo PDF:
        </label>
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ 
              marginBottom: '10px',
              padding: '12px',
              border: '2px solid var(--WHITE_WHITE_700)',
              borderRadius: '6px',
              backgroundColor: 'var(--WHITE_WHITE_300)',
              width: '100%',
              fontSize: '14px',
              fontFamily: 'Crimson Pro, serif',
              boxSizing: 'border-box',
              textAlign: 'center'
            }}
          />
        </div>
        {selectedFile && (
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--BLACK_BLACK_500)',
            backgroundColor: 'var(--WHITE_WHITE_300)',
            padding: '8px',
            borderRadius: '4px',
            margin: '8px 0'
          }}>
            Arquivo selecionado: {selectedFile.name}
          </p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading || processingComplete}
        style={{
          backgroundColor: (!selectedFile || loading || processingComplete) ? 'var(--BLACK_BLACK_300)' : 'var(--ROYAL_BASE_ROYAL)',
          color: 'var(--WHITE_BASE_WHITE)',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          cursor: (!selectedFile || loading || processingComplete) ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '500',
          fontFamily: 'Crimson Pro, serif',
          width: '100%',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => {
          if (selectedFile && !loading && !processingComplete) {
            e.target.style.backgroundColor = 'var(--ROYAL_ROYAL_700)';
          }
        }}
        onMouseOut={(e) => {
          if (selectedFile && !loading && !processingComplete) {
            e.target.style.backgroundColor = 'var(--ROYAL_BASE_ROYAL)';
          }
        }}
      >
        {loading ? 'Processando...' : processingComplete ? 'Processamento Concluído' : 'Enviar Arquivo'}
      </button>

      {processingComplete && (
        <button
          onClick={() => {
            setSelectedFile(null);
            setResult(null);
            setProcessingComplete(false);
            setError(null);
          }}
          style={{
            backgroundColor: 'var(--BLACK_BLACK_500)',
            color: 'var(--WHITE_BASE_WHITE)',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'Crimson Pro, serif',
            width: '100%',
            marginTop: '10px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'var(--BLACK_BLACK_700)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'var(--BLACK_BLACK_500)';
          }}
        >
          Processar Novo Documento
        </button>
      )}

      {error && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: 'var(--RED_RED_300)',
          color: 'var(--RED_RED_700)',
          border: '1px solid var(--RED_BASE_RED)',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <strong>❌ Erro:</strong> {error}
        </div>
      )}

      {processingComplete && !loading && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: 'var(--GREEN_GREEN_300)',
          color: 'var(--NAVY_BASE_NAVY)',
          border: '1px solid var(--GREEN_BASE_GREEN)',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0',
            color: 'var(--GREEN_BASE_GREEN)',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '28px'
          }}>
            ✅ Processamento Concluído!
          </h3>
          
          <p style={{
            margin: '0 0 20px 0',
            fontSize: '16px',
            fontFamily: 'Crimson Pro, serif',
            color: 'var(--BLACK_BLACK_700)'
          }}>
            Seu documento foi analisado com sucesso. 
          </p>

          <button
            onClick={handleExportSpreadsheet}
            style={{
              backgroundColor: 'var(--GREEN_BASE_GREEN)',
              color: 'var(--WHITE_BASE_WHITE)',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              fontFamily: 'Crimson Pro, serif',
              transition: 'background-color 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'var(--GREEN_GREEN_700)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'var(--GREEN_BASE_GREEN)';
            }}
          >
            Exportar Planilha Excel
          </button>

          {/* !!Remover este bloco após integração com backend - apenas para debug */}
          {result && (
            <details style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: 'var(--WHITE_BASE_WHITE)',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                [DEBUG] Ver dados recebidos do backend
              </summary>
              <pre style={{
                marginTop: '10px',
                textAlign: 'left',
                overflow: 'auto',
                color: 'var(--BLACK_BASE_BLACK)'
              }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

export default SimpleUploadSprint1;