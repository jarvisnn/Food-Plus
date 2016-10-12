# FoodPlus
A knowledge based system to help user choose what food to eat today, base on
user's preferences. User may select various cuisines and need to complete a form
of his/her preferences. More than that, user also can help to enrich the system
by adding his/her culinary knowledge.

## Environment
- Python 2.7
- Django 1.8.3
- CLIPS

## Setup
- Pillow
```
pip install Pillow
```
- pyClips
```
pip install pyclips
```

## Clips Structure
- Dishes: name, cuisine, is-vegetarian, is-low-cal, sweet-level, sour-level, spicy-level, salty-level, is-savory, stars
- Reviews: dish-name, stars, comment
- Preferences: cuisine, is-vegetarian, is-low-cal, sweet-level, sour-level, spicy-level, salty-level, is-savory

## Demo Video
[![ScreenShot](https://github.com/jarvis57/Food-Plus/blob/master/static/images/ScreenShot.png?raw=true)](https://www.youtube.com/watch?v=lUvDuu8eXvc)
