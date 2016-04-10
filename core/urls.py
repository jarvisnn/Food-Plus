from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^preferences/$', views.preferencePage, name='preferencePage'),
    url(r'^new/$', views.newDishPage, name='newDishPage'),
    url(r'^about/$', views.aboutUsPage, name='aboutUsPage'),
    url(r'^api/reviews$', views.processReviews, name='processReviews'),
    url(r'^api/dishes$', views.createDish, name='createDish'),
    url(r'^api/preferences$', views.newPreference, name='newPreference'),
    url(r'^api/modifications$', views.modify, name='modify'),
]
