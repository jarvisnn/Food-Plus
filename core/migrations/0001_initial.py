# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dish',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('images', models.IntegerField()),
                ('cuisine', models.CharField(max_length=50)),
                ('isVegetarian', models.CharField(max_length=50)),
                ('hasSoup', models.CharField(max_length=50)),
                ('spicyLevel', models.CharField(max_length=50)),
                ('sourLevel', models.CharField(max_length=50)),
                ('sweetLevel', models.CharField(max_length=50)),
                ('saltyLevel', models.CharField(max_length=50)),
                ('fatLevel', models.CharField(max_length=50)),
                ('calorieLevel', models.CharField(max_length=50)),
                ('fiberLevel', models.CharField(max_length=50)),
                ('carbLevel', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('dishName', models.CharField(max_length=50)),
                ('dishId', models.IntegerField()),
                ('comment', models.TextField()),
                ('reviewer', models.CharField(max_length=50)),
                ('stars', models.IntegerField()),
                ('createdTime', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Suggestion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('dishName', models.CharField(max_length=50)),
                ('dishId', models.IntegerField()),
                ('attribute', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=50)),
                ('quantity', models.IntegerField()),
            ],
        ),
    ]
