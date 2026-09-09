# Kwick server

A standalone Node.js API server for the Kwick frontend.

## Run

From the repository root:

```bash
npm run server
```

For automatic restarts during development:

```bash
npm run server:dev
```

The health endpoint is available at `http://localhost:5000/health`.
Set `PORT` to use a different port.

## Order lifecycle

Orders keep separate vendor and rider state. Vendors progress through `placed` -> `confirmed` -> `preparing` -> `ready`; riders claim only unassigned `placed` orders, then progress through `rider_assigned` -> `picked_up` -> `out_for_delivery` -> `delivered`. Rider claims and status changes use conditional atomic updates.

Vendor locations are stored on the authenticated vendor user under `vendorOnboarding` and can be managed with `GET/PUT /api/vendor/profile/location`. The payload requires `businessName`, `city`, `address`, `latitude`, and `longitude`; coordinates are validated server-side.

Checkout resolves every distinct product `vendorId` from the trusted `users` collection and snapshots the locations into `pickupLocations`. A single-vendor order also populates the backward-compatible `pickupLocation` field. Orders from vendors without configured locations are rejected with a clear configuration error; customer delivery coordinates are never used as pickup coordinates.
