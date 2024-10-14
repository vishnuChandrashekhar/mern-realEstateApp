import express, { Response, Request, NextFunction } from "express";
import Listing from "../Models/listing.model";
import { throwError } from "../utils/error.handler";
import mongoose, { ObjectId } from "mongoose";

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

export const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(throwError(404, "Listing not found"));
  }
  if (req.user?.id !== listing.userRef) {
    return next(throwError(401, "You can only delete your own listing"));
  }

  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const listingId = new mongoose.Types.ObjectId(req.params.id);

  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   return next(throwError(400, "Inavlid Listing Id"));
  // }

  const listing = await Listing.findById(listingId);
  if (!listing) {
    return next(throwError(404, "Listing not found"));
  }
  if (req.user?.id !== listing.userRef) {
    return next(throwError(401, `you can only update your own listing`));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
