const Contact = require("../model/contact");

const listContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const addContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newContact = await Contact.create({ name, email, phone });
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json({ message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateStatusContact = async (req, res) => {
    try {
        const { favorite } = req.body;
        if (favorite === undefined) {
            return res.status(400).json({ message: "Missing field favorite" });
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.contactId,
            { favorite },
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
};