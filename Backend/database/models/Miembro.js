module.exports = function (sequelize, dataTypes){

    let alias = 'Miembro' // mismo  nombre q el modelo, nombre con el cual sequelize identificara al modelo

    const cols = {
        Iniciales:{type:dataTypes.STRING},
        Name:{type:dataTypes.STRING},
        Fecha_de_Ingreso:{type:dataTypes.STRING},
        Horario_de_Trabajo:{type:dataTypes.STRING},
        Horario_Libros:{type:dataTypes.STRING},
        Antiguedad:{type:dataTypes.STRING},
        Empleador:{type:dataTypes.STRING},
        Email:{type:dataTypes.STRING},
        Whatsapp:{type:dataTypes.STRING},
        Telefono:{type:dataTypes.STRING},
        Interno:{type:dataTypes.STRING},
        Descripcion_de_Posicion:{type:dataTypes.STRING},
        Oficinas_Judiciales:{type:dataTypes.STRING},
        Backup:{type:dataTypes.STRING},
        Matricula_Provincia:{type:dataTypes.STRING},
        Matricula_CABA:{type:dataTypes.STRING},
        Teléfono_Personal:{type:dataTypes.STRING},
        Dirección:{type:dataTypes.STRING},
        Contacto_de_emergencia:{type:dataTypes.STRING},
        CUIL:{type:dataTypes.STRING},
        CBU:{type:dataTypes.STRING},
        DNI_Frente:{type:dataTypes.STRING},
        DNI_Dorso:{type:dataTypes.STRING},
        Fecha_de_Nacimiento:{type:dataTypes.STRING},
        Edad:{type:dataTypes.STRING},
        Fecha_de_Egreso:{type:dataTypes.STRING},
        Activo:{type:dataTypes.STRING},
        Condicion_Impositiva:{type:dataTypes.STRING},
        Sueldos:{type:dataTypes.STRING},
        miemID:{type:dataTypes.STRING, primaryKey:true},
        contrasena:{type:dataTypes.STRING},
        usuario:{type:dataTypes.STRING}
}
    
    let config ={
        tableName: 'MIEM',
        timestamps: false,
        underscored: false
    }
    
    const Miembros = sequelize.define(alias, cols, config)
   

    return Miembros
}