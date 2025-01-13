# Cyberweave Generative Art

This project generates unique generative art based on Ethereum addresses and optional data parameters. The art style features organic, flowing curves with a nature-inspired green color palette.

## Art Description

The generative art algorithm creates abstract layered compositions with the following characteristics:

- Multiple overlapping curved layers (5 layers by default)
- Nature-inspired color palette featuring mint greens, bright greens, dark greens and light gray accents
- Smooth Bezier curves that create flowing, organic shapes
- Rotation and positioning determined by the input Ethereum address
- Dark green outlines that add definition to each layer
- White background that allows the layers to stand out
- 600x600 pixel output as PNG

Each piece is uniquely generated based on:

- The input Ethereum address (used to seed rotation angles and positions)
- Optional additional data parameter for variation
- Random elements within controlled parameters for organic feel

The result is a unique abstract composition that maintains visual cohesion while being completely determined by the input parameters.

## API Usage 

The API is accessible at:

<base-url>/api/?address=<youraddress>&data=57435



The art generation endpoint accepts:

- `address`: Required Ethereum address that seeds the artwork
- `data`: Optional hex string for additional variation

Example request:
