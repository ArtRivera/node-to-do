const { argv } = require('./config/yargs');
const porHacer = require('./por-hacer/por-hacer');

// console.log(argv);
let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Creaar');
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        porHacer.getListado();
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        porHacer.borrar(argv.descripcion);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}