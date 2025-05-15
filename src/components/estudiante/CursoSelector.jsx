import { BookOpen, ChevronRight } from 'lucide-react';

export default function CursoSelector({ cursos, cursoActivo, setCursoActivo }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <BookOpen className="text-blue-600 mr-2" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Mis Cursos</h2>
      </div>
      
      <div className="space-y-2">
        {cursos.map((curso) => {
          const isActive = cursoActivo && cursoActivo.id === curso.id;
          
          return (
            <div
              key={curso.id}
              onClick={() => setCursoActivo(curso)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 border-l-4 border-blue-600' 
                  : 'hover:bg-gray-50 border-l-4 border-transparent'
              }`}
            >
              <div className="flex items-center">
                <div 
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {curso.titulo.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                    {curso.titulo}
                  </p>
                  {curso.profesor && (
                    <p className="text-xs text-gray-500">
                      Prof. {curso.profesor}
                    </p>
                  )}
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>
          );
        })}
      </div>
      
      {cursos.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500">No tienes cursos asignados</p>
        </div>
      )}
    </div>
  );
}