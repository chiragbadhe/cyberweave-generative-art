import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAddress } from "viem";

type BaseParams = {
  address: `0x${string}`;
  data?: string;
};

/**
 * API endpoint handler that accepts an Ethereum address and optional data parameter
 *
 * @param req - Vercel HTTP request object
 * @param res - Vercel HTTP response object
 * @returns JSON response with the provided address and data
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { address, data } = req.query as BaseParams;

    // Validate Ethereum address
    if (!address || !isAddress(address)) {
      return res.status(400).json({
        error: "Valid Ethereum address is required",
      });
    }

    // Return the provided parameters
    return res.status(200).json({
      address,
      data,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
