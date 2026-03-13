To convert your **Mongoose model to TypeScript**, you should define a **TypeScript interface or type** for the document and then use it with `Schema` and `model`.

Here is the **TypeScript version** of your code:

**Using Type**

```ts
import { Schema, model } from "mongoose";

type Course  {
  courseid: number;
  code: string;
  title: string;
  crhr: number;
  semester: number;
}

const courseSchema = new Schema<Course>({
  courseid: { type: Number, required: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  crhr: { type: Number, required: true },
  semester: { type: Number, required: true },
});

export default model<Course>("Course", courseSchema);
```
**Using Interface**
```ts
import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
  courseid: number;
  code: string;
  title: string;
  crhr: number;
  semester: number;
}

const courseSchema = new Schema<ICourse>({
  courseid: { type: Number, required: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  crhr: { type: Number, required: true },
  semester: { type: Number, required: true },
});

export default model<ICourse>("Course", courseSchema);
```

### Key changes

1. **Interface added**

```ts
export interface ICourse extends Document
```

2. **Typed schema**

```ts
new Schema<ICourse>()
```

3. **Typed model**

```ts
model<ICourse>()
```

### Optional (Better modern approach in 2026)

Instead of extending `Document`, you can use **InferSchemaType**:

```ts
import { Schema, model, InferSchemaType } from "mongoose";

const courseSchema = new Schema({
  courseid: Number,
  code: String,
  title: String,
  crhr: Number,
  semester: Number
});

type Course = InferSchemaType<typeof courseSchema>;

export default model<Course>("Course", courseSchema);
```



---

In **TypeScript**, both `interface` and `type` can describe object shapes, so your model could work with either. But **interfaces are commonly used with Mongoose models** for a few practical reasons.



## 1️⃣ Interfaces are extendable (main reason)

`interface` supports **declaration merging and extension**, which is very useful in large applications.

```ts
export interface Course {
  courseid: number
  code: string
  title: string
  crhr: number
  semester: number
}

interface CourseDocument extends Course {
  createdAt: Date
}
```

With `type`, extension is possible but less flexible in big projects.

```ts
type CourseDocument = Course & {
  createdAt: Date
}
```

Interfaces are preferred when you expect **future extensions**.



## 2️⃣ Better compatibility with classes and libraries

Many libraries (including older Mongoose typings) were designed around **interfaces**.

Example:

```ts
interface CourseDocument extends Course, Document {}
```

This pattern historically worked better with `interface`.



## 3️⃣ Declaration merging (unique feature)

Interfaces can be **merged automatically**.

```ts
interface Course {
  courseid: number
}

interface Course {
  title: string
}
```

Result:

```ts
interface Course {
  courseid: number
  title: string
}
```

`type` **cannot do this**.



## 4️⃣ Performance for large projects

TypeScript team notes that **interfaces scale slightly better** for very large object hierarchies.



## 5️⃣ In modern Mongoose (2025–2026)

Actually, **many developers now prefer `type` with `InferSchemaType`** because it removes duplication.

Example:

```ts
import { Schema, model, InferSchemaType } from "mongoose"

const courseSchema = new Schema({
  courseid: Number,
  code: String,
  title: String,
  crhr: Number,
  semester: Number
})

type Course = InferSchemaType<typeof courseSchema>

export default model<Course>("Course", courseSchema)
```

This is **the cleanest modern approach**.

---

✅ **Summary**

| Feature               | interface | type                     |
| --------------------- | --------- | ------------------------ |
| Extendable            | ✔         | ✔                        |
| Declaration merging   | ✔         | ❌                        |
| Library compatibility | ✔         | ⚠                        |
| Complex unions        | ❌         | ✔                        |
| Modern Mongoose usage | ⚠         | ✔ (with InferSchemaType) |

---

💡 **Recommendation (2026)**

* Use **`type + InferSchemaType`** for Mongoose models
* Use **`interface`** when defining **DTOs, services, or extendable contracts**

---

# Advanced Mongoose + TypeScript patterns 
for Methods, Statics, and Virtuals** with full type safety. These are commonly used in **large Node.js backends**.

---

## 1️⃣ Typed Instance Methods

Instance methods are functions available on **document objects**.

### Example

```ts
import { Schema, model, models, InferSchemaType } from "mongoose";

const courseSchema = new Schema({
  code: String,
  title: String
});

type Course = InferSchemaType<typeof courseSchema>;

interface CourseMethods {
  fullTitle(): string;
}

courseSchema.method("fullTitle", function () {
  return `${this.code} - ${this.title}`;
});

const CourseModel =
  models.Course || model<Course, {}, CourseMethods>("Course", courseSchema);

export default CourseModel;
```

### Usage

```ts
const course = await CourseModel.findById(id);

if (course) {
  console.log(course.fullTitle());
}
```

TypeScript now knows `.fullTitle()` exists.

---

## 2️⃣ Typed Static Methods

Statics are methods available on the **model itself**.

### Example

```ts
interface CourseStatics {
  findByCode(code: string): Promise<any>;
}

courseSchema.static("findByCode", function (code: string) {
  return this.findOne({ code });
});

const CourseModel = model<Course, CourseStatics>("Course", courseSchema);
```

### Usage

```ts
const course = await CourseModel.findByCode("CS101");
```

---

## 3️⃣ Typed Virtuals

Virtuals create **computed properties**.

### Example

```ts
courseSchema.virtual("courseLabel").get(function () {
  return `${this.code} (${this.title})`;
});
```

Usage:

```ts
const course = await CourseModel.findOne();
console.log(course?.courseLabel);
```

---

# ⭐ Production-Level Combined Pattern

This is the **professional pattern used in large TypeScript projects**.

```ts
import {  Schema,  model,  models,  InferSchemaType,  Model } from "mongoose";

const courseSchema = new Schema(
  {
    code: String,
    title: String,
    crhr: Number
  },
  { timestamps: true }
);

type Course = InferSchemaType<typeof courseSchema>;

interface CourseMethods {
  fullTitle(): string;
}

interface CourseModel extends Model<Course, {}, CourseMethods> {
  findByCode(code: string): Promise<any>;
}

courseSchema.method("fullTitle", function () {
  return `${this.code} - ${this.title}`;
});

courseSchema.static("findByCode", function (code: string) {
  return this.findOne({ code });
});

const CourseModel =
  models.Course ||
  model<Course, CourseModel>("Course", courseSchema);

export default CourseModel;
```

---

# 🚀 Why this pattern is powerful

You get **full TypeScript support** for:

| Feature          | Typed |
| ---------------- | ----- |
| Document fields  | ✔     |
| Instance methods | ✔     |
| Static methods   | ✔     |
| Virtuals         | ✔     |
| Schema inference | ✔     |

---

💡 **Pro tip (important):**
Most developers don't know you can make **Mongoose automatically infer TypesScript types from schema + methods without writing interfaces at all**.




