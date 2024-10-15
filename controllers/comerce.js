const { comerceModel } = require('../models');

const getItems = async (req, res) => {
    const data = await comerceModel.find({});
    res.send(data);
};

const getItem = async (req, res) => {
    const { id } = req.params;
    const data = await comerceModel.findById(id);
    res.send(data);
};

const createItem = async (req, res) => {
    const { body } = req;
    const data = await comerceModel.create(body);
    res.send(data);
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const data = await comerceModel.findByIdAndUpdate(id, body, { new: true });
    res.send(data);
};

const deleteItem = async (req, res) => {
    const { id } = req.params;
    const data = await comerceModel.findByIdAndDelete(id);
    res.send(data);
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
