import { Router } from "express";

export interface Item {
  id: number;
  name: string;
}

const router = Router();
let items: Item[] = [
  { id: 1, name: "Learn Redux Toolkit" },
  { id: 2, name: "Build a Fullstack App" },
];

router.get("/", (req, res) => {
  res.json(items);
});

router.post("/", (req, res) => {
  const newItem: Item = {
    id: Date.now(),
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

export { router };
