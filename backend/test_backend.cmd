@echo off
echo --- Starting backend test sequence ---

REM 1️⃣ Login as testuser and save cookies
echo Logging in...
curl.exe -X POST "http://127.0.0.1:5000/api/login" -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}" -c cookies.txt
echo.
echo Login complete.
echo -------------------------------

REM 2️⃣ Verify logged-in user
echo Checking current user...
curl.exe "http://127.0.0.1:5000/api/me" -b cookies.txt
echo.
echo -------------------------------

REM 3️⃣ Add a review
echo Adding a review...
curl.exe -X POST "http://127.0.0.1:5000/api/reviews" -H "Content-Type: application/json" -d "{\"store\":\"Panda Express\",\"comment\":\"Amazing food!\",\"rating\":5}" -b cookies.txt
echo.
echo Review added.
echo -------------------------------

REM 4️⃣ Fetch reviews for Panda Express
echo Fetching reviews for Panda Express...
curl.exe "http://127.0.0.1:5000/api/reviews?store=Panda Express" -b cookies.txt
echo.
echo -------------------------------

REM 5️⃣ Logout
echo Logging out...
curl.exe -X POST "http://127.0.0.1:5000/api/logout" -b cookies.txt
echo.
echo Logout complete.
echo -------------------------------

REM 6️⃣ Verify logout
echo Checking current user after logout...
curl.exe "http://127.0.0.1:5000/api/me" -b cookies.txt
echo.
echo --- Backend test sequence complete ---
pause
