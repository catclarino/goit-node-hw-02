const express = require("express");
const {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require("../../controller/contactsController");

const router = express.Router();

router.get("/", listContacts);

router.get("/:id", getById);

router.post("/", addContact);

router.delete("/:id", removeContact);

router.put("/:id", updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;