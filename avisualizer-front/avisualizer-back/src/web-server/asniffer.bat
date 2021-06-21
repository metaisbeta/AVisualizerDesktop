@echo off
mkdir %4\projects\%2
cd %4\asniffer
jar -xvf .\%1
cd ..\
java -jar %4\asniffer\asniffer.jar -p %4\asniffer\%2 -r %4\projects\ -t jsonAV
:loop
    if not exist %4"\projects\asniffer_results" (
        ping -n 2 localhost > nul
        goto loop
    )
copy %4\projects\asniffer_results\*.json %4\projects\%2
rmdir %4\projects\asniffer_results\
rmdir %4\asniffer\%2 
del %4\asniffer\%3   
