; ; Rules for matching dishes with given preference
(defrule dishes-matching
  ?dish <- (dish (ID ?ID) (name ?name) (cuisine ?cuisine) (is-vegetarian ?vegetarian)
           (calorie-level ?calorie) (fiber-level ?fiber) (fat-level ?fat)
           (spicy-level ?spicy) (salty-level ?salty) (sour-level ?sour) (sweet-level ?sweet)
           (stars ?stars&:(> ?stars -1)))
  (preference (cuisine "?"|?cuisine)
  			   (is-vegetarian "?"|?vegetarian)
			   (calorie-level "?"|?calorie)
			   (fiber-level "?"|?fiber)
			   (fat-level "?"|?fat)
			   (spicy-level "?"|?spicy)
			   (salty-level "?"|?salty)
			   (sour-level "?"|?sour)
			   (sweet-level "?"|?sweet))
=>
  (printout t ?ID "-" ?stars " ")
)


; ; Rules for calculating dish rating from reviews
(defrule dishs-rating
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
