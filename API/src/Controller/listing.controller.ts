import express, { Response, Request, NextFunction } from "express";
import Listing from "../Models/listing.model";

export const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listng = await Listing.create(req.body);
    return res.status(201).json(listng);
  } catch (error) {
    next(error);
  }
};
