 # Beginner tutorial for the MongoDB Shell (`mongosh`)
 
 you can quickly start using MongoDB from the command line.

---

### 1. Start MongoDB Shell

If MongoDB is installed locally:

```bash
mongosh
```

If connecting to a remote server:

```bash
mongosh "mongodb://localhost:27017"
```

If authentication is enabled:

```bash
mongosh -u username -p password --authenticationDatabase admin
```

---

### 2. Show Databases

```javascript
show dbs
```

This lists all databases.

---

### 3. Create / Switch Database

MongoDB creates a database **only when you insert data**.

```javascript
use mydb
```

Example:

```javascript
use school
```

Check current DB:

```javascript
db
```

---

### 4. Create a Collection

MongoDB creates collections automatically when inserting data, but you can also create manually:

```javascript
db.createCollection("students")
```

Show collections:

```javascript
show collections
```

---

### 5. Insert Data

#### Insert One Document

```javascript
db.students.insertOne({
  name: "Ali",
  age: 20,
  course: "Computer Science"
})
```

#### Insert Multiple Documents

```javascript
db.students.insertMany([
  { name: "Ahmed", age: 22 },
  { name: "Sara", age: 21 },
  { name: "Bilal", age: 23 }
])
```

---

### 6. Find Documents

#### Show all documents

```javascript
db.students.find()
```

Pretty format:

```javascript
db.students.find().pretty()
```

---

#### Find with condition

```javascript
db.students.find({ age: 21 })
```

---

## 7. Update Documents

#### Update One

```javascript
db.students.updateOne(
  { name: "Ali" },
  { $set: { age: 25 } }
)
```

---

#### Update Many

```javascript
db.students.updateMany(
  { course: "Computer Science" },
  { $set: { active: true } }
)
```

---

## 8. Delete Documents

#### Delete One

```javascript
db.students.deleteOne({ name: "Ahmed" })
```

#### Delete Many

```javascript
db.students.deleteMany({ age: { $lt: 22 } })
```

---

## 9. Count Documents

```javascript
db.students.countDocuments()
```

---

## 10. Drop Collection

```javascript
db.students.drop()
```

---

## 11. Drop Database

```javascript
db.dropDatabase()
```

---

## 12. Useful Query Operators

#### Greater than

```javascript
db.students.find({ age: { $gt: 20 } })
```

#### Less than

```javascript
db.students.find({ age: { $lt: 22 } })
```

#### AND condition

```javascript
db.students.find({
  age: { $gt: 20 },
  course: "Computer Science"
})
```

---

## 13. Sort Results

Ascending:

```javascript
db.students.find().sort({ age: 1 })
```

Descending:

```javascript
db.students.find().sort({ age: -1 })
```

---

## 14. Limit Results

```javascript
db.students.find().limit(2)
```

---

## 15. Show Collection Stats

```javascript
db.students.stats()
```

---

## Quick Example (Full Workflow)

```javascript
use company

db.employees.insertMany([
  { name: "Ali", salary: 50000 },
  { name: "Sara", salary: 60000 }
])

db.employees.find()

db.employees.updateOne(
  { name: "Ali" },
  { $set: { salary: 55000 } }
)

db.employees.deleteOne({ name: "Sara" })
```
# MongoDB Shell (`mongosh`) - **`forEach()`**
you can iterate over documents returned by `find()` using **`forEach()`**, because the result is a **cursor**.

---

## Basic Syntax

```javascript
db.collection.find().forEach(function(doc) {
    print(doc)
})
```

`doc` represents each document in the result.

---

## 1. Simple Example

Collection: `students`

```javascript
db.students.find().forEach(function(doc) {
    print(doc.name)
})
```

Output example:

```
Ali
Ahmed
Sara
```

---

## 2. Print Full Document (Pretty)

```javascript
db.students.find().forEach(function(doc) {
    printjson(doc)
})
```

Example output:

```
{
  _id: ObjectId("..."),
  name: "Ali",
  age: 22
}
```

`printjson()` is better than `print()` for documents.

---

## 3. Modify Data While Iterating

Example: add new field

```javascript
db.students.find().forEach(function(doc) {
    db.students.updateOne(
        { _id: doc._id },
        { $set: { status: "active" } }
    )
})
```

This loops through all documents and updates them.

---

## 4. Conditional Logic

```javascript
db.students.find().forEach(function(doc) {
    if (doc.age > 21) {
        print(doc.name + " is older than 21")
    }
})
```

---

## 5. Example: Calculate Total

```javascript
let total = 0

db.orders.find().forEach(function(doc) {
    total += doc.price
})

print("Total price:", total)
```

---

## 6. Using Arrow Functions (Modern Style)

`mongosh` supports arrow functions:

```javascript
db.students.find().forEach(doc => {
    print(doc.name)
})
```

---

## 7. Filter + forEach

```javascript
db.students.find({ age: { $gt: 20 } }).forEach(doc => {
    print(doc.name)
})
```

---

## 8. Alternative: `toArray()` + JS loop

```javascript
let docs = db.students.find().toArray()

docs.forEach(doc => {
    print(doc.name)
})
```

---

## Important Tip

`forEach()` runs **inside the Mongo shell**, not inside the database engine.

For **large datasets**, prefer **aggregation** instead of `forEach()`.

---

**Common Pattern**

```javascript
db.collection.find(query).forEach(doc => {
   // process document
})
```




