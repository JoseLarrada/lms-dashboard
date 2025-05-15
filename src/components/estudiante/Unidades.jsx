import { BookOpen, FileText, Video, Link, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Unidades({ contenido }) {
  const [unidadesAbiertas, setUnidadesAbiertas] = useState({});

  const toggleUnidad = (idx) => {
    setUnidadesAbiertas(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getTipoIcono = (recurso) => {
    if (recurso.toLowerCase().includes('pdf') || recurso.toLowerCase().includes('documento')) {
      return <FileText size={16} className="text-red-500" />;
    } else if (recurso.toLowerCase().includes('video') || recurso.toLowerCase().includes('youtube')) {
      return <Video size={16} className="text-blue-500" />;
    } else {
      return <Link size={16} className="text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <BookOpen className="text-blue-600 mr-2" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Unidades del curso</h3>
      </div>
      
      {contenido.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Este curso aún no tiene unidades disponibles</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contenido.map((unidad, idx) => {
            const isOpen = unidadesAbiertas[idx] !== false; // Por defecto abierto
            
            return (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleUnidad(idx)}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <h4 className="ml-3 font-medium text-gray-900">{unidad.titulo}</h4>
                    </div>
                    <p className="mt-1 ml-11 text-sm text-gray-500 line-clamp-1">{unidad.descripcion}</p>
                  </div>
                  <div className="ml-4">
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {isOpen && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-700 mb-4">{unidad.descripcion}</p>
                    
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Recursos disponibles:</h5>
                      <ul className="space-y-2">
                        {unidad.recursos.map((recurso, i) => (
                          <li key={i} className="flex items-center p-2 rounded-md hover:bg-gray-50">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                              {getTipoIcono(recurso)}
                            </div>
                            <span className="ml-3 text-sm text-gray-800">{recurso}</span>
                            <button className="ml-auto px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded">
                              Abrir
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}