# Postman API testing

Import `postman_collection.json` into Postman. Import and select
`postman_environment.json` as the active environment. Change `baseUrl` to the
host and port configured by the local API, then fill in `adminEmail` and
`adminPassword` with the system admin credentials from your local environment.
The exported files contain no `.env` secrets.

## Suggested setup

1. Start the API, database, and local mail service. Run **Setup → Check API & Prepare Test Run** first; it checks the public countries endpoint, generates fresh unique test emails, and clears old saved IDs/tokens.
2. Run **OTP → Send Registration OTP** and retrieve the code from the configured
   inbox. The local Mailpit UI is commonly available at `mailpitUrl`.
3. Setup generates `testUserEmail` and uses the same address for OTP verification, registration, login, and password reset. Run **OTP → Verify Registration OTP**, **Auth → Register**, and **Auth → Login As User** after retrieving the received code.
4. Run **Auth → Login As Admin**, then **Users → Create User (Admin)** and **Users →
   Login As Host**. Setup also generates a fresh `newUserEmail`.
5. As admin, create a country, city, currency, and unit category. Their create
   requests save IDs to collection variables automatically.
6. As host, create a unit. Select a real JPEG, PNG, or PDF file in the `photos`
   form-data field (maximum 2 MB).
7. As guest, check availability and create a booking. The collection generates
   check-in and check-out dates about 10 and 14 days ahead each time a request
   runs.
8. As host, confirm and complete the booking. Then review it as guest. The
   cancellation request is an alternate flow and should be tried separately.

Create and login requests save tokens and IDs for later requests. Protected
requests use the matching guest, host, or admin token. Paginated responses are
wrapped as `data` and `meta`; other successful responses are wrapped in `data`.
