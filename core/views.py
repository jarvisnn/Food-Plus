from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from core.models import Dish, Review, Suggestion
from PIL import Image, ImageOps
import datetime
import os.path
import clips
import ast
import time
from django.views.decorators.csrf import csrf_exempt

# ------------------------------------------------------------------------------
# Create your views here.

def index(request):
    return render(request, 'index.html')


def preferencePage(request):
    return render(request, 'preferences.html')


def newDishPage(request):
    return render(request, 'new.html')


def aboutUsPage(request):
    return render(request, 'about.html')


# New Review, Assume Data is CORRECT
@csrf_exempt
def processReviews(request):
    if request.method == "POST":
        id = insertReviewIntoDatabase(request.POST)
        insertReviewIntoClips(request.POST, id)
        return HttpResponse('')
    else:
        response = []
        reviews = Review.objects.filter(dishId=int(request.GET['dishId'])).order_by("-id")
        for review in reviews:
            response.append({"id": review.id, "comment": review.comment, "reviewer": review.reviewer,
                    "createdTime": review.createdTime})
        return JsonResponse(response, safe=False)


# Create New Dish, Assume Data is CORRECT!
@csrf_exempt
def createDish(request):
    id = insertNewDish(request.POST)
    insertIntoClips(id, request.POST)
    return HttpResponse('')


# A new preferences. Assume Data is CORRECT!
@csrf_exempt
def newPreference(request):
    result = clipsMatchPreference(request.POST)
    print(result)
    response = []
    if result != None:
        for val in result.split('---'):
            if "," in val:
                val2 = val.split(',')
                dish = Dish.objects.get(id=int(val2[0]))
                response.append({"id": dish.id, "name": dish.name, "images": dish.images, "description": dish.description,
                    "cuisine": val2[1], "vegetarian": val2[2], "hasSoup": val2[3],
                    "calorieLevel": val2[4], "fiberLevel": val2[5], "fatLevel": val2[6], "carbLevel": val2[7],
                    "spicyLevel": val2[8], "saltyLevel": val2[9], "sourLevel": val2[10], "sweetLevel": val2[11],
                    "stars": float(val2[12])})
    return JsonResponse(response, safe=False)


# A new preferences. Assume Data is CORRECT!
@csrf_exempt
def modify(request):
    insertSuggestionIntoDatabase(request.POST)
    insertSuggestionsIntoClips()
    return HttpResponse('')


# ------------------------------------------------------------------------------
# Utility Functions
def insertNewDish(data):
    images = ast.literal_eval(data['images'])
    imageNum = 0;
    for image in images:
        imageNum = imageNum + (image != 'null')

    dish = Dish(name=data['name'],
                description=data['description'],
                images=imageNum,
                cuisine=data['cuisine'],
                isVegetarian=data['isVegetarian'],
                hasSoup=data['hasSoup'],
                spicyLevel=data['spicyLevel'],
                sweetLevel=data['sweetLevel'],
                sourLevel=data['sourLevel'],
                saltyLevel=data['saltyLevel'],
                fatLevel=data['fatLevel'],
                calorieLevel=data['calorieLevel'],
                fiberLevel=data['fiberLevel'],
                carbLevel=data['carbLevel'])
    dish.save()

    index = 0
    for image in images:
        if image != 'null':
            index = index + 1
            createImage(dish.id, index, image)

    return dish.id


def createImage(id, index, image):
    imgCore = image.split(',')[1]
    imgFile = open(settings.DISH_IMAGE_DIR + "/" + str(id) + "_" + str(index) + ".jpeg", "wb")
    imgFile.write(imgCore.decode('base64'))
    imgFile.close()

    # Create square image
    img = Image.open(settings.DISH_IMAGE_DIR + "/" + str(id) + "_" + str(index) + ".jpeg")
    longer_side = max(img.size)
    thumb = Image.new('RGBA', (longer_side, longer_side), (255, 255, 255, 0))
    thumb.paste(
        img, ((longer_side - img.size[0]) / 2, (longer_side - img.size[1]) / 2)
    )
    thumb.save(settings.DISH_IMAGE_DIR + "/" + str(id) + "_" + str(index) + "_square.jpeg")


def insertIntoClips(id, data):
    # check if a fact-file exists
    FactsFile = settings.CLIPS_DIR + "/dishes.clp"
    if not os.path.isfile(FactsFile):
        file = open(FactsFile, 'w+')
        file.write("(deffacts dishes)\n")
        file.close()

    # modify facts
    lines = open(FactsFile, 'r+').readlines()
    n = len(lines)
    lines[n - 1] = lines[n-1][:-2] + "\n"
    lines.append('  (dish '
                '(ID '+str(id)+')'
                '(name "'+data['name']+'") '
                '(cuisine "'+data['cuisine']+'") '
                '(is-vegetarian "'+data['isVegetarian']+'") '
                '(has-soup "'+data['hasSoup']+'") '
                '(fat-level "'+data['fatLevel']+'")'
                '(calorie-level "'+data['calorieLevel']+'") '
                '(fiber-level "'+data['fiberLevel']+'") '
                '(carb-level "'+data['carbLevel']+'") '
                '(spicy-level "'+data['spicyLevel']+'") '
                '(sour-level "'+data['sourLevel']+'") '
                '(sweet-level "'+data['sweetLevel']+'") '
                '(salty-level "'+data['saltyLevel']+'") '
                '(stars -1)))\n')

    # new facts
    open(FactsFile, 'w').writelines(lines)


