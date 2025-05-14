import cursos from '../data/cursos.json';
import usuarios from '../data/usuarios.json';
import progreso from '../data/progreso.json';

export default function AdminHome() {
  return (
    <div>
      <h2>Panel del Administrador</h2>

      <section>
        <h3>Cursos</h3>
        <ul>
          {cursos.map((curso) => (
            <li key={curso.id}>{curso.titulo}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Progreso General</h3>
        {progreso.map((p) => {
          const user = usuarios.find((u) => u.id === p.usuarioId);
          const curso = cursos.find((c) => c.id === p.cursoId);
          return (
            <div key={p.usuarioId + p.cursoId}>
              {user.nombre} - {curso.titulo}: {(p.progreso * 100).toFixed(0)}%
            </div>
          );
        })}
      </section>
    </div>
  );
}