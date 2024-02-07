import { signUpUser } from "../../../lib/auth";

export default async function signUpHandler(req, res) {
  if (req.method === "POST") {
    const newUser = await signUpUser(req.body);

    console.log("newUser: ", newUser);

    if (newUser) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
