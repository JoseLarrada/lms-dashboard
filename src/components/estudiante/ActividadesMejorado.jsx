import { useState, useRef } from 'react';
import {
  FileText, Upload, Check, AlertCircle, Calendar, Clock, Info
} from 'lucide-react';

export default function ActividadesMejorado({ actividades, subidas, onSubir }) {
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [arrastrandoArchivo, setArrastrandoArchivo] = useState(false);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const inputFileRef = useRef(null);

  // Para verificar si la actividad ya fue entregada
  const actividadEntregada = (actividad) =>
    subidas.some((s) => s.actividadId === actividad.id);

  const getDetallesEntrega = (actividad) =>
    subidas.find((s) => s.actividadId === actividad.id);

  const getDiasRestantes = (fechaEntrega) => {
    const hoy = new Date();
    const entrega = new Date(fechaEntrega);
    const diferencia = entrega - hoy;
    return isNaN(diferencia)
      ? null
      : Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!archivo || !actividadSeleccionada) {
      setError('Por favor, selecciona un archivo para subir');
      return;
    }

    setEnviando(true);
    setError('');

    setTimeout(() => {
      onSubir(actividadSeleccionada, archivo.name);
      setArchivo(null);
      setEnviando(false);
    }, 800);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setArrastrandoArchivo(true);
  };

  const handleDragLeave = () => setArrastrandoArchivo(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setArrastrandoArchivo(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setArchivo(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setArchivo(selectedFile);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Lista de actividades */}
        <div className="md:w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center mb-2">
              <FileText className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Actividades</h3>
            </div>
            <p className="text-sm text-gray-500">
              Selecciona una actividad para ver detalles y entregas
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {actividades.map((actividad) => {
              const entregada = actividadEntregada(actividad);
              const diasRestantes = actividad.fechaLimite
                ? getDiasRestantes(actividad.fechaLimite)
                : null;

              return (
                <div
                  key={actividad.id}
                  onClick={() => setActividadSeleccionada(actividad)}
                  className={`p-4 cursor-pointer transition-colors ${
                    actividadSeleccionada?.id === actividad.id
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{actividad.titulo}</h4>
                      {actividad.fechaLimite && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1" />
                          <span>Entrega: {actividad.fechaLimite}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      {entregada ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check size={12} className="mr-1" />
                          Entregada
                        </span>
                      ) : diasRestantes !== null && diasRestantes < 5 ? (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          diasRestantes <= 2
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {diasRestantes} días
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalles y subida */}
        <div className="md:w-2/3 p-6">
          {actividadSeleccionada ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{actividadSeleccionada.titulo}</h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm text-blue-700">
                    {actividadSeleccionada.descripcion ||
                      "Completa esta actividad según las instrucciones proporcionadas en clase."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                {actividadSeleccionada.fechaLimite && (
                  <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Fecha límite</p>
                      <p className="text-sm font-medium">{actividadSeleccionada.fechaLimite}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Estado</p>
                    <p className="text-sm font-medium">
                      {actividadEntregada(actividadSeleccionada)
                        ? "Entregada"
                        : actividadSeleccionada.fechaLimite && getDiasRestantes(actividadSeleccionada.fechaLimite) < 0
                          ? "Vencida"
                          : "Pendiente"}
                    </p>
                  </div>
                </div>
              </div>

              {actividadEntregada(actividadSeleccionada) ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Actividad entregada</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Archivo: {getDetallesEntrega(actividadSeleccionada).archivo}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-dashed border-2 p-6 rounded-md text-center ${
                    arrastrandoArchivo ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="file"
                    accept="*"
                    className="hidden"
                    ref={inputFileRef}
                    onChange={handleFileChange}
                  />

                  <Upload className="mx-auto mb-3 text-gray-400" size={40} />
                  <p className="text-gray-500 mb-2">
                    {archivo ? archivo.name : "Arrastra y suelta un archivo aquí o haz clic para seleccionar"}
                  </p>

                  {error && (
                    <p className="text-red-600 mb-2 text-sm">{error}</p>
                  )}

                  <button
                    type="button"
                    onClick={() => inputFileRef.current?.click()}
                    className="mr-3 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Seleccionar archivo
                  </button>

                  <button
                    type="submit"
                    disabled={enviando || !archivo}
                    className={`px-4 py-2 rounded-md text-white ${
                      enviando || !archivo ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    } transition`}
                  >
                    {enviando ? "Enviando..." : "Enviar"}
                  </button>
                </form>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center mt-12">Selecciona una actividad para ver detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
