const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const crear = (descripcion) => {
    loadDB();
    let porHacer = {
        descripcion,
        completado: false,
    };
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {
    loadDB();
    console.log('===================== Por Hacer ========================'.green);
    for (const tarea of listadoPorHacer) {
        console.log(`Descripcion: ${tarea.descripcion}`);
        console.log(`Estado: ${tarea.completado}`);
    }
    console.log('========================================================='.green);
}

const actualizar = (descripcion, completado = true) => {
    loadDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = true;
        guardarDB();
        return true;
    } else return false;
};

const borrar = (descripcion) => {
    loadDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        console.log('Tarea borrada');
    } else console.log('No se pudo borrar la tarea');

}

const loadDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}