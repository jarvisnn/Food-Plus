; ; Rules for matching dishes with given preference
(defrule dishes-matching
	(declare (salience 1))
	(dish (ID ?ID) (name ?name) (cuisine ?cuisine) (is-vegetarian ?vegetarian) (has-soup ?soup)
			(calorie-level ?calorie) (fiber-level ?fiber) (fat-level ?fat) (carb-level ?carb)
			(spicy-level ?spicy) (salty-level ?salty) (sour-level ?sour) (sweet-level ?sweet)
			(stars ?stars))
	(preference (cuisine "?"|?cuisine)
			(is-vegetarian "?"|?vegetarian)
			(has-soup "?"|?soup)
			(calorie-level "?"|?calorie)
			(fiber-level "?"|?fiber)
			(fat-level "?"|?fat)
			(carb-level "?"|?carb)
			(spicy-level "?"|?spicy)
			(salty-level "?"|?salty)
			(sour-level "?"|?sour)
			(sweet-level "?"|?sweet))
=>
	(printout t ?ID "," ?cuisine "," ?vegetarian "," ?soup ","
		?calorie "," ?fiber "," ?fat "," ?carb ","
		?spicy "," ?salty "," ?sour "," ?sweet "," ?stars "---")
)



; ; Rules for calculating dish rating from reviews
(defrule dishes-rating
	(declare (salience 2))
	?d <- (dish (ID ?id) (stars ?s&:(= ?s -1)))
=>
	(bind ?count 0)
	(bind ?sum 0)
	(do-for-all-facts
		((?r review))
		(= ?r:dish-id ?id)
		(bind ?count (+ ?count 1))
		(bind ?sum (+ ?sum ?r:stars)))
	(if (> ?count 0)
		then
	(modify ?d (stars (/ ?sum ?count)))
		else
	(modify ?d (stars 0)))
)


; ; Rules for tuning the dishes basing on user's suggestions
; ; Rule of tuning "has-soup"
(defrule tuning-has-soup
	(declare (salience 2))
	?d <- (dish (ID ?id) (has-soup ?origin))
	(suggestion (dish-id ?id) (attribute "has-soup") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "has-soup") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (has-soup ?value))
)

(defrule tuning-is-vegetarian
	(declare (salience 2))
	?d <- (dish (ID ?id) (is-vegetarian ?origin))
	(suggestion (dish-id ?id) (attribute "is-vegetarian") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "is-vegetarian") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (is-vegetarian ?value))
)

(defrule tuning-spicy-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (spicy-level ?origin))
	(suggestion (dish-id ?id) (attribute "spicy-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "spicy-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (spicy-level ?value))
)

(defrule tuning-sour-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (sour-level ?origin))
	(suggestion (dish-id ?id) (attribute "sour-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "sour-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (sour-level ?value))
)

(defrule tuning-sweet-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (sweet-level ?origin))
	(suggestion (dish-id ?id) (attribute "sweet-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "sweet-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (sweet-level ?value))
)

(defrule tuning-salty-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (salty-level ?origin))
	(suggestion (dish-id ?id) (attribute "salty-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "salty-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (salty-level ?value))
)

(defrule tuning-fat-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (fat-level ?origin))
	(suggestion (dish-id ?id) (attribute "fat-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "fat-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (fat-level ?value))
)

(defrule tuning-calorie-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (calorie-level ?origin))
	(suggestion (dish-id ?id) (attribute "calorie-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "calorie-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (calorie-level ?value))
)

(defrule tuning-fiber-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (fiber-level ?origin))
	(suggestion (dish-id ?id) (attribute "fiber-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "fiber-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (fiber-level ?value))
)

(defrule tuning-carb-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (carb-level ?origin))
	(suggestion (dish-id ?id) (attribute "carb-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "carb-level") (quantity ?quantity2&:(> ?quantity2 ?quantity))))
=>
	(modify ?d (carb-level ?value))
)
