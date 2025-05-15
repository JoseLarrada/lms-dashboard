import { useState, useEffect } from 'react';
import cursos from '../data/cursos.json';
import evaluaciones from '../data/evaluaciones.json';
import subidasJson from '../data/subidas.json';
import progreso from '../data/progreso.json';
import { useAuth } from '../context/AuthContext';
import { Tab } from '@headlessui/react';
import { BookOpen, ClipboardList, CheckSquare } from 'lucide-react';

import CursoSelector from '../components/estudiante/CursoSelector';
import Unidades from '../components/estudiante/Unidades';
import ActividadesMejorado from '../components/estudiante/ActividadesMejorado';
import Evaluacion from '../components/estudiante/Evaluacion';
import Progreso from '../components/estudiante/Progreso';

export default function EstudianteHome() {
  const { usuario } = useAuth();
  const [cursoActivo, setCursoActivo] = useState(cursos[0]);
  const [subidas, setSubidas] = useState(subidasJson);

  const progresoActual = progreso.find(
    (p) => p.usuarioId === usuario.id && p.cursoId === cursoActivo.id
  );

  const evaluacion = evaluaciones.find((e) => e.cursoId === cursoActivo.id);

  const actividadesSubidas = subidas.filter(
    (s) => s.usuarioId === usuario.id && s.cursoId === cursoActivo.id
  );

  const handleSubir = (actividad, archivo) => {
    const nuevaSubida = {
      usuarioId: usuario.id,
      cursoId: cursoActivo.id,
      actividad,
      archivo,
      fecha: new Date().toISOString().split('T')[0],
    };
    setSubidas([...subidas, nuevaSubida]);
    // Aquí guardarías también en backend o localStorage si quieres persistencia real
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Encabezado y título */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Portal del Estudiante</h1>
        <p className="text-gray-600">Bienvenido, {usuario.nombre}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - 1/4 del ancho en pantallas grandes */}
        <div className="lg:col-span-1">
          <CursoSelector 
            cursos={cursos} 
            cursoActivo={cursoActivo} 
            setCursoActivo={setCursoActivo} 
          />
          
          <div className="mt-6">
            <Progreso porcentaje={progresoActual?.progreso ?? null} />
          </div>
        </div>
        
        {/* Contenido principal - 3/4 del ancho en pantallas grandes */}
        <div className="lg:col-span-3">
          {/* Cabecera del curso */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{cursoActivo.titulo}</h2>
            <p className="text-gray-700 mb-4">{cursoActivo.descripcion}</p>
            
            {cursoActivo.video && (
              <a 
                href={cursoActivo.video} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                </svg>
                Ver video introductorio
              </a>
            )}
          </div>
          
          {/* Tabs de contenido */}
          <Tab.Group>
            <Tab.List className="flex rounded-xl bg-blue-50 p-1 mb-6">
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                ${selected 
                  ? 'bg-white shadow text-blue-700' 
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'
                } flex items-center justify-center transition-all`
              }>
                <BookOpen size={18} className="mr-2" />
                Unidades
              </Tab>
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected 
                  ? 'bg-white shadow text-blue-700' 
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'
                } flex items-center justify-center transition-all`
              }>
                <ClipboardList size={18} className="mr-2" />
                Actividades
              </Tab>
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected 
                  ? 'bg-white shadow text-blue-700' 
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'
                } flex items-center justify-center transition-all`
              }>
                <CheckSquare size={18} className="mr-2" />
                Evaluación
              </Tab>
            </Tab.List>
            
            <Tab.Panels className="mt-2">
              {/* Panel de Unidades */}
              <Tab.Panel>
                <Unidades contenido={cursoActivo.contenido} />
              </Tab.Panel>
              
              {/* Panel de Actividades */}
              <Tab.Panel>
                {console.log("Curso activo:", cursoActivo)}
                <ActividadesMejorado
                  actividades={cursoActivo.actividades}
                  subidas={actividadesSubidas}
                  onSubir={handleSubir}
                />
              </Tab.Panel>
              
              {/* Panel de Evaluación */}
              <Tab.Panel>
                <Evaluacion evaluacion={evaluacion} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}