import usuarios from '../data/usuarios.json';

export function login(usuario, password) {
  return usuarios.find(
    (u) => u.usuario === usuario && u.password === password
  );
}