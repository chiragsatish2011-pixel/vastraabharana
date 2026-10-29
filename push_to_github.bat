@echo off
setlocal
cd /d "%~dp0"
echo ===================================================
echo   Pushing Vastra Abharana Redesign to GitHub
echo   Target: https://github.com/chiragsatish2011-pixel/vastraabharana.git
echo ===================================================
echo.
set "PATH=%~dp0bin\git\cmd;%~dp0bin\git\mingw64\bin;%PATH%"
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Codebase successfully pushed to GitHub!
) else (
    echo [FAILED] Push failed. If prompted, please sign in with your GitHub account or Personal Access Token.
)
pause
