import express from "express";
import {
  createListing,
  deleteListing,
  updateUserListing,
} from "../Controller/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateUserListing);
export default router;
