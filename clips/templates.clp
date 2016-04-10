; ; Templates
; ; For calorie, fiber and fat level: 1 is low, 2 is normal, 3 is high.
; ; For the tastes, 1 is no taste, 2 is less taste, 3 is normal, 4 is more taste.
(deftemplate dish
  (slot ID (type NUMBER))
  (slot name (type STRING))
  (slot cuisine (type STRING))
  (slot is-vegetarian (type STRING))
  (slot has-soup (type STRING))
  (slot calorie-level (type STRING))
  (slot fiber-level (type STRING))
  (slot fat-level (type STRING))
  (slot carb-level (type STRING))
  (slot sweet-level (type STRING))
  (slot sour-level (type STRING))
  (slot salty-level (type STRING))
  (slot spicy-level (type STRING))
  (slot stars (type NUMBER))
)

(deftemplate preference
  (slot cuisine (type STRING))
  (slot is-vegetarian (type STRING))
  (slot has-soup (type STRING))
  (slot calorie-level (type STRING))
  (slot fiber-level (type STRING))
  (slot fat-level (type STRING))
  (slot carb-level (type STRING))
  (slot sweet-level (type STRING))
  (slot sour-level (type STRING))
  (slot salty-level (type STRING))
  (slot spicy-level (type STRING))
)

(deftemplate review
  (slot ID (type NUMBER))
  (slot stars (type NUMBER))
  (slot dish-name (type STRING))
  (slot dish-id (type NUMBER))
  (slot reviewer (type STRING))
  (slot comment (type STRING))
)


(deftemplate suggestion
  (slot dish-name (type STRING))
  (slot dish-id (type NUMBER))
  (slot attribute (type STRING))
  (slot value (type STRING))
  (slot quantity (type NUMBER))
)
