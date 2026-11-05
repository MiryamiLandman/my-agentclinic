CREATE TABLE animal_ailments (
  animal_id INTEGER NOT NULL REFERENCES animals(id),
  ailment_id INTEGER NOT NULL REFERENCES ailments(id),
  PRIMARY KEY (animal_id, ailment_id)
);
