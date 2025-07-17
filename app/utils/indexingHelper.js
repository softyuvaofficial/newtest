// app/utils/indexingHelper.js

/**
 * Creates an index map from array of items keyed by id
 * Useful for quick lookup and filter
 * @param {Array} items 
 * @param {string} key - property to use as key (default 'id')
 * @returns {Object} - map { keyValue: item }
 */
export function createIndexMap(items, key = "id") {
  return items.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

/**
 * Filters array by search keyword in given fields (case insensitive)
 * @param {Array} items 
 * @param {string} keyword 
 * @param {Array} fields - list of fields to search in
 * @returns {Array} filtered items
 */
export function filterByKeyword(items, keyword, fields) {
  if (!keyword) return items;
  const lowerKeyword = keyword.toLowerCase();
  return items.filter((item) =>
    fields.some((field) =>
      String(item[field] || "").toLowerCase().includes(lowerKeyword)
    )
  );
}

/**
 * Filters items by matching category, subject, topic ids
 * @param {Array} items 
 * @param {Object} filters - { categoryId, subjectId, topicId }
 * @returns {Array} filtered items
 */
export function filterByHierarchy(items, filters) {
  const { categoryId, subjectId, topicId } = filters;
  return items.filter((item) => {
    if (categoryId && item.category_id !== categoryId) return false;
    if (subjectId && item.subject_id !== subjectId) return false;
    if (topicId && item.topic_id !== topicId) return false;
    return true;
  });
}

/**
 * Combines multiple filters: keyword + hierarchy
 * @param {Array} items 
 * @param {string} keyword 
 * @param {Object} hierarchyFilters 
 * @param {Array} searchFields 
 * @returns {Array}
 */
export function filterItems(items, keyword, hierarchyFilters, searchFields) {
  let filtered = filterByHierarchy(items, hierarchyFilters);
  filtered = filterByKeyword(filtered, keyword, searchFields);
  return filtered;
}
