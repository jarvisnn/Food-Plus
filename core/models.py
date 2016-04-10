from django.db import models

# Create your models here.
class Dish(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    images = models.IntegerField()
    cuisine = models.CharField(max_length=50)
    isVegetarian = models.CharField(max_length=50)
    hasSoup = models.CharField(max_length=50)
    spicyLevel = models.CharField(max_length=50)
    sourLevel = models.CharField(max_length=50)
    sweetLevel = models.CharField(max_length=50)
    saltyLevel = models.CharField(max_length=50)
    fatLevel = models.CharField(max_length=50)
    calorieLevel = models.CharField(max_length=50)
    fiberLevel = models.CharField(max_length=50)
    carbLevel = models.CharField(max_length=50)

    def __str__(self):
        return 'ID: '+ str(self.id) + '\n' +\
            'name: ' + self.name + '\n' +\
            'description: ' + self.description + '\n' +\
            'images: ' + str(self.images) + '\n' +\
            'cuisine: ' + self.cuisine + '\n' +\
            'isVegetarian: ' + self.isVegetarian + '\n' +\
            'hasSoup: ' + self.hasSoup + '\n' +\
            'spicyLevel: ' + self.spicyLevel + '\n' +\
            'sourLevel: ' + self.sourLevel + '\n' +\
            'sweetLevel: ' + self.sweetLevel + '\n' +\
            'saltyLevel: ' + self.saltyLevel + '\n' +\
            'fatLevel: ' + self.fatLevel + '\n' +\
            'calorieLevel: ' + self.calorieLevel + '\n' +\
            'carbLevel: ' + self.carbLevel + '\n' +\
            'fiberLevel: ' + self.fiberLevel + '\n'


class Review(models.Model):
    dishName = models.CharField(max_length=50)
    dishId = models.IntegerField()
    comment = models.TextField()
    reviewer = models.CharField(max_length=50)
    stars = models.IntegerField()
    createdTime =  models.DateField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return 'ID: '+ str(self.id) + '\n' +\
            'dish-name: ' + self.dishName + '\n' +\
            'dish-id: ' + str(self.dishId) + '\n' +\
            'reviewer: ' + self.reviewer + '\n' +\
            'comment: ' + self.comment + '\n' +\
            'stars: ' + str(self.stars) + '\n' +\
            'createdTime: ' + str(self.createdTime) + '\n'


class Suggestion(models.Model):
    dishName = models.CharField(max_length=50)
    dishId = models.IntegerField()
    attribute = models.CharField(max_length=50)
    value = models.CharField(max_length=50)
    quantity = models.IntegerField()

    def __str__(self):
        return 'ID: '+ str(self.id) + '\n' +\
            'dish-name: ' + self.dishName + '\n' +\
            'dish-id: ' + str(self.dishId) + '\n' +\
            'attribute: ' + self.attribute + '\n' +\
            'value: ' + self.value + '\n' +\
            'quantity: ' + str(self.quantity) + '\n'
