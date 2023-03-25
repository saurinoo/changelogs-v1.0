const { Schema, model } = require("mongoose");
const changelogs = new Schema({
    date: Date,
    config: {
        title: { type: String, default: null },
        description: { type: String, default: null },
        footer: { type: String, default: null },
        color: { type: String, default: null },
        type: { type: String, default: null }
    }
}, { versionKey: false });

module.exports = model("changelogs", changelogs, "changelogs");
