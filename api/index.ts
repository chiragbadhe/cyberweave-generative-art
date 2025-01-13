import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAddress } from "viem";
import { createCanvas } from "canvas";

type BaseParams = {
  address: `0x${string}`;
  data?: string;
};

/**
 * API endpoint handler that generates an art image based on address and data
 *
 * @param req - Vercel HTTP request object
 * @param res - Vercel HTTP response object
 * @returns PNG image buffer
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

    // Create canvas
    const width = 600;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Use address and data to seed the art parameters
    const addressNum = parseInt(address.slice(2), 16);
    const dataNum = data ? parseInt(data, 16) : 0;

    // Art parameters based on inputs
    const layers = 5;
    const rotStripe = 0;
    const minYchange = 0;
    const maxYchange = 50;
    const alph = 255;
    const sw = 3;

    // Define specific color palette
    const colors = [
      "#b6f7b0",  // Light mint green
      "#07DC10",  // Bright green
      "#0C9B00",  // Dark green
      "#EAEAEA"   // Light gray
    ];

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = `rgba(0,0,0,${alph})`;
    ctx.lineWidth = sw;

    const end = height / 2 + 500;

    for (let i = 0; i < layers; i++) {
      let y1;
      if (i === 0) {
        y1 = -height / 2 - 300;
      } else {
        y1 = -height / 2 + (height / layers) * i;
      }

      let y2 = y1,
        y3 = y1,
        y4 = y1,
        y5 = y1,
        y6 = y1;
      const rotLayer = (addressNum + i * 50) % 360;
      let rotThisStripe = 0;

      while (
        y1 < end &&
        y2 < end &&
        y3 < end &&
        y4 < end &&
        y5 < end &&
        y6 < end &&
        -maxYchange < minYchange
      ) {
        y1 += Math.random() * (maxYchange - minYchange) + minYchange;
        y2 += Math.random() * (maxYchange - minYchange) + minYchange;
        y3 += Math.random() * (maxYchange - minYchange) + minYchange;
        y4 += Math.random() * (maxYchange - minYchange) + minYchange;
        y5 += Math.random() * (maxYchange - minYchange) + minYchange;
        y6 += Math.random() * (maxYchange - minYchange) + minYchange;

        // Use colors from palette
        ctx.fillStyle = colors[i % colors.length];
        ctx.strokeStyle = "#094A04"; // Use dark green for all strokes

        // Save context state
        ctx.save();
        ctx.translate(width / 2, height / 2);
        rotThisStripe += rotStripe;
        ctx.rotate(((rotThisStripe + rotLayer) * Math.PI) / 180);

        const xStart = -width / 2;

        // Draw curve
        ctx.beginPath();
        ctx.moveTo(xStart - 300, height / 2 + 500);
        ctx.lineTo(xStart - 300, y1);
        ctx.bezierCurveTo(
          xStart + (width / 5) * 1,
          y2,
          xStart + (width / 5) * 2,
          y3,
          xStart + (width / 5) * 3,
          y4
        );
        ctx.bezierCurveTo(
          xStart + (width / 5) * 4,
          y5,
          width / 2 + 300,
          y6,
          width / 2 + 300,
          height / 2 + 500
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Restore context state
        ctx.restore();
      }
    }

    // Convert canvas to buffer and send response
    const buffer = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
