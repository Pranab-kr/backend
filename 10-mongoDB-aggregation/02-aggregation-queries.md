# MongoDB Aggregation Queries - Quick Notes

## Q1: Find the total number of males and females
```javascript
[
  {
    $group: {
      _id: "$gender",        // Group by gender field
      count: {
        $sum: 1              // Count each document
      }
    }
  }
]
```

---

## Q2: Which country has the highest number of registered users?
```javascript
[
  {
    $group: {
      _id: "$company.location.country",  // Group by nested country field
      count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      count: -1                           // Sort descending (highest first)
    }
  },
  {
    $limit: 1                             // Get only top result
  }
]
```

---

## Q3: List all unique eye colors present in the collection
```javascript
[
  {
    $group: {
      _id: "$eyeColor",      // Group by eye color (gives unique values)
      count: {
        $sum: 1              // Optional: count how many have each color
      }
    }
  }
]
```

---

## Q4: What is the average number of tags per user?

### Method 1: Using $unwind
```javascript
[
  {
    $unwind: "$tags"         // Split array into separate docs
  },
  {
    $group: {
      _id: "$_id",           // Group by user ID
      noOfTags: {
        $sum: 1              // Count tags per user
      }
    }
  },
  {
    $group: {
      _id: null,             // Group all users together
      avgTag: {
        $avg: "$noOfTags"    // Calculate average
      }
    }
  }
]
```

### Method 2: Using $size (More efficient)
```javascript
[
  {
    $addFields: {
      noOfTags: {
        $size: {
          $ifNull: ["$tags", []]  // Handle null, get array length
        }
      }
    }
  },
  {
    $group: {
      _id: null,
      avgTags: {
        $avg: "$noOfTags"         // Calculate average directly
      }
    }
  }
]
```

---

## Q5: How many users have 'enim' as one of their tags?
```javascript
[
  {
    $match: {
      tags: "enim"           // Match array containing "enim"
    }
  },
  {
    $count: 'userWithEnimTag'  // Count matched documents
  }
]
```

---

## Q6: What are the names and age of users who are inactive and have 'velit' as a tag?
```javascript
[
  {
    $match: {
      tags: "velit",         // Has 'velit' tag
      isActive: false        // AND is inactive
    }
  },
  {
    $project: {
      name: 1,               // Include name
      age: 1                 // Include age (_id auto-included)
    }
  }
]
```

---

## Q7: How many users have a phone number starting with '+1 (940)'?
```javascript
[
  {
    $match: {
      "company.phone": /^\+1 \(940\)/  // Regex: starts with pattern
    }
  },
  {
    $count: 'userWithSpecialPhone'
  }
]
```

---

## Key Concepts Used

- **$group**: Group documents by a field
- **$sum**: Count documents or sum values
- **$sort**: Sort results (1 = ascending, -1 = descending)
- **$limit**: Limit number of results
- **$unwind**: Deconstruct array fields
- **$addFields**: Add computed fields
- **$size**: Get array length
- **$ifNull**: Handle null values
- **$match**: Filter documents
- **$count**: Count matching documents
- **$project**: Select specific fields
- **Regex**: Pattern matching for strings
