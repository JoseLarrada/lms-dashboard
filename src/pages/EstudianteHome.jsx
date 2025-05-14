// pages/EstudianteHome.jsx
import cursos from '../data/cursos.json';

export default function EstudianteHome() {
  return (
    <div>
      <h2>Mis Cursos</h2>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            <h3>{curso.titulo}</h3>
            <p>{curso.descripcion}</p>
            <a href={curso.video} target="_blank" rel="noopener noreferrer">
              Ver video principal
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
