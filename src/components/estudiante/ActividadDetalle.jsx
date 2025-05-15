export default function ActividadDetalle({ actividad, subida, onSubir }) {
    const handleFileChange = (e) => {
      const archivo = e.target.files[0];
      if (archivo) {
        onSubir(actividad.nombre, archivo.name); // O archivo si manejas objeto completo
      }
    };
  
    return (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-2">{actividad.nombre}</h3>
        <p className="text-gray-700 mb-4">{actividad.descripcion}</p>
        
        {subida ? (
          <p className="text-green-600 font-medium">Ya enviaste: {subida.archivo}</p>
        ) : (
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
        )}
      </div>
    );
  }