import { TrendingUp, Award } from 'lucide-react';

export default function Progreso({ porcentaje }) {
  const porcentajeVisible = porcentaje !== null ? (porcentaje * 100).toFixed(0) : 0;
  const getEstadoLabel = () => {
    if (porcentaje === null) return 'Sin iniciar';
    if (porcentaje === 1) return 'Completado';
    if (porcentaje >= 0.75) return 'Avanzado';
    if (porcentaje >= 0.5) return 'Progresando';
    if (porcentaje >= 0.25) return 'Iniciado';
    return 'Comenzando';
  };

  const getColorClass = () => {
    if (porcentaje === null) return 'text-gray-400';
    if (porcentaje === 1) return 'text-green-600';
    if (porcentaje >= 0.75) return 'text-blue-600';
    if (porcentaje >= 0.5) return 'text-indigo-600';
    if (porcentaje >= 0.25) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="text-blue-600 mr-2" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Progreso del curso</h3>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            {getEstadoLabel()}
          </span>
          <span className={`text-sm font-semibold ${getColorClass()}`}>
            {porcentajeVisible}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              porcentaje === 1 ? 'bg-green-600' : 
              porcentaje >= 0.75 ? 'bg-blue-600' : 
              porcentaje >= 0.5 ? 'bg-indigo-600' : 
              porcentaje >= 0.25 ? 'bg-yellow-500' : 
              porcentaje > 0 ? 'bg-orange-500' : 'bg-gray-300'
            }`} 
            style={{ width: `${porcentajeVisible}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className={`px-2 py-3 rounded-lg ${porcentaje >= 0.25 ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}>
          <p className="text-xs font-medium">Etapa 1</p>
          <p className="font-semibold text-lg">
            {porcentaje >= 0.25 ? '✓' : '25%'}
          </p>
        </div>
        <div className={`px-2 py-3 rounded-lg ${porcentaje >= 0.5 ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}>
          <p className="text-xs font-medium">Etapa 2</p>
          <p className="font-semibold text-lg">
            {porcentaje >= 0.5 ? '✓' : '50%'}
          </p>
        </div>
        <div className={`px-2 py-3 rounded-lg ${porcentaje >= 0.75 ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}>
          <p className="text-xs font-medium">Etapa 3</p>
          <p className="font-semibold text-lg">
            {porcentaje >= 0.75 ? '✓' : '75%'}
          </p>
        </div>
        <div className={`px-2 py-3 rounded-lg ${porcentaje >= 1 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
          <p className="text-xs font-medium">Final</p>
          <p className="font-semibold text-lg">
            {porcentaje >= 1 ? '✓' : '100%'}
          </p>
        </div>
      </div>
      
      {porcentaje === 1 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <Award className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-sm text-green-700">¡Felicidades! Has completado este curso</span>
        </div>
      )}
    </div>
  );
}