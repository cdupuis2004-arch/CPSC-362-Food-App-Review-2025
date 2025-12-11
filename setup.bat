@echo off
Setting up Tuffy's Belly...

echo Creating Python virtual environment...
python -m venv .venv

echo Activating virtual environment...
call .venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

echo Deactivating virtual environment...
deactivate

echo.
echo Moving to frontend directory...
cd frontend

echo Installing frontend dependencies...
npm install

echo.
echo ===========================================
echo               Setup Done
echo ===========================================
pause
