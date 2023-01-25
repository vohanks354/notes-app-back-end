// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid();
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'Success',
      message: 'Catatan berhasil di tambahkan',
      data: { noteId: id },
    }).code(200);
  }

  return h.response({
    status: 'Fail',
    message: 'Catatan gagal di tambahkan',
  }).code(500);
};

const getAllNotesHandler = () => ({
  status: 'Success',
  data: { notes },
});

// eslint-disable-next-line consistent-return
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return h.response({ status: 'Success', data: { note } }).code(200);
  }

  return h.response({
    status: 'Fail',
    message: 'Catatan gagal di edit',
  }).code(500);
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  return h.response({
    status: 'Success',
    message: 'Catatan berhasil diperbarui',
  }).code(200);
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
  }

  return h.response({
    status: 'Success',
    message: 'Catatan berhasil didelete',
  }).code(200);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
