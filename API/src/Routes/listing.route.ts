import express from "express";
import {
  createListing,
  deleteListing,
  getListingById,
  updateUserListing,
} from "../Controller/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateUserListing);
router.get("/getListingById/:id", getListingById);
export default router;