attributeMap = { 'isVegetarian': 'is-vegetarian',
        'hasSoup': 'has-soup',
        'spicyLevel': 'spicy-level',
        'sourLevel': 'sour-level',
        'saltyLevel': 'salty-level',
        'sweetLevel': 'sweet-level',
        'fatLevel': 'fat-level',
        'calorieLevel': 'calorie-level',
        'carbLevel': 'carb-level',
        'fiberLevel': 'fiber-level'};
def insertSuggestionIntoDatabase(data):
    suggestion = Suggestion(
                dishName=data['dishName'],
                dishId=int(data['dishId']),
                attribute=attributeMap[data['key']],
                value=data['value'],
                quantity=0)

    suggestions = Suggestion.objects.filter(dishId=int(data['dishId']), attribute=attributeMap[data['key']], value=data['value'])
    if (len(suggestions) != 0):
        suggestion = suggestions[0]

    suggestion.quantity = suggestion.quantity + 1
    suggestion.save()
    print(suggestion)


def insertSuggestionsIntoClips():
    # check if a fact-file exists
    FactsFile = settings.CLIPS_DIR + "/suggestions.clp"
    if not os.path.isfile(FactsFile):
        file = open(FactsFile, 'w+')
        file.write("(deffacts suggestions)\n")
        file.close()

    # modify facts
    suggestions = Suggestion.objects.all()
    lines = ['(deffacts suggestions\n']
    for suggestion in suggestions:
        lines.append('  (suggestion '
                     '(dish-name "'+suggestion.dishName+'")'
                     '(dish-id '+str(suggestion.dishId)+')'
                     '(attribute "'+suggestion.attribute+'")'
                     '(value "'+suggestion.value+'")'
                     '(quantity '+str(suggestion.quantity)+'))\n')

    lines.append(')\n')

    # new facts
    open(FactsFile, 'w').writelines(lines)


def insertReviewIntoDatabase(data):
    review = Review(reviewer=data['reviewer'],
                comment=data['comment'],
                stars=float(data['stars']),
                dishName=data['dishName'],
                dishId=int(data['dishId']),
                createdTime=datetime.datetime.now())
    print(review)
    review.save()
    return review.id


def insertReviewIntoClips(data, id):
    # check if a fact-file exists
    FactsFile = settings.CLIPS_DIR + "/reviews.clp"
    if not os.path.isfile(FactsFile):
        file = open(FactsFile, 'w+')
        file.write("(deffacts reviews)\n")
        file.close()

    # modify facts
    lines = open(FactsFile, 'r+').readlines()
    n = len(lines)
    lines[n - 1] = lines[n-1][:-2] + "\n"
    lines.append('  (review '
                '(ID '+str(id)+')'
                '(dish-name "'+data['dishName']+'")'
                '(dish-id '+data['dishId']+')'
                '(reviewer "'+data['reviewer']+'")'
                '(comment "'+data['comment']+'")'
                '(stars '+data['stars']+')))\n')

    # new facts
    open(FactsFile, 'w').writelines(lines)


def clipsMatchPreference(data):
    # Preference
    preference = '(preference ' +\
                 '(cuisine "'+data['cuisine']+'") ' +\
                 '(is-vegetarian "'+data['isVegetarian']+'") ' +\
                 '(has-soup "'+data['hasSoup']+'") ' +\
                 '(fat-level "'+data['fatLevel']+'")' +\
                 '(calorie-level "'+data['calorieLevel']+'") ' +\
                 '(fiber-level "'+data['fiberLevel']+'") ' +\
                 '(carb-level "'+data['carbLevel']+'") ' +\
                 '(spicy-level "'+data['spicyLevel']+'") ' +\
                 '(sour-level "'+data['sourLevel']+'") ' +\
                 '(sweet-level "'+data['sweetLevel']+'") ' +\
                 '(salty-level "'+data['saltyLevel']+'"))'

    # CLIPS
    clips.Clear()
    clips.BatchStar(settings.CLIPS_DIR + "/templates.clp")
    if os.path.isfile(settings.CLIPS_DIR + "/dishes.clp"):
        clips.BatchStar(settings.CLIPS_DIR + "/dishes.clp")
    if os.path.isfile(settings.CLIPS_DIR + "/reviews.clp"):
        clips.BatchStar(settings.CLIPS_DIR + "/reviews.clp")
    if os.path.isfile(settings.CLIPS_DIR + "/suggestions.clp"):
        clips.BatchStar(settings.CLIPS_DIR + "/suggestions.clp")
    clips.BatchStar(settings.CLIPS_DIR + "/rules.clp")
    clips.Reset()
    clips.Assert(preference)
    clips.Run()
    return clips.StdoutStream.Read()
