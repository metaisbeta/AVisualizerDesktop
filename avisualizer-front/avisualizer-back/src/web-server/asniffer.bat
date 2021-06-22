@echo off
mkdir %4\projects\%2
cd %4\asniffer
jar -xvf %3
java -jar asniffer.jar -p .\%2 -r %4\projects\ -t jsonAV
:loop
    if not exist %4"\projects\asniffer_results" (
        ping -n 2 localhost > nul
        goto loop
    )
del %4\asniffer\%3
copy %4\projects\asniffer_results\*.json %4\projects\%2
cd ..\
rmdir %4\asniffer\%2 /S /Q
rmdir %4\projects\asniffer_results\ /S /Q
   