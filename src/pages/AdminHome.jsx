import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Upload, Users, BookOpen, Award, Home, PieChart as PieChartIcon, Settings, LogOut, ArrowUp, ArrowDown, Calendar, Clock, Activity, TrendingUp, Server, Coffee, Database, ChevronRight, AlertCircle } from 'lucide-react';

const AdminHome = () => {
  // Estados para manejar formularios
  const [file, setFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentIds, setStudentIds] = useState('');

  // Estado para manejar la navegación
  const [activeSection, setActiveSection] = useState('dashboard');

  // Estado para manejar los cursos
  const [courses, setCourses] = useState([
    { id: 1, title: "Introducción a React", students: 45, completionRate: 68, createdAt: "2025-03-15", lastActive: "2025-05-12", growth: 12 },
    { id: 2, title: "JavaScript Avanzado", students: 32, completionRate: 75, createdAt: "2025-02-20", lastActive: "2025-05-15", growth: -5 },
    { id: 3, title: "Node.js para Principiantes", students: 28, completionRate: 60, createdAt: "2025-04-01", lastActive: "2025-05-17", growth: 8 },
    { id: 4, title: "Diseño UI/UX", students: 38, completionRate: 82, createdAt: "2025-03-08", lastActive: "2025-05-12", growth: 15 },
    { id: 5, title: "Desarrollo Full Stack", students: 24, completionRate: 55, createdAt: "2025-04-10", lastActive: "2025-05-18", growth: 3 },
  ]);

  // Estado para manejar los estudiantes
  const [students, setStudents] = useState([
    { id: 1001, name: "Ana García", email: "ana@ejemplo.com", enrolledCourses: 2, lastActive: "2025-05-15", status: "active" },
    { id: 1002, name: "Juan Pérez", email: "juan@ejemplo.com", enrolledCourses: 3, lastActive: "2025-05-10", status: "active" },
    { id: 1003, name: "María López", email: "maria@ejemplo.com", enrolledCourses: 1, lastActive: "2025-05-17", status: "active" },
    { id: 1004, name: "Carlos Ruiz", email: "carlos@ejemplo.com", enrolledCourses: 4, lastActive: "2025-04-30", status: "inactive" },
    { id: 1005, name: "Elena Torres", email: "elena@ejemplo.com", enrolledCourses: 2, lastActive: "2025-05-16", status: "active" },
    { id: 1006, name: "Miguel Sánchez", email: "miguel@ejemplo.com", enrolledCourses: 3, lastActive: "2025-05-14", status: "active" },
    { id: 1007, name: "Laura González", email: "laura@ejemplo.com", enrolledCourses: 2, lastActive: "2025-05-02", status: "inactive" },
    { id: 1008, name: "Roberto Díaz", email: "roberto@ejemplo.com", enrolledCourses: 1, lastActive: "2025-05-15", status: "active" },
  ]);

  // Estado para mensajes de feedback
  const [feedback, setFeedback] = useState({ show: false, message: "", type: "" });

  // Datos simulados para actividad reciente
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, activity: "Curso 'JavaScript Avanzado' completado por Juan Pérez", timestamp: "10:15 AM" },
    { id: 2, activity: "Nuevo estudiante registrado: Roberto Díaz", timestamp: "09:42 AM" },
    { id: 3, activity: "Curso 'Diseño UI/UX' actualizado", timestamp: "Ayer" },
    { id: 4, activity: "5 nuevos estudiantes asignados a 'Node.js para Principiantes'", timestamp: "Ayer" },
    { id: 5, activity: "Informe mensual de progreso generado", timestamp: "18/05/2025" }
  ]);

  // Datos simulados para métricas avanzadas
  const [advancedMetrics, setAdvancedMetrics] = useState({
    completionByDay: [
      { name: 'Lun', completados: 5 },
      { name: 'Mar', completados: 8 },
      { name: 'Mié', completados: 12 },
      { name: 'Jue', completados: 7 },
      { name: 'Vie', completados: 15 },
      { name: 'Sáb', completados: 9 },
      { name: 'Dom', completados: 3 },
    ],
    deviceUsage: [
      { name: 'Desktop', valor: 58 },
      { name: 'Mobile', valor: 32 },
      { name: 'Tablet', valor: 10 },
    ],
    studentsPerCategory: [
      { name: 'Desarrollo Frontend', students: 45 },
      { name: 'Desarrollo Backend', students: 35 },
      { name: 'Diseño', students: 32 },
      { name: 'DevOps', students: 18 },
      { name: 'Marketing Digital', students: 12 },
    ],
    sessionDuration: {
      avg: 37,
      change: 5.2
    },
    retentionRate: {
      rate: 78,
      change: -2.1
    },
    engagementScore: {
      score: 7.4, 
      change: 0.3
    }
  });

  // Datos para rendimiento del sistema
  const [systemMetrics, setSystemMetrics] = useState({
    serverUptime: "99.97%",
    averageResponseTime: "230ms",
    activeSessions: 24,
    systemLoad: 35
  });

  // Simular alertas para tareas pendientes
  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, title: "Revisar 3 certificaciones pendientes", priority: "alta" },
    { id: 2, title: "Responder a 5 consultas de estudiantes", priority: "media" },
    { id: 3, title: "Actualizar contenido del curso 'Node.js'", priority: "media" }
  ]);

  useEffect(() => {
    // Simular cambios en tiempo real en algunos datos
    const interval = setInterval(() => {
      // Actualizar número de sesiones activas aleatoriamente
      setSystemMetrics(prev => ({
        ...prev,
        activeSessions: Math.floor(Math.random() * 15) + 15,
        systemLoad: Math.floor(Math.random() * 20) + 25
      }));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Colores para gráficos
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  
  // Obtener cursos ordenados por mayor tasa de finalización
  const cursosOrdenados = [...courses].sort((a, b) => b.completionRate - a.completionRate);

  // Elegir los cursos a mostrar
  const cursosParaGrafico = cursosOrdenados.length <= 10
    ? cursosOrdenados
    : cursosOrdenados.slice(0, 8);

  // Preparar los datos para el gráfico
  const chartData = cursosParaGrafico.map(course => ({
    name: course.title.length > 10 ? course.title.substring(0, 10) + '...' : course.title,
    estudiantes: course.students,
    completado: course.completionRate,
    crecimiento: course.growth
  }));

  // Manejadores de eventos
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadCourse = () => {
    if (!file) return;
    
    // Simulando la carga de un curso nuevo
    const newCourse = {
      id: courses.length + 1,
      title: file.name.replace('.json', ''),
      students: 0,
      completionRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      growth: 0
    };
    
    setCourses([...courses, newCourse]);
    setFile(null);
    showFeedback("Curso cargado exitosamente", "success");
  };

  const handleAssignCourse = () => {
    if (!selectedCourse || !studentIds.trim()) return;
    
    const studentsArray = studentIds.split(',').map(id => id.trim());
    showFeedback(`Curso asignado a ${studentsArray.length} estudiantes`, "success");
    setSelectedCourse('');
    setStudentIds('');
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    showFeedback("Curso eliminado exitosamente", "success");
  };

  const showFeedback = (message, type) => {
    setFeedback({ show: true, message, type });
    setTimeout(() => {
      setFeedback({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Calcular estadísticas
  const totalEnrollments = students.reduce((acc, student) => acc + student.enrolledCourses, 0);
  const activeStudents = students.filter(student => student.status === 'active').length;
  const avgCompletionRate = Math.round(courses.reduce((acc, course) => acc + course.completionRate, 0) / courses.length);

  // Renderizado condicional basado en la sección activa
  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'courses':
        return renderCourses();
      case 'students':
        return renderStudents();
      case 'upload':
        return renderUploadCourse();
      default:
        return renderDashboard();
    }
  };

  // Renderizar el Dashboard principal mejorado
  const renderDashboard = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Última actualización: Hoy 5:50 AM</span>
            <button className="bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 flex items-center">
              <Activity size={16} className="mr-1" />
              Actualizar
            </button>
          </div>
        </div>
        
        {/* Sección de estadísticas destacadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Tarjeta: Total Cursos */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Cursos</p>
                <h3 className="text-2xl font-bold mt-1">{courses.length}</h3>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <ArrowUp size={14} className="mr-1" /> +2 este mes
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <BookOpen size={24} color="#4f46e5" />
              </div>
            </div>
          </div>

          {/* Tarjeta: Total Estudiantes */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Estudiantes Activos</p>
                <h3 className="text-2xl font-bold mt-1">{activeStudents}/{students.length}</h3>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <ArrowUp size={14} className="mr-1" /> +3 esta semana
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Users size={24} color="#10b981" />
              </div>
            </div>
          </div>

          {/* Tarjeta: Inscripciones Totales */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Inscripciones Totales</p>
                <h3 className="text-2xl font-bold mt-1">{totalEnrollments}</h3>
                <p className="text-sm text-red-600 mt-2 flex items-center">
                  <ArrowDown size={14} className="mr-1" /> -2 comparado con abril
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Award size={24} color="#8b5cf6" />
              </div>
            </div>
          </div>

          {/* Tarjeta: Tasa Finalización */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Tasa de Finalización</p>
                <h3 className="text-2xl font-bold mt-1">{avgCompletionRate}%</h3>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <ArrowUp size={14} className="mr-1" /> +5.2% en 30 días
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <PieChartIcon size={24} color="#f59e0b" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección principal dividida en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Columna de gráficos principales - ocupa 2/3 del espacio */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gráfico principal */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold">Rendimiento de Cursos</h2>
                <div>
                  <select className="border rounded-md p-1 text-sm text-gray-600">
                    <option>Últimos 30 días</option>
                    <option>Últimos 3 meses</option>
                    <option>Este año</option>
                  </select>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="estudiantes" name="Estudiantes" fill="#4f46e5" />
                  <Bar dataKey="completado" name="% Completado" fill="#10b981" />
                  <Bar dataKey="crecimiento" name="% Crecimiento" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráficos secundarios en grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gráfico: Cursos completados por día */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-md font-bold mb-4">Cursos Completados por Día</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={advancedMetrics.completionByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="completados" stroke="#4f46e5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfico: Dispositivos */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-md font-bold mb-4">Acceso por Dispositivo</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={advancedMetrics.deviceUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="valor"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {advancedMetrics.deviceUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico: Estudiantes por Categoría */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-md font-bold mb-4">Estudiantes por Categoría de Curso</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart 
                  layout="vertical" 
                  data={advancedMetrics.studentsPerCategory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="students" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Panel lateral derecho - ocupa 1/3 del espacio */}
          <div className="space-y-6">
            {/* Indicadores clave de rendimiento */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-md font-bold mb-4">Indicadores de Rendimiento</h2>
              <div className="space-y-4">
                {/* KPI: Duración de sesión */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Duración Media de Sesión</p>
                    <p className="text-lg font-semibold mt-1">{advancedMetrics.sessionDuration.avg} min</p>
                  </div>
                  <div className={`text-sm ${advancedMetrics.sessionDuration.change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {advancedMetrics.sessionDuration.change > 0 ? 
                      <ArrowUp size={14} className="mr-1" /> : 
                      <ArrowDown size={14} className="mr-1" />
                    }
                    {Math.abs(advancedMetrics.sessionDuration.change)}%
                  </div>
                </div>
                
                {/* KPI: Tasa de retención */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Tasa de Retención</p>
                    <p className="text-lg font-semibold mt-1">{advancedMetrics.retentionRate.rate}%</p>
                  </div>
                  <div className={`text-sm ${advancedMetrics.retentionRate.change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {advancedMetrics.retentionRate.change > 0 ? 
                      <ArrowUp size={14} className="mr-1" /> : 
                      <ArrowDown size={14} className="mr-1" />
                    }
                    {Math.abs(advancedMetrics.retentionRate.change)}%
                  </div>
                </div>
                
                {/* KPI: Puntuación de engagement */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Puntuación de Engagement</p>
                    <p className="text-lg font-semibold mt-1">{advancedMetrics.engagementScore.score}/10</p>
                  </div>
                  <div className={`text-sm ${advancedMetrics.engagementScore.change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {advancedMetrics.engagementScore.change > 0 ? 
                      <ArrowUp size={14} className="mr-1" /> : 
                      <ArrowDown size={14} className="mr-1" />
                    }
                    {Math.abs(advancedMetrics.engagementScore.change)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actividad reciente */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-md font-bold">Actividad Reciente</h2>
                <a href="#" className="text-blue-600 text-sm hover:underline">Ver todas</a>
              </div>
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start pb-2 border-b border-gray-100 last:border-0">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Activity size={14} color="#4f46e5" />
                    </div>
                    <div>
                      <p className="text-sm">{activity.activity}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Estado del sistema */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-md font-bold mb-4">Estado del Sistema</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Server size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">Uptime del Servidor</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">{systemMetrics.serverUptime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">Tiempo de Respuesta</span>
                  </div>
                  <span className="text-sm font-medium">{systemMetrics.averageResponseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">Sesiones Activas</span>
                  </div>
                  <span className="text-sm font-medium">{systemMetrics.activeSessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Database size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">Carga del Sistema</span>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${systemMetrics.systemLoad}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Alertas y tareas pendientes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-md font-bold mb-4">Tareas Pendientes</h2>
              <div className="space-y-3">
                {pendingTasks.map(task => (
                  <div key={task.id} className="flex items-start space-x-3 pb-2 border-b border-gray-100 last:border-0">
                    <div className={`p-1 rounded-full mt-0.5 ${
                      task.priority === 'alta' ? 'bg-red-100' : 
                      task.priority === 'media' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <AlertCircle size={14} color={
                        task.priority === 'alta' ? '#ef4444' : 
                        task.priority === 'media' ? '#f59e0b' : '#4f46e5'
                      } />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">Prioridad: {task.priority}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="text-blue-600 text-sm hover:underline mt-3 flex items-center justify-center w-full">
                Ver todas las tareas
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer del dashboard con información adicional */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span className="mr-4">Cursos Totales: {courses.length}</span>
              <span className="mr-4">Estudiantes Activos: {activeStudents}</span>
              <span>Última actualización de datos: 19 de Mayo, 2025</span>
            </div>
            <div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Exportar Datos</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Renderizar sección de Cursos
  const renderCourses = () => {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-8 text-indigo-800 border-b pb-2 border-indigo-200">
          Gestión de Cursos
        </h1>
        
        {/* Panel de cursos disponibles */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-indigo-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-indigo-700">
              Cursos Disponibles
            </h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all">
              <span>Nuevo Curso</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Estudiantes</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">% Completado</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Fecha Creación</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {courses.map((course, index) => (
                  <tr key={course.id} className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                          {course.title.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{course.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <span className="text-gray-900 font-medium">{course.students}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div 
                          className={`h-2.5 rounded-full ${
                            course.completionRate >= 75 ? 'bg-green-500' : 
                            course.completionRate >= 50 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`} 
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-medium text-gray-700">{course.completionRate}% Completado</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {course.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-all flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          Editar
                        </button>
                        <button 
                          onClick={() => setActiveSection('upload')}
                          className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full transition-all flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                          Asignar
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full transition-all flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Panel de asignar curso */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100">
          <h2 className="text-xl font-bold mb-6 text-indigo-700 pb-2 border-b border-indigo-100">
            Asignar Curso a Estudiantes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-500"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                Seleccionar Curso
              </label>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="">Seleccionar un curso</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Estudiantes (IDs separados por coma)
              </label>
              <input 
                type="text" 
                placeholder="Ejemplo: 1001, 1002, 1003"
                value={studentIds}
                onChange={(e) => setStudentIds(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleAssignCourse} 
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCourse || !studentIds}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              Asignar Curso
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar sección de Estudiantes
  const renderStudents = () => {
    return (
      <>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Estudiantes</h1>
  
        <div className="bg-white p-6 rounded-xl shadow-lg overflow-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Estudiantes Registrados</h2>
  
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50 text-blue-700">
                <tr>
                  {['ID', 'Nombre', 'Email', 'Cursos', 'Estado', 'Acciones'].map((head, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{student.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {student.enrolledCourses || 'Ninguno'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {student.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCourse('');
                          setStudentIds(student.id.toString());
                          setActiveSection('courses');
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium transition"
                      >
                        Asignar Curso
                      </button>
                      <button
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-sm text-gray-500 py-8">
                      No hay estudiantes registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  

// Renderizar sección de Cargar Cursos
const renderUploadCourse = () => {

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUploadCourse = () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);

        if (!Array.isArray(jsonData)) {
          alert("El archivo debe contener un arreglo de cursos.");
          return;
        }

        const cursosValidados = jsonData.map((curso, i) => ({
          id: curso.id || Date.now() + i,
          title: curso.title || "Curso sin título",
          students: curso.students || 0,
          completionRate: curso.completionRate || 0,
          createdAt: curso.createdAt || new Date().toISOString().split("T")[0],
          lastActive: curso.lastActive || new Date().toISOString().split("T")[0],
          growth: curso.growth || 0
        }));

        setCourses((prev) => [...prev, ...cursosValidados]);
        alert("Cursos cargados exitosamente");
        setFile(null);
        document.getElementById("file-upload").value = "";

      } catch (err) {
        console.error("Error al leer JSON:", err);
        alert("El archivo no es un JSON válido.");
      }
    };

    reader.readAsText(file);
  };
  return (
    <div className="max-w-4xl mx-auto">
      {/* Cabecera */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cargar Nuevo Curso</h1>
        <p className="mt-2 text-gray-600">Importa un curso en formato JSON para agregar a la plataforma</p>
      </div>
      
      {/* Tarjeta principal */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Importar Curso</h2>
        </div>
        
        {/* Indicaciones */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                El archivo debe estar en formato JSON válido y contener la estructura adecuada para cursos.
                <a href="#" className="font-medium underline ml-1">Ver ejemplo</a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Formulario de carga */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Seleccionar archivo JSON del curso</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Seleccionar archivo</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      accept=".json" 
                      onChange={handleFileChange} 
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">o arrastrar y soltar</p>
                </div>
                <p className="text-xs text-gray-500">
                  JSON hasta 10MB
                </p>
              </div>
            </div>
          </div>
          
          {/* Información del archivo seleccionado */}
          <div className={`p-4 bg-gray-50 rounded-lg ${!file ? 'hidden' : ''}`}>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700 truncate">
                {file ? file.name : 'Ningún archivo seleccionado'}
              </span>
              
              {file && (
                <button 
                  type="button" 
                  className="ml-auto text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    document.getElementById('file-upload').value = '';
                    // Aquí se necesitaría la función para limpiar el estado del archivo
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button 
              type="button" 
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button 
              onClick={handleUploadCourse} 
              disabled={!file}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!file ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Cargar Curso
            </button>
          </div>
        </div>
      </div>
      
      {/* Sección de ayuda */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-3">¿Qué debe contener el archivo JSON?</h3>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Información básica:</span> Título, descripción, categoría y duración del curso.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Módulos y lecciones:</span> Estructura de contenidos organizada jerárquicamente.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Recursos y evaluaciones:</span> Enlaces a materiales y configuración de pruebas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <Coffee size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold">Admin LMS</h2>
          </div>
          <p className="text-gray-400 text-sm mt-2">Plataforma de Gestión Educativa</p>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveSection('dashboard')}
                className={`flex items-center p-2 rounded-md w-full text-left ${activeSection === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
              >
                <Home className="mr-2" size={18} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('courses')}
                className={`flex items-center p-2 rounded-md w-full text-left ${activeSection === 'courses' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
              >
                <BookOpen className="mr-2" size={18} />
                <span>Cursos</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('students')}
                className={`flex items-center p-2 rounded-md w-full text-left ${activeSection === 'students' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
              >
                <Users className="mr-2" size={18} />
                <span>Estudiantes</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('upload')}
                className={`flex items-center p-2 rounded-md w-full text-left ${activeSection === 'upload' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
              >
                <Upload className="mr-2" size={18} />
                <span>Cargar Curso</span>
              </button>
            </li>
            <li className="mt-8 border-t border-gray-700 pt-4">
              <button className="flex items-center p-2 rounded-md w-full text-left hover:bg-gray-700">
                <Settings className="mr-2" size={18} />
                <span>Configuración</span>
              </button>
            </li>
            <li className="mt-auto">
              <button className="flex items-center p-2 rounded-md w-full text-left hover:bg-gray-700 text-red-300 hover:text-red-200">
                <LogOut className="mr-2" size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Sistema de feedback/notificaciones */}
        {feedback.show && (
          <div className={`mb-4 p-4 rounded-md ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback.message}
          </div>
        )}
        
        {/* Renderizar contenido según la sección activa */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminHome;