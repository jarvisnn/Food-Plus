; ; Rules for matching dishes with given preference
; ; Salience set to 1 so this rule will be fired at the end.
; ; (Other rules have salience = 2)
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
; ; Star will be != -1 after this rule.
(defrule dishs-rating
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
	(not (suggestion (dish-id ?id) (attribute "has-soup") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (has-soup ?value))
)

; ; Rule of tuning "is-vegetarian"
(defrule tuning-is-vegetarian
	(declare (salience 2))
	?d <- (dish (ID ?id) (is-vegetarian ?origin))
	(suggestion (dish-id ?id) (attribute "is-vegetarian") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "is-vegetarian") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))

=>
	(modify ?d (is-vegetarian ?value))
)

; ; Rule of tuning "spicy-level"
(defrule tuning-spicy-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (spicy-level ?origin))
	(suggestion (dish-id ?id) (attribute "spicy-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "spicy-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (spicy-level ?value))
)

; ; Rule of tuning "sour-level"
(defrule tuning-sour-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (sour-level ?origin))
	(suggestion (dish-id ?id) (attribute "sour-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "sour-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (sour-level ?value))
)

; ; Rule of tuning "sweet-level"
(defrule tuning-sweet-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (sweet-level ?origin))
	(suggestion (dish-id ?id) (attribute "sweet-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "sweet-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (sweet-level ?value))
)

; ; Rule of tuning "salty-level"
(defrule tuning-salty-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (salty-level ?origin))
	(suggestion (dish-id ?id) (attribute "salty-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "salty-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (salty-level ?value))
)

; ; Rule of tuning "fat-level"
(defrule tuning-fat-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (fat-level ?origin))
	(suggestion (dish-id ?id) (attribute "fat-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "fat-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (fat-level ?value))
)

; ; Rule of tuning "calorie-level"
(defrule tuning-calorie-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (calorie-level ?origin))
	(suggestion (dish-id ?id) (attribute "calorie-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "calorie-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (calorie-level ?value))
)

; ; Rule of tuning "fiber-level"
(defrule tuning-fiber-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (fiber-level ?origin))
	(suggestion (dish-id ?id) (attribute "fiber-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "fiber-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (fiber-level ?value))
)

; ; Rule of tuning "carb-level"
(defrule tuning-carb-level
	(declare (salience 2))
	?d <- (dish (ID ?id) (carb-level ?origin))
	(suggestion (dish-id ?id) (attribute "carb-level") (value ?value&:(neq ?value ?origin)) (quantity ?quantity))
	(not (suggestion (dish-id ?id) (attribute "carb-level") (value ?value2) 
		(quantity ?quantity2&:(or (> ?quantity2 ?quantity)(and (= ?quantity2 ?quantity) (< (str-compare ?value2 ?value) 0))))))
=>
	(modify ?d (carb-level ?value))
)
