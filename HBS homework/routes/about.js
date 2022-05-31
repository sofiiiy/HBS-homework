const express = require("express");
const router = express.Router();
const Joi = require('joi')

const languages = [
  { lingue: "English", id: 1 },
  { lingue: "Russian", id: 2 },
  { lingue: "Uzbek", id: 3 },
];
router.get("/", (req, res) => {
  const allLanguages = languages;
  res.render("about");
});
//GET with id
router.get("/languages/:id", (req, res) => {
  const allLanguages = languages;
  const lingueId = +req.params.id;
  const lingue = allLanguages.find((lingue) => lingue.id === lingueId);
  res.status(200).send(lingue);
});
//POST
router.post("/languages/add", (req, res) => {
  const allLanguages = languages;

  let newLingue = {
    lingue: req.body.lingue,
    id: allLanguages.length + 1,
  };

  const lingueSchema = Joi.object({
    lingue: Joi.string().min(3).max(15).required(),
  });
  const result = lingueSchema.validate(req.body);
  if (!!result.error) {
    res.status(406).send(result.error.message);
    return;
  }

  allLanguages.push(newLingue);
  res.status(201).send(newLingue);
});
//PUT
router.put("/languages/edite/:id", (req, res) => {
  const allLanguages = languages;
  const idx = allLanguages.findIndex((lingue) => lingue.id === +req.params.id);
  let editedLingue = {
    lingue: req.body.lingue,
  };
  const lingueSchema = Joi.object({
    lingue: Joi.string().min(3).max(15).required(),
  });
  const result = lingueSchema.validate(req.body);
  if (!!result.error) {
    res.status(406).send(result.error.message);
    return;
  }

  allLanguages[idx] = editedLingue;
  res.status(200).send(allLanguages);
});
//DELETE
router.delete("/languages/delete/:id", (req, res) => {
  const idx = languages.findIndex((lingue) => lingue.id === +req.params.id);
  const lingue = languages.splice(idx, 1);
  res.status(200).send(languages);
});




module.exports = router
