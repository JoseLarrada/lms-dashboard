import { useState } from 'react';
import { Eye, EyeOff, LogIn, User, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../utils/auth';

export default function Login() {
  const [usuario, setUsuarioInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUsuario } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!usuario.trim()) newErrors.usuario = 'El usuario es requerido';
    if (!password) newErrors.password = 'La contraseña es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    setTimeout(() => {
      const user = login(usuario, password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUsuario(user);
        navigate(user.rol === 'admin' ? '/admin' : '/estudiante');
      } else {
        setErrors({ general: 'Credenciales incorrectas' });
      }
      setIsLoading(false);
    }, 800);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido</h1>
          <p className="mt-2 text-sm text-gray-600">Inicia sesión en tu cuenta</p>
        </div>

        {errors.general && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{errors.general}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  autoComplete="username"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.usuario ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Ingrese su usuario"
                  value={usuario}
                  onChange={(e) => {
                    setUsuarioInput(e.target.value);
                    if (errors.usuario) setErrors({ ...errors, usuario: '' });
                  }}
                />
              </div>
              {errors.usuario && <p className="mt-2 text-sm text-red-600">{errors.usuario}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">Recordarme</label>
            </div>
            <div className="text-sm">
              <a className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:bg-blue-300"
            >
              {isLoading ? (
                <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <LogIn className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
