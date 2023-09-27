const contacts = require("../models/contacts");
const { ctrlWrapper, errorHttp } = require("../decorator");

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);

};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    res.status(200).json(result);
    if (!result) {
      throw HttpError(404, "Not found");
    }
};

const add = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};