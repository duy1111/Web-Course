# Generated by Django 4.1.3 on 2022-11-09 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='pre_courses',
            field=models.ManyToManyField(blank=True, null=True, to='courses.course'),
        ),
    ]