import { useState } from 'react';
import { ClipboardCheck, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function Evaluacion({ evaluacion }) {
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (id, opcion) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: opcion,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    
    // Simulamos un pequeño retardo para mostrar el estado de carga
    setTimeout(() => {
      let correctas = 0;
      evaluacion.preguntas.forEach((preg) => {
        if (respuestas[preg.id] === preg.correcta) {
          correctas += 1;
        }
      });

      setResultado({
        total: evaluacion.preguntas.length,
        correctas,
        porcentaje: (correctas / evaluacion.preguntas.length) * 100,
      });
      setEnviando(false);
    }, 800);
  };

  const getResultadoColor = (porcentaje) => {
    if (porcentaje >= 80) return 'text-green-700 bg-green-100';
    if (porcentaje >= 60) return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
  };

  const getResultadoIcon = (porcentaje) => {
    if (porcentaje >= 80) return <CheckCircle className="w-5 h-5 text-green-700" />;
    if (porcentaje >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-700" />;
    return <XCircle className="w-5 h-5 text-red-700" />;
  };

  const getPreguntasRespondidas = () => {
    return Object.keys(respuestas).length;
  };

  if (!evaluacion) return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center py-8">
        <p className="text-gray-500">No hay evaluación disponible para este curso.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ClipboardCheck className="text-blue-600 mr-2" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Evaluación</h3>
        </div>
        <div className="text-sm text-gray-500">
          {getPreguntasRespondidas()} de {evaluacion.preguntas.length} respondidas
        </div>
      </div>

      <div className="mb-6">
        {evaluacion.preguntas.map((preg, index) => (
          <div 
            key={preg.id} 
            className={`mb-6 p-4 rounded-lg ${
              resultado ? 'bg-gray-50' : 'bg-white border border-gray-200'
            }`}
          >
            <p className="text-sm text-blue-600 font-medium mb-1">
              Pregunta {index + 1} de {evaluacion.preguntas.length}
            </p>
            <p className="text-gray-900 font-medium mb-3">{preg.texto}</p>
            
            <div className="space-y-2">
              {preg.opciones.map((op, i) => {
                const isSelected = respuestas[preg.id] === op;
                const isCorrect = resultado && op === preg.correcta;
                const isIncorrect = resultado && isSelected && op !== preg.correcta;
                
                let optionClasses = "flex items-center p-3 rounded-md border cursor-pointer";
                
                if (resultado) {
                  if (isCorrect) {
                    optionClasses += " bg-green-50 border-green-200";
                  } else if (isIncorrect) {
                    optionClasses += " bg-red-50 border-red-200";
                  } else if (isSelected) {
                    optionClasses += " bg-gray-100 border-gray-300";
                  } else {
                    optionClasses += " border-gray-200";
                  }
                } else {
                  optionClasses += isSelected 
                    ? " bg-blue-50 border-blue-300" 
                    : " border-gray-200 hover:bg-gray-50";
                }
                
                return (
                  <label key={i} className={optionClasses}>
                    <input
                      type="radio"
                      name={`pregunta-${preg.id}`}
                      value={op}
                      checked={isSelected}
                      onChange={() => !resultado && handleChange(preg.id, op)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      disabled={resultado !== null}
                    />
                    <span className="ml-3 text-gray-800">{op}</span>
                    {isCorrect && (
                      <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                    )}
                    {isIncorrect && (
                      <XCircle className="ml-auto h-5 w-5 text-red-500" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!resultado ? (
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={enviando || getPreguntasRespondidas() !== evaluacion.preguntas.length}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {enviando ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando respuestas...
            </>
          ) : (
            <>
              <ClipboardCheck className="w-4 h-4 mr-2" />
              {getPreguntasRespondidas() === evaluacion.preguntas.length 
                ? "Enviar respuestas" 
                : `Contestar todas las preguntas (${getPreguntasRespondidas()}/${evaluacion.preguntas.length})`
              }
            </>
          )}
        </button>
      ) : (
        <div className={`mt-6 p-4 rounded-lg ${getResultadoColor(resultado.porcentaje)}`}>
          <div className="flex items-start">
            {getResultadoIcon(resultado.porcentaje)}
            <div className="ml-3">
              <h4 className="font-semibold">Resultado de la evaluación</h4>
              <p className="text-sm mt-1">
                Has respondido correctamente {resultado.correctas} de {resultado.total} preguntas
              </p>
              <div className="mt-2 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      resultado.porcentaje >= 80 ? 'bg-green-600' : 
                      resultado.porcentaje >= 60 ? 'bg-yellow-500' : 'bg-red-600'
                    }`} 
                    style={{ width: `${resultado.porcentaje}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-semibold">
                  {resultado.porcentaje.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}