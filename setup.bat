@echo off
echo Setting up Tuffy's Belly...

echo Creating Python virtual environment...
python -m venv .venv

echo Activating virtual environment...
call .venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

echo Deactivating virtual environment...
call deactivate

echo.
echo Installing frontend dependencies...
pushd frontend
call npm install || echo Frontend install failed!
popd

echo.
echo ===========================================
echo               Setup Done
echo ===========================================
pause
