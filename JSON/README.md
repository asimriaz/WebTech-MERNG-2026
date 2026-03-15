
## Load JSON file in to mongodb
```
mongoimport --jsonArray JSON\courses.json -d academic -c courses
```

## Load all JSON files from a folder
```
for %f in (JSON\recapsheet\*.json) do mongoimport --jsonArray %f -d recapsheet -c %~nf
```
## Load all JSON files from a folder (Linux)
```
for f in JSON/recapsheet/*.json; do mongoimport --jsonArray --file "$f" -d recapsheet -c "$(basename "${f%.json}")"; done
```
