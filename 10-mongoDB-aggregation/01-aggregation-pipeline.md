# MongoDB Aggregation Pipeline - Quick Reference

## Overview
Aggregation pipelines process data through a sequence of stages. Each stage transforms the documents and passes the results to the next stage.

## Basic Syntax
```javascript
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
])
```

---

## Common Stages You Learned

### 1. `$match` - Filter Documents
Filters documents based on specified conditions (similar to `find()`).

**Example: Count Active Users**
```javascript
[
  {
    $match: {
      isActive: true
    }
  },
  {
    $count: "activeUsers"
  }
]
```
- **Use Case**: Get only active users before counting
- **Result**: `{ activeUsers: <number> }`

---

### 2. `$group` - Group and Aggregate Data
Groups documents by a specified field and performs calculations.

#### Example A: Calculate Average Age
```javascript
[
  {
    $group: {
      _id: null,           // null means group all documents together
      avgAge: {
        $avg: "$age"       // Calculate average of age field
      }
    }
  }
]
```
- **`_id: null`**: Groups all documents into one group
- **Result**: `{ _id: null, avgAge: 29.5 }`

#### Example B: Count by Category
```javascript
[
  {
    $group: {
      _id: "$favoriteFruit",  // Group by fruit type
      count: {
        $sum: 1               // Count documents in each group
      }
    }
  }
]
```
- **`_id: "$favoriteFruit"`**: Creates separate groups for each fruit
- **`$sum: 1`**: Increments count for each document
- **Result**:
  ```javascript
  { _id: "banana", count: 50 }
  { _id: "apple", count: 45 }
  { _id: "strawberry", count: 40 }
  ```

---

### 3. `$sort` - Sort Results
Sorts documents by specified field(s).

```javascript
{
  $sort: {
    count: 1    // 1 = ascending, -1 = descending
  }
}
```
- **`1`**: Ascending order (smallest to largest)
- **`-1`**: Descending order (largest to smallest)

---

### 4. `$limit` - Limit Number of Results
Returns only the first N documents.

```javascript
{
  $limit: 2   // Return only first 2 documents
}
```

---

## Complete Example: Top 2 Least Popular Fruits

```javascript
[
  {
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      count: 1        // Sort ascending (least to most)
    }
  },
  {
    $limit: 2         // Get top 2 results
  }
]
```

**Pipeline Flow:**
1. **Group**: Count users by favorite fruit
2. **Sort**: Order by count (ascending = least popular first)
3. **Limit**: Take only first 2 results

**Result:**
```javascript
{ _id: "strawberry", count: 35 }
{ _id: "apple", count: 42 }
```

---

## Common Aggregation Operators

### Arithmetic Operators
- `$avg` - Calculate average
- `$sum` - Calculate sum or count
- `$min` - Find minimum value
- `$max` - Find maximum value
- `$first` - First value in group
- `$last` - Last value in group

### Field References
- Use `$` prefix to reference field values: `"$fieldName"`
- Example: `"$age"`, `"$favoriteFruit"`, `"$company.title"`

---

## Key Concepts

### Grouping with `_id`
- **`_id: null`** → Single group (all documents)
- **`_id: "$field"`** → Group by field value
- **`_id: { field1: "$field1", field2: "$field2" }`** → Group by multiple fields

### Pipeline Order Matters!
The order of stages affects the result:
```javascript
// ❌ Wrong: Limit before group
[{ $limit: 10 }, { $group: {...} }]  // Groups only 10 documents

// ✅ Correct: Group before limit
[{ $group: {...} }, { $limit: 10 }]  // Groups all, then limits groups
```

---

## Practice Tips

1. **Start with `$match`** to filter early and improve performance
2. **Test stages incrementally** - Add one stage at a time
3. **Use `$limit` during development** to work with smaller datasets
4. **Remember field references** need `$` prefix in expressions
5. **Chain stages logically** - think about data flow

---

## Your Data Structure Reference
```javascript
{
  index: 0,
  name: "String",
  isActive: Boolean,
  registered: Date,
  age: Number,
  gender: "String",
  eyeColor: "String",
  favoriteFruit: "String",  // banana, apple, strawberry
  company: {
    title: "String",
    email: "String",
    phone: "String",
    location: {
      country: "String",
      address: "String"
    }
  },
  tags: ["String"]
}
```

---

## Next Steps to Learn

- `$project` - Select/transform fields
- `$unwind` - Deconstruct arrays
- `$lookup` - Join collections
- `$addFields` - Add computed fields
- `$bucket` - Group by ranges

---

**Created:** October 28, 2025
**Data Source:** `users.json`
