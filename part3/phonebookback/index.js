const express = require("express");
const morgan = require("morgan");
const logger = morgan("combined");
const app = express();
const cors = require("cors");
app.use(express.json());
morgan.token("person", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);
app.use(cors());
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const generateId = () => {
  const idUnico = Math.floor(Math.random() * 9999) + 1;
  return idUnico;
};

app.get("/", (request, response) => {
  response.send("<h1>hello world!</h1>");
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
  console.log(generateId());
});

app.get("/info", (request, response) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  response.send(
    `Phone book has info for ${persons.length} people <h1> ${dateTime}</h1> `
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const Names = persons.map((p) => p.name.toLowerCase());
  const lowerName = body.name.toLowerCase();
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (Names.indexOf(lowerName) !== -1) {
    return response.status(400).json({
      error: "name already exist",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
  console.log(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
