import { Request, Response } from "express";

export const healthCheck = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Server currently running" });
  } catch (error) {
    // Handle errors appropriately (e.g., pass to error middleware)
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
